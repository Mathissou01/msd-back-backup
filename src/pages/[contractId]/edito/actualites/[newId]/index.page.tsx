import React from "react";
import { useRouter } from "next/router";
import client from "../../../../../graphql/client";
import {
  Enum_New_Status,
  GetNewDraftDocument,
  GetNewDraftQuery,
  useCreateNewMutation,
  useGetNewByIdLazyQuery,
  useUpdateNewMutation,
} from "../../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../../lib/status";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import {
  ICommonMutationVariables,
  ICommonUpdateMutationVariables,
  IEditoContentLabels,
  IEditorialFormPage,
} from "../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPage";
import EditorialFormPageLoader from "../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPageLoader";

export default function EditoActualitesEditPage() {
  /* Static Data */
  const labels: IEditoContentLabels = {
    createTitle: "Créer une actualité",
    form: {
      staticTitle: "Titre de l'actualité",
      staticTags: "Thématique",
      staticTagsDescription: "(Tags)",
      staticImage: "Vignette",
      staticImageValidation:
        "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
      staticImagePlaceholder:
        "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
      staticShortDescription: "Description courte",
      staticShortDescriptionMaxCharacters:
        "caractères maximum, affichés dans l'aperçu de l'actualité",
    },
  };

  /* Methods */
  async function handleCreate(commonSubmitVariables: ICommonMutationVariables) {
    const [createNew] = createNewMutation;
    return createNew({
      variables: {
        data: {
          newsSubService:
            contract.attributes?.editorialService?.data?.attributes
              ?.newsSubService?.data?.id,
          ...commonSubmitVariables,
        },
      },
      onCompleted: (result) => {
        if (result.createNew?.data?.id) {
          router.push(
            `${currentRoot}/edito/actualites/${result.createNew?.data?.id}`,
          );
        }
      },
    });
  }

  async function handleUpdate(
    newId: string,
    commonSubmitVariables: ICommonUpdateMutationVariables,
    status: EStatus,
  ) {
    const [updateNews] = updateNewMutation;
    return updateNews({
      variables: {
        updateNewId: newId,
        data: {
          ...commonSubmitVariables,
        },
      },
      onCompleted: (result) => {
        if (
          status !== EStatus.Draft &&
          result.versioningHandler?.data?.__typename === "NewEntity" &&
          result.versioningHandler.data.attributes?.customId
        ) {
          client
            .query<GetNewDraftQuery>({
              query: GetNewDraftDocument,
              variables: {
                customId: result.versioningHandler.data.attributes.customId,
              },
              fetchPolicy: "no-cache",
            })
            .then((drafts) => {
              if (drafts.data.news?.data[0]) {
                router.push(
                  `${currentRoot}/edito/actualites/${drafts.data.news.data[0].id}`,
                );
              }
            });
        }
      },
    });
  }

  async function handlePublish(newId: string) {
    const [updateNews] = updateNewMutation;
    const variables = {
      updateNewId: newId,
      data: {
        status: Enum_New_Status.Published,
        toBeUpdated: false,
      },
    };
    return updateNews({
      variables,
    });
  }

  async function handleDepublish(newId: string) {
    const [updateNews] = updateNewMutation;
    const variables = {
      updateNewId: newId,
      data: {
        status: Enum_New_Status.Archived,
        unpublishedDate: new Date(),
        toBeUpdated: false,
      },
    };
    return updateNews({
      variables,
    });
  }

  async function handlePreview(newId: string) {
    // TODO: implement this on other edito types, either same page (with type param), or 1 page per type
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams({
        id: newId,
        type: "new",
      });

      window.open(
        `${currentRoot}/preview?${queryParams.toString()}`,
        "_blank",
        "noreferrer",
      );
    } else {
      return router.push("/404");
    }
  }

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contract } = useContract();

  const getNewByIdLazyQuery = useGetNewByIdLazyQuery({
    fetchPolicy: "network-only",
  });
  const createNewMutation = useCreateNewMutation();
  const updateNewMutation = useUpdateNewMutation({
    refetchQueries: ["getNewById", "getTagsByContractId"],
    awaitRefetchQueries: true,
  });

  const pageProps: IEditorialFormPage = {
    labels,
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onPublish: handlePublish,
    onDepublish: handleDepublish,
    onPreview: handlePreview,
  };

  return (
    <EditorialFormPageLoader
      queryParam={"newId"}
      entityName={"new"}
      getByIdLazyQuery={getNewByIdLazyQuery}
      createMutation={createNewMutation}
      updateMutation={updateNewMutation}
      pageProps={pageProps}
    />
  );
}

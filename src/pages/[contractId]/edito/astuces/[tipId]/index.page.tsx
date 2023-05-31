import React from "react";
import { useRouter } from "next/router";
import {
  Enum_Tip_Status,
  useGetTipByIdLazyQuery,
  useCreateTipMutation,
  useUpdateTipMutation,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import {
  ICommonMutationVariables,
  ICommonUpdateMutationVariables,
  IEditoContentLabels,
  IEditorialFormPage,
} from "../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPage";
import EditorialFormPageLoader from "../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPageLoader";

export default function EditoTipsEditPage() {
  /* Static Data */
  const labels: IEditoContentLabels = {
    createTitle: "Créer une astuce",
    form: {
      staticTitle: "Titre de l'astuce",
      staticTags: "Thématique",
      staticTagsDescription: "(Tags)",
      staticImage: "Vignette",
      staticImageValidation:
        "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
      staticImagePlaceholder:
        "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
      staticShortDescription: "Description courte",
      staticShortDescriptionMaxCharacters:
        "caractères maximum, affichés dans l'aperçu de l'astuce",
    },
  };

  /* Methods */
  async function handleCreate(commonSubmitVariables: ICommonMutationVariables) {
    const [createTip] = createTipMutation;
    return createTip({
      variables: {
        data: {
          tipSubService:
            contract.attributes?.editorialService?.data?.attributes
              ?.tipSubService?.data?.id,
          ...commonSubmitVariables,
        },
      },
      onCompleted: (result) => {
        if (result.createTip?.data?.id) {
          router.push(
            `${currentRoot}/edito/astuces/${result.createTip?.data?.id}`,
          );
        }
      },
    });
  }

  async function handleUpdate(
    tipId: string,
    commonSubmitVariables: ICommonUpdateMutationVariables,
  ) {
    const [updateTip] = updateTipMutation;
    return updateTip({
      variables: {
        updateTipId: tipId,
        data: {
          ...commonSubmitVariables,
        },
      },
    });
  }

  async function handlePublish(tipId: string) {
    const [updateTip] = updateTipMutation;
    const variables = {
      updateTipId: tipId,
      data: {
        status: Enum_Tip_Status.Published,
      },
    };
    return updateTip({
      variables,
    });
  }

  async function handleDepublish(tipId: string) {
    const [updateTip] = updateTipMutation;
    const variables = {
      updateTipId: tipId,
      data: {
        status: Enum_Tip_Status.Archived,
        unpublishedDate: new Date(),
      },
    };
    return updateTip({
      variables,
    });
  }

  async function handlePreview(tipId: string) {
    // TODO: implement this on other edito types, either same page (with type param), or 1 page per type
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/edito/astuces/preview?id=${tipId}`,
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

  const getTipByIdLazyQuery = useGetTipByIdLazyQuery({
    fetchPolicy: "network-only",
  });
  const createTipMutation = useCreateTipMutation();
  const updateTipMutation = useUpdateTipMutation({
    refetchQueries: ["getTipId", "getTagsByContractId"],
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
      queryParam={"tipId"}
      entityName={"tip"}
      getByIdLazyQuery={getTipByIdLazyQuery}
      createMutation={createTipMutation}
      updateMutation={updateTipMutation}
      pageProps={pageProps}
    />
  );
}

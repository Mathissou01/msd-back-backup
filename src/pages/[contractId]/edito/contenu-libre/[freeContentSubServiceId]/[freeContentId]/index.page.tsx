import React from "react";
import { useRouter } from "next/router";
import {
  useUpdateFreeContentMutation,
  Enum_Freecontent_Status,
  useGetFreeContentByIdLazyQuery,
  useCreateFreeContentMutation,
} from "../../../../../../graphql/codegen/generated-types";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { useContract } from "../../../../../../hooks/useContract";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import {
  ICommonMutationVariables,
  IEditoContentLabels,
  IEditorialFormPage,
} from "../../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPage";
import EditorialFormPageLoader from "../../../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPageLoader";

interface IEditoFreeContentEditPageProps {
  freeContentSubServiceId: string;
}

export function EditoFreeContentEditPage({
  freeContentSubServiceId,
}: IEditoFreeContentEditPageProps) {
  /* Static Data */
  const labels: IEditoContentLabels = {
    createTitle: "Créer un article",
    form: {
      staticTitle: "Titre de l'article",
      staticTags: "Thématique ",
      staticTagsDescription: "(Tags)",
      staticImage: "Vignette",
      staticImageValidation:
        "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
      staticImagePlaceholder:
        "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
      staticShortDescription: "Description courte",
      staticShortDescriptionMaxCharacters:
        "caractères maximum, affichés dans l'aperçu de l'article",
    },
  };

  /* Methods */
  async function handleCreate(commonSubmitVariables: ICommonMutationVariables) {
    const [createFreeContent] = createFreeContentMutation;
    return createFreeContent({
      variables: {
        data: {
          freeContentSubService:
            contract.attributes?.editorialService?.data?.attributes
              ?.tipSubService?.data?.id,
          ...commonSubmitVariables,
        },
      },
      onCompleted: (result) => {
        if (result.createFreeContent?.data?.id) {
          router.push(
            `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${result.createFreeContent?.data?.id}`,
          );
        }
      },
    });
  }

  async function handleUpdate(
    freeContentId: string,
    commonSubmitVariables: ICommonMutationVariables,
  ) {
    const [updateFreeContent] = updateFreeContentMutation;
    return updateFreeContent({
      variables: {
        updateFreeContentId: freeContentId,
        data: {
          ...commonSubmitVariables,
        },
      },
    });
  }

  async function handlePublish(freeContentId: string) {
    const [updateFreeContent] = updateFreeContentMutation;
    const variables = {
      updateFreeContentId: freeContentId,
      data: {
        status: Enum_Freecontent_Status.Published,
      },
    };
    return updateFreeContent({
      variables,
    });
  }

  async function handleDepublish(freeContentId: string) {
    const [updateFreeContent] = updateFreeContentMutation;
    const variables = {
      updateFreeContentId: freeContentId,
      data: {
        status: Enum_Freecontent_Status.Archived,
        unpublishedDate: new Date(),
      },
    };
    return updateFreeContent({
      variables,
    });
  }

  async function handlePreview(freeContentId: string) {
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/edito/contenu-libre/preview?id=${freeContentId}`,
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

  const getFreeContentByIdLazyQuery = useGetFreeContentByIdLazyQuery();
  const createFreeContentMutation = useCreateFreeContentMutation();
  const updateFreeContentMutation = useUpdateFreeContentMutation();

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
      queryParam={"freeContentId"}
      entityName={"freeContent"}
      getByIdLazyQuery={getFreeContentByIdLazyQuery}
      createMutation={createFreeContentMutation}
      updateMutation={updateFreeContentMutation}
      pageProps={pageProps}
    />
  );
}

export default function IndexPage() {
  const freeContentSubServiceId = useRoutingQueryId("freeContentSubServiceId");

  return (
    <>
      {freeContentSubServiceId && (
        <EditoFreeContentEditPage
          freeContentSubServiceId={freeContentSubServiceId}
        />
      )}
    </>
  );
}

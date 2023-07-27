import { parseJSON } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Enum_Contactus_Status,
  TagEntity,
  useGetContactUsByIdQuery,
  useGetContactUsesByContractIdQuery,
  useUpdateContactUsMutation,
} from "../../../../graphql/codegen/generated-types";
import { IEditorialFields } from "../../../../lib/editorial";
import { valueToEStatus } from "../../../../lib/status";
import { formatDate } from "../../../../lib/utilities";
import { remapFormBlocksDynamicZone } from "../../../../lib/dynamic-blocks";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import EditorialFormPage, {
  ICommonUpdateMutationVariables,
  IEditoContentLabels,
  IEditorialFormPage,
} from "../../../../components/Editorial/EditorialFormPageLoader/EditorialFormPage";

export function EditoContactEditPage() {
  /* Static Data */
  const labels: IEditoContentLabels = {
    pageTitle: "Créer la page",
    form: {
      staticTitle: "Titre de la page",
    },
  };

  /* Methods */
  async function handleUpdate(
    contactUsId: string,
    commonSubmitVariables: ICommonUpdateMutationVariables,
  ) {
    return updateContactUs({
      variables: {
        updateContactUsId: contactUsId,
        data: {
          ...commonSubmitVariables,
        },
      },
    });
  }

  async function handlePublish(contactUsId: string) {
    const variables = {
      updateContactUsId: contactUsId,
      data: {
        status: Enum_Contactus_Status.Published,
      },
    };
    return updateContactUs({
      variables,
    });
  }

  async function handleDepublish(contactUsId: string) {
    const variables = {
      updateContactUsId: contactUsId,
      data: {
        status: Enum_Contactus_Status.Draft,
      },
    };
    return updateContactUs({
      variables,
    });
  }

  async function handlePreview(contactUsId: string) {
    // TODO: merge preview pages or refactor code. In this case is the contactUsId needed?
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/preview?id=${contactUsId}?type=contact`,
        "_blank",
        "noreferrer",
      );
    } else {
      return router.push("/404");
    }
  }

  /* Local data */
  const router = useRouter();
  const { contractId } = useContract();
  const { currentRoot, currentPage } = useNavigation();
  const {
    data: contractContactUses,
    loading: contractContactUsesLoading,
    error: contractContactUsesError,
  } = useGetContactUsesByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const contactUsId = contractContactUses?.contactUsSubServices?.data[0]?.id;
  const { data, loading, error } = useGetContactUsByIdQuery({
    variables: { contactUsId },
    fetchPolicy: "network-only",
  });
  const [
    updateContactUs,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useUpdateContactUsMutation();
  const isLoading =
    contractContactUsesLoading || loading || updateMutationLoading;
  const errors = [contractContactUsesError, error, updateMutationError];
  const [mappedData, setMappedData] = useState<IEditorialFields>();

  useEffect(() => {
    if (data?.contactUs?.data) {
      const editoData = data.contactUs.data;
      if (editoData.id && editoData.attributes && editoData.attributes.title) {
        const mappedData: IEditorialFields = {
          id: editoData.id,
          status: valueToEStatus(editoData.attributes.status),
          title: editoData.attributes.title,
          tags:
            editoData.attributes.tags?.data.map((tag: TagEntity) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          blocks: remapFormBlocksDynamicZone(editoData.attributes.blocks),
          createdAt: formatDate(
            parseJSON(editoData.attributes.createdAt),
            "dd/MM/yyyy HH:mm",
          ),
          updatedAt: formatDate(
            parseJSON(editoData.attributes.updatedAt),
            "dd/MM/yyyy HH:mm",
          ),
        };
        setMappedData(mappedData);
      }
    } else if (data?.contactUs && data.contactUs?.data === null) {
      void router.push(`${currentRoot}${currentPage}`);
    }
  }, [data, router, currentRoot, currentPage]);

  const pageProps: IEditorialFormPage = {
    labels,
    staticFieldsOverride: ["title"],
    onUpdate: handleUpdate,
    onPublish: handlePublish,
    onDepublish: handleDepublish,
    onPreview: handlePreview,
  };

  return (
    <>
      {contactUsId && mappedData && (
        <EditorialFormPage
          isCreateMode={false}
          contentId={contactUsId}
          mappedData={mappedData}
          isLoading={isLoading}
          errors={errors}
          pageProps={pageProps}
          isContactUsSubmission
        />
      )}
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoContactEditPage />
    </ContractLayout>
  );
}

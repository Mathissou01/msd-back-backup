import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import {
  useGetContactUsByIdQuery,
  useGetContactUsSubServicesByContractIdQuery,
  useUpdateContactUsByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../lib/status";
import {
  TDynamicFieldConfiguration,
  remapFormBlocksDynamicZone,
} from "../../../../lib/dynamic-blocks";
import { ILegalContentFields } from "../../../../lib/legal-content";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useUser } from "../../../../hooks/useUser";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import LegalContentForm from "../../../../components/LegalContent/LegalContentForm";

const dynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
  { option: "ComponentBlocksWysiwyg" },
  { option: "ComponentBlocksSubHeading" },
  { option: "ComponentBlocksHorizontalRule" },
  { option: "ComponentBlocksVideo" },
  { option: "ComponentBlocksFile" },
  { option: "ComponentBlocksImage" },
];

export function EditoContactEditPage() {
  /* Static Data */
  const pageTitle = "Contactez-nous";
  const labels = {
    staticTitle: "Titre de la page",
  };

  /* Methods */
  function onCancel() {
    void router.push(`${currentRoot}/edito/contact`);
  }
  async function onSubmit(submitData: FieldValues) {
    if (contactUsId) {
      await updateContactUs({
        variables: {
          updateContactUsId: contactUsId,
          data: {
            title: submitData.title,
            isActivated: false,
            blocks: submitData.blocks?.map((block: { id?: string }) => {
              delete block.id;
              return block;
            }),
          },
        },
      });
      refetch();
    }
  }

  async function onChangeActivated() {
    if (contactUsId) {
      await updateContactUs({
        variables: {
          updateContactUsId: contactUsId,
          data: {
            isActivated: !data?.contactUs?.data?.attributes?.isActivated,
          },
        },
      });
      refetch();
    }
  }

  async function handlePreview() {
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
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("ContactUs", userRights);
  const { currentRoot, currentPage } = useNavigation();
  const {
    data: contractContactUses,
    loading: contractContactUsesLoading,
    error: contractContactUsesError,
  } = useGetContactUsSubServicesByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const contactUsId = contractContactUses?.contactUsSubServices?.data[0]?.id;
  const { data, loading, error, refetch } = useGetContactUsByIdQuery({
    variables: { contactUsId },
    fetchPolicy: "network-only",
  });
  const [updateContactUs, { loading: updateLoading, error: updateError }] =
    useUpdateContactUsByIdMutation();
  const isLoading = contractContactUsesLoading || loading || updateLoading;
  const errors = [contractContactUsesError, error, updateError];
  const [mappedData, setMappedData] = useState<ILegalContentFields>();

  useEffect(() => {
    if (data?.contactUs?.data) {
      const editoData = data.contactUs.data;
      if (editoData.id && editoData.attributes && editoData.attributes.title) {
        const mappedData: ILegalContentFields = {
          id: editoData.id,
          status: editoData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          isActivated: editoData.attributes.isActivated ?? false,
          title: editoData.attributes.title,
          blocks: remapFormBlocksDynamicZone(editoData.attributes.blocks),
        };
        setMappedData(mappedData);
      }
    } else if (data?.contactUs && data.contactUs?.data === null) {
      void router.push(`${currentRoot}${currentPage}`);
    }

    if (!userPermissions.read) router.push(`/${contractId}`);
  }, [
    data,
    router,
    currentRoot,
    currentPage,
    userPermissions.read,
    contractId,
  ]);

  return (
    <>
      {contactUsId && mappedData && (
        <LegalContentForm
          title={pageTitle}
          data={mappedData}
          onPreview={handlePreview}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onChangeActivated={onChangeActivated}
          dynamicFieldConfigurations={dynamicFieldConfigurations}
          labels={labels}
          isLoading={isLoading}
          errors={errors}
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

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import {
  GetConfidentialityByIdDocument,
  useGetConfidentialityByIdQuery,
  useUpdateConfidentialityByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../../lib/status";
import { remapFormBlocksDynamicZone } from "../../../../../lib/dynamic-blocks";
import { ILegalContentFields } from "../../../../../lib/legal-content";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import LegalContentForm from "../../../../../components/LegalContent/LegalContentForm";

interface IEditoConfidentialityFormPageProps {
  confidentialityId: string;
}

export function EditoConfidentialityFormPage({
  confidentialityId,
}: IEditoConfidentialityFormPageProps) {
  /* Static Data */
  const labels = {
    staticTitle: "Nom de la page confidentialité",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateConfidentialityId: confidentialityId,
      data: {
        title: submitData.title,
        isActivated: false,
        blocks: submitData.blocks?.map((block: { id?: string }) => {
          delete block.id;
          return block;
        }),
      },
    };
    return updateConfidentiality({
      variables,
      refetchQueries: [
        {
          query: GetConfidentialityByIdDocument,
          variables: {
            confidentialityId,
          },
        },
      ],
      onCompleted: (result) => {
        if (result.updateConfidentiality?.data?.id) {
          router.push(`${currentRoot}/edito/confidentialite`);
        }
      },
    });
  }

  async function onChangeActivated() {
    return await updateConfidentiality({
      variables: {
        updateConfidentialityId: confidentialityId,
        data: {
          isActivated: !data?.confidentiality?.data?.attributes?.isActivated,
        },
      },
      onCompleted: (result) => {
        if (result.updateConfidentiality?.data?.id) {
          router.push(`${currentRoot}/edito/confidentialite`);
        }
      },
    });
  }

  async function handlePreview() {
    // TODO: merge preview pages or refactor code. In this case is the confidentialityId needed?
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams({
        id: confidentialityId,
        type: "confidentiality",
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

  function onCancel() {
    void router.push(`${currentRoot}/edito/confidentialite`);
  }

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const [mappedData, setMappedData] = useState<ILegalContentFields>();
  const { loading, error, data } = useGetConfidentialityByIdQuery({
    variables: { confidentialityId },
    fetchPolicy: "network-only",
  });
  const [
    updateConfidentiality,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateConfidentialityByIdMutation({
    awaitRefetchQueries: true,
  });
  const isLoading = loading || loadingUpdate;
  const errors = [error, errorUpdate];

  useEffect(() => {
    if (data?.confidentiality?.data) {
      const confidentialityData = data.confidentiality.data;
      if (confidentialityData.id && confidentialityData.attributes?.title) {
        const mappedData: ILegalContentFields = {
          id: confidentialityData.id,
          title: confidentialityData.attributes.title,
          status: confidentialityData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          isActivated: confidentialityData.attributes.isActivated ?? false,
          blocks:
            remapFormBlocksDynamicZone(confidentialityData.attributes.blocks) ??
            [],
        };
        setMappedData(mappedData);
      }
    }
  }, [data, currentRoot]);
  return (
    <>
      {confidentialityId && mappedData && (
        <LegalContentForm
          title={mappedData?.title ?? ""}
          data={mappedData}
          onPreview={handlePreview}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onChangeActivated={onChangeActivated}
          labels={labels}
          isLoading={isLoading}
          errors={errors}
        />
      )}
    </>
  );
}

export default function IndexPage() {
  const confidentialityId = useRoutingQueryId("confidentialityId");

  return (
    confidentialityId && (
      <ContractLayout>
        <EditoConfidentialityFormPage confidentialityId={confidentialityId} />
      </ContractLayout>
    )
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import {
  GetCguByIdDocument,
  useGetCguByIdQuery,
  useUpdateCguByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../../lib/status";
import { remapFormBlocksDynamicZone } from "../../../../../lib/dynamic-blocks";
import { ILegalContentFields } from "../../../../../lib/legal-content";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import LegalContentForm from "../../../../../components/LegalContent/LegalContentForm";

interface IEditoCguFormPageProps {
  cguId: string;
}

export function EditoCguFormPage({ cguId }: IEditoCguFormPageProps) {
  /* Static Data */
  const labels = {
    staticTitle: "Nom de la page conditions générales",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateCguId: cguId,
      data: {
        title: submitData.title,
        isActivated: false,
        blocks: submitData.blocks?.map((block: { id?: string }) => {
          delete block.id;
          return block;
        }),
      },
    };
    return updateCgu({
      variables,
      refetchQueries: [
        {
          query: GetCguByIdDocument,
          variables: {
            cguId,
          },
        },
      ],
      onCompleted: (result) => {
        if (result.updateCgu?.data?.id) {
          router.push(`${currentRoot}/edito/conditions-generales`);
        }
      },
    });
  }

  async function onChangeActivated() {
    return await updateCgu({
      variables: {
        updateCguId: cguId,
        data: {
          isActivated: !data?.cgu?.data?.attributes?.isActivated,
        },
      },
      onCompleted: (result) => {
        if (result.updateCgu?.data?.id) {
          router.push(`${currentRoot}/edito/conditions-generales`);
        }
      },
    });
  }

  async function handlePreview() {
    // TODO: merge preview pages or refactor code. In this case is the cguId needed?
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/edito/conditions-generales/preview?id=${cguId}`,
        "_blank",
        "noreferrer",
      );
    } else {
      return router.push("/404");
    }
  }

  function onCancel() {
    void router.push(`${currentRoot}/edito/conditions-generales`);
  }

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const [mappedData, setMappedData] = useState<ILegalContentFields>();
  const { loading, error, data } = useGetCguByIdQuery({
    variables: { cguId },
    fetchPolicy: "network-only",
  });
  const [updateCgu, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateCguByIdMutation({
      awaitRefetchQueries: true,
    });
  const isLoading = loading || loadingUpdate;
  const errors = [error, errorUpdate];

  useEffect(() => {
    if (data?.cgu?.data) {
      const cguData = data.cgu.data;
      if (cguData.id && cguData.attributes?.title) {
        const mappedData: ILegalContentFields = {
          id: cguData.id,
          title: cguData.attributes.title,
          status: cguData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          isActivated: cguData.attributes.isActivated ?? false,
          blocks: remapFormBlocksDynamicZone(cguData.attributes.blocks) ?? [],
        };
        setMappedData(mappedData);
      }
    }
  }, [data, currentRoot]);

  return (
    <>
      {cguId && mappedData && (
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
  const cguId = useRoutingQueryId("cguId");

  return (
    cguId && (
      <ContractLayout>
        <EditoCguFormPage cguId={cguId} />
      </ContractLayout>
    )
  );
}

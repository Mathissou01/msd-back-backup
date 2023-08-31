import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import {
  GetCookieByIdDocument,
  useGetCookieByIdQuery,
  useUpdateCookieByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../../lib/status";
import { ILegalContentFields } from "../../../../../lib/legal-content";
import { remapFormBlocksDynamicZone } from "../../../../../lib/dynamic-blocks";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import LegalContentForm from "../../../../../components/LegalContent/LegalContentForm";

interface IEditoCookieFormPageProps {
  cookieId: string;
}

export function EditoCookieFormPage({ cookieId }: IEditoCookieFormPageProps) {
  /* Static Data */
  const labels = {
    staticTitle: "Nom de la page cookie",
  };
  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateCookieId: cookieId,
      data: {
        title: submitData.title,
        isActivated: false,
        blocks: submitData.blocks?.map((block: { id?: string }) => {
          delete block.id;
          return block;
        }),
      },
    };
    return updateCookie({
      variables,
      refetchQueries: [
        {
          query: GetCookieByIdDocument,
          variables: {
            cookieId,
          },
        },
      ],
      onCompleted: (result) => {
        if (result.updateCookie?.data?.id) {
          router.push(`${currentRoot}/edito/politique-cookies`);
        }
      },
    });
  }

  async function onChangeActivated() {
    return await updateCookie({
      variables: {
        updateCookieId: cookieId,
        data: {
          isActivated: !data?.cookie?.data?.attributes?.isActivated,
        },
      },
      onCompleted: (result) => {
        if (result.updateCookie?.data?.id) {
          router.push(`${currentRoot}/edito/politique-cookies`);
        }
      },
    });
  }

  async function handlePreview() {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams({
        id: cookieId,
        type: "cookie",
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
    void router.push(`${currentRoot}/edito/politique-cookies`);
  }

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const [mappedData, setMappedData] = useState<ILegalContentFields>();
  const { loading, error, data } = useGetCookieByIdQuery({
    variables: { cookieId },
    fetchPolicy: "network-only",
  });
  const [updateCookie, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateCookieByIdMutation({
      awaitRefetchQueries: true,
    });
  const isLoading = loading || loadingUpdate;
  const errors = [error, errorUpdate];

  useEffect(() => {
    if (data?.cookie?.data) {
      const cookieData = data.cookie.data;
      if (cookieData.id && cookieData.attributes?.title) {
        const mappedData: ILegalContentFields = {
          id: cookieData.id,
          title: cookieData.attributes.title,
          status: cookieData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          isActivated: cookieData.attributes.isActivated ?? false,
          blocks:
            remapFormBlocksDynamicZone(cookieData.attributes.blocks) ?? [],
        };
        setMappedData(mappedData);
      }
    }
  }, [data, currentRoot]);

  return (
    <>
      {cookieId && mappedData && (
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
  const cookieId = useRoutingQueryId("cookieId");
  return (
    cookieId && (
      <ContractLayout>
        <EditoCookieFormPage cookieId={cookieId} />
      </ContractLayout>
    )
  );
}

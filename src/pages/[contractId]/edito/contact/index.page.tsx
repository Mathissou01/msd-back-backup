import React, { useEffect, useState } from "react";
import ContractLayout from "../../contract-layout";
import { useRouter } from "next/router";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import {
  Enum_Contactus_Status,
  GetContactUsByIdDocument,
  useGetContactUsByIdQuery,
  useGetContactUsesSubServiceByContractIdQuery,
  useUpdateContactUsMutation,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import EditoForm from "../../../../components/Edito/EditoForm/EditoForm";
import {
  IEditoBlock,
  IEditoFields,
  remapEditoBlocksDynamicZone,
  TDynamicFieldOption,
} from "../../../../lib/edito";
import { valueToEStatus } from "../../../../lib/status";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { useNavigation } from "../../../../hooks/useNavigation";
import { formatDate } from "../../../../lib/utilities";
import { parseJSON } from "date-fns";

export function EditoContactEditPage() {
  /* Static Data */
  const title = "Créer la page";
  const formLabels = {
    staticTitle: "Titre de la page",
  };

  /* Methods */
  const router = useRouter();

  async function onSubmit(contactUsInputData: FieldValues) {
    const variables = {
      updateContactUsId: subserviceId ?? "",
      data: {
        title: contactUsInputData.title,
        blocks: contactUsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
        unpublishedDate: contactUsInputData.unpublishedDate,
      },
    };

    return updateContactUs({
      variables,
      refetchQueries: [
        {
          query: GetContactUsByIdDocument,
          variables: { subserviceId },
          fetchPolicy: "network-only",
        },
      ],
    });
  }

  async function onPreview() {
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/edito/contact/preview?id=${subserviceId}`,
        "_blank",
        "noreferrer",
      );
    } else {
      router.push("/404");
    }
  }

  async function onPublish() {
    const variables = {
      updateContactUsId: subserviceId ?? "",
      data: {
        status: Enum_Contactus_Status.Published,
      },
    };
    return updateContactUs({
      variables,
      refetchQueries: [
        {
          query: GetContactUsByIdDocument,
          variables: { subserviceId },
        },
      ],
    });
  }

  async function onDepublish() {
    const variables = {
      updateContactUsId: subserviceId ?? "",
      data: {
        status: Enum_Contactus_Status.Archived,
        unpublishedDate: new Date(),
      },
    };
    return updateContactUs({
      variables,
      refetchQueries: [
        {
          query: GetContactUsByIdDocument,
          variables: { subserviceId },
        },
      ],
    });
  }

  // ----------------------------------------------------------------
  /* External Data */

  const { contractId } = useContract();

  const { data: contactUsSubServicesData } =
    useGetContactUsesSubServiceByContractIdQuery({
      variables: { contractId: `${contractId}` },
      fetchPolicy: "network-only",
    });

  const subserviceId =
    contactUsSubServicesData?.contactUsSubServices?.data[0]?.attributes
      ?.contactUses?.data[0].id;
  const {
    data,
    loading: loadingContactUs,
    error: errorContactUs,
  } = useGetContactUsByIdQuery({
    variables: { contactUsId: `${subserviceId}` },
    skip: !subserviceId,
  });

  /* Local Data */
  const [
    updateContactUs,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useUpdateContactUsMutation();
  const { currentRoot } = useNavigation();
  // const contractPathId = contract.attributes?.pathId;
  const isLoading = loadingContactUs || updateMutationLoading;
  const errors = [errorContactUs, updateMutationError];
  const [mappedData, setMappedData] = useState<IEditoFields>();
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksWysiwyg",
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
    "ComponentBlocksFile",
  ];

  useEffect(() => {
    if (data?.contactUs?.data) {
      const contactUsData = data.contactUs.data;
      if (contactUsData?.id && contactUsData.attributes) {
        const mappedData: IEditoFields = {
          image: null,
          shortDescription: null,
          id: contactUsData.id,
          status: valueToEStatus(contactUsData.attributes.status),
          title: contactUsData.attributes.title,
          blocks: remapEditoBlocksDynamicZone(contactUsData.attributes.blocks),
          unpublishedDate: contactUsData.attributes.unpublishedDate,
          createdAt: formatDate(
            parseJSON(contactUsData.attributes.createdAt),
            "dd/MM/yyyy HH:mm",
          ),
          updatedAt: formatDate(
            parseJSON(contactUsData.attributes.updatedAt),
            "dd/MM/yyyy HH:mm",
          ),
        };
        setMappedData(mappedData);
      }
    } else if (data?.contactUs && data.contactUs.data === null) {
      void router.push(`${currentRoot}/edito/contact`);
    }
  }, [data, router, currentRoot]);
  return (
    <div className="c-EditoContactPage">
      {mappedData && (
        <>
          <PageTitle title={title} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <EditoForm
              data={mappedData}
              dynamicFieldsOptions={dynamicFieldOptions}
              onSubmitValid={onSubmit}
              onPublish={onPublish}
              onDepublish={onDepublish}
              onPreview={onPreview}
              labels={formLabels}
              hideImageField={true}
              hideShortDescriptionField={true}
              hideTagField={true}
            />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoContactEditPage />
    </ContractLayout>
  );
}

import { useEffect, useState } from "react";
import router from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { format, parse } from "date-fns";
import {
  GetInformationMessagesByContractIdDocument,
  useCreateInformationMessageMutation,
  useGetInformationMessageByIdQuery,
  useUpdateInformationMessageByIdMutation,
} from "../../../../../../graphql/codegen/generated-types";
import InformationMessageForm from "../../../../../../components/InformationMessage/InformationMessageForm";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";

interface IInformationMessageIdPageProps {
  informationMessageId: string;
  isCreateMode: boolean;
}

export interface IInformationMessageStaticFields {
  infoMessage: string;
  date: [Date, Date];
  pickUpDays: Array<{ value: string; label: string }>;
}

export function InformationMessageEditPage({
  informationMessageId,
  isCreateMode,
}: IInformationMessageIdPageProps) {
  /* Static Data */
  const titleCreationInformationMessage = "Créer un message";
  const titleUpdateInformationMessage = "Modifier un message";
  const formLabels = {
    staticName: "Message d'information",
    staticPickUpDays: "Collecte(s)",
    staticShownPeriod: "Période d'affichage",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const variables = {
      updateInformationMessageId: informationMessageId,
      data: {
        infoMessage: submitData.infoMessage,
        dateStart: format(submitData.date[0], "dd/MM/yy"),
        dateEnd: format(submitData.date[1], "dd/MM/yy"),
        pickUpDays: submitData.pickUpDays?.map(
          (informationMessage: { value: string }) => informationMessage.value,
        ),
      },
    };

    if (isCreateMode) {
      return createInformationMessage({
        variables,
        onCompleted: (result) => {
          if (result.createInformationMessage?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/jour-collecte`);
            }
          }
        },
      });
    } else {
      return updateInformationMessage({
        variables,
        refetchQueries: [
          {
            query: GetInformationMessagesByContractIdDocument,
            variables: { informationMessageId },
          },
        ],
        onCompleted: (result) => {
          if (result.updateInformationMessage?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/jour-collecte`);
            }
          }
        },
      });
    }
  }

  function onCancel() {
    form.reset();
    router.push(`${currentRoot}/services/jour-collecte/`);
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { loading, error, data } = useGetInformationMessageByIdQuery({
    variables: { informationMessageId },
    fetchPolicy: "cache-and-network",
  });

  const [
    createInformationMessage,
    {
      loading: createInformationMessageLoading,
      error: createInformationMessageError,
    },
  ] = useCreateInformationMessageMutation({
    awaitRefetchQueries: true,
    onError: (error) => {
      setError("name", { type: "validate", message: error.message });
    },
  });

  const [
    updateInformationMessage,
    {
      loading: updateInformationMessageLoading,
      error: updateInformationMessageError,
    },
  ] = useUpdateInformationMessageByIdMutation();

  /* Local data */
  const isLoading = loading || createInformationMessageLoading;
  updateInformationMessageLoading;
  const errors = [
    error,
    createInformationMessageError,
    updateInformationMessageError,
  ];
  const [informationMessageData, setInformationMessageData] =
    useState<IInformationMessageStaticFields>();
  const form = useForm({
    mode: "onChange",
  });
  const { setError } = form;

  useEffect(() => {
    if (data?.informationMessage?.data) {
      const informationMessage = data?.informationMessage.data;

      if (
        informationMessage.id &&
        informationMessage.attributes?.infoMessage &&
        informationMessage.attributes.dateStart &&
        informationMessage.attributes.dateEnd
      ) {
        const mappedData: IInformationMessageStaticFields = {
          infoMessage: informationMessage?.attributes?.infoMessage ?? "",
          date: [
            parse(
              informationMessage.attributes.dateStart,
              "dd/MM/yy",
              new Date(),
            ),
            parse(
              informationMessage.attributes.dateEnd,
              "dd/MM/yy",
              new Date(),
            ),
          ],
          pickUpDays:
            informationMessage.attributes.pickUpDays?.data.map((pickUpDay) => ({
              value: pickUpDay.id ?? "",
              label: pickUpDay.attributes?.name ?? "",
            })) ?? [],
        };

        setInformationMessageData(mappedData);
      }
    }
  }, [data]);

  return (
    <div className="o-InformationMessageEditPage">
      <>
        {isCreateMode ? (
          <PageTitle title={titleCreationInformationMessage} />
        ) : (
          <PageTitle title={titleUpdateInformationMessage} />
        )}
        <CommonLoader isLoading={isLoading} errors={errors}>
          <InformationMessageForm
            data={informationMessageData}
            onSubmitValid={onSubmit}
            onCancel={onCancel}
            labels={formLabels}
          />
        </CommonLoader>
      </>
    </div>
  );
}

export default function IndexPage() {
  const informationMessageId = useRoutingQueryId(
    "informationMessageId",
    "create",
  );

  return (
    informationMessageId && (
      <ContractLayout>
        <InformationMessageEditPage
          informationMessageId={informationMessageId}
          isCreateMode={informationMessageId === "-1"}
        />
      </ContractLayout>
    )
  );
}

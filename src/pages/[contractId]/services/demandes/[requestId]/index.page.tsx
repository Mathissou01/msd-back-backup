import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { EStatus } from "../../../../../lib/status";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useContract } from "../../../../../hooks/useContract";
import {
  useCreateRequestByContractIdMutation,
  useGetRequestByIdQuery,
  useUpdateRequestByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import RequestForm, {
  IRequestFields,
} from "../../../../../components/Request/RequestForm";

interface IRequestFormPageProps {
  requestId: string;
}

export function RequestFormPage({ requestId }: IRequestFormPageProps) {
  /* Static Data */
  const labels = {
    createTitle: "Créer une demande",
    form: {
      staticName: "Nom de la demande",
      staticMaxCharacters: "caractères maximum",
      staticAggregateLabel: "Dossier",
      staticAggregateInformation:
        "Le formulaire apparaitra dans le dossier sélectionné",
      staticWysiwygText: "Texte",
      subStaticWysiwygText:
        "Accessibilité : utilisez les niveaux de titre de façon cohérente sans sauter de niveau",
    },
  };

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const [mappedData, setMappedData] = useState<IRequestFields>();

  /* External data */
  const { data, loading, error } = useGetRequestByIdQuery({
    variables: {
      requestId: requestId,
    },
    fetchPolicy: "network-only",
  });

  const [updateRequest, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateRequestByIdMutation();
  const [createRequest, { loading: loadingCreate, error: errorCreate }] =
    useCreateRequestByContractIdMutation();

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    return requestId === "-1"
      ? createRequest({
          variables: {
            data: {
              requestService: contractId,
              name: submitData.name,
              requestAggregate: submitData.aggregate?.id ?? null,
              isActivated: false,
              blockText: submitData.blockText,
            },
          },
          onCompleted: (result) => {
            if (result.createRequest?.data?.id) {
              router.push(`${currentRoot}/services/demandes`);
            }
          },
        })
      : updateRequest({
          variables: {
            updateRequestId: requestId,
            data: {
              name: submitData.name,
              requestAggregate: submitData.aggregate?.id ?? null,
              isActivated: false,
              blockText: submitData.blockText,
            },
          },
          onCompleted: (result) => {
            if (result.updateRequest?.data?.id) {
              router.push(`${currentRoot}/services/demandes`);
            }
          },
        });
  }

  async function onChangeActivated() {
    return await updateRequest({
      variables: {
        updateRequestId: requestId,
        data: {
          isActivated: !data?.request?.data?.attributes?.isActivated,
        },
      },
      onCompleted: (result) => {
        if (result.updateRequest?.data?.id) {
          router.push(`${currentRoot}/services/demandes`);
        }
      },
    });
  }
  const isLoading = loading || loadingUpdate || loadingCreate;
  const errors = [error, errorUpdate, errorCreate];

  useEffect(() => {
    if (data?.request?.data) {
      const requestData = data.request.data;

      if (requestData.id && requestData.attributes) {
        const mappedData: IRequestFields = {
          id: requestData.id,
          name: requestData.attributes.name ?? "",
          aggregate: requestData.attributes.requestAggregate?.data ?? null,
          isActivated: requestData.attributes.isActivated ?? false,
          blockText: requestData.attributes.blockText ?? "",
          status: requestData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          contentBlock: [],
        };
        setMappedData(mappedData);
      }
    }
  }, [data, router, currentRoot]);

  return (
    <div className="o-RequestEditPage">
      <>
        <PageTitle
          title={
            requestId === "-1" ? labels.createTitle : mappedData?.name ?? ""
          }
        />
        <CommonLoader isLoading={isLoading} errors={errors}>
          <RequestForm
            isCreatedMode={requestId === "-1"}
            data={mappedData}
            onCancel={() => router.push(`${currentRoot}/services/demandes`)}
            onSubmit={onSubmit}
            onChangeActivated={onChangeActivated}
            labels={labels.form}
            dynamicFieldsOptions={[]}
          />
        </CommonLoader>
      </>
    </div>
  );
}

export default function IndexPage() {
  const requestId = useRoutingQueryId("requestId", "create");

  return (
    requestId && (
      <ContractLayout>
        <RequestFormPage requestId={requestId} />
      </ContractLayout>
    )
  );
}

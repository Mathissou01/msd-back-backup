import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { removeNulls } from "../../../../../lib/utilities";
import { EStatus } from "../../../../../lib/status";
import {
  IBlocksQuestions,
  IFormBlock,
  TDynamicFieldOption,
  remapFormBlocksDynamicZone,
} from "../../../../../lib/dynamic-blocks";
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
      staticRadioRequestType: "Type de demande",
      oneRequestType: "Une seule demande",
      severalRequestType: "Choix entre plusieurs types de demandes",
      staticAggregateLabel: "Dossier",
      staticAggregateInformation:
        "Le formulaire apparaitra dans le dossier sélectionné",
      staticWysiwygText: "Texte",
      subStaticWysiwygText:
        "Accessibilité : utilisez les niveaux de titre de façon cohérente sans sauter de niveau",
    },
    formUser: {
      staticUserContainerActivationLabel: `Activer la gestion de l'encart "Usager"`,
      staticUserLabel: "Usager",
      staticUserCivilitySelectLabel: "Civilité",
      staticUserCivilitySelectTrueOption: "Visible",
      staticUserCivilitySelectFalseOption: "Caché",
      staticUserNameFieldStateSelectLabel: 'Statut du champ "Nom / prénom"',
      staticUserEmailFieldStateSelectLabel: 'Statut du champ "Email"',
      staticUserPhoneFieldStateSelectLabel: 'Statut du champ "Téléphone"',
      staticMandatoryFieldStateSelectLabelTrueOption: "Obligatoire",
      staticMandatoryFieldStateSelectLabelFalseOption: "Optionnel",
      staticUserSMSCheckboxStateLabel:
        "Afficher une case à cocher pour permettre aux usagers d'être alertés par SMS",
    },
  };

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const [mappedData, setMappedData] = useState<IRequestFields>();
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksQuestions",
  ];

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

  const isLoading = loading || loadingUpdate || loadingCreate;
  const errors = [error, errorUpdate, errorCreate];

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const addableBlocks = submitData.addableBlocks.map(
      // Remove automatically generated ID
      (block: { id?: string }) => {
        delete block.id;
        return { ...block };
      },
    );
    return requestId === "-1"
      ? createRequest({
          variables: {
            data: {
              requestService: contractId,
              name: submitData.name,
              hasSeveralRequestTypes:
                submitData.hasSeveralRequestTypes === "1" ? true : false,
              requestAggregate: submitData.aggregate?.id ?? null,
              isActivated: false,
              blockText: submitData.blockText,
              addableBlocks: addableBlocks,
              hasUser: submitData.hasUser,
              displayUserCivility: submitData.displayUserCivility === "true",
              isUserNameMandatory: submitData.isUserNameMandatory === "true",
              isUserEmailMandatory: submitData.isUserEmailMandatory === "true",
              isUserPhoneMandatory: submitData.isUserPhoneMandatory === "true",
              userAllowSMSNotification: submitData.userAllowSMSNotification,
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
              hasSeveralRequestTypes:
                submitData.hasSeveralRequestTypes === "1" ? true : false,
              requestAggregate: submitData.aggregate?.id ?? null,
              isActivated: false,
              blockText: submitData.blockText,
              addableBlocks: addableBlocks,
              hasUser: submitData.hasUser,
              displayUserCivility: submitData.displayUserCivility === "true",
              isUserNameMandatory: submitData.isUserNameMandatory === "true",
              isUserEmailMandatory: submitData.isUserEmailMandatory === "true",
              isUserPhoneMandatory: submitData.isUserPhoneMandatory === "true",
              userAllowSMSNotification: submitData.userAllowSMSNotification,
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

  function formatComponentBlocks(blocks: IFormBlock[]): Array<IFormBlock> {
    return (
      blocks
        .map((block) => {
          if (block.__typename === "ComponentBlocksQuestions") {
            // Radio buttons need string values but height property contains boolean, this is why we replace it here
            const newBlock: IBlocksQuestions = block as IBlocksQuestions;
            newBlock.height = newBlock.height ? "1" : "0";
            return {
              ...newBlock,
            };
          }
        })
        .filter(removeNulls) ?? []
    );
  }

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
          hasSeveralRequestTypes: requestData.attributes.hasSeveralRequestTypes
            ? "1"
            : "0",
          addableBlocks: requestData.attributes.addableBlocks
            ? formatComponentBlocks(
                remapFormBlocksDynamicZone(
                  requestData.attributes.addableBlocks,
                ),
              )
            : [],
          hasUser: requestData.attributes.hasUser,
          displayUserCivility: requestData.attributes.displayUserCivility
            ? requestData.attributes.displayUserCivility.toString()
            : "false",
          isUserNameMandatory: requestData.attributes.isUserNameMandatory
            ? requestData.attributes.isUserNameMandatory.toString()
            : "false",
          isUserEmailMandatory: requestData.attributes.isUserEmailMandatory
            ? requestData.attributes.isUserEmailMandatory.toString()
            : "false",
          isUserPhoneMandatory: requestData.attributes.isUserPhoneMandatory
            ? requestData.attributes.isUserPhoneMandatory.toString()
            : "false",
          userAllowSMSNotification:
            requestData.attributes.userAllowSMSNotification ?? false,
          status: requestData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
        };
        setMappedData(mappedData);
      }
    } else {
      const mappedData: IRequestFields = {
        id: "",
        blockText: "",
        aggregate: {},
        addableBlocks: [],
        hasSeveralRequestTypes: "0",
        isActivated: false,
        name: "",
        hasUser: false,
        displayUserCivility: "false",
        isUserNameMandatory: "true",
        isUserEmailMandatory: "true",
        isUserPhoneMandatory: "true",
        userAllowSMSNotification: false,
        status: EStatus.Draft,
      };

      setMappedData(mappedData);
    }
  }, [data, router, currentRoot]);

  return (
    <div className="o-RequestEditPage">
      <PageTitle
        title={requestId === "-1" ? labels.createTitle : mappedData?.name ?? ""}
      />
      <CommonLoader isLoading={isLoading} errors={errors}>
        <RequestForm
          isCreatedMode={requestId === "-1"}
          data={mappedData}
          onCancel={() => router.push(`${currentRoot}/services/demandes`)}
          onSubmit={onSubmit}
          onChangeActivated={onChangeActivated}
          labels={labels.form}
          labelsUser={labels.formUser}
          dynamicFieldsOptions={dynamicFieldOptions}
        />
      </CommonLoader>
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

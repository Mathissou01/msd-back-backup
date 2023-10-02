import { useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  Enum_Mwcflow_Weightsystem,
  useCreateMwcFlowMutation,
  useDeleteMwcFlowMutation,
  useGetMwcFlowByFlowIdQuery,
  useGetMwcounterServicesQuery,
  useUpdateMwcFlowMutation,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import FormDynamicBlocks from "../../../Form/FormDynamicBlocks/FormDynamicBlocks";
import FormInput from "../../../Form/FormInput/FormInput";
import FormSelect from "../../../Form/FormSelect/FormSelect";
import {
  IFormBlock,
  TDynamicFieldConfiguration,
  remapFormBlocksDynamicZone,
} from "../../../../lib/dynamic-blocks";
import { IFormCommonFields } from "../../../../lib/form";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import { ISelectFlowData } from "../MCDFlow";

interface IMCDFlowFormProps {
  flow?: ISelectFlowData;
  setSelectedFlow: React.Dispatch<React.SetStateAction<boolean>>;
  onRemove: () => void;
  flowIdName?: ISelectFlowData;
  setSelectedFlowId: (flowId: string) => void;
}
export interface IFlowStaticFields extends IFormCommonFields {
  id: string;
  name: string;
  weightSystem: Enum_Mwcflow_Weightsystem;
  averageProductionPerson: number;
  blocks: Array<IFormBlock>;
}

export default function MCDFlowForm({
  flow,
  flowIdName,
  setSelectedFlow,
  onRemove,
  setSelectedFlowId,
}: IMCDFlowFormProps) {
  /* Static Datas */
  /* local data / and / Methods */
  const weighingSystemOptions = [
    {
      option: "Dynamic",
      label: "Pesée dynamique des bacs",
    },
    {
      option: "Outlet",
      label: "Pesée à l'exutoire",
    },
  ];

  const buttonLabels = {
    save: "Enregistrer les modifications",
    cancel: "Annuler les modifications",
    removeFlow: "Enlever ce flux",
    saveFlow: "Ajouter ce flux",
  };

  const dynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
    { option: "ComponentBlocksImage" },
    { option: "ComponentBlocksVideo" },
    { option: "ComponentBlocksWysiwyg" },
    { option: "ComponentBlocksSubHeading" },
  ];

  const { contractId } = useContract();
  const [mappedData, setMappedData] = useState<IFlowStaticFields>();
  const [initialValues, setInitialValues] = useState<IFlowStaticFields | null>(
    null,
  );

  const form = useForm({
    mode: "onChange",
    defaultValues: mappedData as DefaultValues<IFlowStaticFields>,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = form;

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [, setIsCancelBtnHidden] = useState(true);

  const { data: dataMwcService } = useGetMwcounterServicesQuery({
    variables: {
      contractId: contractId,
    },
  });

  const { data } = useGetMwcFlowByFlowIdQuery({
    variables: {
      flowId: flow !== undefined ? flow?.id : flowIdName?.id ?? "",
    },
    fetchPolicy: "network-only",
  });

  const [createMwcFlowMutation] = useCreateMwcFlowMutation({
    refetchQueries: [
      "getMwcFlowByFlowId",
      "getMwcFlowsByContractId",
      "getMwcAverageProduction",
    ],
    awaitRefetchQueries: true,
  });

  const [updateMwcFlowMutation] = useUpdateMwcFlowMutation({
    refetchQueries: [
      "getMwcFlowByFlowId",
      "getMwcFlowsByContractId",
      "getMwcAverageProduction",
    ],
    awaitRefetchQueries: true,
  });

  const [deleteMwcFlowMutation] = useDeleteMwcFlowMutation({
    refetchQueries: [
      "getMwcFlowByFlowId",
      "getMwcFlowsByContractId",
      "getMwcAverageProduction",
    ],
    awaitRefetchQueries: true,
  });

  const handleReset = () => {
    if (initialValues) {
      form.reset(initialValues);
    } else form.reset();
  };

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    setShowConfirmation(false);
    setSelectedFlow(true);
    setSelectedFlowId("");

    try {
      onRemove();
      await deleteMwcFlowMutation({
        variables: {
          deleteMwcFlowId:
            data?.flow?.data?.attributes?.mwcFlow?.data?.id ?? "",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du flux:", error);
    }
  };

  function popupMessage() {
    try {
      setMessage("Sauvegarde réussie !");
      setShowMessage(true);
    } catch (error) {
      setMessage("Une erreur s'est produite lors de la sauvegarde.");
      setShowMessage(true);
    }
  }
  function handleSave(submitData: FieldValues) {
    const blocks = submitData.blocks?.map((block: { id?: string }) => {
      delete block.id;
      return { ...block };
    });

    try {
      if (mappedData) {
        updateMwcFlowMutation({
          variables: {
            data: {
              weightSystem: submitData.weightSystem,
              averageProductionPerson: submitData.averageProductionPerson,
              blocks: blocks,
            },
            updateMwcFlowId:
              data?.flow?.data?.attributes?.mwcFlow?.data?.id ?? "",
          },
        }).then(() => setIsCancelBtnHidden(true));
        popupMessage();
      } else if (!mappedData) {
        setSelectedFlowId("");
        setSelectedFlow(true);

        createMwcFlowMutation({
          variables: {
            data: {
              weightSystem: submitData.weightSystem,
              averageProductionPerson: submitData.averageProductionPerson,
              flow: flowIdName?.id,
              mwCounterService: dataMwcService?.mwCounterServices?.data[0].id,
              blocks: blocks,
            },
          },
        }).then(() => setIsCancelBtnHidden(true));
        popupMessage();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [form, initialValues]);

  useEffect(() => {
    if (isDirty) setIsCancelBtnHidden(false);
  }, [isDirty]);

  useEffect(() => {
    if (data) {
      const mwcFlow = data?.flow?.data?.attributes?.mwcFlow?.data;
      if (mwcFlow && mwcFlow.id && mwcFlow.attributes) {
        const mappedData: IFlowStaticFields = {
          id: mwcFlow.id,
          name: mwcFlow.attributes.flow?.data?.attributes?.name ?? "",
          weightSystem:
            mwcFlow.attributes.weightSystem ??
            Enum_Mwcflow_Weightsystem.Dynamic,
          averageProductionPerson: mwcFlow.attributes.averageProductionPerson,
          blocks: remapFormBlocksDynamicZone(mwcFlow.attributes.blocks),
        };
        setMappedData(mappedData);
        setInitialValues(mappedData);

        setValue("averageProductionPerson", mappedData.averageProductionPerson);
        setValue("weightSystem", mappedData.weightSystem);
        setValue("blocks", mappedData.blocks);
      }
    }
  }, [data, setValue]);

  return (
    <FormProvider {...form}>
      {showConfirmation && <div className="c-Flow__OverlayPopin"></div>}
      <form
        className="c-Flow__Form"
        onSubmit={handleSubmit(handleSave)}
        ref={useFocusFirstElement()}
      >
        <div className="c-Flow__ListFlows" key={data?.flow?.data?.id}>
          <div className="c-Flow__ListFlowsHead">
            <h3>{flowIdName?.name ?? flow?.name}</h3>
            <div className="c-Flow__ListFlowsHeadButtons">
              <CommonButton
                type="button"
                label={buttonLabels.removeFlow}
                style="secondary"
                onClick={handleRemove}
              />
              {isDirty && (
                <CommonButton
                  type="button"
                  label="Annuler"
                  style="secondary"
                  onClick={handleReset}
                />
              )}

              <CommonButton
                type="submit"
                label={!mappedData ? buttonLabels.saveFlow : "Enregistrer"}
                style="primary"
                isDisabled={!isDirty}
              />
            </div>
          </div>
          <div className="c-Flow__ListFlowsInputs">
            <div className="c-Flow__ListFlowsField">
              <FormInput
                min="0"
                type="number"
                name="averageProductionPerson"
                label="Production moyenne par habitant"
                isRequired
              />
              <span className="c-Flow__ListFlowsUnity"> en kg/mois</span>
            </div>
            <div className="c-Flow__ListFlowsField">
              <FormSelect<string>
                name="weightSystem"
                label="Système de pesée"
                options={weighingSystemOptions}
                isRequired
              />
            </div>
          </div>

          <div className="c-Flow__ListFlowsMedia">
            <h3>Ajouter un contenu associé à ce flux</h3>
            <p>
              Ce contenu additionnel sera présenté en regard de la part de
              production de déchet de ce flux
            </p>
            <div className="c-Flow__ListFlowsMediaContent">
              <FormDynamicBlocks
                name={"blocks"}
                blockConfigurations={dynamicFieldConfigurations}
              />
            </div>
          </div>
        </div>
      </form>{" "}
      {showConfirmation && (
        <div className="c-Flow__ConfirmationPopin">
          <p>Voulez-vous vraiment retirer ce flux ?</p>
          <div className="c-Flow__ConfirmationButtons">
            <CommonButton
              type="button"
              style="secondary"
              label="Annuler"
              onClick={() => setShowConfirmation(false)}
            />
            <CommonButton
              type="submit"
              style="primary"
              label="Confirmer"
              onClick={confirmRemove}
            />
          </div>
        </div>
      )}{" "}
      {showMessage && (
        <div className="c-Flow__ConfirmationMessage  c-Flow_showPopin">
          {message}
        </div>
      )}
    </FormProvider>
  );
}

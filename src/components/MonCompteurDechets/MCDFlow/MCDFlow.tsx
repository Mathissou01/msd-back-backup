// TODO: all comments concerns the db when it's ready
import React, { useEffect, useState } from "react";
// import { useGetFlowsByContractIdQuery } from "../../../graphql/codegen/generated-types";
import {
  useForm,
  FormProvider,
  FieldValues,
  Controller,
} from "react-hook-form";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
// import { useContract } from "../../../hooks/useContract";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";
import "./MCD-flow.scss";

interface IFlow {
  flowName: string;
  systemPesee: string;
}

interface IFlowProps {
  dynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
  // onSubmitValid: (data: FieldValues) => void;
}

export default function Flow({ dynamicFieldConfigurations }: IFlowProps) {
  // Static data
  const buttonLabels = {
    save: "Enregistrer les modifications",
    cancel: "Annuler les modifications",
    removeFlow: "Retirer ce flux",
  };

  // const [flowData, setFlowData] = useState<IFlow[]>([]);
  const [flowData, setFlowData] = useState<IFlow[]>([
    { flowName: "Ordure Ménagère", systemPesee: "Pesée à l'exutoire" },
    { flowName: "Collecte Sélective", systemPesee: "Pesée dynamique des bacs" },
  ]);
  // This bool is created to check if user selected a flow (Associer un (autre) flux)
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const form = useForm({
    mode: "onChange",
  });

  const { control, handleSubmit, watch, register, setValue } = form;

  const selectedFlow = watch("flowSelect");
  const [selectedFlows, setSelectedFlows] = useState<
    { id: number; flow: IFlow }[]
  >([]);

  const [idCounter, setIdCounter] = useState(0);

  const onSubmit = (data: FieldValues) => {
    // Filter empty data (bloc media)
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (key.startsWith("contentBlock_")) {
          return value.length > 0; // Exclude empty arrays
        }
        return value !== "" && value !== null; // Exclude null and empty values
      }),
    );

    console.log("Valeur sélectionnée : ", filteredData, setFlowData);
  };

  // const { contractId } = useContract();
  // const { data } = useGetFlowsByContractIdQuery({
  //   variables: {
  //     filters: {
  //       contract: {
  //         id: {
  //           eq: contractId,
  //         },
  //       },
  //     },
  //   },
  // });
  const removeFlow = (id: number) => {
    setSelectedFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== id));

    setValue(`prodMoyenne_${id}`, "");
    setValue(`systemPesee_${id}`, null);
  };

  const removeAllFlows = () => {
    selectedFlows.forEach((flow) => {
      setValue(`prodMoyenne_${flow.id}`, "");
      setValue(`systemPesee_${flow.id}`, null);
    });
    setSelectedFlows([]);
  };
  useEffect(() => {
    if (selectedFlow) {
      setIsSelected(true);
      // Copy values of the selected bloc in an empty array
      const newFlow = {
        flowName: selectedFlow.flowName,
        systemPesee: selectedFlow.systemPesee,
      };

      setSelectedFlows((prevFlows) => [
        ...prevFlows,
        { id: idCounter, flow: newFlow },
      ]);
      setIdCounter((prevCounter) => prevCounter + 1);
      setValue("flowSelect", null);
    }
  }, [selectedFlow, setValue, idCounter]);

  // useEffect(() => {
  //   if (data?.flows && data.flows?.data) {
  //     const mappedFlows: IFlow[] = data.flows.data.map((flow) => ({
  //       name: flow.attributes?.name || "",
  //       code: flow.attributes?.code || "",
  //     }));
  //     setFlowData(mappedFlows);
  //   }
  // }, [data]);

  return (
    <div className="c-Flow">
      <h2 className="c-Flow__Title">
        Liste des flux pris en compte dans le compteur de déchets
      </h2>
      <div className="c-Flow__Wrapper">
        <CommonLoader isLoading={false}>
          <FormProvider {...form}>
            <form
              className="c-Flow__Form"
              onSubmit={handleSubmit(onSubmit)}
              ref={useFocusFirstElement()}
            >
              {selectedFlows.map((flow, index) => (
                <div className="c-Flow__ListFlows" key={flow.id}>
                  <div className="c-Flow__ListFlowsHead">
                    <h3>
                      Flux {index === 0 ? 1 : 2}:{" "}
                      {flow.flow && flow.flow.flowName}
                    </h3>

                    <CommonButton
                      type="button"
                      label={buttonLabels.removeFlow}
                      style="secondary"
                      onClick={() => removeFlow(flow.id)}
                    />
                  </div>
                  <div className="c-Flow__ListFlowsInputs">
                    <div className="c-Flow__ListFlowsField">
                      <Controller
                        control={control}
                        defaultValue=""
                        {...register(`prodMoyenne_${flow.id}`)}
                        rules={{
                          required: "La production moyenne est obligatoire",
                          validate: (val) =>
                            val.trim().length > 0 ||
                            "La production moyenne est obligatoire",
                        }}
                        render={({ field }) => (
                          <FormInput
                            {...field}
                            type="text"
                            label="Production moyenne par habitant *"
                          />
                        )}
                      />
                      <span className="c-Flow__ListFlowsUnity">
                        {" "}
                        en kg/mois
                      </span>
                    </div>
                    <div className="c-Flow__ListFlowsField">
                      <Controller
                        control={control}
                        defaultValue={
                          flowData?.find((n) => n?.systemPesee) || ""
                        }
                        {...register(`systemPesee_${flow.id}`)}
                        rules={{
                          required: "Le système de pesée est obligatoire",
                          validate: (val) =>
                            val || "La production moyenne est obligatoire",
                        }}
                        render={({ field }) => (
                          <FormSelect<IFlow>
                            {...field}
                            label="Système de pesée *"
                            displayTransform={(value) => value.systemPesee}
                            options={flowData.map((flow) => ({
                              option: flow,
                            }))}
                            optionKey={"systemPesee"}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="c-Flow__ListFlowsMedia">
                    <h3>Ajouter un contenu associé à ce flux</h3>
                    <p>
                      Ce contenu additionnel sera présenté en regard de la part
                      de production de déchet de ce flux
                    </p>
                    <div className="c-Flow__ListFlowsMediaContent">
                      <FormDynamicBlocks
                        key={flow.id}
                        name={`contentBlock_${flow.id}`}
                        blockConfigurations={dynamicFieldConfigurations}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {selectedFlows.length <= 1 && (
                <div className="c-Flow__Options">
                  {flowData && flowData.length > 0 && (
                    <FormSelect<IFlow>
                      label={`Associer un ${
                        isSelected && selectedFlows.length >= 1 ? "autre" : ""
                      } flux`}
                      displayTransform={(value) => value.flowName}
                      options={flowData.map((flow) => ({
                        option: flow,
                      }))}
                      optionKey={"flowName"}
                      defaultValue={flowData?.find((n) => n?.flowName)}
                      {...register("flowSelect")}
                    />
                  )}
                </div>
              )}

              <div className="c-Flow__Buttons">
                <div className="c-Flow__ButtonsSave">
                  <CommonButton
                    label={buttonLabels.cancel}
                    picto="cross"
                    onClick={removeAllFlows}
                  />
                  <CommonButton
                    type="submit"
                    label={buttonLabels.save}
                    picto="check"
                    style="primary"
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </CommonLoader>
      </div>
    </div>
  );
}

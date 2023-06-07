import React, { useEffect, useState } from "react";
// import { useGetFlowsByContractIdQuery } from "../../../graphql/codegen/generated-types";
import {
  useForm,
  FormProvider,
  FieldValues,
  Controller,
} from "react-hook-form";
import { TDynamicFieldOption } from "../../../lib/dynamic-blocks";
// import { useContract } from "../../../hooks/useContract";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";
import "./flow.scss";

interface IFlow {
  name: string;
  systemPesee: string;
}

interface IFlowProps {
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  // onSubmitValid: (data: FieldValues) => void;
}
export default function Flow({ dynamicFieldsOptions }: IFlowProps) {
  // Static data
  const buttonLabels = {
    save: "Enregistrer les modifications",
    cancel: "Annuler les modifications",
    removeFlow: "Retirer ce flux",
  };
  // const [flowData, setFlowData] = useState<IFlow[]>([]);
  const [flowData, setFlowData] = useState<IFlow[]>([
    { name: "Ordure Ménagère", systemPesee: "Pesée à l'exutoire" },
    { name: "Collecte Sélective", systemPesee: "Pesée dynamique des bacs" },
  ]);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const form = useForm({
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    // formState: { errors },
  } = form;

  const selectedFlow = watch("flowSelect");
  const [selectedFlows, setSelectedFlows] = useState<
    { id: number; flow: IFlow }[]
  >([]);

  const onSubmit = (data: FieldValues) => {
    // I added setFlowData to the console.log to avoid the error in the lint :
    // 41:20  warning  'setFlowData' is assigned a value but never used
    console.log("Valeur sélectionnée : ", data, setFlowData);
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
  };
  useEffect(() => {
    if (selectedFlow) {
      setIsSelected(true);
      setSelectedFlows((prevFlows) => [
        ...prevFlows,
        { id: prevFlows.length, flow: selectedFlow },
      ]);
      setValue("flowSelect", null);
    }
  }, [selectedFlow, setValue]);

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
              {selectedFlows.map((flow) => (
                <div className="c-Flow__ListFlows" key={flow.id}>
                  <div className="c-Flow__ListFlows_head">
                    <h3>
                      Flux {flow.id + 1}: {flow.flow && flow.flow.name}
                    </h3>
                    <CommonButton
                      type="button"
                      label={buttonLabels.removeFlow}
                      style="secondary"
                      onClick={() => removeFlow(flow.id)}
                    />
                  </div>
                  <div className="c-Flow__ListFlows_inputs">
                    <div className="c-Flow__ListFlows_field">
                      <Controller
                        control={control}
                        defaultValue=""
                        {...register(`ProdMoyenne_${flow.id}`)}
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
                      <span className="c-Flow__ListFlows_unity">
                        {" "}
                        en kg/mois
                      </span>
                    </div>
                    <div className="c-Flow__ListFlows_field">
                      <Controller
                        control={control}
                        defaultValue={
                          flowData?.find((n) => n?.systemPesee) || ""
                        }
                        {...register(`flowPesee_${flow.id}`)}
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

                  <div className="c-Flow__ListFlows_media">
                    <h3>Ajouter un contenu associé à ce flux</h3>
                    <p>
                      Ce contenu additionnel sera présenté en regard de la part
                      de production de déchet de ce flux
                    </p>
                    <div className="c-Flow__ListFlows_mediaContent">
                      <FormDynamicBlocks
                        key={flow.id}
                        name={`contentBlock_${flow.id}`}
                        blockOptions={dynamicFieldsOptions}
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
                      displayTransform={(value) => value.name}
                      options={flowData.map((flow) => ({
                        option: flow,
                      }))}
                      // options={flowData.map((flow) => ({
                      //   option: flow,
                      // }))}
                      optionKey={"name"}
                      defaultValue={flowData?.find((n) => n?.name)}
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
                    onClick={() => {
                      setSelectedFlows([]);
                      setIsSelected(false);
                      // reset();
                    }}
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

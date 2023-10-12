import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  Enum_Flow_Recyclinggesture,
  FlowColorEntity,
  useGetCollectionMethodsQuery,
  useGetFlowColorsQuery,
} from "../../../graphql/codegen/generated-types";
import { IFlow, cleanCollectionMethods } from "../../../lib/flows";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormInput from "../../Form/FormInput/FormInput";
import FormLabel from "../../Form/FormLabel/FormLabel";
import { mapOptionsInWrappers } from "../../Form/FormMultiselect/FormMultiselect";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import "./flow-modal.scss";

interface IFlowModalProps {
  onSubmitValid: (data: FieldValues) => void;
  flow: IFlow;
  handleCloseModal: () => void;
}

export default function FlowModal({
  onSubmitValid,
  handleCloseModal,
  flow: {
    id,
    name,
    recyclingGesture,
    color,
    code,
    collectDoorToDoors,
    collectDropOffs,
    collectVoluntaries,
  },
}: IFlowModalProps) {
  /* Static Data */
  const formLabels = {
    title: "Personnaliser le flux",
    name: "Nom du flux",
    recyclingGesture: "Geste de tri",
    color: "Couleur",
    customColor: "Personnalisée",
    hexagonalCode: "Code Hexadécimal",
    collectionMethods: "Modalités de collecte",
  };
  const collectDropOffLabels = {
    collectDoorToDoors: "Porte à porte",
    collectDropOffs: "Lieux de dépot",
    collectVoluntaries: "Point d'apport volontaire",
  };
  const collectionMethodsName = {
    collectDoorToDoors: "Collecte porte à porte",
    collectDropOffs: "Collecte lieux de dépot",
    collectVoluntaries: "Collecte point d'apport volontaire",
  };
  const buttonLabels = {
    save: "Enregistrer",
    cancel: "Annuler",
  };
  const { contractId } = useContract();
  /* Methods */
  function getOptions(data: Array<FlowColorEntity>) {
    return mapOptionsInWrappers<FlowColorEntity>(data);
  }

  function colorDisplayTransformFunction(item: FlowColorEntity): string {
    return item.attributes?.name ?? "";
  }

  /* Local Data */
  const form = useForm({
    mode: "onChange",
  });
  const { handleSubmit, watch } = form;

  const { data: dataColors } = useGetFlowColorsQuery({
    fetchPolicy: "network-only",
    variables: {
      contractId,
    },
  });
  const { data: collectionMethods } = useGetCollectionMethodsQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "network-only",
  });

  if (!dataColors?.flowColors) {
    return <></>;
  }

  return (
    <FormProvider {...form}>
      <form
        className="c-FlowModal"
        onSubmit={handleSubmit((formData: FieldValues) =>
          onSubmitValid({ ...formData, id }),
        )}
      >
        <div className="c-FlowModal__Container">
          <div className="c-FlowModal__InformationsTitle">
            {formLabels.title}
          </div>
          <div className="c-FlowModal__FlowName">
            <FormInput
              type="text"
              name="name"
              label={formLabels.name}
              defaultValue={name}
              isRequired
            />
          </div>
          <div className="c-FlowModal__RecyclingGesture"></div>
          <FormRadioInput
            name="recyclingGesture"
            displayName={formLabels.recyclingGesture}
            defaultValue={recyclingGesture}
            options={[
              { label: "A trier", value: Enum_Flow_Recyclinggesture.ToSort },
              { label: "A jeter", value: Enum_Flow_Recyclinggesture.ToTrash },
              {
                label: "Poubelle interdite",
                value: Enum_Flow_Recyclinggesture.NoTrash,
              },
            ]}
          />
          <div className="c-FlowModal__ColorAndHexagonalCode">
            <div className="c-FlowModal__Color">
              <FormSelect<FlowColorEntity>
                name="color"
                label={formLabels.color}
                displayTransform={colorDisplayTransformFunction}
                options={getOptions(dataColors?.flowColors?.data ?? [])}
                optionKey={"id"}
                defaultValue={
                  dataColors?.flowColors?.data.find(
                    (dataColor) => dataColor.id === color,
                  ) ?? undefined
                }
              />
            </div>
            <div
              className="c-FlowModal__HexagonalCode"
              style={{
                display:
                  form.getValues().color?.attributes?.name ===
                  formLabels.customColor
                    ? "block"
                    : "none",
              }}
            >
              <FormInput
                type="text"
                name="code"
                label={formLabels.hexagonalCode}
                defaultValue={code ?? ""}
              />
            </div>
            <div
              className="c-FlowModal__HexagonalCode"
              style={{
                display:
                  form.getValues().color?.attributes?.name !==
                  formLabels.customColor
                    ? "block"
                    : "none",
              }}
            >
              <FormInput
                type="text"
                name="hexaCode"
                label={formLabels.hexagonalCode}
                placeholder={form.getValues().color?.attributes?.hexaCode}
                isDisabled
              />
            </div>

            <div
              className="c-FlowModal__VisualHexagonalCode"
              style={{
                backgroundColor:
                  form.getValues().color?.attributes?.name ===
                  formLabels.customColor
                    ? watch("code")
                    : watch("color")?.attributes?.hexaCode,
              }}
            ></div>
          </div>

          <FormLabel label={formLabels.collectionMethods} />
          <div className="c-FlowModal__CollectionMethods">
            <div className="c-FlowModal__CollectionMethodsChoices">
              <FormCheckbox
                name="collectDoorToDoors"
                label={collectDropOffLabels.collectDoorToDoors}
                defaultChecked={collectDoorToDoors.length > 0}
              />
              <FormCheckbox
                name="collectDropOffs"
                label={collectDropOffLabels.collectDropOffs}
                defaultChecked={collectDropOffs.length > 0}
              />
              <FormCheckbox
                name="collectVoluntaries"
                label={collectDropOffLabels.collectVoluntaries}
                defaultChecked={collectVoluntaries.length > 0}
              />
            </div>

            {(form.getValues().collectDoorToDoors ||
              form.getValues().collectDropOffs ||
              form.getValues().collectVoluntaries) && (
              <div className="c-FlowModal__CollectionMethodsDetails">
                {form.getValues().collectDoorToDoors && (
                  <>
                    <FormLabel
                      label={collectionMethodsName.collectDoorToDoors}
                    />
                    <div className="c-FlowModal__CollectionMethodsDetailsDoorToDoor">
                      {cleanCollectionMethods(
                        collectionMethods?.collectDoorToDoors?.data ?? [],
                      ).map((doorToDoorCollectionMethod) => (
                        <FormCheckbox
                          key={doorToDoorCollectionMethod.id}
                          name={"doorToDoor/" + doorToDoorCollectionMethod.id}
                          label={doorToDoorCollectionMethod.name}
                          defaultChecked={
                            !!collectDoorToDoors.find(
                              (collectionMethod) =>
                                collectionMethod.id ===
                                doorToDoorCollectionMethod.id,
                            )
                          }
                        />
                      ))}
                    </div>
                  </>
                )}

                {form.getValues().collectDropOffs && (
                  <>
                    <FormLabel label={collectionMethodsName.collectDropOffs} />
                    <div className="c-FlowModal__CollectionMethodsDetailsCollectDropOff">
                      {cleanCollectionMethods(
                        collectionMethods?.collectDropOffs?.data ?? [],
                      ).map((collectDropOffCollectionMethod) => (
                        <FormCheckbox
                          key={collectDropOffCollectionMethod.id}
                          name={
                            "collectDropOffs/" +
                            collectDropOffCollectionMethod.id
                          }
                          label={collectDropOffCollectionMethod.name}
                          defaultChecked={
                            !!collectDropOffs.find(
                              (collectionMethod) =>
                                collectionMethod.id ===
                                collectDropOffCollectionMethod.id,
                            )
                          }
                        />
                      ))}
                    </div>
                  </>
                )}

                {form.getValues().collectVoluntaries && (
                  <>
                    <FormLabel
                      label={collectionMethodsName.collectVoluntaries}
                    />
                    <div className="c-FlowModal__CollectionMethodsDetailsCollectVoluntaries">
                      {cleanCollectionMethods(
                        collectionMethods?.collectVoluntaries?.data ?? [],
                      ).map((collectVoluntariesCollectionMethod) => (
                        <FormCheckbox
                          key={collectVoluntariesCollectionMethod.id}
                          name={
                            "collectVoluntaries/" +
                            collectVoluntariesCollectionMethod.id
                          }
                          label={collectVoluntariesCollectionMethod.name}
                          defaultChecked={
                            !!collectVoluntaries.find(
                              (collectionMethod) =>
                                collectionMethod.id ===
                                collectVoluntariesCollectionMethod.id,
                            )
                          }
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="c-FlowModal__Buttons">
          <div className="c-FlowModal__ButtonsSave">
            <CommonButton
              type="submit"
              label={buttonLabels.save}
              picto="check"
              style="primary"
            />
            <CommonButton
              label={buttonLabels.cancel}
              picto="cross"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

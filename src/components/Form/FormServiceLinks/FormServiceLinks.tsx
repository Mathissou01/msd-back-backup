import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { Flipper, Flipped } from "react-flip-toolkit";
import React, { createRef, ReactNode, useRef } from "react";
import Image from "next/image";
import { IPicto, IServiceLink } from "../../../lib/service-links";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import FormServiceLinksRow from "./FormServiceLinksRow/FormServiceLinksRow";
import FormModal from "../FormModal/FormModal";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormInput from "../FormInput/FormInput";
import FormModalButtonInput from "../FormModalButtonInput/FormModalButtonInput";
import "./form-service-links.scss";

interface IFormServiceLinksProps {
  name: string;
  label: string;
  secondaryLabel?: string;
  isDisabled?: boolean;
}

export default function FormServiceLinks({
  name,
  label,
  secondaryLabel,
  isDisabled,
}: IFormServiceLinksProps) {
  /* Static Data */
  const formLabels = {
    modalTitle: "Menu",
    linkLabel: "Texte du lien",
    pictoLabel: "Picto",
    pictoButton: "Choisir un autre picto",
  };
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Methods */
  function getEditButtonRef(i: number) {
    editButtonRefs.current[i] = createRef();
    return editButtonRefs.current[i];
  }

  function getRef(i: number) {
    childRefs.current[i] = createRef();
    return childRefs.current[i];
  }

  function onEdit(i: number) {
    childRefs.current[i].current?.toggleModal(true);
  }

  function onToggleDisplay(i: number) {
    const updatedServiceLink: IServiceLink = {
      ...values[i],
      isDisplayed: !values[i].isDisplayed,
    };
    setValue(
      name,
      [...values.slice(0, i), updatedServiceLink, ...values.slice(i + 1)],
      { shouldDirty: true },
    );
  }

  function onReorder(i: number, shift: number) {
    const updatedValues = [...values];
    updatedValues.splice(i + shift, 0, updatedValues.splice(i, 1)[0]);
    setValue(name, updatedValues, { shouldDirty: true });
  }

  function onModalClose(i: number) {
    editButtonRefs.current[i].current?.focus();
  }

  function onModalSubmit(
    content: { [key: string]: Partial<IServiceLink> },
    modalName: string,
    i: number,
  ) {
    const updatedServiceLink: IServiceLink = {
      ...values[i],
      name: content[modalName].name ?? "",
      picto: content[modalName].picto ?? null,
    };
    setValue(
      name,
      [...values.slice(0, i), updatedServiceLink, ...values.slice(i + 1)],
      { shouldDirty: true },
    );
  }

  function modalPictoDisplayTransformFunction(
    picto: Partial<IPicto>,
  ): ReactNode {
    return (
      <Image
        src={picto.data?.attributes.url ?? "/images/pictos/default.svg"}
        alt=""
        width={24}
        height={24}
      />
    );
  }

  function onPictoModalSubmit(
    submitData: { [key: string]: Partial<IPicto> },
    name: string,
  ) {
    // TODO: implement media server, set picto object to be sent in mutation here
    console.log(submitData, name);
    // const contents = Object.values(submitData)?.filter(removeNulls);
    // setValue(name, contents, { shouldDirty: true });
  }

  /* Local Data */
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext();
  register(name, {
    required: { value: true, message: errorMessages.required },
  });
  const values: Array<IServiceLink> = watch(name, []);
  const editButtonRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([]);
  const childRefs = useRef<Array<React.RefObject<CommonModalWrapperRef>>>([]);

  return (
    <>
      <div
        className={classNames("c-FormServiceLinks", {
          "c-FormServiceLinks_disabled": isDisabled || isSubmitting,
        })}
      >
        <FormLabel forId={name} label={label} secondaryLabel={secondaryLabel} />
        {values && values.length > 0 && (
          <Flipper
            className="c-FormServiceLinks__List"
            flipKey={values}
            element="ul"
          >
            {values.map((link, index) => (
              <div key={`${link.type}_${link.name}`}>
                <Flipped flipId={`${link.type}_${link.name}`}>
                  <li
                    className={classNames("c-FormServiceLinks__Row", {
                      "c-FormServiceLinks__Row_disabled": !link.isDisplayed,
                    })}
                  >
                    <FormServiceLinksRow
                      serviceLink={link}
                      isUpDisabled={index <= 0}
                      isDownDisabled={index + 1 >= values.length}
                      onEdit={() => onEdit(index)}
                      onToggleDisplay={() => onToggleDisplay(index)}
                      onReorder={(shift) => onReorder(index, shift)}
                      buttonRef={getEditButtonRef(index)}
                    />
                  </li>
                </Flipped>
                <FormModal<IServiceLink>
                  modalRef={getRef(index)}
                  modalTitle={formLabels.modalTitle}
                  modalSubtitle={link.name}
                  hasRequiredChildren={"all"}
                  onClose={() => onModalClose(index)}
                  onSubmit={(data) =>
                    onModalSubmit(data, `modal_${index}`, index)
                  }
                >
                  <FormInput
                    type="text"
                    name={`modal_${index}.name`}
                    label={formLabels.linkLabel}
                    isRequired={true}
                    defaultValue={link.name}
                  />
                  <FormModalButtonInput<IPicto>
                    name={`modal_${index}.picto`}
                    label={formLabels.pictoLabel}
                    buttonLabel={formLabels.pictoButton}
                    isStyleRow={true}
                    displayTransform={modalPictoDisplayTransformFunction}
                    defaultValue={link.picto}
                    isRequired={true}
                    modalTitle={"WIP MEDIA SERVER"}
                    onModalSubmit={(data) =>
                      onPictoModalSubmit(data, `modal_${index}.picto`)
                    }
                  >
                    <span>WIP MEDIA SERVER</span>
                  </FormModalButtonInput>
                </FormModal>
              </div>
            ))}
          </Flipper>
        )}
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <CommonErrorText message={message} errorId={`${name}_error`} />
          )}
        />
      </div>
    </>
  );
}

import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, ReactNode, useRef } from "react";
import Image from "next/image";
import { IPicto, IServiceLink } from "../../../../../../lib/service-links";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import FormModal from "../../../../../Form/FormModal/FormModal";
import FormInput from "../../../../../Form/FormInput/FormInput";
import FormModalButtonInput from "../../../../../Form/FormModalButtonInput/FormModalButtonInput";
import "./services-tab-add-button.scss";

interface IServicesTabAddButtonProps {
  onSubmit: (data: FieldValues) => void;
}

export default function ServicesTabAddButton({
  onSubmit,
}: IServicesTabAddButtonProps) {
  /* Static Data */
  const modalLabels = {
    buttonLabel: "Ajouter un service personnalisé",
    title: "Encart service personnalisé",
    nameLabel: "Texte du bouton",
    externalLinkLabel: "Lien vers le service",
    pictoLabel: "Picto",
    pictoButtonLabel: "Choisir un autre picto",
  };

  /* Method */
  function onAddButtonClick() {
    modalRef.current.current?.toggleModal(true);
  }

  function onModalClose() {
    //
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

  function onPictoModalSubmit(submitData: { [key: string]: Partial<IPicto> }) {
    // TODO: implement media server, set picto object to be sent in mutation here
    console.log(submitData);
    // const contents = Object.values(submitData)?.filter(removeNulls);
    // setValue(name, contents, { shouldDirty: true });
  }

  function onModalSubmit(data: FieldValues) {
    onSubmit(data);
  }

  /* Local Data */
  const modalRef = useRef<React.RefObject<CommonModalWrapperRef>>(createRef());

  return (
    <div className="c-ServicesTabAddButton">
      <CommonButton
        label={modalLabels.buttonLabel}
        picto="plus"
        onClick={onAddButtonClick}
      />
      <FormModal<IServiceLink>
        modalRef={modalRef.current}
        modalTitle={modalLabels.title}
        hasRequiredChildren={"all"}
        onClose={() => onModalClose()}
        onSubmit={(data) => onModalSubmit(data)}
      >
        <FormInput
          type="text"
          name="createModal.name"
          label={modalLabels.nameLabel}
          isRequired={true}
        />
        <FormInput
          type="text"
          name="createModal.externalLink"
          label={modalLabels.externalLinkLabel}
          isRequired={true}
        />
        <FormModalButtonInput<IPicto>
          name="createModal.picto"
          label={modalLabels.pictoLabel}
          buttonLabel={modalLabels.pictoButtonLabel}
          isStyleRow={true}
          displayTransform={modalPictoDisplayTransformFunction}
          isRequired={true}
          // TODO: remove or give real default value
          defaultValue={{}}
          modalTitle={"WIP MEDIA SERVER"}
          onModalSubmit={(data) => onPictoModalSubmit(data)}
        >
          <span>WIP MEDIA SERVER</span>
        </FormModalButtonInput>
      </FormModal>
    </div>
  );
}

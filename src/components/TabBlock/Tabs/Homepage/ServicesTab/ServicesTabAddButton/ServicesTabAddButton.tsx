import { Controller } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, ReactNode, useRef } from "react";
import Image from "next/image";
import { IServiceLink } from "../../../../../../lib/service-links";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import FormModal, {
  FormModalRef,
} from "../../../../../Form/FormModal/FormModal";
import FormInput from "../../../../../Form/FormInput/FormInput";
import FormModalButtonInput from "../../../../../Form/FormModalButtonInput/FormModalButtonInput";
import SelectingModalContent from "../../../../../Form/FormFileInput/FormFileInputModals/SelectingModal/SelectingModalContent/SelectingModalContent";
import { ILocalFile } from "../../../../../../lib/media";
import "./services-tab-add-button.scss";

interface ICreateModalFields {
  createModal_name: string;
  createModal_externalLink: string;
  createModal_picto: ILocalFile;
}

interface IPictoFields {
  picto_select: ILocalFile;
}

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
    pictoModal: {
      title: "Sélectionnez un picto",
      submitLabel: "Terminer",
    },
  };

  /* Method */
  function onAddButtonClick() {
    modalRef.current.current?.toggleModal(true);
  }

  function modalPictoDisplayTransformFunction(data?: ILocalFile): ReactNode {
    return (
      <Image
        src={data?.url ?? "/images/pictos/default.svg"}
        alt=""
        width={24}
        height={24}
      />
    );
  }

  function onPictoModalSubmit(submitData: IPictoFields) {
    return submitData.picto_select;
  }

  function onModalSubmit(data: FieldValues) {
    onSubmit(data);
  }

  /* Local Data */
  const formModalRef = useRef<
    React.RefObject<FormModalRef<ICreateModalFields>>
  >(createRef());
  const modalRef = useRef<React.RefObject<CommonModalWrapperRef>>(createRef());

  return (
    <div className="c-ServicesTabAddButton">
      <CommonButton
        label={modalLabels.buttonLabel}
        picto="plus"
        onClick={onAddButtonClick}
      />
      <FormModal<IServiceLink>
        parentRef={formModalRef.current}
        modalRef={modalRef.current}
        modalTitle={modalLabels.title}
        hasRequiredChildren={"all"}
        onSubmit={(data) => onModalSubmit(data)}
      >
        <FormInput
          type="text"
          name="createModal_name"
          label={modalLabels.nameLabel}
          isRequired={true}
        />
        <FormInput
          type="text"
          name="createModal_externalLink"
          label={modalLabels.externalLinkLabel}
          isRequired={true}
        />
        <FormModalButtonInput<ILocalFile, IPictoFields>
          name="createModal_picto"
          label={modalLabels.pictoLabel}
          buttonLabel={modalLabels.pictoButtonLabel}
          isStyleRow={true}
          displayTransform={modalPictoDisplayTransformFunction}
          isRequired={true}
          modalTitle={modalLabels.pictoModal.title}
          onModalSubmit={(data) => onPictoModalSubmit(data)}
          modalButtonsStyle="flex"
          modalSubmitButtonLabel={modalLabels.pictoModal.submitLabel}
        >
          {/*/ TODO: TEMPORARY, SelectingModalContent or better CommonBibliothequeMedia should be refactored and we can make a Form Component that registers itself /*/}
          <Controller
            name="picto_select"
            rules={{
              required: { value: true, message: "test test" },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <SelectingModalContent
                    selectedFile={value}
                    setSelectedFile={onChange}
                  />
                </>
              );
            }}
          />
        </FormModalButtonInput>
      </FormModal>
    </div>
  );
}

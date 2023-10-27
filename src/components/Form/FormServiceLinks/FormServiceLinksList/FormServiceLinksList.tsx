import classNames from "classnames";
import React, { ReactNode } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { Controller } from "react-hook-form";
import { IServiceLink } from "../../../../lib/service-links";
import { ILocalFile } from "../../../../lib/media";
import { CommonModalWrapperRef } from "../../../Common/CommonModalWrapper/CommonModalWrapper";
import FormInput from "../../FormInput/FormInput";
import FormModal from "../../FormModal/FormModal";
import FormModalButtonInput from "../../FormModalButtonInput/FormModalButtonInput";
import FormServiceLinksRow from "../FormServiceLinksRow/FormServiceLinksRow";
import SelectingModalContent from "../../FormFileInput/FormFileInputModals/SelectingModal/SelectingModalContent/SelectingModalContent";
import "./form-service-links-list.scss";

interface IFormLabels {
  modalTitle: string;
  nameLabel: string;
  externalLinkLabel: string;
  pictoLabel: string;
  pictoButton: string;
}

interface IFormFlipperProps {
  values: Array<IServiceLink>;
  onEdit: (i: number) => void;
  onToggleDisplay: (i: number) => void;
  onReorder: (i: number, shift: number) => void;
  getEditButtonRef: (i: number) => React.RefObject<HTMLButtonElement>;
  getRef: (i: number) => React.RefObject<CommonModalWrapperRef>;
  formLabels: IFormLabels;
  onModalClose: (i: number) => void;
  onModalSubmit: (
    submitData: {
      [key: string]: Record<string, unknown>;
    },
    modalName: string,
    i: number,
  ) => void;
  modalPictoDisplayTransformFunction: (
    picto?: Partial<ILocalFile>,
  ) => ReactNode;
  onPictoModalSubmit: (
    submitData: {
      picto_select: ILocalFile;
    },
    modalName: string,
    i: number,
  ) => ILocalFile;
  isToggleDisplayDisabled?: boolean;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
}

export default function FormServiceLinksList({
  values,
  formLabels,
  onEdit,
  onToggleDisplay,
  onReorder,
  getEditButtonRef,
  getRef,
  onModalClose,
  onModalSubmit,
  modalPictoDisplayTransformFunction,
  onPictoModalSubmit,
  isToggleDisplayDisabled,
  isUpDisabled,
  isDownDisabled,
}: IFormFlipperProps) {
  /* Static Data */
  const modalLabels = {
    title: "Sélectionnez un picto",
  };

  return (
    <Flipper className="c-FormServiceLinksList" flipKey={values} element="ul">
      {values.map((link, index) => (
        <div key={`${link.type}_${link.name}_${index}`}>
          <Flipped flipId={`${link.type}_${index}`}>
            <li
              className={classNames("c-FormServiceLinksList__Row", {
                "c-FormServiceLinksList__Row_disabled": !link.isDisplayed,
              })}
            >
              <FormServiceLinksRow
                serviceLink={link}
                onEdit={() => onEdit(index)}
                onToggleDisplay={() => onToggleDisplay(index)}
                onReorder={(shift) => onReorder(index, shift)}
                buttonRef={getEditButtonRef(index)}
                isDisabled={!link.isDisplayed}
                isToggleDisplayDisabled={isToggleDisplayDisabled}
                isUpDisabled={index <= 0 || isUpDisabled}
                isDownDisabled={index + 1 >= values.length || isDownDisabled}
              />
            </li>
          </Flipped>
          <FormModal<{
            [key: string]: Record<string, unknown>;
          }>
            modalRef={getRef(index)}
            modalTitle={formLabels.modalTitle}
            modalSubtitle={link.name}
            hasRequiredChildren={"all"}
            onClose={() => onModalClose(index)}
            onSubmit={(data) => onModalSubmit(data, `modal_${index}`, index)}
          >
            <FormInput
              type="text"
              name={`modal_${index}.name`}
              label={formLabels.nameLabel}
              isRequired={true}
              defaultValue={link.name}
            />
            {link.type === "ComponentLinksExternal" && (
              <FormInput
                type="text"
                name={`modal_${index}.externalLink`}
                label={formLabels.externalLinkLabel}
                isRequired={true}
                defaultValue={link.externalLink}
              />
            )}
            <FormModalButtonInput<
              ILocalFile,
              {
                picto_select: ILocalFile;
              }
            >
              name={`modal_${index}.picto`}
              label={formLabels.pictoLabel}
              buttonLabel={formLabels.pictoButton}
              isStyleRow={true}
              displayTransform={modalPictoDisplayTransformFunction}
              defaultValue={link.picto}
              isRequired={true}
              modalTitle={modalLabels.title}
              onModalSubmit={(data) =>
                onPictoModalSubmit(data, `modal_${index}.picto`, index)
              }
            >
              {/*/ TODO: TEMPORARY, SelectingModalContent or better CommonBibliothequeMedia should be refactored and we can make a Form Component that registers itself /*/}
              <Controller
                name={`picto_select`}
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
      ))}
    </Flipper>
  );
}

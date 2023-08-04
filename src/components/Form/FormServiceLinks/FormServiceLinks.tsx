import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import React, {
  createRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { IServiceLink } from "../../../lib/service-links";
import { ILocalFile } from "../../../lib/media";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import FormLabel from "../FormLabel/FormLabel";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormServiceLinksList from "./FormServiceLinksList/FormServiceLinksList";
import "./form-service-links.scss";

interface IFormServiceLinksProps {
  name: string;
  label: string;
  secondaryLabel?: string;
  editModalTitle: string;
  editModalNameLabel: string;
  isDisabled?: boolean;
  isSortByIsDisplayed?: boolean;
  isSplitDisplay?: boolean;
  splitLabel?: string;
  splitSecondaryLabel?: string;
  maxLimitIsDisplayed?: number;
}

export default function FormServiceLinks({
  name,
  label,
  secondaryLabel,
  editModalTitle,
  editModalNameLabel,
  isDisabled,
  isSortByIsDisplayed,
  isSplitDisplay = false,
  splitLabel,
  splitSecondaryLabel,
  maxLimitIsDisplayed,
}: IFormServiceLinksProps) {
  /* Static Data */
  const formLabels = {
    modalTitle: editModalTitle,
    nameLabel: editModalNameLabel,
    externalLinkLabel: "Lien vers le service",
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

  function getOriginalIndex(i: number, filterBool: boolean) {
    const link = values.filter((value) =>
      filterBool ? value.isDisplayed : !value.isDisplayed,
    )[i];
    return values.findIndex((value) => value.localId === link.localId);
  }

  function onEdit(i: number) {
    childRefs.current[i].current?.toggleModal(true);
  }

  function onToggleDisplay(i: number, shiftToEnd = false) {
    const updatedServiceLink: IServiceLink = {
      ...values[i],
      isDisplayed: !values[i].isDisplayed,
    };
    setValue(
      name,
      shiftToEnd
        ? [...values.slice(0, i), ...values.slice(i + 1), updatedServiceLink]
        : [...values.slice(0, i), updatedServiceLink, ...values.slice(i + 1)],
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
      externalLink: content[modalName].externalLink ?? undefined,
      picto: content[modalName].picto ?? null,
    };
    setValue(
      name,
      [...values.slice(0, i), updatedServiceLink, ...values.slice(i + 1)],
      { shouldDirty: true },
    );
  }

  function modalPictoDisplayTransformFunction(
    picto: Partial<ILocalFile>,
  ): ReactNode {
    return (
      <Image
        src={picto?.url ?? "/images/pictos/default.svg"}
        alt=""
        width={24}
        height={24}
      />
    );
  }

  function onPictoModalSubmit(submitData: { picto_select: ILocalFile }) {
    return submitData.picto_select;
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
  const currentParentValues = watch(name);
  const [values, setValues] = useState<Array<IServiceLink>>([]);
  const [hasSixDisplayed, setSixDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setValues(
      isSortByIsDisplayed
        ? currentParentValues?.sort((a: IServiceLink, b: IServiceLink) => {
            if (a.isDisplayed && b.isDisplayed) {
              return 0;
            }
            if (a.isDisplayed && !b.isDisplayed) {
              return 1;
            }
            if (!a.isDisplayed && b.isDisplayed) {
              return -1;
            }
          })
        : currentParentValues,
    );
  }, [currentParentValues, isSortByIsDisplayed]);

  useEffect(() => {
    setSixDisplayed(values?.filter((value) => value.isDisplayed).length >= 6);
  }, [values]);

  useEffect(() => {
    setSixDisplayed(
      maxLimitIsDisplayed
        ? values?.filter((value) => value.isDisplayed).length >=
            maxLimitIsDisplayed
        : false,
    );
  }, [maxLimitIsDisplayed, values]);

  const editButtonRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([]);
  const childRefs = useRef<Array<React.RefObject<CommonModalWrapperRef>>>([]);

  return (
    <>
      <div
        className={classNames("c-FormServiceLinks", {
          "c-FormServiceLinks_disabled": isDisabled || isSubmitting,
        })}
      >
        <FormLabel label={label} secondaryLabel={secondaryLabel} />
        {!isSplitDisplay ? (
          <>
            {values && values.length > 0 && (
              <FormServiceLinksList
                values={values}
                onEdit={onEdit}
                onToggleDisplay={onToggleDisplay}
                onReorder={onReorder}
                getEditButtonRef={getEditButtonRef}
                getRef={getRef}
                formLabels={formLabels}
                onModalClose={onModalClose}
                onModalSubmit={onModalSubmit}
                modalPictoDisplayTransformFunction={
                  modalPictoDisplayTransformFunction
                }
                onPictoModalSubmit={onPictoModalSubmit}
              />
            )}
          </>
        ) : (
          <>
            {values?.filter((value) => value.isDisplayed)?.length > 0 && (
              <FormServiceLinksList
                values={values.filter((value) => value.isDisplayed)}
                onEdit={(i) => onEdit(getOriginalIndex(i, true))}
                onToggleDisplay={(i) =>
                  onToggleDisplay(getOriginalIndex(i, true), true)
                }
                onReorder={(i, shift) =>
                  onReorder(getOriginalIndex(i, true), shift)
                }
                getEditButtonRef={(i) =>
                  getEditButtonRef(getOriginalIndex(i, true))
                }
                getRef={(i) => getRef(getOriginalIndex(i, true))}
                formLabels={formLabels}
                onModalClose={(i) => onModalClose(getOriginalIndex(i, true))}
                onModalSubmit={(submitData, modalName, i) =>
                  onModalSubmit(
                    submitData,
                    modalName,
                    getOriginalIndex(i, true),
                  )
                }
                modalPictoDisplayTransformFunction={
                  modalPictoDisplayTransformFunction
                }
                onPictoModalSubmit={onPictoModalSubmit}
              />
            )}
            {values?.filter((value) => !value.isDisplayed)?.length > 0 && (
              <>
                <FormLabel label={splitLabel ?? ""} />
                {hasSixDisplayed && (
                  <span className="c-FormServiceLinks__SplitSecondaryLabel">
                    {splitSecondaryLabel}
                  </span>
                )}
                <FormServiceLinksList
                  values={values.filter((value) => !value.isDisplayed)}
                  onEdit={(i) => onEdit(getOriginalIndex(i, false))}
                  onToggleDisplay={(i) =>
                    onToggleDisplay(getOriginalIndex(i, false), true)
                  }
                  onReorder={(i, shift) =>
                    onReorder(getOriginalIndex(i, false), shift)
                  }
                  getEditButtonRef={(i) =>
                    getEditButtonRef(getOriginalIndex(i, false))
                  }
                  getRef={(i) => getRef(getOriginalIndex(i, false))}
                  formLabels={formLabels}
                  onModalClose={(i) => onModalClose(getOriginalIndex(i, false))}
                  onModalSubmit={(submitData, modalName, i) =>
                    onModalSubmit(
                      submitData,
                      modalName,
                      getOriginalIndex(i, false),
                    )
                  }
                  modalPictoDisplayTransformFunction={
                    modalPictoDisplayTransformFunction
                  }
                  onPictoModalSubmit={onPictoModalSubmit}
                  isToggleDisplayDisabled={hasSixDisplayed}
                  isUpDisabled={true}
                  isDownDisabled={true}
                />
              </>
            )}
          </>
        )}
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: { message: string }) => (
            <CommonFormErrorText message={message} errorId={`${name}_error`} />
          )}
        />
      </div>
    </>
  );
}

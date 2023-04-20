import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import "./sector-modal.scss";

interface ISectorModal {
  onSubmitValid: (data: FieldValues) => void;
  onSubmitAndModalRefresh: (data: FieldValues) => void;
  handleCloseModal: () => void;
}

export default function SectorModal({
  onSubmitValid,
  onSubmitAndModalRefresh,
  handleCloseModal,
}: ISectorModal) {
  /* Static Data */
  const formLabels = {
    title: "Créer un secteur",
    descritpion: "Description du secteur",
  };

  const buttonLabels = {
    save: "Enregistrer ce secteur",
    saveAndCreate: "Enregistrer et créer un autre secteur",
    cancel: "Annuler",
  };
  const maxCharacters = 30;

  /* Methods */

  /* Local Data */

  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className="c-SectorModal" onSubmit={handleSubmit(onSubmitValid)}>
        <div className="c-SectorModal__Informations">
          <div className="c-SectorModal__InformationsTitle">
            {formLabels.title}
          </div>
          <div className="c-SectorModal__InformationsSectorName">
            <FormInput
              type="text"
              name="name"
              label={formLabels.title}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-SectorModal__InformationsSectorDescription">
            <FormInput
              type="text"
              name="description"
              label={formLabels.descritpion}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-SectorModal__InformationsSectorListing"></div>
          <div className="c-SectorModal__InformationsButtons">
            <div className="c-SectorModal__InformationsSaveButton">
              <CommonButton
                type="submit"
                label={buttonLabels.save}
                picto="check"
                style="primary"
              />
            </div>
            <div className="c-SectorModal__InformationsSavAndCancel">
              <CommonButton
                type="button"
                label={buttonLabels.saveAndCreate}
                picto="add"
                style="primary"
                onClick={async () => {
                  await handleSubmit(onSubmitAndModalRefresh)();
                  form.reset();
                }}
              />

              <CommonButton
                label={buttonLabels.cancel}
                picto="cross"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
        <div className="c-SectorModal__Maps"></div>
      </form>
    </FormProvider>
  );
}

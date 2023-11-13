import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigation } from "../../hooks/useNavigation";
import {
  Enum_Yeswescanform_Picturestatus,
  GetYwsFormByIdDocument,
  useCreateYwsFormMutation,
  useUpdateYwsFormByIdMutation,
} from "../../graphql/codegen/generated-types";
import {
  fileSizeLimitationOptions,
  IUploadFileEntity,
  TAcceptedMimeTypes,
} from "../../lib/media";
import { useFocusFirstElement } from "../../hooks/useFocusFirstElement";
import FormFileInput from "../Form/FormFileInput/FormFileInput";
import FormInput from "../Form/FormInput/FormInput";
import FormSelect from "../Form/FormSelect/FormSelect";
import FormWysiwyg from "../Form/FormWysiwyg/FormWysiwyg";
import { minimalWysiwygEditorOptions } from "../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";
import FormRadioInput from "../Form/FormRadioInput/FormRadioInput";
import { IOptionWrapper } from "../Form/FormMultiselect/FormMultiselect";
import CommonButton from "../Common/CommonButton/CommonButton";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import YesWeScanReportingFormCheckboxes from "./YesWeScanReportingFormCheckboxes/YesWeScanReportingFormCheckboxes";
import { getRightsByLabel } from "../../lib/user";
import { useUser } from "../../hooks/useUser";

interface IYesWeScanReportingFormProps {
  ywsServiceId: string;
  ywsFormId: string;
  isCreateMode: boolean;
  mappedData: IYesWeScanFormFields | undefined;
}

export interface IYesWeScanFormFields {
  id: string;
  logo?: IUploadFileEntity | null;
  reportButtons?: string;
  pictureStatus?: Enum_Yeswescanform_Picturestatus;
  thankYouMessage?: string;
  displayEndingButton?: string;
  endingButtonIntroduction?: string;
  endingButtonLabel?: string;
  endingButtonLink?: string;
  hasEmail?: boolean;
  hasTsms?: boolean;
  mailRecipients?: string;
  checkboxes?: string;
}

export default function YesWeScanReportingForm({
  ywsServiceId,
  ywsFormId,
  isCreateMode,
  mappedData,
}: IYesWeScanReportingFormProps) {
  /* Static Data */
  const labels = {
    logo: {
      title: "Logo",
      validation: "Format .svg, .png ou .jpg, 200 ko maximum",
      placeholder:
        "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
    },
    reportingButtons: {
      title: "Bouton(s) de signalement à afficher",
      information:
        "Un ou plusieurs type de signalement séparés par un point-virgule. Ex : Ma corbeille est pleine ; Ma corbeille est sale ; Ma corbeille est cassée",
      errorMessage: "Merci de contrôler les boutons saisis",
    },
    photoStatus: {
      title: 'Statut du champ "Photo"',
      options: {
        hidden: "Masqué",
        facultative: "Facultatif",
        mandatory: "Obligatoire",
      },
    },
    thankYouMessage: "Message de remerciement",
    displayButton: {
      title: "Afficher un bouton",
      yes: "Oui",
      no: "Non",
      introductionPhrase: "Phrase introduisant le bouton",
      buttonLabel: "Libellé du bouton",
      buttonLink: "Lien du bouton",
    },
    maxCharacters: "caractères maximum",
    submitButton: "Enregistrer les modifications",
    cancelButton: "Annuler les modifications",
  };
  const logoAcceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
  ];
  const photoStatusOptions: Array<
    IOptionWrapper<Enum_Yeswescanform_Picturestatus>
  > = [
    {
      label: labels.photoStatus.options.facultative,
      option: Enum_Yeswescanform_Picturestatus.Optional,
    },
    {
      label: labels.photoStatus.options.hidden,
      option: Enum_Yeswescanform_Picturestatus.Masked,
    },
    {
      label: labels.photoStatus.options.mandatory,
      option: Enum_Yeswescanform_Picturestatus.Mandatory,
    },
  ];

  const introdutionPhraseMaxLength = 200;
  const buttonLabelMaxLength = 20;

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    const data = {
      logo: submitData.logo.id,
      reportButtons: submitData.reportButtons,
      pictureStatus: submitData.pictureStatus,
      thankYouMessage: submitData.thankYouMessage,
      displayEndingButton: submitData.displayEndingButton === "1",
      endingButtonIntroduction: submitData.endingButtonIntroduction,
      endingButtonLabel: submitData.endingButtonLabel,
      endingButtonLink: submitData.endingButtonLink,
      hasEmail: submitData.hasEmail,
      hasTsms: submitData.hasTsms,
      mailRecipients: submitData.mailRecipients,
      yesWeScanService: ywsServiceId,
    };
    if (!isCreateMode && mappedData) {
      await updateYesWeScanForm({
        variables: {
          ywsFormId: mappedData.id,
          data: data,
        },
      });
    } else {
      await createYesWeScanForm({
        variables: {
          data: data,
        },
        onCompleted: (result) => {
          if (window && result.createYesWeScanForm?.data?.id) {
            window.location.replace(
              `${currentRoot}/services/yeswescan/${ywsServiceId}`,
            );
          }
        },
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Yws", userRights);
  const { currentRoot } = useNavigation();
  const form = useForm<IYesWeScanFormFields>({
    mode: "onChange",
  });
  const { formState, handleSubmit, watch, getValues, reset } = form;
  const { isDirty, isValid, isSubmitting } = formState;
  const [
    createYesWeScanForm,
    { loading: createYesWeScanFormLoading, error: createYesWeScanFormError },
  ] = useCreateYwsFormMutation();
  const [
    updateYesWeScanForm,
    { loading: updateYesWeScanFormLoading, error: updateYesWeScanFormError },
  ] = useUpdateYwsFormByIdMutation({
    refetchQueries: [
      {
        query: GetYwsFormByIdDocument,
        variables: {
          ywsFormId: ywsFormId,
        },
      },
    ],
    awaitRefetchQueries: true,
  });
  const isLoading = createYesWeScanFormLoading || updateYesWeScanFormLoading;
  const mutationErrors = [createYesWeScanFormError, updateYesWeScanFormError];

  useEffect(() => {
    if (mappedData) reset(mappedData);
  }, [mappedData, reset]);

  return (
    <CommonLoader
      isLoading={isLoading || isSubmitting}
      isShowingContent={isLoading || isSubmitting}
      hasDelay={isLoading || isSubmitting}
      errors={mutationErrors}
    >
      <div className="c-YesWeScanServiceReportingTabReportingForm">
        <FormProvider {...form}>
          <form
            className="c-YesWeScanServiceReportingTabReportingForm__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-YesWeScanServiceReportingTabReportingForm__Logo">
              <FormFileInput
                name="logo"
                label={labels.logo.title}
                fileSizeLimitation={fileSizeLimitationOptions._200kb}
                isRequired
                hasEcoConceptionMessage
                validationLabel={labels.logo.validation}
                acceptedMimeTypes={logoAcceptedTypes}
                placeholder={labels.logo.placeholder}
              />
            </div>
            <div className="c-YesWeScanServiceReportingTabReportingForm__ReportingButtons">
              <FormInput
                name="reportButtons"
                isRequired
                isDisabled={!userPermissions.update}
                label={labels.reportingButtons.title}
                informationLabel={labels.reportingButtons.information}
                patternValidationErrorMessage={
                  labels.reportingButtons.errorMessage
                }
              />
            </div>
            <div className="c-YesWeScanServiceReportingTabReportingForm__PhotoStatus">
              <FormSelect<Enum_Yeswescanform_Picturestatus>
                name="pictureStatus"
                label={labels.photoStatus.title}
                options={photoStatusOptions}
                isRequired
                isDisabled={!userPermissions.update}
              />
            </div>
            <FormWysiwyg
              name="thankYouMessage"
              defaultValue={getValues("thankYouMessage")}
              label={labels.thankYouMessage}
              editorOptions={{ ...minimalWysiwygEditorOptions, height: 150 }}
              isRequired
              isDisabled={!userPermissions.update}
            />
            <div className="c-YesWeScanServiceReportingTabReportingForm__DisplayButtonContainer">
              <FormRadioInput
                name="displayEndingButton"
                displayName={labels.displayButton.title}
                isDisabled={!userPermissions.update}
                options={[
                  {
                    value: "1",
                    label: labels.displayButton.yes,
                  },
                  {
                    value: "0",
                    label: labels.displayButton.no,
                  },
                ]}
                defaultValue={getValues("displayEndingButton") ? "1" : "0"}
              />
              {watch("displayEndingButton") === "1" && (
                <div className="c-YesWeScanServiceReportingTabReportingForm__DisplayButtonFieldsContainer">
                  <FormInput
                    name="endingButtonIntroduction"
                    defaultValue={getValues("endingButtonIntroduction") ?? ""}
                    label={labels.displayButton.introductionPhrase}
                    maxLengthValidation={introdutionPhraseMaxLength}
                    validationLabel={`${introdutionPhraseMaxLength} ${labels.maxCharacters}`}
                    isDisabled={!userPermissions.update}
                  />
                  <div className="c-YesWeScanServiceReportingTabReportingForm__DisplayButtonShortField">
                    <FormInput
                      name="endingButtonLabel"
                      defaultValue={getValues("endingButtonLabel") ?? ""}
                      label={labels.displayButton.buttonLabel}
                      maxLengthValidation={buttonLabelMaxLength}
                      validationLabel={`${buttonLabelMaxLength} ${labels.maxCharacters}`}
                      isRequired
                      isDisabled={!userPermissions.update}
                    />
                  </div>
                  <FormInput
                    name="endingButtonLink"
                    defaultValue={getValues("endingButtonLabel") ?? ""}
                    label={labels.displayButton.buttonLink}
                    isRequired
                    isDisabled={!userPermissions.update}
                  />
                </div>
              )}
            </div>
            <YesWeScanReportingFormCheckboxes />
            <div className="c-YesWeScanServiceReportingTabReportingForm__Buttons">
              <CommonButton
                type="submit"
                label={labels.submitButton}
                style="primary"
                picto="check"
                isDisabled={!isDirty || !isValid || !userPermissions.update}
              />
              <CommonButton
                type="button"
                label={labels.cancelButton}
                picto="cross"
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </CommonLoader>
  );
}

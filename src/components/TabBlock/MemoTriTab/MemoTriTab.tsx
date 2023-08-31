import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  fileSizeLimitationOptions,
  remapUploadFileEntityToLocalFile,
} from "../../../lib/media";
import { useContract } from "../../../hooks/useContract";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import {
  GetRecyclingGuideServicesByContractIdDocument,
  useGetRecyclingGuideServiceByIdLazyQuery,
  useUpdateRecyclingGuideServiceByIdMutation,
} from "../../../graphql/codegen/generated-types";
import FormInput from "../../Form/FormInput/FormInput";
import FormFileInput from "../../Form/FormFileInput/FormFileInput";
import CommonButton from "../../Common/CommonButton/CommonButton";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import "./memo-tri-tab.scss";

export default function MemoTriTab() {
  /* Static Data */
  const formLabels = {
    title: "Mémotri",
    maxCharactersLabel: "caractères maximum",
    memoName: "Nom du mémotri",
    memoDesc: "Description du mémotri",
    memoFile: "Fichier",
    staticImageValidation: "20 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter un fichier depuis la bibliothèque de média ou glissez-déposez un fichier dans cette zone.",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };
  const memoNameMaxChar = 20;
  const memoDescMaxChar = 50;

  /* Local Data */
  const form = useForm<FieldValues>({
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = form;

  /* External Data */
  const { contractId, contract } = useContract();
  const [getGetRecyclingGuideServiceById, { data, loading, error }] =
    useGetRecyclingGuideServiceByIdLazyQuery();
  const [
    updateRecyclingGuideService,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateRecyclingGuideServiceByIdMutation();

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData.id) {
      const variables = {
        updateRecyclingGuideServiceId: submitData.id,
        data: {
          memoName: submitData.memoName,
          memoDesc: submitData.memoDesc,
          memoFile: submitData.memoFile.id,
        },
      };
      return updateRecyclingGuideService({
        variables,
        refetchQueries: [
          {
            query: GetRecyclingGuideServicesByContractIdDocument,
            variables: { contractId },
          },
        ],
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  useEffect(() => {
    if (contract.attributes?.recyclingGuideService?.data?.id) {
      getGetRecyclingGuideServiceById({
        variables: {
          recyclingGuideServiceId:
            contract.attributes.recyclingGuideService.data.id,
        },
      });
    }
  }, [contract, getGetRecyclingGuideServiceById]);

  useEffect(() => {
    if (data && data.recyclingGuideService?.data) {
      const recyclingGuideService = data.recyclingGuideService.data;
      if (recyclingGuideService.id && recyclingGuideService.attributes) {
        const mappedData = {
          id: recyclingGuideService.id,
          memoName: recyclingGuideService.attributes.memoName,
          memoDesc: recyclingGuideService.attributes.memoDesc,
          memoFile: remapUploadFileEntityToLocalFile(
            recyclingGuideService.attributes.memoFile?.data,
          ),
        };
        form.reset(mappedData);
      }
    }
  }, [form, data]);

  return (
    <div
      className="c-MemoTriTab"
      id="panel-memoTri"
      role="tabpanel"
      aria-labelledby="tab-memoTri"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-MemoTriTab__Title">{formLabels.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-MemoTriTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-MemoTriTab__Group c-MemoTriTab__Group_short">
              <FormInput
                type="text"
                name="memoName"
                label={formLabels.memoName}
                validationLabel={`${memoNameMaxChar} ${formLabels.maxCharactersLabel}`}
                maxLengthValidation={memoNameMaxChar}
                isRequired
              />
            </div>
            <div className="c-MemoTriTab__Group c-MemoTriTab__Group_short">
              <FormInput
                type="text"
                name="memoDesc"
                label={formLabels.memoDesc}
                validationLabel={`${memoDescMaxChar} ${formLabels.maxCharactersLabel}`}
                maxLengthValidation={memoDescMaxChar}
                tagType="textarea"
              />
            </div>
            <div className="c-MemoTriTab__Group c-MemoTriTab__Group_short">
              <FormFileInput
                name="memoFile"
                label={formLabels.memoFile}
                isRequired
                validationLabel={formLabels.staticImageValidation}
                fileSizeLimitation={fileSizeLimitationOptions._20mb}
                placeholder={formLabels.staticImagePlaceholder}
              />
            </div>

            <div className="c-MemoTriTab__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isValid}
              />
              <CommonButton
                type="button"
                label={formLabels.cancelButtonLabel}
                picto="cross"
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </CommonLoader>
    </div>
  );
}

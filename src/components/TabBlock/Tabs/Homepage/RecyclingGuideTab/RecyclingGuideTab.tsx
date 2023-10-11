import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState, useEffect } from "react";
import {
  useGetRecyclingGuideBlockByContractIdQuery,
  useUpdateRecyclingGuideBlockByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { extractRecyclingGuideBlock } from "../../../../../lib/graphql-data";
import { getRightsByLabel } from "../../../../../lib/user";
import { useUser } from "../../../../../hooks/useUser";
import { useContract } from "../../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../Form/FormInput/FormInput";
import "./recycling-guide-tab.scss";

interface IRecyclingGuideBlock {
  id: string;
  titleContent: string;
  subtitleContent: string;
  recyclingGuideDisplayContent: string;
}

export default function RecyclingGuideTab() {
  /* Static Data */
  const formLabels = {
    title: "Guide du Tri",
    maxCharactersLabel: "caractères maximum",
    titleContent: "Titre",
    subtitleContent: "Sous titre",
    recyclingGuideDisplayContent:
      "Texte affiché dans le moteur de recherche du guide du tri",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };
  const maxCharacters = 60;
  const recyclingGuideDisplayContentMaxCharacters = 30;

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateRecyclingGuideBlockId: submitData["id"],
        data: {
          titleContent: submitData["titleContent"],
          subtitleContent: submitData["subtitleContent"],
          recyclingGuideDisplayContent:
            submitData["recyclingGuideDisplayContent"],
        },
      };
      return updateRecyclingGuideBlock({
        variables,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetRecyclingGuideBlockByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const [
    updateRecyclingGuideBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateRecyclingGuideBlockByIdMutation({
    refetchQueries: ["getRecyclingGuideBlockByContractId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Homepage", userRights);
  const [recyclingGuideData, setRecyclingGuideData] =
    useState<IRecyclingGuideBlock>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data && data.contractCustomizations?.data) {
      const { recyclingGuideBlock } = extractRecyclingGuideBlock(data);
      if (recyclingGuideBlock?.id && recyclingGuideBlock?.attributes) {
        const mappedData = {
          id: recyclingGuideBlock.id,
          titleContent: recyclingGuideBlock.attributes.titleContent,
          subtitleContent: recyclingGuideBlock.attributes.subtitleContent,
          recyclingGuideDisplayContent:
            recyclingGuideBlock.attributes.recyclingGuideDisplayContent,
        };
        setRecyclingGuideData(mappedData);
        form.reset(mappedData);
      }
    }
  }, [form, data]);

  return (
    <div
      className="c-RecyclingGuideTab"
      id="panel-recyclingGuide"
      role="tabpanel"
      aria-labelledby="tab-recyclingGuide"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-RecyclingGuideTab__Title">{formLabels.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-RecyclingGuideTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-RecyclingGuideTab__Group c-RecyclingGuideTab__Group_short">
              <FormInput
                type="text"
                name="titleContent"
                label={formLabels.titleContent}
                validationLabel={`${maxCharacters} ${formLabels.maxCharactersLabel}`}
                maxLengthValidation={maxCharacters}
                isRequired={true}
                isDisabled={mutationLoading || !userPermissions.update}
                defaultValue={recyclingGuideData?.titleContent}
              />
            </div>
            <div className="c-RecyclingGuideTab__Group c-RecyclingGuideTab__Group_short">
              <FormInput
                type="text"
                label={formLabels.subtitleContent}
                name="subtitleContent"
                validationLabel={`${maxCharacters} ${formLabels.maxCharactersLabel}`}
                maxLengthValidation={maxCharacters}
                isDisabled={mutationLoading || !userPermissions.update}
                isRequired={true}
                defaultValue={recyclingGuideData?.subtitleContent}
              />
            </div>
            <div className="c-RecyclingGuideTab__Group c-RecyclingGuideTab__Group_short">
              <FormInput
                type="text"
                label={formLabels.recyclingGuideDisplayContent}
                validationLabel={`${recyclingGuideDisplayContentMaxCharacters} ${formLabels.maxCharactersLabel}`}
                name="recyclingGuideDisplayContent"
                isDisabled={mutationLoading || !userPermissions.update}
                isRequired={true}
                maxLengthValidation={recyclingGuideDisplayContentMaxCharacters}
                defaultValue={recyclingGuideData?.recyclingGuideDisplayContent}
              />
            </div>
            <div className="c-RecyclingGuideTab__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isDirty || !userPermissions.update}
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

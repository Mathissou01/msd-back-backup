import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  GetRecyclingBlockTabDocument,
  useGetRecyclingBlockTabQuery,
  useUpdateRecyclingGuideTabMutation,
} from "../../../graphql/codegen/generated-types";
import { FocusFirstElement } from "../../../lib/utilities";
import { extractRecyclingGuideBlock } from "../../../lib/graphql-data";
import CommonButton from "../../Common/CommonButton/CommonButton";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import FormInput from "../../Form/FormInput/FormInput";
import "./recycling-guide-tab.scss";
import { useContract } from "../../../hooks/useContract";

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
      updateRecyclingGuideBlock({
        variables,
        refetchQueries: [
          {
            query: GetRecyclingBlockTabDocument,
            variables: { contractId },
          },
          "getRecyclingBlockTab",
        ],
      });
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetRecyclingBlockTabQuery({
    variables: { contractId },
  });
  const [
    updateRecyclingGuideBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateRecyclingGuideTabMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
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

  const spinnerTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isSubmitting) {
      if (!isShowingSpinner) {
        spinnerTimerRef.current = setTimeout(() => {
          setIsShowingSpinner(true);
        }, 200);
      }
    } else {
      clearTimeout(spinnerTimerRef.current);
      setIsShowingSpinner(false);
    }
  }, [isShowingSpinner, isSubmitting]);

  const focusRef = useCallback((node: HTMLFormElement) => {
    FocusFirstElement(node);
  }, []);

  {
    // TODO: layout shift, handle error redirect,
  }
  if (loading) return <CommonSpinner />;
  if (error) return <span>{error?.message}</span>;
  if (mutationError) return <span>{mutationError?.message}</span>;

  return (
    <div
      className="c-RecyclingGuideTab"
      id="panel-recyclingGuide"
      role="tabpanel"
      aria-labelledby="tab-recyclingGuide"
    >
      {isShowingSpinner && <CommonSpinner isCover={true} />}
      <h2 className="c-RecyclingGuideTab__Title">{formLabels.title}</h2>
      <FormProvider {...form}>
        <form
          className="c-RecyclingGuideTab__Form"
          onSubmit={handleSubmit(onSubmitValid)}
          ref={focusRef}
        >
          <div className="c-RecyclingGuideTab__Group c-RecyclingGuideTab__Group_short">
            <FormInput
              type="text"
              name="titleContent"
              label={formLabels.titleContent}
              validationLabel={`${maxCharacters} ${formLabels.maxCharactersLabel}`}
              maxLengthValidation={maxCharacters}
              isRequired={true}
              isDisabled={mutationLoading}
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
              isDisabled={mutationLoading}
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
              isDisabled={mutationLoading}
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
              isDisabled={!isDirty}
            />
            <CommonButton
              type="button"
              label={formLabels.cancelButtonLabel}
              onClick={onCancel}
              isDisabled={!isDirty}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

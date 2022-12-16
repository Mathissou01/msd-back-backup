import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  GetSearchEngineTabDocument,
  useGetSearchEngineTabQuery,
  useUpdateSearchEngineTabMutation,
} from "../../../graphql/codegen/generated-types";
import { FocusFirstElement } from "../../../lib/utilities";
import { extractSearchEngineBlock } from "../../../lib/graphql-data";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import FormInput from "../../Form/FormInput/FormInput";
import "./welcome-and-search-engine-tab.scss";

interface ISearchEngineBlock {
  id: string;
  titleContent: string;
}

export default function WelcomeAndSearchEngineTab() {
  /* Static Data */
  const formLabels = {
    welcomeTitle: "Message de bienvenue",
    welcomeTitleContent: "Titre",
    welcomeSubtitleContent: "Sous titre",
    searchEngineTitle: "Moteur de recherche",
    searchEngineTitleContent:
      "Texte affiché dans le moteur de recherche principal (haut de page)",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
    maxCharactersLabel: "caractères maximum",
  };
  const maxCharacters = 30;

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateSearchEngineBlockId: submitData["id"],
        data: {
          titleContent: submitData["titleContent"],
        },
      };
      updateSearchEngineBlock({
        variables,
        refetchQueries: [
          {
            query: GetSearchEngineTabDocument,
            variables: { contractId },
          },
          "getSearchEngineTab",
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
  const { loading, error, data } = useGetSearchEngineTabQuery({
    variables: { contractId },
  });
  const [
    updateSearchEngineBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateSearchEngineTabMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
  const [searchEngineData, setSearchEngineData] =
    useState<ISearchEngineBlock>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data && data.contractCustomizations?.data) {
      const { searchEngineBlock } = extractSearchEngineBlock(data);
      if (searchEngineBlock?.id && searchEngineBlock?.attributes) {
        const mappedData = {
          id: searchEngineBlock.id,
          titleContent: searchEngineBlock.attributes.titleContent,
        };
        setSearchEngineData(mappedData);
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
    <>
      {isShowingSpinner && <CommonSpinner isCover={true} />}
      <FormProvider {...form}>
        <form
          className="c-WelcomeAndSearchEngineTab"
          onSubmit={handleSubmit(onSubmitValid)}
          ref={focusRef}
        >
          {/*<div className="c-WelcomeAndSearchEngineTab__Group">*/}
          {/*  <h2 className="c-WelcomeAndSearchEngineTab__Title">*/}
          {/*    {formLabels.welcomeTitle}*/}
          {/*  </h2>*/}
          {/*  <div className="c-WelcomeAndSearchEngineTab__SubGroup">*/}
          {/*    <span>[...]</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="c-WelcomeAndSearchEngineTab__Group">
            <h2 className="c-WelcomeAndSearchEngineTab__Title">
              {formLabels.searchEngineTitle}
            </h2>
            <div className="c-WelcomeAndSearchEngineTab__SubGroup c-WelcomeAndSearchEngineTab__SubGroup_short">
              <FormInput
                type="text"
                name="titleContent"
                label={formLabels.searchEngineTitleContent}
                maxLengthValidation={maxCharacters}
                validationLabel={`${maxCharacters} ${formLabels.maxCharactersLabel}`}
                isRequired={true}
                isDisabled={mutationLoading}
                defaultValue={searchEngineData?.titleContent}
              />
            </div>
          </div>
          <div className="c-WelcomeAndSearchEngineTab__Buttons">
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
    </>
  );
}

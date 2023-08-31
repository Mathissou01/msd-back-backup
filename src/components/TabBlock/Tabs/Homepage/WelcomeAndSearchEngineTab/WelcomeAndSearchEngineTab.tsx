import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState, useEffect } from "react";
import {
  useGetWelcomeMessageAndSearchEngineBlocksByContractIdQuery,
  useUpdateSearchEngineBlockByIdMutation,
  useUpdateWelcomeMessageBlockByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import {
  extractSearchEngineBlock,
  extractWelcomeMessageBlock,
} from "../../../../../lib/graphql-data";
import { useContract } from "../../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormCheckbox from "../../../../Form/FormCheckbox/FormCheckbox";
import "./welcome-and-search-engine-tab.scss";

interface IWelcomeMessageBlock {
  welcomeMessageBlockId: string;
  showBlock: boolean;
  title: string;
  subtitle: string;
}

interface ISearchEngineBlock {
  searchEngineBlockId: string;
  titleContent: string;
}

export default function WelcomeAndSearchEngineTab() {
  /* Static Data */
  const formLabels = {
    welcomeTitle: "Message de bienvenue",
    welcomeShowBlock: "Afficher ce bloc",
    welcomeTitleContent: "Titre",
    welcomeDefaultTitleContent: "Besoin d'aide pour trier un déchet ?",
    welcomeSubtitleContent: "Sous titre",
    welcomeDefaultSubtitleContent:
      "Mon service déchets pour faciliter le tri & la gestion de vos déchets au quotidien",
    searchEngineTitle: "Moteur de recherche",
    searchEngineTitleContent:
      "Texte affiché dans le moteur de recherche principal (haut de page)",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
    maxCharactersLabel: "caractères maximum",
  };
  const maxCharactersWelcomeTitle = 40;
  const maxCharactersWelcomeSubtitle = 100;
  const maxCharactersSearchEngine = 30;

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (
      submitData["welcomeMessageBlockId"] &&
      submitData["searchEngineBlockId"]
    ) {
      const variablesWelcomeMessageBlock = {
        updateWelcomeMessageBlockId: submitData["welcomeMessageBlockId"],
        data: {
          showBlock: submitData["showBlock"],
          title: submitData["title"],
          subtitle: submitData["subtitle"],
        },
      };
      updateWelcomeMessageBlock({
        variables: variablesWelcomeMessageBlock,
      });

      const variablesSearchEngineBlock = {
        updateSearchEngineBlockId: submitData["searchEngineBlockId"],
        data: {
          titleContent: submitData["titleContent"],
        },
      };
      return updateSearchEngineBlock({
        variables: variablesSearchEngineBlock,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } =
    useGetWelcomeMessageAndSearchEngineBlocksByContractIdQuery({
      variables: { contractId },
      fetchPolicy: "network-only",
    });
  const [
    updateWelcomeMessageBlock,
    {
      loading: welcomeMessageMutationLoading,
      error: welcomeMessageMutationError,
    },
  ] = useUpdateWelcomeMessageBlockByIdMutation({
    refetchQueries: ["getWelcomeMessageAndSearchEngineBlocksByContractId"],
    awaitRefetchQueries: true,
  });
  const [
    updateSearchEngineBlock,
    { loading: searchEngineMutationLoading, error: searchEngineMutationError },
  ] = useUpdateSearchEngineBlockByIdMutation({
    refetchQueries: ["getWelcomeMessageAndSearchEngineBlocksByContractId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const [welcomeMessageData, setWelcomeMessageData] =
    useState<IWelcomeMessageBlock>();
  const [searchEngineData, setSearchEngineData] =
    useState<ISearchEngineBlock>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;
  const mutationLoading =
    welcomeMessageMutationLoading || searchEngineMutationLoading;
  const mutationError =
    welcomeMessageMutationError || searchEngineMutationError;

  useEffect(() => {
    if (data && data.contractCustomizations?.data) {
      const { welcomeMessageBlock } = extractWelcomeMessageBlock(data);
      if (welcomeMessageBlock?.id && welcomeMessageBlock.attributes) {
        const welcomeMessageBlockData = {
          welcomeMessageBlockId: welcomeMessageBlock.id,
          showBlock: welcomeMessageBlock.attributes.showBlock,
          title: welcomeMessageBlock.attributes.title,
          subtitle: welcomeMessageBlock.attributes.subtitle,
        };
        setWelcomeMessageData(welcomeMessageBlockData);
      }

      const { searchEngineBlock } = extractSearchEngineBlock(data);
      if (searchEngineBlock?.id && searchEngineBlock?.attributes) {
        const searchEngineBlockData = {
          searchEngineBlockId: searchEngineBlock.id,
          titleContent: searchEngineBlock.attributes.titleContent,
        };
        setSearchEngineData(searchEngineBlockData);
      }
    }
  }, [
    form,
    data,
    formLabels.welcomeDefaultTitleContent,
    formLabels.welcomeDefaultSubtitleContent,
  ]);

  useEffect(() => {
    form.reset(Object.assign({}, welcomeMessageData, searchEngineData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeMessageData, searchEngineData]);

  return (
    <div
      className="c-WelcomeAndSearchEngineTab"
      id="panel-welcomeAndSearchEngine"
      role="tabpanel"
      aria-labelledby="tab-welcomeAndSearchEngine"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <FormProvider {...form}>
          <form
            className="c-WelcomeAndSearchEngineTab"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-WelcomeAndSearchEngineTab__Group">
              <h2 className="c-WelcomeAndSearchEngineTab__Title">
                {formLabels.welcomeTitle}
              </h2>
              <div className="c-WelcomeAndSearchEngineTab__SubGroup c-WelcomeAndSearchEngineTab__SubGroup_short">
                <FormCheckbox
                  name="showBlock"
                  label={formLabels.welcomeShowBlock}
                  isDisabled={mutationLoading}
                />
                <div className="WelcomeAndSearchEngineTab__SubGroup_title">
                  <FormInput
                    type="text"
                    name="title"
                    label={formLabels.welcomeTitleContent}
                    isRequired
                    isDisabled={mutationLoading}
                    maxLengthValidation={maxCharactersWelcomeTitle}
                    validationLabel={`${maxCharactersWelcomeTitle} ${formLabels.maxCharactersLabel}`}
                    defaultValue={welcomeMessageData?.title}
                  />
                </div>
                <div className="WelcomeAndSearchEngineTab__SubGroup_subtitle">
                  <FormInput
                    type="text"
                    name="subtitle"
                    label={formLabels.welcomeSubtitleContent}
                    isRequired
                    isDisabled={mutationLoading}
                    maxLengthValidation={maxCharactersWelcomeSubtitle}
                    validationLabel={`${maxCharactersWelcomeSubtitle} ${formLabels.maxCharactersLabel}`}
                    defaultValue={welcomeMessageData?.subtitle}
                  />
                </div>
              </div>
            </div>
            <div className="c-WelcomeAndSearchEngineTab__Group">
              <h2 className="c-WelcomeAndSearchEngineTab__Title">
                {formLabels.searchEngineTitle}
              </h2>
              <div className="c-WelcomeAndSearchEngineTab__SubGroup c-WelcomeAndSearchEngineTab__SubGroup_short">
                <FormInput
                  type="text"
                  name="titleContent"
                  label={formLabels.searchEngineTitleContent}
                  maxLengthValidation={maxCharactersSearchEngine}
                  validationLabel={`${maxCharactersSearchEngine} ${formLabels.maxCharactersLabel}`}
                  isRequired
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
                picto="check"
                isDisabled={!isDirty}
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

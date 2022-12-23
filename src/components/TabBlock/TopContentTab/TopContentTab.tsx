import { format, parseJSON } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GetTopContentTabDocument,
  TopContentDto,
  useGetTopContentTabQuery,
  useUpdateTopContentTabMutation,
} from "../../../graphql/codegen/generated-types";
import { FocusFirstElement } from "../../../lib/utilities";
import { extractTopContentBlock } from "../../../lib/graphql-data";
import { useContract } from "../../../hooks/useContract";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormModalButtonInput from "../../Form/FormModalButtonInput/FormModalButtonInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import "./top-content-tab.scss";

interface ITopContentBlock {
  id: string;
  displayBlock: boolean;
  titleContent: string;
  hasTopContent: boolean;
  displayLastThreeContents: boolean;
  topContent?: TopContentDto | null;
}

export default function TopContentTab() {
  /* Static Data */
  const formLabels = {
    title: "À la une",
    displayBlock: "Afficher ce bloc",
    titleContent: "Titre du bloc",
    hasTopContent: "Afficher la mise en avant",
    topContent: "Contenu mis en avant",
    topContentButton: "Choisir le contenu à mettre en avant",
    topContentModal: "Sélection de la mise en avant",
    topContentModalRadio: "Type de contenu",
    topContentModalType: "Sélection du contenu mis en avant",
    displayLastThreeContents:
      "Afficher les 3 dernières actualités ou événements",
  };
  const submitButtonLabel = "Enregistrer les modifications";
  const cancelButtonLabel = "Annuler les modifications";

  /* Methods */
  function topContentDisplayTransformFunction(
    topContent: Partial<TopContentDto> | undefined,
  ): ReactNode {
    return (
      <p>
        {`${topContent?.attributes?.title} - ${format(
          parseJSON(topContent?.attributes?.publishedAt),
          "dd/MM/yyyy",
        )}` ?? ""}
      </p>
    );
  }

  function topContentSelectDisplayTransformFunction(
    topContent: TopContentDto,
  ): string {
    return (
      `${topContent?.attributes?.title} - ${format(
        parseJSON(topContent?.attributes?.publishedAt),
        "dd/MM/yyyy",
      )}` ?? ""
    );
  }

  function onTopContentModalSubmit(submitData: {
    [key: string]: Partial<TopContentDto> | undefined;
  }) {
    const topContent = Object.values(submitData)[1];
    setValue("topContent", topContent, { shouldDirty: true });
  }

  function onTopContentModalRadioChange(changeData: unknown) {
    setCurrentTopContents(
      allTopContents?.filter(
        (topContent) => topContent?.contentType === changeData,
      ) ?? [],
    );
  }

  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateTopContentBlockId: submitData["id"],
        data: {
          displayBlock: submitData["displayBlock"],
          titleContent: submitData["titleContent"],
          hasTopContent: submitData["hasTopContent"],
          displayLastThreeContents: submitData["displayLastThreeContents"],
          topContent: submitData["topContent"]?.id ?? null,
        },
      };
      await updateTopContentBlock({
        variables,
        refetchQueries: [
          {
            query: GetTopContentTabDocument,
            variables: { contractId },
          },
          "getTopContentTab",
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
  const { loading, error, data } = useGetTopContentTabQuery({
    variables: { contractId },
  });
  const [
    updateTopContentBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateTopContentTabMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
  const [topContentData, setTopContentData] = useState<ITopContentBlock>();
  const [allTopContents, setAllTopContents] = useState<Array<TopContentDto>>(
    [],
  );
  const [currentTopContents, setCurrentTopContents] = useState<
    Array<TopContentDto>
  >([]);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, setValue, watch, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data?.getTopContentBlockDTO && data.getTopContentDTOs) {
      const { topContentBlock, topContents } = extractTopContentBlock(data);
      if (topContentBlock?.id) {
        const mappedData: ITopContentBlock = {
          id: topContentBlock.id,
          displayBlock: topContentBlock.displayBlock,
          displayLastThreeContents: topContentBlock.displayLastThreeContents,
          hasTopContent: topContentBlock.hasTopContent,
          titleContent: topContentBlock.titleContent,
          topContent: topContentBlock.topContent,
        };
        setTopContentData(mappedData);
        form.reset(mappedData);
      }
      setAllTopContents(
        (topContents ?? [])?.filter(
          (e): e is Exclude<typeof e, null> => e !== null,
        ),
      );
      const filteredTopContents =
        topContents?.filter(
          (topContent) =>
            topContent?.contentType ===
            topContentBlock?.topContent?.contentType,
        ) ?? [];
      setCurrentTopContents(
        filteredTopContents?.filter(
          (e): e is Exclude<typeof e, null> => e !== null,
        ),
      );
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
      className="c-TopContentTab"
      id="panel-topContent"
      role="tabpanel"
      aria-labelledby="tab-topContent"
    >
      {isShowingSpinner && <CommonSpinner isCover={true} />}
      <h2 className="c-TopContentTab__Title">{formLabels.title}</h2>
      <FormProvider {...form}>
        <form
          className="c-TopContentTab__Form"
          onSubmit={handleSubmit(onSubmitValid)}
          ref={focusRef}
        >
          <div className="c-TopContentTab__Group c-TopContentTab__Group_short">
            <FormCheckbox name="displayBlock" label={formLabels.displayBlock} />
            <FormInput
              type="text"
              name="titleContent"
              label={formLabels.titleContent}
              isRequired={true}
              isDisabled={mutationLoading}
              defaultValue={topContentData?.titleContent}
            />
          </div>
          <div className="c-TopContentTab__Group">
            <FormCheckbox
              name="hasTopContent"
              label={formLabels.hasTopContent}
            />
            <FormModalButtonInput<TopContentDto>
              name="topContent"
              label={formLabels.topContent}
              displayTransform={topContentDisplayTransformFunction}
              buttonLabel={formLabels.topContentButton}
              modalTitle={formLabels.topContentModal}
              onModalSubmit={onTopContentModalSubmit}
              isRequired={true}
              modalHasRequiredChildren="all"
              isDisabled={mutationLoading}
            >
              <div className="c-TopContentTab__Group">
                <FormRadioInput
                  name={"topContentRadio"}
                  displayName={formLabels.topContentModalRadio}
                  options={[
                    { label: "Actualité", value: "news" },
                    { label: "Evénement", value: "event" },
                  ]}
                  defaultValue={watch("topContent")?.contentType}
                  isRequired={true}
                  onChange={onTopContentModalRadioChange}
                />
              </div>
              <div className="c-TopContentTab__Group">
                <FormSelect<TopContentDto>
                  name="topContentSelect"
                  label={formLabels.topContentModalType}
                  displayTransform={topContentSelectDisplayTransformFunction}
                  options={currentTopContents}
                  optionKey={"id"}
                  defaultValue={watch("topContent")}
                  isRequired={true}
                />
              </div>
            </FormModalButtonInput>
          </div>
          <div className="c-TopContentTab__Group">
            <FormCheckbox
              name="displayLastThreeContents"
              label={formLabels.displayLastThreeContents}
            />
          </div>
          <div className="c-TopContentTab__Buttons">
            <CommonButton
              type="submit"
              label={submitButtonLabel}
              style="primary"
              isDisabled={!isDirty}
            />
            <CommonButton
              type="button"
              label={cancelButtonLabel}
              onClick={onCancel}
              isDisabled={!isDirty}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

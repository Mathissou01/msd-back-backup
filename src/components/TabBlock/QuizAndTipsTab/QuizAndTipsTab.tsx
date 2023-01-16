import { format, parseJSON } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode, useEffect, useState } from "react";
import {
  GetQuizAndTipsBlockTabDocument,
  QuizEntity,
  TipEntity,
  useGetQuizAndTipsBlockTabQuery,
  useUpdateQuizAndTipsBlockTabMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { extractQuizAndTipsBlock } from "../../../lib/graphql-data";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import { useContract } from "../../../hooks/useContract";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormModalButtonInput from "../../Form/FormModalButtonInput/FormModalButtonInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormMultiselect, {
  IOptionWrapper,
} from "../../Form/FormMultiselect/FormMultiselect";
import "./quiz-and-tips-tab.scss";

interface IQuizAndTipsBlock {
  id: string;
  titleContent: string;
  displayBlock: boolean;
  displayQuiz: boolean;
  quiz?: QuizEntity | null;
  displayTips: boolean;
  tips?: Array<TipEntity> | null;
}

export default function QuizAndTipsTab() {
  /* Static Data */
  const formLabels = {
    title: "Quiz & Astuces",
    displayBlock: "Afficher ce bloc",
    titleContent: "Titre du bloc",
    displayQuiz: "Afficher un quiz",
    quiz: "Quiz à afficher",
    quizButton: "Choisir le quiz",
    quizModal: "Sélection du quiz",
    quizModalType: "Quiz",
    displayTips: "Afficher des astuces",
    tips: "Astuces à afficher",
    tipsButton: "Sélectionner les astuces à afficher",
    tipsModal: "Sélection des astuces",
    tipsModalType: "Astuce",
  };
  const submitButtonLabel = "Enregistrer les modifications";
  const cancelButtonLabel = "Annuler les modifications";

  /* Methods */
  function quizDisplayTransformFunction(
    quiz: QuizEntity | undefined,
  ): ReactNode {
    return <p>{quiz?.attributes?.title ?? ""}</p>;
  }

  function quizSelectDisplayTransformFunction(quiz: QuizEntity): string {
    return quiz.attributes?.title ?? "";
  }

  function onQuizModalSubmit(submitData: {
    [key: string]: QuizEntity | undefined;
  }) {
    const quiz = Object.values(submitData)[0];
    setValue("quiz", quiz, { shouldDirty: true });
  }

  function tipsDisplayTransformFunction(
    tips: Array<TipEntity | undefined>,
  ): ReactNode {
    return tips?.map((tip: TipEntity | undefined, index) => {
      if (tip && tip.id) {
        return (
          <p key={tip.id + index}>
            {`${tip.attributes?.title} - ${format(
              parseJSON(tip.attributes?.publishedAt),
              "dd/mm/yyyy",
            )}` ?? ""}
          </p>
        );
      }
    });
  }

  function tipSelectDisplayTransformFunction(tip: TipEntity): string {
    return (
      `${tip.attributes?.title} - ${format(
        parseJSON(tip.attributes?.publishedAt),
        "dd/mm/yyyy",
      )}` ?? ""
    );
  }

  function onTipsModalSubmit(submitData: {
    [key: string]: Array<TipEntity | undefined>;
  }) {
    const tips = Object.values(submitData)?.filter(removeNulls);
    setValue("tips", tips, { shouldDirty: true });
  }

  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        quizAndTipsBlockId: submitData["id"],
        data: {
          titleContent: submitData["titleContent"],
          displayBlock: submitData["displayBlock"],
          displayQuiz: submitData["displayQuiz"],
          quiz: submitData["quiz"]?.id ?? null,
          displayTips: submitData["displayTips"],
          tips:
            submitData["tips"]?.map((tip: TipEntity) => tip?.id ?? null) ??
            null,
        },
      };
      await updateQuizAndTipsBlock({
        variables,
        refetchQueries: [
          {
            query: GetQuizAndTipsBlockTabDocument,
            variables: { contractId },
          },
          "getQuizAndTipsBlockTab",
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
  const { loading, error, data } = useGetQuizAndTipsBlockTabQuery({
    variables: { contractId },
  });
  const [
    updateQuizAndTipsBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateQuizAndTipsBlockTabMutation();

  /* Local Data */
  const [quizAndTipsData, setQuizAndTipsData] = useState<IQuizAndTipsBlock>();
  const [quizzesData, setQuizzesData] = useState<Array<QuizEntity>>([]);
  const [tipsData, setTipsData] = useState<Array<IOptionWrapper<TipEntity>>>(
    [],
  );
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, setValue, watch, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (
      data &&
      data.contractCustomizations?.data &&
      (data.quizSubServices?.data || data?.tipSubServices?.data)
    ) {
      const { quizAndTipsBlock, quizzes, tips } = extractQuizAndTipsBlock(data);
      if (quizAndTipsBlock?.id && quizAndTipsBlock?.attributes) {
        const mappedData: IQuizAndTipsBlock = {
          id: quizAndTipsBlock.id,
          titleContent:
            quizAndTipsBlock.attributes.titleContent ?? "Quiz & Astuces",
          displayBlock: quizAndTipsBlock.attributes.displayBlock,
          displayQuiz: quizAndTipsBlock.attributes.displayQuiz,
          quiz: quizAndTipsBlock.attributes.quiz?.data,
          displayTips: quizAndTipsBlock.attributes.displayTips,
          tips: quizAndTipsBlock?.attributes.tips?.data,
        };
        setQuizAndTipsData(mappedData);
        form.reset(mappedData);
      }
      if (quizzes && quizzes?.length > 0) {
        setQuizzesData(quizzes);
      }
      if (tips && tips?.length > 0) {
        const mappedOptions: Array<IOptionWrapper<TipEntity> | null> = tips.map(
          (tip) => {
            return tip ? { option: tip } : null;
          },
        );
        setTipsData(
          mappedOptions?.filter(
            (e): e is Exclude<typeof e, null> => e !== null,
          ),
        );
      }
    }
  }, [form, data]);

  return (
    <div
      className="c-QuizAndTipsTab"
      id="panel-quizAndTips"
      role="tabpanel"
      aria-labelledby="tab-quizAndTips"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-QuizAndTipsTab__Title">{formLabels.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-QuizAndTipsTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-QuizAndTipsTab__Group c-QuizAndTipsTab__Group_short">
              <FormCheckbox
                name="displayBlock"
                label={formLabels.displayBlock}
              />
              <FormInput
                type="text"
                name="titleContent"
                label={formLabels.titleContent}
                isRequired={true}
                isDisabled={mutationLoading}
                defaultValue={quizAndTipsData?.titleContent}
              />
            </div>
            <div className="c-QuizAndTipsTab__Group">
              <FormCheckbox name="displayQuiz" label={formLabels.displayQuiz} />
              <FormModalButtonInput<QuizEntity>
                name="quiz"
                label={formLabels.quiz}
                displayTransform={quizDisplayTransformFunction}
                buttonLabel={formLabels.quizButton}
                modalTitle={formLabels.quizModal}
                onModalSubmit={onQuizModalSubmit}
                isDisabled={mutationLoading}
              >
                <FormSelect<QuizEntity>
                  name="quizSelect"
                  label={formLabels.quizModalType}
                  displayTransform={quizSelectDisplayTransformFunction}
                  options={quizzesData}
                  optionKey={"id"}
                  defaultValue={watch("quiz")}
                />
              </FormModalButtonInput>
            </div>
            <div className="c-QuizAndTipsTab__Group">
              <FormCheckbox name="displayTips" label={formLabels.displayTips} />
              <FormModalButtonInput<Array<TipEntity>>
                name="tips"
                label={formLabels.tips}
                displayTransform={tipsDisplayTransformFunction}
                buttonLabel={formLabels.tipsButton}
                modalTitle={formLabels.tipsModal}
                onModalSubmit={onTipsModalSubmit}
                isDisabled={mutationLoading}
              >
                <FormMultiselect<TipEntity>
                  name="tipsSelect"
                  label={formLabels.tipsModalType}
                  displayTransform={tipSelectDisplayTransformFunction}
                  options={tipsData}
                  selectAmount={3}
                  optionKey={"id"}
                  defaultValues={watch("tips")}
                />
              </FormModalButtonInput>
            </div>
            <div className="c-QuizAndTipsTab__Buttons">
              <CommonButton
                type="submit"
                label={submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isDirty}
              />
              <CommonButton
                type="button"
                label={cancelButtonLabel}
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

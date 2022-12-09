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
  QuizEntity,
  TipEntity,
  GetQuizAndTipsBlockByContractIdDocument,
  useGetQuizAndTipsBlockByContractIdQuery,
  useUpdateQuizAndTipsBlockByIdMutation,
} from "../../../graphql/codegen/generated-types";
import { FocusFirstElement, removeNulls } from "../../../lib/utilities";
import { extractQuizAndTipsBlock } from "../../../lib/graphql-data";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormModalInput from "../../Form/FormModalInput/FormModalInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormMultiselect from "../../Form/FormMultiselect/FormMultiselect";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import "./quiz-tips-tab.scss";

interface IQuizAndTipBlock {
  id: string;
  titleContent: string;
  displayBlock: boolean;
  displayQuiz: boolean;
  quiz?: QuizEntity | null;
  displayTips: boolean;
  tips?: Array<TipEntity> | null;
}

export default function QuizTipsTab() {
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
          title: submitData["titleContent"],
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
            query: GetQuizAndTipsBlockByContractIdDocument,
            variables: { contractId },
          },
          "GetQuizAndTipsBlock",
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

  /* API Data */
  const contractId = "1"; // TODO: Put Contract data (ID) in STORE, maybe have hook to automatically insert ID variable in gql requests
  const { loading, error, data } = useGetQuizAndTipsBlockByContractIdQuery({
    variables: { contractId },
  });
  const [
    updateQuizAndTipsBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateQuizAndTipsBlockByIdMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
  const [quizTipsData, setQuizTipsData] = useState<IQuizAndTipBlock>();
  const [quizzesData, setQuizzesData] = useState<Array<QuizEntity>>([]);
  const [tipsData, setTipsData] = useState<Array<TipEntity>>([]);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, setValue, watch, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data && data.contractCustomizations?.data && data.services?.data) {
      const { quizAndTipsBlock, quizzes, tips } = extractQuizAndTipsBlock(data);
      if (quizAndTipsBlock?.id && quizAndTipsBlock?.attributes) {
        const mappedData: IQuizAndTipBlock = {
          id: quizAndTipsBlock.id,
          titleContent:
            quizAndTipsBlock.attributes.titleContent ?? "Quiz & Astuces",
          displayBlock: quizAndTipsBlock.attributes.displayBlock,
          displayQuiz: quizAndTipsBlock.attributes.displayQuiz,
          quiz: quizAndTipsBlock.attributes.quiz?.data,
          displayTips: quizAndTipsBlock.attributes.displayTips,
          tips: quizAndTipsBlock?.attributes.tips?.data,
        };
        setQuizTipsData(mappedData);
        form.reset(mappedData);
      }
      if (quizzes && quizzes?.length > 0) {
        setQuizzesData(quizzes);
      }
      if (tips && tips?.length > 0) {
        setTipsData(tips);
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
    <div className="c-QuizTipsTab">
      {isShowingSpinner && <CommonSpinner isCover={true} />}
      <h2 className="c-QuizTipsTab__Title">{formLabels.title}</h2>
      <FormProvider {...form}>
        <form
          className="c-QuizTipsTab__Form"
          onSubmit={handleSubmit(onSubmitValid)}
          ref={focusRef}
        >
          <div className="c-QuizTipsTab__Group">
            <FormCheckbox name="displayBlock" label={formLabels.displayBlock} />
            <FormInput
              type="text"
              name="titleContent"
              label={formLabels.titleContent}
              isRequired={true}
              isDisabled={mutationLoading}
              defaultValue={quizTipsData?.titleContent}
            />
          </div>
          <div className="c-QuizTipsTab__Group">
            <FormCheckbox name="displayQuiz" label={formLabels.displayQuiz} />
            <FormModalInput<QuizEntity>
              name="quiz"
              label={formLabels.quiz}
              displayTransform={quizDisplayTransformFunction}
              buttonLabel={formLabels.quizButton}
              modalTitle={formLabels.quizModal}
              onSubmit={onQuizModalSubmit}
              formValidationMode={formValidationMode}
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
            </FormModalInput>
          </div>
          <div className="c-QuizTipsTab__Group">
            <FormCheckbox name="displayTips" label={formLabels.displayTips} />
            <FormModalInput<Array<TipEntity>>
              name="tips"
              label={formLabels.tips}
              displayTransform={tipsDisplayTransformFunction}
              buttonLabel={formLabels.tipsButton}
              modalTitle={formLabels.tipsModal}
              onSubmit={onTipsModalSubmit}
              formValidationMode={formValidationMode}
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
            </FormModalInput>
          </div>
          <div className="c-QuizTipsTab__Buttons">
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

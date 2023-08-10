import { parseJSON } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode, useEffect, useState } from "react";
import {
  AudienceEntity,
  Enum_Tip_Status,
  QuizEntity,
  TipEntity,
  useGetQuizAndTipsBlockTabQuery,
  useUpdateQuizAndTipsBlockTabMutation,
} from "../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import { extractQuizAndTipsBlock } from "../../../../../lib/graphql-data";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import { useContract } from "../../../../../hooks/useContract";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormCheckbox from "../../../../Form/FormCheckbox/FormCheckbox";
import FormModalButtonInput from "../../../../Form/FormModalButtonInput/FormModalButtonInput";
import FormSelect from "../../../../Form/FormSelect/FormSelect";
import FormMultiselect, {
  IOptionWrapper,
} from "../../../../Form/FormMultiselect/FormMultiselect";
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

interface IQuizModalFields {
  quizSelect: QuizEntity;
}

interface ITipsModalFields {
  tipsSelect_0: TipEntity;
  tipsSelect_1: TipEntity;
  tipsSelect_2: TipEntity;
}

interface IQuizAndTipsTabProps {
  audience?: AudienceEntity;
}

export default function QuizAndTipsTab({ audience }: IQuizAndTipsTabProps) {
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
  const status = Enum_Tip_Status.Published;

  /* Methods */
  function quizDisplayTransformFunction(
    quiz?: QuizEntity | undefined,
  ): ReactNode {
    return <p>{quiz?.attributes?.title ?? ""}</p>;
  }

  function quizSelectDisplayTransformFunction(quiz: QuizEntity): string {
    return quiz.attributes?.title ?? "";
  }

  function onQuizModalSubmit(submitData: IQuizModalFields) {
    return Object.values(submitData)[0];
  }

  function tipsDisplayTransformFunction(
    tips?: Array<TipEntity | undefined>,
  ): ReactNode {
    return tips?.map((tip: TipEntity | undefined, index) => {
      if (tip && tip.id) {
        return (
          <p key={tip.id + index}>
            {`${tip.attributes?.title} - ${formatDate(
              parseJSON(tip.attributes?.publishedDate),
              "dd/MM/yyyy",
            )}`}
          </p>
        );
      }
    });
  }

  function tipSelectDisplayTransformFunction(tip: TipEntity): string {
    return `${tip.attributes?.title} - ${formatDate(
      parseJSON(tip.attributes?.publishedDate),
      "dd/MM/yyyy",
    )}`;
  }

  function onTipsModalSubmit(submitData: ITipsModalFields) {
    return [
      submitData.tipsSelect_0,
      submitData.tipsSelect_1,
      submitData.tipsSelect_2,
    ];
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
            submitData["tips"]
              ?.map((tip: TipEntity) => tip?.id ?? null)
              .filter(removeNulls) ?? null,
        },
      };
      return updateQuizAndTipsBlock({
        variables,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const getQuizAndTipsBlockTabVariables: {
    contractId: string;
    status: Enum_Tip_Status;
    audienceId: string;
  } = {
    contractId,
    status,
    audienceId: "",
  };
  if (audience && audience.id) {
    getQuizAndTipsBlockTabVariables.audienceId = audience.id;
  }
  const { loading, error, data } = useGetQuizAndTipsBlockTabQuery({
    variables: getQuizAndTipsBlockTabVariables,
    fetchPolicy: "network-only",
  });
  const [
    updateQuizAndTipsBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateQuizAndTipsBlockTabMutation({
    refetchQueries: ["getQuizAndTipsBlockTab"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const [quizAndTipsData, setQuizAndTipsData] = useState<IQuizAndTipsBlock>();
  const [quizzesData, setQuizzesData] = useState<
    Array<IOptionWrapper<QuizEntity>>
  >([]);
  const [tipsData, setTipsData] = useState<Array<IOptionWrapper<TipEntity>>>(
    [],
  );
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, watch, formState } = form;
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
        const mappedOptions: Array<IOptionWrapper<QuizEntity> | null> =
          quizzes.map((quiz) => {
            return quiz ? { option: quiz } : null;
          });
        setQuizzesData(mappedOptions?.filter(removeNulls));
      }
      if (tips && tips?.length > 0) {
        const mappedOptions: Array<IOptionWrapper<TipEntity> | null> = tips.map(
          (tip) => {
            return tip ? { option: tip } : null;
          },
        );
        setTipsData(mappedOptions?.filter(removeNulls));
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
              <FormModalButtonInput<QuizEntity, IQuizModalFields>
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
              <FormModalButtonInput<Array<TipEntity>, ITipsModalFields>
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

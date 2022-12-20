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
  EditoContentDto,
  GetEditoBlockTabDocument,
  useGetEditoBlockTabQuery,
  useUpdateEditoBlockTabMutation,
} from "../../../graphql/codegen/generated-types";
import {
  comparePropertyValueByPriority,
  FocusFirstElement,
  removeNulls,
} from "../../../lib/utilities";
import { extractEditoBlock } from "../../../lib/graphql-data";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormModalInput from "../../Form/FormModalInput/FormModalInput";
import FormMultiselect, {
  IOptionWrapper,
} from "../../Form/FormMultiselect/FormMultiselect";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import "./edito-tab.scss";

interface IEditoBlock {
  id: string;
  titleContent: string;
  displayBlock: boolean;
  editoContents?: Array<EditoContentDto | null> | null;
}

export default function EditoTab() {
  /* Static Data */
  const formLabels = {
    title: "Bloc Édito",
    displayBlock: "Afficher ce bloc",
    titleContent: "Titre du bloc",
    editoContents: "Contenus à afficher",
    editoContentsButton: "Sélectionner les articles à afficher",
    editoContentsModal: "Sélection des articles",
    editoContentsModalType: "Article",
  };
  const submitButtonLabel = "Enregistrer les modifications";
  const cancelButtonLabel = "Annuler les modifications";

  /* Methods */
  function editoContentsDisplayTransformFunction(
    editoContent: Array<EditoContentDto | undefined>,
  ): ReactNode {
    return editoContent?.map((editoContent, index) => {
      if (editoContent && editoContent.id) {
        return (
          <p key={editoContent.id + index}>
            {`${editoContent.attributes?.title} - ${format(
              parseJSON(editoContent.attributes?.publishedAt),
              "dd/MM/yyyy",
            )}` ?? ""}
          </p>
        );
      }
    });
  }

  function editoContentSelectDisplayTransformFunction(
    editoContent: EditoContentDto,
  ): string {
    return (
      `${editoContent.attributes?.title} - ${format(
        parseJSON(editoContent.attributes?.publishedAt),
        "dd/MM/yyyy",
      )}` ?? ""
    );
  }

  function onContentModalSubmit(submitData: {
    [key: string]: Array<EditoContentDto | undefined>;
  }) {
    const contents = Object.values(submitData)?.filter(removeNulls);
    setValue("editoContents", contents, { shouldDirty: true });
  }

  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateEditoBlockId: submitData["id"],
        data: {
          displayBlock: submitData["displayBlock"],
          titleContent: submitData["titleContent"],
          editoContents:
            submitData["editoContents"]?.map(
              (editoContent: EditoContentDto) => editoContent?.id ?? null,
            ) ?? null,
        },
      };
      await updateEditoBlock({
        variables,
        refetchQueries: [
          {
            query: GetEditoBlockTabDocument,
            variables: { contractId },
          },
          "getEditoBlockTab",
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
  const { loading, error, data } = useGetEditoBlockTabQuery({
    variables: { contractId },
  });
  const [updateEditoBlock, { loading: mutationLoading, error: mutationError }] =
    useUpdateEditoBlockTabMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
  const [editoData, setEditoData] = useState<IEditoBlock>();
  const [editoContents, setEditoContents] = useState<
    Array<IOptionWrapper<EditoContentDto>>
  >([]);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, setValue, watch, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data?.getEditoBlockDTO && data.getEditoContentDTOs) {
      const { editoBlock, editoContents } = extractEditoBlock(data);
      if (editoBlock?.id) {
        const mappedData: IEditoBlock = {
          id: editoBlock.id,
          titleContent: editoBlock.titleContent,
          displayBlock: editoBlock.displayBlock,
          editoContents: editoBlock.editoContents,
        };
        setEditoData(mappedData);
        form.reset(mappedData);
      }
      const sortedEditoContents = [...(editoContents ?? [])];
      sortedEditoContents?.sort(
        comparePropertyValueByPriority("contentType", {
          news: 0,
          event: 1,
          tip: 2,
          quiz: 3,
          freeContent: 4,
        }),
      );
      const mappedOptions: Array<IOptionWrapper<EditoContentDto> | null> =
        sortedEditoContents.map((editoContent) => {
          return editoContent
            ? { group: editoContent.typeName, option: editoContent }
            : null;
        });
      setEditoContents(
        mappedOptions?.filter((e): e is Exclude<typeof e, null> => e !== null),
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
      className="c-EditoTab"
      id="panel-edito"
      role="tabpanel"
      aria-labelledby="tab-edito"
    >
      {isShowingSpinner && <CommonSpinner isCover={true} />}
      <h2 className="c-EditoTab__Title">{formLabels.title}</h2>
      <FormProvider {...form}>
        <form
          className="c-EditoTab__Form"
          onSubmit={handleSubmit(onSubmitValid)}
          ref={focusRef}
        >
          <div className="c-EditoTab__Group c-EditoTab__Group_short">
            <FormCheckbox name="displayBlock" label={formLabels.displayBlock} />
            <FormInput
              type="text"
              name="titleContent"
              label={formLabels.titleContent}
              isRequired={true}
              isDisabled={mutationLoading}
              defaultValue={editoData?.titleContent}
            />
          </div>
          <div className="c-EditoTab__Group">
            <FormModalInput<Array<EditoContentDto>>
              name="editoContents"
              label={formLabels.editoContents}
              displayTransform={editoContentsDisplayTransformFunction}
              buttonLabel={formLabels.editoContentsButton}
              modalTitle={formLabels.editoContentsModal}
              onSubmit={onContentModalSubmit}
              formValidationMode={formValidationMode}
              isDisabled={mutationLoading}
              isRequired={true}
            >
              <FormMultiselect<EditoContentDto>
                name="editoContentsSelect"
                label={formLabels.editoContentsModalType}
                displayTransform={editoContentSelectDisplayTransformFunction}
                options={editoContents}
                selectAmount={3}
                optionKey={"id"}
                defaultValues={watch("editoContents")}
              />
            </FormModalInput>
          </div>
          <div className="c-EditoTab__Buttons">
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

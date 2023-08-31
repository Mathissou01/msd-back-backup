import { parseJSON } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode, useEffect, useState } from "react";
import {
  AudienceEntity,
  EditoContentDto,
  useGetEditoBlockTabByContractIdAndAudienceIdQuery,
  useUpdateEditoBlockByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import {
  comparePropertyValueByPriority,
  formatDate,
  removeNulls,
} from "../../../../../lib/utilities";
import { extractEditoBlock } from "../../../../../lib/graphql-data";
import { TEditorialContentTypes } from "../../../../../lib/editorial";
import { useContract } from "../../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormCheckbox from "../../../../Form/FormCheckbox/FormCheckbox";
import FormModalButtonInput from "../../../../Form/FormModalButtonInput/FormModalButtonInput";
import FormMultiselect, {
  IOptionWrapper,
  mapOptionsInWrappers,
} from "../../../../Form/FormMultiselect/FormMultiselect";
import "./edito-tab.scss";

interface IEditoBlock {
  id: string;
  titleContent: string;
  displayBlock: boolean;
  editoContents?: Array<EditoContentDto | null> | null;
}

interface IEditoTabProps {
  activatedTypes: Array<TEditorialContentTypes>;
  audience?: AudienceEntity;
}

interface IEditoContentsModalFields {
  editoContentsSelect_0: EditoContentDto;
  editoContentsSelect_1: EditoContentDto;
  editoContentsSelect_2: EditoContentDto;
}
export default function EditoTab({ activatedTypes, audience }: IEditoTabProps) {
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
    editoContent?: Array<EditoContentDto>,
  ): ReactNode {
    return editoContent?.map((editoContent, index) => {
      if (editoContent && editoContent.id) {
        return (
          <p key={editoContent.id + index}>
            {`${editoContent.attributes?.title} - ${formatDate(
              parseJSON(editoContent.attributes?.publishedDate),
            )}`}
          </p>
        );
      }
    });
  }

  function onContentModalSubmit(submitData: IEditoContentsModalFields) {
    return [
      submitData.editoContentsSelect_0,
      submitData.editoContentsSelect_1,
      submitData.editoContentsSelect_2,
    ];
  }

  function editoContentSelectDisplayTransformFunction(
    editoContent: EditoContentDto,
  ): string {
    return `${editoContent.attributes?.title} - ${formatDate(
      parseJSON(editoContent.attributes?.publishedDate),
    )}`;
  }

  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateEditoBlockId: submitData["id"],
        data: {
          displayBlock: submitData["displayBlock"],
          titleContent: submitData["titleContent"],
          editoContents:
            submitData["editoContents"]
              .filter(removeNulls)
              ?.map((editoContent: EditoContentDto, index: number) => {
                return {
                  id: editoData?.editoContents
                    ? editoData.editoContents[index]?.componentId
                    : undefined,
                  __typename: "ComponentLinksEditoContent",
                  new:
                    editoContent.contentType === "new" ? editoContent.id : null,
                  event:
                    editoContent.contentType === "event"
                      ? editoContent.id
                      : null,
                  tip:
                    editoContent.contentType === "tip" ? editoContent.id : null,
                  quiz:
                    editoContent.contentType === "quiz"
                      ? editoContent.id
                      : null,
                  freeContent:
                    editoContent.contentType === "free-content"
                      ? editoContent.id
                      : null,
                };
              })
              .filter(removeNulls) ?? null,
        },
      };
      return updateEditoBlock({
        variables,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const getEditoBlockTabVariables: {
    contractId: string;
    audienceId: string;
  } = {
    contractId,
    audienceId: "",
  };
  if (audience && audience.id) {
    getEditoBlockTabVariables.audienceId = audience.id;
  }
  const { loading, error, data } =
    useGetEditoBlockTabByContractIdAndAudienceIdQuery({
      variables: getEditoBlockTabVariables,
      fetchPolicy: "no-cache",
    });
  const [updateEditoBlock, { loading: mutationLoading, error: mutationError }] =
    useUpdateEditoBlockByIdMutation({
      refetchQueries: ["getEditoBlockTabByContractIdAndAudienceId"],
      awaitRefetchQueries: true,
    });

  /* Local Data */
  const [isInitialized, setIsInitialized] = useState(false);
  const [editoData, setEditoData] = useState<IEditoBlock>();
  const [editoContents, setEditoContents] = useState<
    Array<IOptionWrapper<EditoContentDto>>
  >([]);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, watch, formState } = form;
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
        setIsInitialized(true);
        form.reset(mappedData);
      }
      const filteredEditoContents = [...(editoContents ?? [])].filter(
        (content) => {
          if (
            content?.contentType &&
            // typeof TEditoContentTypes &&
            activatedTypes?.includes(
              content.contentType as TEditorialContentTypes,
            )
          ) {
            return content;
          }
        },
      );
      filteredEditoContents?.sort(
        comparePropertyValueByPriority("contentType", {
          new: 0,
          event: 1,
          tip: 2,
          quiz: 3,
          "free-content": 4,
        }),
      );
      setEditoContents(mapOptionsInWrappers(filteredEditoContents, "typeName"));
    }
  }, [form, data, activatedTypes]);

  return (
    <div
      className="c-EditoTab"
      id="panel-edito"
      role="tabpanel"
      aria-labelledby="tab-edito"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading || !isInitialized}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-EditoTab__Title">{formLabels.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-EditoTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-EditoTab__Group c-EditoTab__Group_short">
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
                defaultValue={editoData?.titleContent}
              />
            </div>
            <div className="c-EditoTab__Group">
              <FormModalButtonInput<
                Array<EditoContentDto>,
                IEditoContentsModalFields
              >
                name="editoContents"
                label={formLabels.editoContents}
                displayTransform={editoContentsDisplayTransformFunction}
                buttonLabel={formLabels.editoContentsButton}
                modalTitle={formLabels.editoContentsModal}
                onModalSubmit={onContentModalSubmit}
                isDisabled={mutationLoading}
                isRequired={true}
              >
                <FormMultiselect<EditoContentDto>
                  name="editoContentsSelect"
                  label={formLabels.editoContentsModalType}
                  displayTransform={editoContentSelectDisplayTransformFunction}
                  options={editoContents}
                  selectAmount={3}
                  optionKey={"uniqueId"}
                  defaultValues={watch("editoContents")}
                />
              </FormModalButtonInput>
            </div>
            <div className="c-EditoTab__Buttons">
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

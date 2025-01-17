import { parseJSON } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode, useEffect, useState } from "react";
import {
  AudienceEntity,
  EditoContentDto,
  useGetTopContentBlockTabByContractIdAndAudienceIdQuery,
  useUpdateTopContentBlockByIdMutation,
  Enum_Topcontentdto_Status,
} from "../../../../../graphql/codegen/generated-types";
import { extractTopContentBlock } from "../../../../../lib/graphql-data";
import { formatDate } from "../../../../../lib/utilities";
import { getRightsByLabel } from "../../../../../lib/user";
import { useUser } from "../../../../../hooks/useUser";
import { useContract } from "../../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormCheckbox from "../../../../Form/FormCheckbox/FormCheckbox";
import FormModalButtonInput from "../../../../Form/FormModalButtonInput/FormModalButtonInput";
import FormSelect from "../../../../Form/FormSelect/FormSelect";
import FormRadioInput from "../../../../Form/FormRadioInput/FormRadioInput";
import {
  IOptionWrapper,
  mapOptionsInWrappers,
} from "../../../../Form/FormMultiselect/FormMultiselect";
import "./top-content-tab.scss";

interface ITopContentBlock {
  id: string;
  displayBlock: boolean;
  titleContent: string;
  hasTopContent: boolean;
  displayLastThreeContents: boolean;
  topContent?: EditoContentDto | null;
  componentId?: string | null;
}

interface ITopContentModalFields {
  topContentRadio: string;
  topContentSelect: EditoContentDto;
}

interface ITopContentTabProps {
  audience?: AudienceEntity;
}

export default function TopContentTab({ audience }: ITopContentTabProps) {
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
    topContent: Partial<EditoContentDto> | undefined,
  ): ReactNode {
    return topContent ? (
      <p>
        {`${topContent?.attributes?.title} - ${formatDate(
          parseJSON(topContent?.attributes?.publishedDate),
        )}`}
      </p>
    ) : (
      <></>
    );
  }

  function topContentSelectDisplayTransformFunction(
    topContent: EditoContentDto,
  ): string {
    return `${topContent?.attributes?.title} - ${formatDate(
      parseJSON(topContent?.attributes?.publishedDate),
    )}`;
  }

  function onTopContentModalSubmit(submitData: ITopContentModalFields) {
    return submitData.topContentSelect;
  }

  function onTopContentModalRadioChange(changeData: unknown) {
    setCurrentTopContents(
      mapOptionsInWrappers(
        allTopContents?.filter(
          (topContent) => topContent?.contentType === changeData,
        ) ?? [],
      ),
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
          topContent: [
            {
              id: submitData["componentId"]
                ? submitData["componentId"]
                : undefined,
              __typename: "ComponentLinksTopContent",
              new:
                submitData["topContent"].contentType === "new"
                  ? submitData["topContent"]?.id ?? null
                  : null,
              events:
                submitData["topContent"].contentType === "event"
                  ? submitData["topContent"]?.id ?? null
                  : null,
            },
          ],
        },
      };
      return updateTopContentBlock({
        variables,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const getTopContentBlockVariables: {
    contractId: string;
    audienceId: string;
    status: Enum_Topcontentdto_Status;
  } = {
    contractId,
    audienceId: "",
    status: "published" as Enum_Topcontentdto_Status,
  };
  if (audience && audience.id) {
    getTopContentBlockVariables.audienceId = audience.id;
    getTopContentBlockVariables.status =
      "published" as Enum_Topcontentdto_Status;
  }
  const { loading, error, data } =
    useGetTopContentBlockTabByContractIdAndAudienceIdQuery({
      variables: getTopContentBlockVariables,
      fetchPolicy: "no-cache",
    });
  const [
    updateTopContentBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateTopContentBlockByIdMutation({
    refetchQueries: ["getTopContentBlockTabByContractIdAndAudienceId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Homepage", userRights);
  const [isInitialized, setIsInitialized] = useState(false);
  const [topContentData, setTopContentData] = useState<ITopContentBlock>();
  const [allTopContents, setAllTopContents] = useState<Array<EditoContentDto>>(
    [],
  );
  const [currentTopContents, setCurrentTopContents] = useState<
    Array<IOptionWrapper<EditoContentDto>>
  >([]);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, watch, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data?.getTopContentBlockDTO && data.getTopContentDTOs) {
      const { topContentBlock, topContents } = extractTopContentBlock(data);
      if (topContentBlock?.id) {
        const mappedData: ITopContentBlock = {
          componentId: topContentBlock.topContent?.componentId,
          id: topContentBlock.id,
          displayBlock: topContentBlock.displayBlock,
          displayLastThreeContents: topContentBlock.displayLastThreeContents,
          hasTopContent: topContentBlock.hasTopContent,
          titleContent: topContentBlock.titleContent,
          topContent: topContentBlock.topContent,
        };
        setTopContentData(mappedData);
        setIsInitialized(true);
        form.reset(mappedData);
      }
      setAllTopContents(
        (topContents ?? [])?.filter(
          (e): e is Exclude<typeof e, null> => e !== null,
        ),
      );
      if (topContents && topContents.length > 0) {
        setCurrentTopContents(mapOptionsInWrappers(topContents));
      }
    }
  }, [form, data]);

  return (
    <div
      className="c-TopContentTab"
      id="panel-topContent"
      role="tabpanel"
      aria-labelledby="tab-topContent"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading || !isInitialized}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-TopContentTab__Title">{formLabels.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-TopContentTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-TopContentTab__Group c-TopContentTab__Group_short">
              <FormCheckbox
                name="displayBlock"
                label={formLabels.displayBlock}
                isDisabled={!userPermissions.update}
              />
              <FormInput
                type="text"
                name="titleContent"
                label={formLabels.titleContent}
                isRequired={true}
                isDisabled={mutationLoading || !userPermissions.update}
                defaultValue={topContentData?.titleContent}
              />
            </div>
            <div className="c-TopContentTab__Group">
              <FormCheckbox
                name="hasTopContent"
                label={formLabels.hasTopContent}
                isDisabled={!userPermissions.update}
              />
              <FormModalButtonInput<EditoContentDto, ITopContentModalFields>
                name="topContent"
                label={formLabels.topContent}
                displayTransform={topContentDisplayTransformFunction}
                buttonLabel={formLabels.topContentButton}
                modalTitle={formLabels.topContentModal}
                onModalSubmit={onTopContentModalSubmit}
                isRequired={true}
                modalHasRequiredChildren="all"
                isDisabled={mutationLoading || !userPermissions.update}
                defaultValue={data?.getTopContentBlockDTO?.topContent}
              >
                <div className="c-TopContentTab__Group">
                  <FormRadioInput
                    name={"topContentRadio"}
                    displayName={formLabels.topContentModalRadio}
                    options={[
                      { label: "Actualité", value: "new" },
                      { label: "Evénement", value: "event" },
                    ]}
                    defaultValue={watch("topContent")?.contentType ?? "new"}
                    isRequired={true}
                    onChange={onTopContentModalRadioChange}
                    isDisabled={!userPermissions.update}
                  />
                </div>
                <div className="c-TopContentTab__Group">
                  <FormSelect<EditoContentDto>
                    name="topContentSelect"
                    label={formLabels.topContentModalType}
                    displayTransform={topContentSelectDisplayTransformFunction}
                    isDisabled={!userPermissions.update}
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
                isDisabled={!userPermissions.update}
              />
            </div>
            <div className="c-TopContentTab__Buttons">
              <CommonButton
                type="submit"
                label={submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isDirty || !userPermissions.update}
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

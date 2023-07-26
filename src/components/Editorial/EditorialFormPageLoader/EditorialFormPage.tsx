import React from "react";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { ApolloError } from "@apollo/client";
import { IEditorialFields } from "../../../lib/editorial";
import {
  IFormBlock,
  TDynamicFieldConfiguration,
} from "../../../lib/dynamic-blocks";
import { EStatus } from "../../../lib/status";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import EditorialForm from "../../../components/Editorial/EditorialForm/EditorialForm";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { IFormSingleMultiselectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import {
  IEditorialStaticFieldsLabels,
  TEditorialStaticFields,
} from "../EditorialForm/EditorialStaticFields/EditorialStaticFields";

const defaultDynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
  { option: "ComponentBlocksWysiwyg" },
  { option: "ComponentBlocksSubHeading" },
  { option: "ComponentBlocksHorizontalRule" },
  { option: "ComponentBlocksVideo" },
  { option: "ComponentBlocksFile" },
  { option: "ComponentBlocksImage" },
];

export interface IEditoContentLabels {
  pageTitle?: string;
  createTitle?: string;
  form: IEditorialStaticFieldsLabels;
}

export interface ICommonMutationVariables {
  title: string;
  tags: Array<string>;
  image: string;
  shortDescription: string;
  blocks: Array<IFormBlock>;
  unpublishedDate: string;
}

export interface ICommonUpdateMutationVariables
  extends ICommonMutationVariables {
  toBeUpdated: boolean;
}

export interface IEditorialFormPage {
  labels: IEditoContentLabels;
  staticFieldsOverride?: Array<TEditorialStaticFields>;
  dynamicFieldConfigurations?: Array<TDynamicFieldConfiguration>;
  onCreate?: (commonMutationVariables: ICommonMutationVariables) => void;
  onUpdate: (
    updateId: string,
    commonMutationVariables: ICommonUpdateMutationVariables,
    status: EStatus,
  ) => void;
  onPublish: (contentId: string) => void;
  onDepublish: (contentId: string) => void;
  onPreview: (contentId: string) => void;
  subServiceId?: string;
}

export interface IEditorialFormPageProps {
  contentId: string;
  isCreateMode: boolean;
  mappedData: IEditorialFields;
  isLoading: boolean;
  errors: Array<ApolloError | undefined>;
  pageProps: IEditorialFormPage;
}

export default function EditorialFormPage({
  contentId,
  isCreateMode,
  mappedData,
  isLoading,
  errors,
  pageProps,
}: IEditorialFormPageProps) {
  const {
    labels,
    dynamicFieldConfigurations,
    staticFieldsOverride,
    onCreate,
    onUpdate,
    onPublish,
    onDepublish,
    onPreview,
    subServiceId,
  } = pageProps;
  const title = labels.pageTitle
    ? labels.pageTitle
    : isCreateMode && labels.createTitle
    ? labels.createTitle
    : mappedData.title;

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const commonMutationVariables = {
      title: submitData.title,
      tags: submitData.tags?.map(
        (option: IFormSingleMultiselectOption) => option.value,
      ),
      image: submitData.image.id,
      shortDescription: submitData.shortDescription,
      blocks: submitData.blocks?.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ id, ...rest }: IFormBlock) => rest,
      ),
      unpublishedDate: submitData.unpublishedDate,
      audiences: submitData.audiences.map(
        (user: IFormSingleMultiselectOption) => user.value.toString(),
      ),
    };
    if (isCreateMode && onCreate) {
      onCreate(commonMutationVariables);
    } else {
      onUpdate(
        contentId,
        {
          ...commonMutationVariables,
          toBeUpdated: true,
        },
        submitData.status,
      );
    }
  }

  return (
    <div className="o-FormEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading} errors={errors}>
          <EditorialForm
            data={mappedData}
            staticFieldsOverride={staticFieldsOverride}
            dynamicFieldConfigurations={
              dynamicFieldConfigurations ?? defaultDynamicFieldConfigurations
            }
            onSubmitValid={onSubmit}
            onPublish={() => onPublish(contentId)}
            onDepublish={() => onDepublish(contentId)}
            onPreview={() => onPreview(contentId)}
            labels={labels.form}
            additionalPath={subServiceId}
          />
        </CommonLoader>
      </>
    </div>
  );
}

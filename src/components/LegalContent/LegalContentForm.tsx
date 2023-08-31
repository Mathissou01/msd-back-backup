import React from "react";
import { FieldValues } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { TDynamicFieldConfiguration } from "../../lib/dynamic-blocks";
import {
  ILegalContentFormButtonsLabels,
  ILegalContentStaticFields,
  ILegalContentStaticFieldsLabels,
  defaultDynamicFieldConfigurations,
} from "../../lib/legal-content";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import FormDynamicBlocks from "../Form/FormDynamicBlocks/FormDynamicBlocks";
import PageTitle from "../PageTitle/PageTitle";
import LegalContentFormButtons from "./LegalContentFormButtons/LegalContentFormButtons";
import LegalContentStaticFields from "./LegalContentStaticFields/LegalContentStaticFields";
import LegalContentSideBar from "./LegalContentSideBar/LegalContentSideBar";
import "./legal-content-form.scss";

interface ILegalContentFormProps {
  title: string;
  data?: ILegalContentStaticFields;
  onPreview?: () => void;
  onCancel: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
  onChangeActivated: () => void;
  labels: ILegalContentStaticFieldsLabels;
  buttonLabels?: ILegalContentFormButtonsLabels;
  dynamicFieldConfigurations?: Array<TDynamicFieldConfiguration>;
  isLoading: boolean;
  errors?: Array<ApolloError | undefined>;
}

export default function LegalContentForm({
  title,
  data,
  onPreview,
  onCancel,
  onSubmit,
  onChangeActivated,
  labels,
  buttonLabels,
  dynamicFieldConfigurations,
  isLoading,
  errors,
}: ILegalContentFormProps) {
  const contentButton = (
    <LegalContentFormButtons<ILegalContentFormButtonsLabels>
      onPreview={onPreview}
      onCancel={onCancel}
      labels={buttonLabels}
      isActivated={data ? data.isActivated : false}
      onSubmit={onSubmit}
      onChangeActivated={onChangeActivated}
    />
  );
  const fieldContent = (
    <>
      <LegalContentStaticFields labels={labels} />
      <FormDynamicBlocks
        name={"blocks"}
        blockConfigurations={
          dynamicFieldConfigurations ?? defaultDynamicFieldConfigurations
        }
      />
    </>
  );
  const sidebarContent = <LegalContentSideBar />;
  const formOptions: IFormlayoutOptions<ILegalContentStaticFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
  };

  return (
    <CommonLoader isLoading={isLoading} errors={errors}>
      <div className="o-FormEditPage">
        <PageTitle title={title} />
        <FormLayout<ILegalContentStaticFields>
          buttonContent={contentButton}
          formContent={fieldContent}
          sidebarContent={sidebarContent}
          formOptions={formOptions}
        />
      </div>
    </CommonLoader>
  );
}

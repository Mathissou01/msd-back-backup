import { TableColumn } from "react-data-table-component";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  GetContentTypeDtOsDocument,
  useGetContentTypeDtOsQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import { useContentTypeMutations } from "../../../hooks/useContentTypeMutations";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../components/Common/CommonDataTable/CommonDataTable";
import DataTableInput from "../../../components/Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import DataTableTextArea from "../../../components/Common/CommonDataTable/Inputs/DataTableTextArea/DataTableTextArea";
import DataTableForm from "../../../components/Common/CommonDataTable/DataTableForm/DataTableForm";
import FormInput from "../../../components/Form/FormInput/FormInput";
import "./edito-type-contenu-page.scss";

interface IContentTypeTableRow {
  id: string;
  subServiceId: string;
  editState: boolean;
  name: string;
  description: string;
  type:
    | "cookiesSubService"
    | "accessibilitySubService"
    | "contactUsSubService"
    | "cguSubService"
    | "confidentialitySubService"
    | "newsSubService"
    | "tipSubService"
    | "quizSubService"
    | "eventSubService"
    | "freeContentSubService"
    | string;
}

export default function EditoTypeContenuPage() {
  /* Static Data */
  const title = "Types de contenu";
  const description =
    "Ajoutez un type de contenu. Les types de contenu permettent de publier des pages dans une nouvelle rubrique. Nous vous conseillons de limiter le nombre de types de contenu personnalisés.";
  const tableLabels = {
    title: "Liste des types de contenu",
    columns: {
      name: "Type de contenu",
      description: "Description",
    },
    addRow: {
      title: "Ajouter un type de contenu",
      nameLabel: "Nom du type",
      descriptionLabel: "Description",
      maxCharactersLabel: "caractères maximum",
    },
  };
  const tableValidation = {
    maxLengthName: 30,
    maxLengthDescription: 70,
  };

  /* Methods */
  function getInputRef(i: number) {
    inputRefs.current[i] = createRef();
    return inputRefs.current[i];
  }

  function getTextAreaRef(i: number) {
    textAreaRefs.current[i] = createRef();
    return textAreaRefs.current[i];
  }

  async function onConfirm(row: IContentTypeTableRow, i: number) {
    setIsUpdatingData(true);
    const variables = {
      updateSubServiceId: row.subServiceId,
      data: {
        name: inputRefs.current[i].current?.value,
        description: textAreaRefs.current[i].current?.value,
      },
    };
    switch (row.type) {
      case "cookiesSubService":
        return updateCookies({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "accessibilitySubService":
        return updateAccessibility({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "contactUsSubService":
        return updateContactUs({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "cguSubService":
        return updateCgu({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "confidentialitySubService":
        return updateConfidentiality({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "newsSubService":
        return updateNews({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "tipSubService":
        return updateTip({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "quizSubService":
        return updateQuiz({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "eventSubService":
        return updateEvent({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
      case "freeContentSubService":
        return updateFreeContent({
          variables,
          refetchQueries: [
            {
              query: GetContentTypeDtOsDocument,
              variables: { contractId },
            },
            "getContentTypeDTOs",
          ],
        });
    }
  }

  // async function onDelete(row: IContentTypeTableRow) {
  //   const variables = {
  //     deleteTagId: row.subServiceId,
  //   };
  //   return deleteContentTypeMutation({
  //     variables,
  //     refetchQueries: [
  //       {
  //         query: GetContentTypeDtOsDocument,
  //         variables: { contractId },
  //       },
  //       "getContentTypeDTOs",
  //     ],
  //   });
  // }

  async function onAddRow(data: FieldValues) {
    setIsUpdatingData(true);
    const variables = {
      contractId,
      name: data["name"],
      description: data["description"],
    };
    return createContentTypeMutation({
      variables,
      refetchQueries: [
        {
          query: GetContentTypeDtOsDocument,
          variables: { contractId },
        },
        "getContentTypeDTOs",
      ],
    });
  }

  /* External Data */
  const { contractId } = useContract();
  const {
    loading: dataLoading,
    error,
    data,
  } = useGetContentTypeDtOsQuery({
    variables: { contractId },
  });
  const {
    mutations,
    loading: loadingMutation,
    errors: mutationErrors,
  } = useContentTypeMutations();
  const {
    updateCookies,
    updateAccessibility,
    updateContactUs,
    updateCgu,
    updateConfidentiality,
    updateNews,
    updateTip,
    updateQuiz,
    updateEvent,
    updateFreeContent,
    createContentTypeMutation,
  } = mutations;

  /* Local Data */
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const textAreaRefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>([]);
  const [tableData, setTableData] = useState<Array<IContentTypeTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData || loadingMutation;
  const isLoading = dataLoading || isLoadingMutation;
  const errors = [...mutationErrors, error];

  const tableColumns: Array<TableColumn<IContentTypeTableRow>> = [
    {
      id: "id",
      selector: (row) => row.subServiceId,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.name,
      selector: (row) => row.name,
      cell: (row, rowIndex) => (
        <DataTableInput
          ref={getInputRef(rowIndex)}
          isEditState={row.editState}
          data={row.name}
          maxLengthValidation={tableValidation.maxLengthName}
        />
      ),
      sortable: true,
    },
    {
      id: "description",
      name: tableLabels.columns.description,
      selector: (row) => row.description,
      cell: (row, rowIndex) => (
        <DataTableTextArea
          ref={getTextAreaRef(rowIndex)}
          isEditState={row.editState}
          data={row.description}
          maxLengthValidation={tableValidation.maxLengthDescription}
        />
      ),
      sortable: true,
    },
  ];

  useEffect(() => {
    setTableData(
      data?.getContentTypeDTOs
        ?.map((contentType) => {
          if (contentType) {
            return {
              id: `${contentType.type}_${contentType.subServiceId}`,
              ...contentType,
              description: contentType.description ?? "",
              editState: false,
            };
          }
        })
        .filter(removeNulls) ?? [],
    );
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  return (
    <>
      <div className="c-EditoTypeContenuPage">
        <PageTitle title={title} description={description} />
        <h2 className="c-EditoTypeContenuPage__Title">{tableLabels.title}</h2>
        <div className="c-EditoTypeContenuPage__Table">
          <CommonLoader
            isLoading={isLoading}
            isShowingContent={isLoadingMutation}
            hasDelay={isLoadingMutation}
            errors={errors}
          >
            <CommonDataTable
              columns={tableColumns}
              data={tableData}
              defaultSortFieldId={"name"}
              isLoading={isLoading}
              hasEditAction={true}
              hasDeleteAction={true}
              deleteVisibleCondition={() => false}
              onConfirm={(row, rowIndex) => onConfirm(row, rowIndex)}
              // onDelete={(row) => onDelete(row)}
            />
            <DataTableForm
              title={tableLabels.addRow.title}
              onFormSubmit={(data) => onAddRow(data)}
            >
              <FormInput
                type="text"
                name="name"
                label={tableLabels.addRow.nameLabel}
                maxLengthValidation={tableValidation.maxLengthName}
                minLengthValidation={1}
                validationLabel={`${tableValidation.maxLengthName} ${tableLabels.addRow.maxCharactersLabel}`}
                isRequired={true}
                isDisabled={isLoadingMutation}
                labelStyle="table"
                validationStyle="multiline"
              />
              <FormInput
                type="text"
                name="description"
                label={tableLabels.addRow.descriptionLabel}
                maxLengthValidation={tableValidation.maxLengthDescription}
                minLengthValidation={1}
                validationLabel={`${tableValidation.maxLengthDescription} ${tableLabels.addRow.maxCharactersLabel}`}
                isDisabled={isLoadingMutation}
                labelStyle="table"
                validationStyle="multiline"
              />
            </DataTableForm>
          </CommonLoader>
        </div>
      </div>
    </>
  );
}

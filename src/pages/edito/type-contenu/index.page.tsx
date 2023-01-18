import { TableColumn } from "react-data-table-component";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  GetContentTypeDtOsDocument,
  useCreateContentTypeMutation,
  useGetContentTypeDtOsQuery,
  useUpdateContentTypeMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
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
  type: string;
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
    console.log(row, inputRefs.current[i].current, i);
    console.log(inputRefs.current[i].current?.value);
    console.log(textAreaRefs.current[i].current?.value);
    const variables = {
      updateFreeContentSubServiceId: row.subServiceId,
      data: {
        name: inputRefs.current[i].current?.value,
        description: textAreaRefs.current[i].current?.value,
      },
    };
    return updateContentTypeMutation({
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
  const [
    updateContentTypeMutation,
    {
      loading: updateContentTypeMutationLoading,
      error: updateContentTypeMutationError,
    },
  ] = useUpdateContentTypeMutation();
  const [
    createContentTypeMutation,
    {
      loading: createContentTypeMutationLoading,
      error: createContentTypeMutationError,
    },
  ] = useCreateContentTypeMutation();

  /* Local Data */
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const textAreaRefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>([]);
  const [tableData, setTableData] = useState<Array<IContentTypeTableRow>>([]);

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
              editState: false,
            };
          }
        })
        .filter(removeNulls) ?? [],
    );
  }, [data]);

  return (
    <>
      <div className="c-EditoTypeContenuPage">
        <PageTitle title={title} description={description} />
        <h2 className="c-EditoTypeContenuPage__Title">{tableLabels.title}</h2>
        <div className="c-EditoTypeContenuPage__Table">
          <CommonLoader
            isLoading={
              dataLoading ||
              updateContentTypeMutationLoading ||
              createContentTypeMutationLoading
            }
            isShowingContent={
              updateContentTypeMutationLoading ||
              createContentTypeMutationLoading
            }
            hasDelay={
              updateContentTypeMutationLoading ||
              createContentTypeMutationLoading
            }
            errors={[
              error,
              updateContentTypeMutationError,
              createContentTypeMutationError,
            ]}
          >
            <CommonDataTable
              columns={tableColumns}
              data={tableData}
              defaultSortFieldId={"name"}
              isLoading={
                updateContentTypeMutationLoading ||
                createContentTypeMutationLoading
              }
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
                isDisabled={createContentTypeMutationLoading}
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
                isDisabled={createContentTypeMutationLoading}
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

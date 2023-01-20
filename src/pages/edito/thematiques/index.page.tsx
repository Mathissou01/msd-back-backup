import { TableColumn } from "react-data-table-component";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  CountContentPerTagDocument,
  useCountContentPerTagQuery,
  useCreateNewTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable, {
  ICommonDataTableValidation,
} from "../../../components/Common/CommonDataTable/CommonDataTable";
import DataTableInput from "../../../components/Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import "./edito-thematiques-page.scss";
import DataTableForm from "../../../components/Common/CommonDataTable/DataTableForm/DataTableForm";
import FormInput from "../../../components/Form/FormInput/FormInput";

interface ITagTableRow {
  id: string;
  editState: boolean;
  name: string;
  count: number;
}

export default function EditoThematiquesPage() {
  /* Static Data */
  const title = "Gestion des thématiques";
  const description =
    "Ajoutez ou modifiez les thématiques des contenus éditoriaux, supprimez les thématiques inutilisées.";
  const tableLabels = {
    title: "Liste des thématiques (tags)",
    columns: {
      name: "Nom de la thématique",
      count: "Contenus associés",
    },
    addRow: {
      title: "Ajouter une thématique",
      maxCharactersLabel: "caractères maximum",
    },
  };
  const tableValidation = {
    tagName: "Un Tag avec ce nom existe déjà",
  };

  /* Methods */
  function getRef(i: number) {
    inputRefs.current[i] = createRef();
    return inputRefs.current[i];
  }

  function confirmValidation(
    row: ITagTableRow,
    i: number,
  ): ICommonDataTableValidation {
    const isValid = !tableData.some(
      (row) => row.name === inputRefs.current[i].current?.value,
    );
    return { isValid, errorMessage: tableValidation.tagName };
  }

  async function onConfirm(row: ITagTableRow, i: number) {
    setIsUpdatingData(true);
    const variables = {
      updateTagId: row.id,
      data: {
        name: inputRefs.current[i].current?.value,
      },
    };
    return updateTagMutation({
      variables,
      refetchQueries: [
        {
          query: CountContentPerTagDocument,
          variables: { contractId },
        },
        "countContentPerTag",
      ],
    });
  }

  async function onDelete(row: ITagTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteTagId: row.id,
    };
    return deleteTagMutation({
      variables,
      refetchQueries: [
        {
          query: CountContentPerTagDocument,
          variables: { contractId },
        },
        "countContentPerTag",
      ],
    });
  }

  function addRowValidation(data: FieldValues): ICommonDataTableValidation {
    const isValid = !tableData.some((row) => row.name === data["name"]);
    return { isValid, errorMessage: tableValidation.tagName };
  }

  async function onAddRow(data: FieldValues) {
    setIsUpdatingData(true);
    const variables = {
      contractId,
      tagName: data["name"],
    };
    return createNewTagMutation({
      variables,
      refetchQueries: [
        {
          query: CountContentPerTagDocument,
          variables: { contractId },
        },
        "countContentPerTag",
      ],
    });
  }

  /* External Data */
  const { contractId } = useContract();
  const {
    loading: dataLoading,
    error,
    data,
  } = useCountContentPerTagQuery({
    variables: { contractId },
  });
  const [
    updateTagMutation,
    { loading: updateTagMutationLoading, error: updateTagMutationError },
  ] = useUpdateTagMutation();
  const [
    deleteTagMutation,
    { loading: deleteTagMutationLoading, error: deleteTagMutationError },
  ] = useDeleteTagMutation();
  const [
    createNewTagMutation,
    { loading: newTagMutationLoading, error: newTagMutationError },
  ] = useCreateNewTagMutation();

  /* Local Data */
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [tableData, setTableData] = useState<Array<ITagTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    updateTagMutationLoading ||
    deleteTagMutationLoading ||
    newTagMutationLoading;
  const isLoading = dataLoading || isLoadingMutation;
  const errors = [
    error,
    updateTagMutationError,
    deleteTagMutationError,
    newTagMutationError,
  ];

  const tableColumns: Array<TableColumn<ITagTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.name,
      selector: (row) => row.name,
      cell: (row, rowIndex) => (
        <DataTableInput
          ref={getRef(rowIndex)}
          isEditState={row.editState}
          data={row.name}
        />
      ),
      sortable: true,
    },
    {
      id: "count",
      name: tableLabels.columns.count,
      selector: (row) => row.count,
      sortable: true,
    },
  ];

  useEffect(() => {
    setTableData(
      data?.countContentPerTag
        ?.map((tag) => {
          if (tag) {
            return { ...tag, editState: false };
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
      <div className="c-EditoThematiquesPage">
        <PageTitle title={title} description={description} />
        <h2 className="c-EditoThematiquesPage__Title">{tableLabels.title}</h2>
        <div className="c-EditoThematiquesPage__Table">
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
              deleteVisibleCondition={(row) => row.count === 0}
              onConfirm={(row, rowIndex) => onConfirm(row, rowIndex)}
              confirmValidation={(row, rowIndex) =>
                confirmValidation(row, rowIndex)
              }
              onDelete={(row) => onDelete(row)}
            />
            <DataTableForm
              onFormSubmit={(data) => onAddRow(data)}
              validationFunction={(row) => addRowValidation(row)}
            >
              <FormInput
                type="text"
                name="name"
                label={tableLabels.addRow.title}
                maxLengthValidation={30}
                minLengthValidation={1}
                validationLabel={`${30} ${
                  tableLabels.addRow.maxCharactersLabel
                }`}
                isDisabled={newTagMutationLoading}
                flexStyle="row"
                labelStyle="table"
              />
            </DataTableForm>
          </CommonLoader>
        </div>
      </div>
    </>
  );
}

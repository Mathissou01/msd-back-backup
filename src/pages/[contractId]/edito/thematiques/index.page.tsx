import React, { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  GetCountContentPerTagByContractIdDocument,
  useGetCountContentPerTagByContractIdQuery,
  useCreateNewTagMutation,
  useDeleteTagByIdMutation,
  useUpdateTagByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { getRightsByLabel } from "../../../../lib/user";
import {
  IDefaultTableRow,
  ICommonDataTableValidation,
} from "../../../../lib/common-data-table";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import DataTableInput from "../../../../components/Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import DataTableForm from "../../../../components/Common/CommonDataTable/DataTableForm/DataTableForm";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import "./edito-thematiques-page.scss";

interface ITagTableRow extends IDefaultTableRow {
  name: string;
  count: number;
}

export function EditoThematiquesPage() {
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

  function onEditState(row: ITagTableRow, i: number, setValue?: boolean) {
    let copiedStates = confirmStatesRef.current;
    let copiedData = tableDataRef.current;
    if (
      copiedStates.filter(Boolean).length > 0 &&
      (!copiedStates[i] || setValue === true)
    ) {
      copiedStates = new Array(tableData?.length).fill(false);
      copiedData = tableData.map((row) => {
        return { ...row, editState: false };
      });
    }
    setTableData(
      copiedData.map((data) => {
        if (data.id === row.id) {
          return { ...data, editState: setValue ?? !data.editState };
        } else {
          return { ...data };
        }
      }),
    );
    setConfirmStates([
      ...copiedStates.slice(0, i),
      setValue ?? !copiedStates[i],
      ...copiedStates.slice(i + 1),
    ]);
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

  async function onConfirmEdit(row: ITagTableRow, i: number) {
    setIsUpdatingData(true);
    const variables = {
      updateTagId: row.id,
      data: {
        name: inputRefs.current[i].current?.value,
      },
    };
    return updateTag({
      variables,
      refetchQueries: [
        {
          query: GetCountContentPerTagByContractIdDocument,
          variables: { contractId },
        },
      ],
    });
  }

  async function onDelete(row: ITagTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteTagId: row.id,
    };
    return deleteTag({
      variables,
      refetchQueries: [
        {
          query: GetCountContentPerTagByContractIdDocument,
          variables: { contractId: contract.id },
        },
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
    return createNewTag({
      variables,
      refetchQueries: [
        {
          query: GetCountContentPerTagByContractIdDocument,
          variables: { contractId },
        },
      ],
    });
  }

  /* External Data */
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Tag", userRights);
  const { contract } = useContract();
  const contractId = contract.id ?? "";
  const {
    loading: dataLoading,
    error,
    data,
  } = useGetCountContentPerTagByContractIdQuery({
    variables: { contractId },
  });
  const [updateTag, { loading: updateTagLoading, error: updateTagError }] =
    useUpdateTagByIdMutation();
  const [deleteTag, { loading: deleteTagLoading, error: deleteTagError }] =
    useDeleteTagByIdMutation();
  const [createNewTag, { loading: newTagLoading, error: newTagError }] =
    useCreateNewTagMutation();

  /* Local Data */
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [tableData, setTableData] = useState<Array<ITagTableRow>>([]);
  const tableDataRef = useRef<Array<ITagTableRow>>(tableData);
  const [confirmStates, setConfirmStates] = useState<Array<boolean>>([]);
  const confirmStatesRef = useRef<Array<boolean>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData || updateTagLoading || deleteTagLoading || newTagLoading;
  const isLoading = dataLoading || isLoadingMutation;
  const errors = [error, updateTagError, deleteTagError, newTagError];

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
      cell: userPermissions.update
        ? (row, rowIndex) => (
            <DataTableInput
              ref={getRef(rowIndex)}
              isEditState={row.editState}
              data={row.name}
            />
          )
        : undefined,
      sortable: true,
    },
    {
      id: "count",
      name: tableLabels.columns.count,
      selector: (row) => row.count,
      sortable: true,
    },
  ];
  const actionColumn = (
    row: ITagTableRow,
    rowIndex: number,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      onClick: () => onEditState(row, rowIndex),
      confirmStateOptions: {
        onConfirmValidation: () => confirmValidation(row, rowIndex),
        onConfirm: () => onConfirmEdit(row, rowIndex),
        onCancel: () => onEditState(row, rowIndex, false),
      },
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      isDisabled: row.count !== 0 || !userPermissions.delete,
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (!userPermissions.read) router.push(`/${contractId}`);
    setTableData(
      data?.countContentPerTag
        ?.map((tag) => {
          if (tag) {
            return { ...tag, editState: false };
          }
        })
        .filter(removeNulls) ?? [],
    );
  }, [contractId, data, router, userPermissions.read]);

  useEffect(() => {
    if (confirmStates.length !== tableData.length) {
      setConfirmStates(new Array(tableData?.length).fill(false));
    }
    tableDataRef.current = tableData;
    confirmStatesRef.current = confirmStates;
  }, [confirmStates, tableData]);

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
              actionColumn={actionColumn}
              data={tableData}
              defaultSortFieldId={"name"}
              isLoading={isLoading}
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
                isDisabled={newTagLoading || !userPermissions.create}
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

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoThematiquesPage />
    </ContractLayout>
  );
}

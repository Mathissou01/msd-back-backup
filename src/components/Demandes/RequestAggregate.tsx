import { createRef, useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { TableColumn } from "react-data-table-component";
import {
  GetRequestAggregatesByContractIdQuery,
  useCreateRequestAggregateMutation,
  useDeleteRequestAggregateByIdMutation,
  useGetRequestAggregatesByContractIdLazyQuery,
  useUpdateRequestAggregateMutation,
} from "../../graphql/codegen/generated-types";
import { useContract } from "../../hooks/useContract";
import {
  ICommonDataTableValidation,
  ICurrentPagination,
  IDefaultTableRow,
} from "../../lib/common-data-table";
import { removeNulls } from "../../lib/utilities";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../Common/CommonModalWrapper/CommonModalWrapper";
import DataTableInput from "../Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import { IDataTableAction } from "../Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import CommonButton from "../Common/CommonButton/CommonButton";
import CommonDataTable from "../Common/CommonDataTable/CommonDataTable";
import DataTableForm from "../Common/CommonDataTable/DataTableForm/DataTableForm";
import FormInput from "../Form/FormInput/FormInput";
import "./request-aggregate.scss";

interface IRequestAggregateTableRow extends IDefaultTableRow {
  name: string;
  hasAssociatedRequest?: boolean;
}

export default function RequestAggregate() {
  /* Static Data */
  const label = {
    title: "Regroupement de formulaires",
    subtitle: "Créez des dossiers pour grouper des formulaires ensemble",
    columns: {
      name: "Nom du regroupement (dossier)",
    },
    addRow: {
      title: "Ajouter un dossier",
      maxCharactersLabel: "caractères maximum",
    },
    warningModal: {
      text: "Le regroupement que vous souhaitez supprimer est utilisé dans des requêtes, êtes-vous sûr de vouloir le supprimer ?",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
  };

  const tableValidation = {
    requestAggregateName: "Les noms des dossiers doivent être uniques.",
  };

  const maxLength = 30;

  /* Methods */
  function getRef(i: number) {
    inputRefs.current[i] = createRef();
    return inputRefs.current[i];
  }

  async function handleLazyLoad(params: ICurrentPagination) {
    return getRequestAggregates({
      variables: {
        contractId: contractId,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  function resetUniticyErrors() {
    setNewRequestAggregateUnicityError(false);
    setUpdateRequestAggregateUnicityError(false);
  }

  function handleOpenModal(row: IRequestAggregateTableRow) {
    rowToBeDeleted = row;
    modalRef.current?.toggleModal(true);
  }

  function handleCloseModal() {
    rowToBeDeleted = undefined;
    modalRef.current?.toggleModal(false);
  }

  function handleDeleteFromModal() {
    if (rowToBeDeleted) {
      onDelete(rowToBeDeleted);
    }
    handleCloseModal();
  }

  function addRowValidation(data: FieldValues): ICommonDataTableValidation {
    const isValid = !tableData.some((row) => row.name === data["name"]);
    setNewRequestAggregateUnicityError(!isValid);
    return { isValid, errorMessage: tableValidation.requestAggregateName };
  }

  async function onAddRow(data: FieldValues) {
    setIsUpdatingData(true);
    const variables = {
      data: {
        requestService: contractId,
        name: data["name"],
      },
    };
    return createRequestAggregate({
      variables,
      onCompleted() {
        getRequestAggregates().finally(() => {
          resetUniticyErrors();
          setIsUpdatingData(false);
        });
      },
    });
  }

  function onEditState(
    row: IRequestAggregateTableRow,
    i: number,
    setValue?: boolean,
  ) {
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
    _: IRequestAggregateTableRow,
    i: number,
  ): ICommonDataTableValidation {
    const isValid = !tableData.some(
      (row, rowIndex) =>
        row.name === inputRefs.current[i].current?.value && rowIndex !== i,
    );
    setUpdateRequestAggregateUnicityError(!isValid);
    return { isValid, errorMessage: tableValidation.requestAggregateName };
  }

  async function onConfirmEdit(row: IRequestAggregateTableRow, i: number) {
    setIsUpdatingData(true);
    const variables = {
      updateRequestAggregateId: row.id,
      data: {
        name: inputRefs.current[i].current?.value,
      },
    };
    return updateRequestAggregate({
      variables,
      onCompleted() {
        getRequestAggregates().finally(() => {
          resetUniticyErrors();
          setIsUpdatingData(false);
        });
      },
    });
  }

  async function onDelete(row: IRequestAggregateTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteRequestAggregateId: row.id,
    };
    return deleteRequestAggregate({
      variables,
      onCompleted() {
        getRequestAggregates().finally(() => {
          resetUniticyErrors();
          setIsUpdatingData(false);
        });
      },
    });
  }

  /* External Data */
  const { contractId } = useContract();
  const defaultPage = 1;
  const defaultRowsPerPage = 30;
  const [getRequestAggregates, { data, loading, error }] =
    useGetRequestAggregatesByContractIdLazyQuery({
      variables: { contractId: contractId },
      fetchPolicy: "cache-and-network",
    });

  const [
    createRequestAggregate,
    {
      loading: createRequestAggregateLoading,
      error: createRequestAggregateError,
    },
  ] = useCreateRequestAggregateMutation();

  const [
    updateRequestAggregate,
    {
      loading: updateRequestAggregateLoading,
      error: updateRequestAggregateError,
    },
  ] = useUpdateRequestAggregateMutation();

  const [
    deleteRequestAggregate,
    {
      loading: deleteRequestAggregateLoading,
      error: deleteRequestAggregateError,
    },
  ] = useDeleteRequestAggregateByIdMutation();

  /* Local data */
  const isInitialized = useRef(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [confirmStates, setConfirmStates] = useState<Array<boolean>>([]);
  const confirmStatesRef = useRef<Array<boolean>>([]);
  const [tableData, setTableData] = useState<Array<IRequestAggregateTableRow>>(
    [],
  );
  const tableDataRef = useRef<Array<IRequestAggregateTableRow>>(tableData);
  const modalRef = useRef<CommonModalWrapperRef>();
  const [pageData, setPageData] = useState<
    GetRequestAggregatesByContractIdQuery | undefined
  >(data);
  const [
    updateRequestAggregateUnicityError,
    setUpdateRequestAggregateUnicityError,
  ] = useState(false);
  const [newRequestAggregateUnicityError, setNewRequestAggregateUnicityError] =
    useState(false);
  let rowToBeDeleted: IRequestAggregateTableRow | undefined = undefined;
  const isLoadingMutation =
    isUpdatingData ||
    createRequestAggregateLoading ||
    updateRequestAggregateLoading ||
    deleteRequestAggregateLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    error,
    createRequestAggregateError,
    updateRequestAggregateError,
    deleteRequestAggregateError,
  ];

  const tableColumns: Array<TableColumn<IRequestAggregateTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: label.columns.name,
      selector: (row) => row.name,
      cell: (row, rowIndex) => (
        <DataTableInput
          ref={getRef(rowIndex)}
          isEditState={row.editState}
          data={row.name}
          maxLengthValidation={maxLength}
        />
      ),
      sortable: true,
    },
  ];

  const actionColumn = (
    row: IRequestAggregateTableRow,
    rowIndex: number,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      onClick: () => onEditState(row, rowIndex),
      confirmStateOptions: {
        onConfirmValidation: () => confirmValidation(row, rowIndex),
        onConfirm: () => onConfirmEdit(row, rowIndex),
        onCancel: () => onEditState(row, rowIndex, false),
      },
    },
    {
      id: "delete",
      picto: "/images/pictos/delete.svg",
      confirmStateOptions: {
        onConfirm: () => {
          !row.hasAssociatedRequest ? onDelete(row) : handleOpenModal(row);
        },
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (data) {
      setTableData(
        data?.requestAggregates?.data
          .map((requestAggregate) => {
            if (
              requestAggregate &&
              requestAggregate.id &&
              requestAggregate.attributes
            ) {
              return {
                id: requestAggregate.id,
                editState: false,
                name: requestAggregate.attributes.name ?? "",
                hasAssociatedRequest: requestAggregate.attributes.requests?.data
                  ? requestAggregate.attributes.requests?.data.length > 0
                  : false,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data, pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (confirmStates.length !== tableData.length) {
      setConfirmStates(new Array(tableData?.length).fill(false));
    }
    tableDataRef.current = tableData;
    confirmStatesRef.current = confirmStates;
  }, [confirmStates, tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getRequestAggregates();
    }
  }, [getRequestAggregates, isInitialized]);

  return (
    <div className="c-RequestAggregate">
      <h2 className="c-RequestAggregate__Title">{label.title}</h2>
      <span className="c-RequestAggregate__Subtitle">{label.subtitle}</span>
      {(newRequestAggregateUnicityError ||
        updateRequestAggregateUnicityError) && (
        <span className="c-RequestAggregate__Error">
          {tableValidation.requestAggregateName}
        </span>
      )}
      <CommonModalWrapper ref={modalRef}>
        <div>
          <span className="c-RequestAggregate__ModalText">
            {label.warningModal.text}
          </span>
          <div className="c-RequestAggregate__ModalButtonsContainer">
            <CommonButton
              label={label.warningModal.confirm}
              picto="check"
              style="primary"
              onClick={handleDeleteFromModal}
            />
            <CommonButton
              label={label.warningModal.cancel}
              picto="cross"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </CommonModalWrapper>
      <CommonLoader isLoading={false} errors={errors}>
        <CommonDataTable<IRequestAggregateTableRow>
          columns={tableColumns}
          data={tableData}
          actionColumn={actionColumn}
          lazyLoadingOptions={{
            isRemote: true,
            totalRows: data?.requestAggregates?.meta.pagination.total ?? 0,
          }}
          onLazyLoad={handleLazyLoad}
          isLoading={isLoading}
          paginationOptions={{
            hasPagination: false,
            hasRowsPerPageOptions: false,
            defaultRowsPerPage,
            defaultPage,
          }}
        />
        <DataTableForm
          onFormSubmit={(data) => onAddRow(data)}
          validationFunction={(row) => addRowValidation(row)}
        >
          <FormInput
            type="text"
            name="name"
            label={label.addRow.title}
            maxLengthValidation={maxLength}
            minLengthValidation={1}
            validationLabel={`${maxLength} ${label.addRow.maxCharactersLabel}`}
            isDisabled={createRequestAggregateLoading}
            flexStyle="row"
            labelStyle="table"
          />
        </DataTableForm>
      </CommonLoader>
    </div>
  );
}

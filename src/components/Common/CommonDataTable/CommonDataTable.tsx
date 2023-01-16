import classNames from "classnames";
import DataTable, { TableColumn } from "react-data-table-component";
import React, { useCallback, useEffect, useState } from "react";
import DataTableActions from "./DataTableActions/DataTableActions";
import "./common-data-table.scss";

export interface IDefaultTableRow {
  id: string;
  editState: boolean;
}

export interface ICommonDataTableValidation {
  isValid: boolean;
  errorMessage: string;
}

interface ICommonDataTableProps<T> {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
  defaultSortFieldId?: string | number;
  isLoading?: boolean;
  hasEditAction?: boolean;
  hasDuplicateAction?: boolean;
  hasDeleteAction?: boolean;
  deleteVisibleCondition?: (row: T) => boolean;
  onConfirm?: (row: T, rowIndex: number) => void;
  confirmValidation?: (row: T, rowIndex: number) => ICommonDataTableValidation;
  onDelete?: (row: T) => void;
}

export default function CommonDataTable<T extends IDefaultTableRow>({
  columns,
  data,
  defaultSortFieldId,
  isLoading,
  hasEditAction = false,
  hasDuplicateAction = false,
  hasDeleteAction = false,
  deleteVisibleCondition,
  onConfirm,
  confirmValidation,
  onDelete,
}: ICommonDataTableProps<T>) {
  /* Methods */
  function onConfirmSubmit(row: T, rowIndex: number) {
    const validation = confirmValidation?.(row, rowIndex);
    if (typeof validation === "undefined" || validation?.isValid) {
      onEdit(row, rowIndex, false);
      onConfirm?.(row, rowIndex);
    } else {
      // TODO: show error message, where ?
      console.log(validation.errorMessage);
    }
  }

  function onDeleteSubmit(row: T) {
    onDelete?.(row);
  }

  /* Local Data */
  const numberOfActions = [
    hasEditAction,
    hasDuplicateAction,
    hasDeleteAction,
  ].filter(() => true).length;
  const hasOneAction = numberOfActions > 0;
  const colWidth = `${36 * numberOfActions + 32}px`;
  const tableColumns: Array<TableColumn<T>> = [
    ...columns,
    ...[
      hasOneAction
        ? {
            id: "actions",
            name: "",
            cell: (row: T, rowIndex: number) => (
              <DataTableActions
                hasEditAction={hasEditAction}
                hasDuplicateAction={hasDuplicateAction}
                hasDeleteAction={hasDeleteAction}
                deleteVisibleCondition={
                  !deleteVisibleCondition || deleteVisibleCondition?.(row)
                }
                onEdit={() => onEdit(row, rowIndex)}
                isConfirmState={confirmStates[rowIndex]}
                onConfirm={() => onConfirmSubmit(row, rowIndex)}
                onDelete={() => onDeleteSubmit(row)}
                onCancel={() => onEdit(row, rowIndex, false)}
              />
            ),
            width: colWidth,
            grow: 0,
            center: true,
          }
        : {},
    ],
  ];
  const [tableData, setTableData] = useState<Array<T>>(data);
  const [confirmStates, setConfirmStates] = useState<Array<boolean>>([]);

  const onEdit = useCallback(
    (row: T, i: number, setValue?: boolean) => {
      let copiedStates = confirmStates;
      let copiedData = tableData;
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
            return { ...data, editState: !data.editState };
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
    },
    [confirmStates, tableData],
  );

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setConfirmStates(new Array(tableData?.length).fill(false));
  }, [tableData?.length]);

  return (
    <div
      className={classNames("c-CommonDataTable", {
        "c-CommonDataTable_disabled": isLoading,
      })}
    >
      <DataTable
        columns={tableColumns}
        data={tableData}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={true}
      />
    </div>
  );
}

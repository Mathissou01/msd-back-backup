import React, { ReactNode, useEffect, useRef, useState } from "react";
import DataTable, {
  ConditionalStyles,
  ExpanderComponentProps,
  PaginationComponentProps,
  SortOrder,
  TableColumn,
} from "react-data-table-component";
import classNames from "classnames";
import { removeNulls } from "../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
  ILazyLoadingOptions,
  IPaginationOptions,
} from "../../../lib/common-data-table";
import CommonPagination from "../CommonPagination/CommonPagination";
import CommonSpinner from "../CommonSpinner/CommonSpinner";
import DataTableActions, {
  IDataTableAction,
} from "./DataTableActions/DataTableActions";
import "./common-data-table.scss";

interface ICommonDataTableProps<T> {
  columns: Array<TableColumn<T>>;
  actionColumn?: (row: T, rowIndex: number) => Array<IDataTableAction>;
  conditionalRowStyles?: Array<ConditionalStyles<T>>;
  expandableRows?: boolean;
  expandableRowsComponent?: React.FC<ExpanderComponentProps<T>>;
  data: Array<T>;
  lazyLoadingOptions?: ILazyLoadingOptions;
  // State
  isLoading?: boolean;
  // Filters
  filtersNode?: ReactNode;
  filters?: Record<string, unknown>;
  // Sorting
  defaultSortFieldId?: string | number;
  // Pagination
  paginationOptions?: IPaginationOptions;
  onLazyLoad?: (
    params: ICurrentPagination,
    filters?: Record<string, unknown>,
  ) => void;
}

export default function CommonDataTable<T extends IDefaultTableRow>({
  columns,
  actionColumn,
  conditionalRowStyles,
  expandableRows = false,
  expandableRowsComponent,
  data,
  lazyLoadingOptions,
  isLoading,
  filtersNode,
  filters,
  defaultSortFieldId,
  paginationOptions,
  onLazyLoad,
}: ICommonDataTableProps<T>) {
  /* Static Data */
  const noRecordsLabel = "Il n'y a pas de données à afficher";
  const noRecords = (
    <div className="c-CommonDataTable__NoRecords">
      <span>{noRecordsLabel}</span>
    </div>
  );

  /* Methods */
  function handleSort(
    selectedColumn: TableColumn<T>,
    sortDirection: SortOrder,
  ) {
    if (lazyLoadingOptions?.isRemote && selectedColumn.id) {
      setCurrentPagination({
        ...currentPagination,
        sort: {
          column: selectedColumn.id?.toString(),
          direction: sortDirection,
        },
      });
      setResetDefaultPage(true);
    }
  }

  /* Local Data */
  const [tableData, setTableData] = useState<Array<T>>(data);
  const [resetDefaultPage, setResetDefaultPage] = useState(false);
  const [currentPagination, setCurrentPagination] =
    useState<ICurrentPagination>({
      page: paginationOptions?.defaultPage ?? 1,
      rowsPerPage: paginationOptions?.defaultRowsPerPage ?? 10,
    });
  const prevPagination = useRef<ICurrentPagination>(currentPagination);
  const tableColumns: Array<TableColumn<T>> = [
    ...columns,
    ...[
      actionColumn && actionColumn.length > 0
        ? {
            id: "actions",
            name: "",
            cell: (row: T, rowIndex: number) => {
              const tableActions = actionColumn(row, rowIndex);
              return <DataTableActions actions={tableActions} />;
            },
            width: `${36 * 3 + 32}px`,
            grow: 0,
            center: true,
          }
        : {},
    ],
  ].filter(removeNulls);

  useEffect(() => {
    setCurrentPagination({ ...currentPagination, filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Parent data change
  useEffect(() => {
    setTableData(data);
    setResetDefaultPage(false);
  }, [data]);

  // Pagination change
  useEffect(() => {
    if (currentPagination !== prevPagination.current) {
      prevPagination.current = currentPagination;
      onLazyLoad?.({ ...currentPagination }, filters);
    }
  }, [filters, lazyLoadingOptions?.isRemote, currentPagination, onLazyLoad]);

  const CustomPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage,
    currentPage,
  }: PaginationComponentProps) => (
    <div className="c-CommonDataTable__Pagination">
      <CommonPagination
        currentPage={currentPage}
        rowCount={rowCount}
        onChangePage={(page, totalRows) => onChangePage(page, totalRows)}
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
          onChangeRowsPerPage(currentRowsPerPage, currentPage)
        }
        rowsPerPage={rowsPerPage}
        {...(!!paginationOptions && {
          noRowsPerPage: !(paginationOptions.hasRowsPerPageOptions ?? true),
          rowsPerPageOptions: paginationOptions.rowsPerPageOptions,
        })}
      />
    </div>
  );

  return (
    <>
      {filtersNode && (
        <div className="c-CommonDataTable__Filters">{filtersNode}</div>
      )}
      <div
        className={classNames("c-CommonDataTable", {
          "c-CommonDataTable_loading": isLoading,
        })}
      >
        <DataTable<T>
          columns={tableColumns}
          conditionalRowStyles={conditionalRowStyles}
          data={tableData}
          progressPending={isLoading}
          progressComponent={<CommonSpinner />}
          noDataComponent={noRecords}
          defaultSortFieldId={defaultSortFieldId}
          defaultSortAsc={true}
          onSort={(selectedColumn, sortDirection) =>
            handleSort(selectedColumn, sortDirection)
          }
          expandableRows={expandableRows}
          expandableRowExpanded={(row) => row.expandableRow ?? false}
          expandableRowsComponent={expandableRowsComponent}
          expandableRowsHideExpander={true}
          {...(paginationOptions &&
            paginationOptions.hasPagination && {
              pagination: true,
              paginationPerPage: paginationOptions.defaultRowsPerPage,
              paginationRowsPerPageOptions:
                paginationOptions.rowsPerPageOptions,
              paginationComponent: CustomPagination,
              paginationResetDefaultPage: resetDefaultPage,
              onChangePage: (currentPage) => {
                if (currentPage !== currentPagination.page) {
                  setCurrentPagination({
                    ...currentPagination,
                    page: currentPage,
                  });
                }
              },
              onChangeRowsPerPage: (currentRowsPerPage) => {
                if (currentRowsPerPage !== currentPagination.rowsPerPage) {
                  setCurrentPagination({
                    ...currentPagination,
                    rowsPerPage: currentRowsPerPage,
                  });
                }
              },
            })}
          {...(lazyLoadingOptions?.isRemote && {
            sortServer: true,
            paginationServer: true,
            paginationTotalRows: lazyLoadingOptions.totalRows,
          })}
        />
      </div>
    </>
  );
}

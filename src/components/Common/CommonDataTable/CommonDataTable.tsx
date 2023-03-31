import classNames from "classnames";
import DataTable, {
  PaginationComponentProps,
  SortOrder,
  TableColumn,
} from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import { removeNulls } from "../../../lib/utilities";
import DataTableFilters, {
  IDataTableFilter,
} from "./DataTableFilters/DataTableFilters";
import CommonPagination from "../CommonPagination/CommonPagination";
import CommonSpinner from "../CommonSpinner/CommonSpinner";
import DataTableActions, {
  IDataTableAction,
} from "./DataTableActions/DataTableActions";
import "./common-data-table.scss";

export interface ICommonDataTableValidation {
  isValid: boolean;
  errorMessage?: string;
}

export interface IDefaultTableRow {
  id: string;
  editState: boolean;
}

interface ILazyLoadingOptions {
  isRemote: boolean;
  totalRows: number;
}

interface IPaginationOptions {
  hasPagination: boolean;
  hasRowsPerPageOptions?: boolean;
  defaultRowsPerPage: number;
  rowsPerPageOptions?: Array<number>;
  defaultPage?: number;
}

export interface ISortingParams {
  column: string;
  direction?: "asc" | "desc";
}

export interface ICurrentPagination<T> {
  page: number;
  rowsPerPage: number;
  filter?: IDataTableFilter<T>;
  sort?: ISortingParams;
}

interface ICommonDataTableProps<T> {
  columns: Array<TableColumn<T>>;
  actionColumn?: (row: T, rowIndex: number) => Array<IDataTableAction>;
  data: Array<T>;
  lazyLoadingOptions?: ILazyLoadingOptions;
  // State
  isLoading?: boolean;
  // Filters
  filters?: Array<IDataTableFilter<T>>;
  // Sorting
  defaultSortFieldId?: string | number;
  // Pagination
  paginationOptions?: IPaginationOptions;
  onLazyLoad?: (params: ICurrentPagination<T>) => void;
}

export default function CommonDataTable<T extends IDefaultTableRow>({
  columns,
  actionColumn,
  data,
  lazyLoadingOptions,
  isLoading,
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
  function handleFilter(filter: IDataTableFilter<T>) {
    if (lazyLoadingOptions?.isRemote) {
      setCurrentPagination({ ...currentPagination, filter });
      setResetDefaultPage(true);
    } else {
      setTableData(data.filter((row) => filter.selector?.(row) ?? true));
    }
  }

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
  const [filterTabs, setFilterTabs] = useState<Array<IDataTableFilter<T>>>([]);
  const [resetDefaultPage, setResetDefaultPage] = useState(false);
  const [currentPagination, setCurrentPagination] = useState<
    ICurrentPagination<T>
  >({
    page: paginationOptions?.defaultPage ?? 1,
    rowsPerPage: paginationOptions?.defaultRowsPerPage ?? 10,
  });
  const prevPagination = useRef<ICurrentPagination<T>>(currentPagination);
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

  // Parent data change
  useEffect(() => {
    setTableData(data);
    setResetDefaultPage(false);
  }, [data]);

  // Filters change
  useEffect(() => {
    if (tableData && tableData.length > 0 && filters && filters.length > 0) {
      setFilterTabs(
        lazyLoadingOptions?.isRemote
          ? filters
          : filters?.map((filter) => {
              return {
                ...filter,
                count:
                  filter.count ?? filter.selector
                    ? data.filter((row) => filter.selector?.(row)).length
                    : null,
              };
            }),
      );
    }
  }, [data, filters, lazyLoadingOptions?.isRemote, tableData]);

  // Pagination change
  useEffect(() => {
    if (
      lazyLoadingOptions?.isRemote &&
      currentPagination !== prevPagination.current
    ) {
      prevPagination.current = currentPagination;
      onLazyLoad?.({ ...currentPagination });
    }
  }, [lazyLoadingOptions?.isRemote, currentPagination, onLazyLoad]);

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
      {filterTabs && filterTabs.length > 0 && (
        <DataTableFilters<T>
          tabs={filterTabs}
          onFilter={(filter) => handleFilter(filter)}
        />
      )}
      <div
        className={classNames("c-CommonDataTable", {
          "c-CommonDataTable_loading": isLoading,
        })}
      >
        <DataTable<T>
          columns={tableColumns}
          data={tableData}
          progressPending={isLoading}
          progressComponent={<CommonSpinner />}
          noDataComponent={noRecords}
          defaultSortFieldId={defaultSortFieldId}
          defaultSortAsc={true}
          onSort={(selectedColumn, sortDirection) =>
            handleSort(selectedColumn, sortDirection)
          }
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

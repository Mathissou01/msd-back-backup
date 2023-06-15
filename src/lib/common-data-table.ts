export interface ICommonDataTableValidation {
  isValid: boolean;
  errorMessage?: string;
}

export interface IDefaultTableRow {
  id: string;
  editState: boolean;
  expandableRow?: boolean;
}

export interface ILazyLoadingOptions {
  isRemote: boolean;
  totalRows: number;
}

export interface IPaginationOptions {
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

export interface ICurrentPagination {
  page: number;
  rowsPerPage: number;
  sort?: ISortingParams;
  filters?: Record<string, unknown>;
}

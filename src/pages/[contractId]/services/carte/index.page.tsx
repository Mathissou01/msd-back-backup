import { useEffect, useRef, useState } from "react";
import { TableColumn } from "react-data-table-component";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import {
  GetDropOffMapByContractIdDocument,
  GetDropOffMapByContractIdQuery,
  GetSectorizationsByContractIdQuery,
  GetSectorizationsByContractIdQueryVariables,
  useDeleteDropOffMapMutation,
  useGetDropOffMapByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import "./carte-page.scss";

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  type: string;
  place: string;
}

export function CartePage() {
  /* Static Data */
  const title = "Carte";
  const label =
    "Créez la liste des points de collecte à afficher sur la carte.";
  const addButton = "Créer un point de collecte";
  const tableLabels = {
    title: "Liste des points d'intérêt",
    columns: {
      dropoffmapTitle: "Nom du point d'intérêt",
      dropoffmapType: "Type de lieux",
      dropoffmapPlace: "Commune",
      servicesTitle: "Services",
      updatedDate: "Modification",
    },
  };

  /* External Data */
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetSectorizationsByContractIdQueryVariables = {
    contractId,
    sort: "createdAt:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };

  const [getDropOffMapsQuery, { data, loading, error }] =
    useGetDropOffMapByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });

  const [
    deleteDropOffMapMutation,
    {
      loading: deleteDropOffMapMutationLoading,
      error: deleteDropOffMapMutationError,
    },
  ] = useDeleteDropOffMapMutation();

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetDropOffMapByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<ISectorsTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData || deleteDropOffMapMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteDropOffMapMutationError];

  const tableColumns: Array<TableColumn<ISectorsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.dropoffmapTitle,
      selector: (row) => row.name,
      cell: (row) => <div className="c-CartePage__Link">{row.name}</div>,
      sortable: true,
      grow: 1,
    },
    {
      id: "dropoffmapType",
      name: tableLabels.columns.dropoffmapType,
      selector: (row) => row.type,
      sortable: true,
    },
    {
      id: "dropoffmapPlace",
      name: tableLabels.columns.dropoffmapPlace,
      selector: (row) => row.place,
      sortable: true,
    },
  ];

  const actionColumn = (row: ISectorsTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
    },
    {
      id: "delete",
      picto: "/images/pictos/delete.svg",
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination<ISectorsTableRow>) {
    return getDropOffMapsQuery({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(typeof params.filter?.lazyLoadSelector?.["value"] === "string" && {
          statusFilter: { eq: params.filter.lazyLoadSelector["value"] },
        }),
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function onDelete(row: ISectorsTableRow) {
    const variables = {
      deleteDropOffMapId: row.id,
    };
    deleteDropOffMapMutation({
      variables,
      refetchQueries: [
        {
          query: GetDropOffMapByContractIdDocument,
          variables: { contractId },
        },
      ],
      onQueryUpdated: (observableQuery) => {
        observableQuery
          .result()
          .then((result) => {
            if (!result.loading) {
              setPageData(
                result?.data as GetSectorizationsByContractIdQuery | undefined,
              );
            }
          })
          .catch(() => {
            // TODO : handle error, to do when all editorial pages will refactored ( to check with @QuentinLeCaignec)
            // console.log(error);
          });
      },
    });
  }

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.dropOffMaps?.data
          ?.map((dropOffMaps) => {
            if (dropOffMaps && dropOffMaps.id && dropOffMaps.attributes) {
              return {
                id: dropOffMaps.id,
                editState: false,
                name: dropOffMaps.attributes.name || "",
                type:
                  dropOffMaps.attributes.collectVoluntary?.data?.attributes
                    ?.name ||
                  dropOffMaps.attributes.collectDropOff?.data?.attributes
                    ?.name ||
                  "",
                place: dropOffMaps.attributes.city || "",
                createdAt: dropOffMaps.attributes.createdAt,
                updatedAt: dropOffMaps.attributes.updatedAt,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getDropOffMapsQuery();
    }
  }, [getDropOffMapsQuery, isInitialized]);

  return (
    <div className="c-CartePage">
      <PageTitle title={title} description={label} />
      <div>
        <CommonButton label={addButton} style="primary" picto="add" />
      </div>
      <h2 className="c-CartePage__Title">{tableLabels.title}</h2>
      <div className="c-CartePage__Table">
        <CommonLoader
          isLoading={!isInitialized.current}
          isShowingContent={isLoadingMutation}
          errors={errors}
        >
          <CommonDataTable<ISectorsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.dropOffMaps?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId={"name"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          ></CommonDataTable>
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <CartePage />
    </ContractLayout>
  );
}

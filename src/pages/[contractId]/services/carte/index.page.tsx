import { useEffect, useRef, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import {
  GetDropOffMapByDropOffMapByServiceIdQuery,
  GetDropOffMapByDropOffMapByServiceIdQueryVariables,
  useDeleteDropOffMapMutation,
  useGetDropOffMapByDropOffMapByServiceIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import { removeNulls } from "../../../../lib/utilities";
import {
  IDefaultTableRow,
  ICurrentPagination,
} from "../../../../lib/common-data-table";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import "./carte-page.scss";

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  type: string;
  place: string;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function CartePage() {
  /* Static Data */
  const title = "Carte";
  const label = "Créez la liste des points d'intérêt à afficher sur la carte.";
  const addButton = "Créer un point d'intérêt";
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

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getDropOffMapsQuery({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(filters?.status && {
          statusFilter: { eq: filters?.status },
        }),
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function onDelete(row: ISectorsTableRow) {
    setIsUpdatingData(true);
    return deleteDropOffMapMutation({
      variables: { deleteDropOffMapId: row.id },
    });
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetDropOffMapByDropOffMapByServiceIdQueryVariables =
    {
      contractId: contractId,
      sort: "createdAt:asc",
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };

  const [getDropOffMapsQuery, { data, loading, error }] =
    useGetDropOffMapByDropOffMapByServiceIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });
  const [
    deleteDropOffMapMutation,
    {
      loading: deleteDropOffMapMutationLoading,
      error: deleteDropOffMapMutationError,
    },
  ] = useDeleteDropOffMapMutation({
    refetchQueries: ["getDropOffMapByDropOffMapByServiceId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetDropOffMapByDropOffMapByServiceIdQuery | undefined
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

      cell: (row) => (
        <Link
          href={`${currentRoot}/services/carte/point-interet/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.name}
        </Link>
      ),
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
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/services/carte/point-interet/${row.id}`,
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

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
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() =>
            router.push(`${currentRoot}/services/carte/point-interet/create`)
          }
        />
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

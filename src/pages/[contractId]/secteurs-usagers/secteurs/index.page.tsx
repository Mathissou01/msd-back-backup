import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { TableColumn } from "react-data-table-component";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../components/Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import {
  useGetSectorizationsByContractIdLazyQuery,
  GetSectorizationsByContractIdQueryVariables,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../contract-layout";
import "./secteurs.scss";

interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export function SectorsPage() {
  /* Static Data */
  const title = "Secteurs";
  const tableLabels = {
    title: "Liste des secteurs",
    columns: {
      sectorTitle: "Secteurs",
      description: "Description",
      servicesTitle: "Services",
      updatedDate: "Modification",
    },
  };

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination<ISectorsTableRow>) {
    return getSectorizationsQuery({
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

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetSectorizationsByContractIdQueryVariables = {
    contractId,
    sort: "createdAt:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };

  const [getSectorizationsQuery, { data, error }] =
    useGetSectorizationsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });

  const errors = [error];

  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<ISectorsTableRow>>([]);

  const tableColumns: Array<TableColumn<ISectorsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.sectorTitle,
      selector: (row) => row.name,
      cell: (row) => (
        <Link
          href={`${currentRoot}/secteurs-usagers/secteurs/${row.id}`}
          className="o-SectorsPage__Link"
        >
          {row.name}
        </Link>
      ),
      sortable: true,
      grow: 1,
    },
    {
      id: "description",
      name: tableLabels.columns.description,
      selector: (row) => row.description,
      sortable: true,
    },
  ];
  useEffect(() => {
    if (data) {
      setTableData(
        data?.sectorizations?.data
          ?.map((sectorization) => {
            if (sectorization && sectorization.id && sectorization.attributes) {
              return {
                id: sectorization.id,
                editState: false,
                name: sectorization.attributes.name,
                description: sectorization.attributes.description,
                createdAt: sectorization.attributes.createdAt,
                updatedAt: sectorization.attributes.updatedAt,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getSectorizationsQuery();
    }
  }, [getSectorizationsQuery, isInitialized]);

  return (
    <div className="c-SectorsPage">
      <PageTitle title={title} />
      <h2 className="c-SectorsPage__Title">{tableLabels.title}</h2>
      <div className="c-SectorsPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<ISectorsTableRow>
            columns={tableColumns}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.sectorizations?.meta.pagination.total ?? 0,
            }}
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
      <SectorsPage />
    </ContractLayout>
  );
}

import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Enum_Freecontent_Status,
  GetAllVersionsOfFreeContentByCustomIdQuery,
  GetAllVersionsOfFreeContentByCustomIdQueryVariables,
  useGetAllVersionsOfFreeContentByCustomIdLazyQuery,
} from "../../../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../../../lib/common-data-table";
import { EStatusLabel } from "../../../../../../../lib/status";
import { useContract } from "../../../../../../../hooks/useContract";
import { useNavigation } from "../../../../../../../hooks/useNavigation";
import ContractLayout from "../../../../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../../../components/PageTitle/PageTitle";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../../../../components/Common/CommonButtonGroup/CommonButtonGroup";
import { useRoutingQueryCustomId } from "../../../../../../../hooks/useRoutingQueryCustomId";

interface IFreeContentsTableRow extends IDefaultTableRow {
  status: EStatusLabel;
  publishedDate: string;
  updatedAt: string;
  versionNumber: number;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function EditoContenuLibreVersionPage({
  customId,
  freeContentSubServiceId,
}: {
  customId: string;
  freeContentSubServiceId: string;
}) {
  /* Static Data */
  const tableLabels = {
    title: "Versions",
    columns: {
      versionNumber: "Titre du contenu",
      status: "Statut",
      publishedDate: "Publication",
      updatedAt: "Modifié",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getFreeContentByQuery({
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

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();

  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  const defaultQueryVariables: GetAllVersionsOfFreeContentByCustomIdQueryVariables =
    {
      contractId,
      sort: "title:asc",
      freeContentSubServiceId: freeContentSubServiceId,
      customId: customId.toString(),
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };
  const [getFreeContentByQuery, { data, loading, error }] =
    useGetAllVersionsOfFreeContentByCustomIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetAllVersionsOfFreeContentByCustomIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IFreeContentsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];

  const title = pageData?.freeContents?.data[0].attributes
    ?.freeContentSubService?.data?.attributes?.name as string;

  const tableColumns: Array<TableColumn<IFreeContentsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "Version",
      name: tableLabels.columns.versionNumber,
      selector: (row) => row.versionNumber,
      cell: (row) => (
        <Link
          href={`${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.versionNumber}
        </Link>
      ),
      sortable: true,
      grow: 4,
    },
    {
      id: "status",
      name: tableLabels.columns.status,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      id: "publishedDate",
      name: tableLabels.columns.publishedDate,
      selector: (row) => row.publishedDate,
      sortable: true,
      minWidth: "130px",
    },
    {
      id: "updatedAt",
      name: tableLabels.columns.updatedAt,
      selector: (row) => row.updatedAt,
      sortable: true,
      minWidth: "148px",
    },
  ];
  const actionColumn = (
    row: IFreeContentsTableRow,
  ): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`,
    },
  ];

  const [filterButtonGroup, setFilterButtonGroup] =
    useState<Array<ICommonButtonGroupSingle>>();

  const filtersNode = (
    <>
      <CommonButtonGroup
        buttons={filterButtonGroup ?? []}
        onChange={(button) => setFilters({ ...filters, status: button.value })}
      />
    </>
  );

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.freeContents?.data
          ?.map((content) => {
            if (
              content &&
              content.id &&
              content.attributes &&
              content.attributes.versionNumber
            ) {
              return {
                id: content.id,
                editState: false,
                versionNumber: content.attributes.versionNumber,
                status: content.attributes.status
                  ? EStatusLabel[content.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: content.attributes.publishedDate
                  ? formatDate(parseISO(content.attributes.publishedDate))
                  : "-",
                updatedAt: content.attributes.updatedAt
                  ? formatDate(parseISO(content.attributes.updatedAt))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.freeContentsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.freeContentsCountPublished?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Published,
        },
        {
          label: `Brouillons (${pageData.freeContentsCountDraft?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Draft,
        },
        {
          label: `Archivés (${pageData.freeContentsCountArchived?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Archived,
        },
      ]);
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
      void getFreeContentByQuery();
    }
  }, [getFreeContentByQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IFreeContentsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.freeContents?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            filters={filters}
            filtersNode={filtersNode}
            defaultSortFieldId={"title"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          />
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const customId = useRoutingQueryCustomId("customId");
  const freeContentServiceId = useRoutingQueryCustomId(
    "freeContentSubServiceId",
  );
  return (
    <ContractLayout>
      {customId && (
        <EditoContenuLibreVersionPage
          freeContentSubServiceId={freeContentServiceId as string}
          customId={customId}
        />
      )}
    </ContractLayout>
  );
}

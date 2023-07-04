import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_Tip_Status,
  GetTipsByContractIdQuery,
  GetTipsByContractIdQueryVariables,
  useCreateTipMutation,
  useDeleteTipMutation,
  useGetTipByIdLazyQuery,
  useGetTipsByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import { EStatusLabel } from "../../../../lib/status";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../components/Common/CommonButtonGroup/CommonButtonGroup";

interface ITipsTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function EditoAstucesPage() {
  /* Static Data */
  const addButton = "Créer une astuce";
  const title = "Astuces";
  const tableLabels = {
    title: "Liste des astuces",
    columns: {
      title: "Titre de l'astuce",
      status: "Statut",
      publishedDate: "Publication",
      depublishedDate: "Dépublication",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getTipByQuery({
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

  function onDuplicate(row: ITipsTableRow) {
    GetTipByIdQuery({ variables: { tipId: row.id } }).then((data) => {
      const originalTip = data.data?.tip?.data?.attributes;
      if (originalTip) {
        void createTipMutation({
          variables: {
            data: {
              title: `${originalTip.title} Ajout`,
              shortDescription: originalTip.shortDescription,
              tipSubService: originalTip.tipSubService?.data?.id,
              image: originalTip.image?.data?.id,
              blocks: originalTip.blocks?.map((block) => {
                return {
                  ...block,
                  id: undefined,
                };
              }),
            },
          },
        });
      }
    });
  }

  async function onDelete(row: ITipsTableRow) {
    setIsUpdatingData(true);
    return deleteTipMutation({
      variables: { deleteTipId: row.id },
    });
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetTipsByContractIdQueryVariables = {
    contractId,
    sort: "title:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getTipByQuery, { data, loading, error }] =
    useGetTipsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });
  const [
    GetTipByIdQuery,
    { loading: prepareDuplicateLoading, error: prepareDuplicateError },
  ] = useGetTipByIdLazyQuery();
  const [
    createTipMutation,
    { loading: createTipMutationLoading, error: createTipMutationError },
  ] = useCreateTipMutation({
    refetchQueries: ["getTipsByContractId"],
    awaitRefetchQueries: true,
  });
  const [
    deleteTipMutation,
    { loading: deleteTipMutationLoading, error: deleteTipMutationError },
  ] = useDeleteTipMutation({
    refetchQueries: ["getTipsByContractId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetTipsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<ITipsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    prepareDuplicateLoading ||
    createTipMutationLoading ||
    deleteTipMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    error,
    prepareDuplicateError,
    createTipMutationError,
    deleteTipMutationError,
  ];

  const tableColumns: Array<TableColumn<ITipsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "title",
      name: tableLabels.columns.title,
      selector: (row) => row.title,
      cell: (row) => (
        <Link
          href={`${currentRoot}/edito/astuces/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.title}
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
      id: "unpublishedDate",
      name: tableLabels.columns.depublishedDate,
      selector: (row) => row.unpublishedDate,
      sortable: true,
      minWidth: "148px",
    },
  ];
  const actionColumn = (row: ITipsTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/edito/astuces/${row.id}`,
    },
    {
      id: "duplicate",
      picto: "fileDouble",
      alt: "Dupliquer",
      onClick: () => onDuplicate(row),
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
        pageData?.tips?.data
          ?.map((tips) => {
            if (tips && tips.id && tips.attributes) {
              return {
                id: tips.id,
                editState: false,
                title: tips.attributes.title,
                status: tips.attributes.status
                  ? EStatusLabel[tips.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: tips.attributes.publishedDate
                  ? formatDate(parseISO(tips.attributes.publishedDate))
                  : "-",
                unpublishedDate: tips.attributes.unpublishedDate
                  ? formatDate(parseISO(tips.attributes.unpublishedDate))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.tipsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.tipsCountPublished?.meta.pagination.total})`,
          value: Enum_Tip_Status.Published,
        },
        {
          label: `Brouillons (${pageData.tipsCountDraft?.meta.pagination.total})`,
          value: Enum_Tip_Status.Draft,
        },
        {
          label: `Archivés (${pageData.tipsCountArchived?.meta.pagination.total})`,
          value: Enum_Tip_Status.Archived,
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
      void getTipByQuery();
    }
  }, [getTipByQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/edito/astuces/create`)}
        />
      </div>
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<ITipsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.tips?.meta.pagination.total ?? 0,
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
  return (
    <ContractLayout>
      <EditoAstucesPage />
    </ContractLayout>
  );
}

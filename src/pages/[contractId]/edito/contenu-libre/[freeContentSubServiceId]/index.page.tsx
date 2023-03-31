import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_Freecontent_Status,
  GetFreeContentsBySubServiceIdDocument,
  useCreateFreeContentByFreeContentSubServiceIdMutation,
  useDeleteFreeContentMutation,
  useGetFreeContentsBySubServiceIdLazyQuery,
  GetFreeContentsBySubServiceIdQueryVariables,
  useGetFreeContentByIdLazyQuery,
  GetFreeContentByIdDocument,
  useGetFreeContentSubServiceByIdQuery,
} from "../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import { EStatusLabel } from "../../../../../lib/status";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import ContractLayout from "../../../contract-layout";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableFilter } from "../../../../../components/Common/CommonDataTable/DataTableFilters/DataTableFilters";
import { IDataTableAction } from "../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../../components/Common/CommonButton/CommonButton";

interface IFreeContentTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

interface IEditoFreeContentSubServicePage {
  freeContentSubServiceId: string;
}

export function EditoFreeContentSubServicePage({
  freeContentSubServiceId,
}: IEditoFreeContentSubServicePage) {
  /* Static Data */
  const addButton = "Créer un article";
  const tableLabels = {
    title: "Liste des articles",
    columns: {
      title: "Titre de l'article",
      status: "Statut",
      publishedDate: "Publication",
      depublishedDate: "Dépublication",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination<IFreeContentTableRow>,
  ) {
    return getFreeContentsQuery({
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

  function onDuplicate(row: IFreeContentTableRow) {
    GetFreeContentByIdQuery({ variables: { freeContentId: row.id } }).then(
      (data) => {
        const originalFreeContent = data.data?.freeContent?.data?.attributes;
        if (originalFreeContent) {
          CreateFreeContentByFreeContentSubServiceIdMutation({
            variables: {
              data: {
                title: `${originalFreeContent.title} Ajout`,
                shortDescription: originalFreeContent.shortDescription,
                freeContentSubService:
                  originalFreeContent.freeContentSubService?.data?.id,
                image: originalFreeContent.image?.data?.id,
                blocks: originalFreeContent.blocks?.map((block) => {
                  return {
                    ...block,
                    id: undefined,
                  };
                }),
              },
            },
            refetchQueries: [
              {
                query: GetFreeContentByIdDocument,
                variables: { contractId },
              },
            ],
          });
        }
      },
    );
  }

  async function onDelete(row: IFreeContentTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteFreeContentId: row.id,
    };
    return DeleteFreeContentMutation({
      variables,
      refetchQueries: [
        {
          query: GetFreeContentsBySubServiceIdDocument,
          variables: { contractId },
        },
      ],
    });
  }

  /* External Data */
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const { contractId } = useContract();
  const {
    data: freeContentSubService,
    loading: freeContentSubServiceLoading,
    error: freeContentSubServiceError,
  } = useGetFreeContentSubServiceByIdQuery({
    variables: { freeContentSubServiceId },
  });
  const defaultQueryVariables: GetFreeContentsBySubServiceIdQueryVariables = {
    freeContentSubServiceId,
    sort: "title:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getFreeContentsQuery, { data, loading, error }] =
    useGetFreeContentsBySubServiceIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });
  const [
    GetFreeContentByIdQuery,
    { loading: prepareDuplicateLoading, error: prepareDuplicateError },
  ] = useGetFreeContentByIdLazyQuery();
  const [
    CreateFreeContentByFreeContentSubServiceIdMutation,
    {
      loading: CreateFreeContentByFreeContentSubServiceIdMutationLoading,
      error: CreateFreeContentByFreeContentSubServiceIdMutationError,
    },
  ] = useCreateFreeContentByFreeContentSubServiceIdMutation();
  const [
    DeleteFreeContentMutation,
    {
      loading: DeleteFreeContentMutationLoading,
      error: DeleteFreeContentMutationError,
    },
  ] = useDeleteFreeContentMutation();

  /* Local Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IFreeContentTableRow>>([]);
  const [filterData, setFilterData] = useState<
    Array<IDataTableFilter<IFreeContentTableRow>>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    prepareDuplicateLoading ||
    CreateFreeContentByFreeContentSubServiceIdMutationLoading ||
    DeleteFreeContentMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    freeContentSubServiceError,
    error,
    prepareDuplicateError,
    CreateFreeContentByFreeContentSubServiceIdMutationError,
    DeleteFreeContentMutationError,
  ];

  const tableColumns: Array<TableColumn<IFreeContentTableRow>> = [
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
        <>
          <Link
            href={`${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`}
            className="o-EditoPage__Link"
          >
            {row.title}
          </Link>
        </>
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
  const actionColumn = (row: IFreeContentTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`,
    },
    {
      id: "duplicate",
      picto: "/images/pictos/duplicate.svg",
      onClick: () => onDuplicate(row),
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

  useEffect(() => {
    if (data) {
      setTableData(
        data?.freeContents?.data
          ?.map((freeContentId) => {
            if (freeContentId && freeContentId.id && freeContentId.attributes) {
              return {
                id: freeContentId.id,
                editState: false,
                title: freeContentId.attributes.title,
                status: freeContentId.attributes.status
                  ? EStatusLabel[freeContentId.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: freeContentId.attributes.publishedDate
                  ? formatDate(parseISO(freeContentId.attributes.publishedDate))
                  : "-",
                unpublishedDate: freeContentId.attributes.unpublishedDate
                  ? formatDate(
                      parseISO(freeContentId.attributes.unpublishedDate),
                    )
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterData([
        {
          label: "Tous",
          count: data?.freeContentsCount?.meta.pagination.total,
        },
        {
          label: "Publiés",
          count: data?.freeContentsCountPublished?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Published,
          },
        },
        {
          label: "Brouillons",
          count: data?.freeContentsCountDraft?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Draft,
          },
        },
        {
          label: "Archivés",
          count: data?.freeContentsCountArchived?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Archived,
          },
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getFreeContentsQuery();
    }
  }, [getFreeContentsQuery, isInitialized]);

  return (
    <div className="o-EditoPage">
      <CommonLoader
        isLoading={freeContentSubServiceLoading || !isInitialized.current}
        errors={errors}
      >
        <PageTitle
          title={`${freeContentSubService?.freeContentSubService?.data?.attributes?.name}`}
        />
        <div>
          <CommonButton
            label={addButton}
            style="primary"
            picto="add"
            onClick={() =>
              router.push(
                `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/create`,
              )
            }
          />
        </div>
        <h2 className="o-EditoPage__Title">{tableLabels.title}</h2>
        <div className="o-EditoPage__Table">
          <CommonDataTable<IFreeContentTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.freeContents?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            filters={filterData}
            defaultSortFieldId={"title"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          />
        </div>
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  const router = useRouter();
  const [freeContentSubServiceId, setFreeContentSubServiceId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = router?.query?.freeContentSubServiceId;
    let localFreeContentSubServiceId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localFreeContentSubServiceId = query.toString();
      } else if (query.toString() === "create") {
        localFreeContentSubServiceId = "0";
      } else {
        localFreeContentSubServiceId = false;
      }
    }
    if (
      localFreeContentSubServiceId &&
      localFreeContentSubServiceId !== freeContentSubServiceId
    ) {
      setIsLoading(true);
      setFreeContentSubServiceId(localFreeContentSubServiceId);
    } else if (localFreeContentSubServiceId === false) {
      void router.push("/404");
    }
  }, [router, freeContentSubServiceId, setFreeContentSubServiceId]);

  useEffect(() => {
    setIsLoading(false);
  }, [freeContentSubServiceId]);

  return (
    <ContractLayout>
      {!isLoading && freeContentSubServiceId && (
        <EditoFreeContentSubServicePage
          freeContentSubServiceId={freeContentSubServiceId}
        />
      )}
    </ContractLayout>
  );
}

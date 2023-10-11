import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import {
  useGetSectorizationsByContractIdLazyQuery,
  GetSectorizationsByContractIdQuery,
  GetSectorizationsByContractIdQueryVariables,
  useCreateSectorizationMutation,
  useDeleteSectorizationByIdMutation,
  GetSectorizationsByContractIdDocument,
  useUpdateSectorizationByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import { getRightsByLabel } from "../../../../lib/user";
import { removeNulls } from "../../../../lib/utilities";
import { ICurrentPagination } from "../../../../lib/common-data-table";
import { ISectorsTableRow } from "../../../../lib/sectors";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonModalWrapper, {
  CommonModalWrapperRef,
  ICommonModalWrapperSize,
} from "../../../../components/Common/CommonModalWrapper/CommonModalWrapper";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import SectorForm from "../../../../components/Sector/SectorForm/SectorForm";
import "./secteurs.scss";
import { useUser } from "../../../../hooks/useUser";

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function SectorsPage() {
  /* Static Data */
  const title = "Secteurs";
  const addButton = "Créer un secteur";
  const tableLabels = {
    title: "Liste des secteurs",
    columns: {
      sectorTitle: "Secteurs",
      description: "Description",
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

  const [getSectorizationsQuery, { data, loading, error }] =
    useGetSectorizationsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });

  const [createSectorization] = useCreateSectorizationMutation();
  const [
    updateSectorization,
    { loading: updateSectorizationLoading, error: updateSectorizationError },
  ] = useUpdateSectorizationByIdMutation();

  const [
    deleteSectorization,
    { loading: deleteSectorizationLoading, error: deleteSectorizationError },
  ] = useDeleteSectorizationByIdMutation();

  /* Local Data */
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Sectorization", userRights);
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetSectorizationsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<ISectorsTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData || deleteSectorizationLoading || updateSectorizationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteSectorizationError, updateSectorizationError];
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [secteurDefaultValue, setSecteurDefaultValue] =
    useState<ISectorsTableRow>();

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
      cell: userPermissions.update
        ? (row) => (
            <div onClick={() => onEdit(row)} className="c-SectorsPage__Link">
              {row.name}
            </div>
          )
        : undefined,
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

  const actionColumn = (row: ISectorsTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      onClick: () => onEdit(row),
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      isDisabled: !userPermissions.delete,
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getSectorizationsQuery({
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

  async function onSubmit(submitData: ISectorsTableRow) {
    onSubmitAndModalRefresh(submitData);
    modalRef.current?.toggleModal(false);
  }

  async function onSubmitAndModalRefresh(submitData: ISectorsTableRow) {
    const variables = {
      data: {
        name: submitData.name,
        description: submitData.description,
        contract: contractId,
        polygonCoordinates: submitData.polygonData,
      },
    };
    void createSectorization({
      variables,
      refetchQueries: [
        {
          query: GetSectorizationsByContractIdDocument,
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

  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
    setSecteurDefaultValue(undefined);
  };

  const handleCloseCommonModal = () => {
    setSecteurDefaultValue(undefined);
  };

  async function onDelete(row: ISectorsTableRow) {
    const variables = {
      deleteSectorizationId: row.id,
    };
    void deleteSectorization({
      variables,
      refetchQueries: [
        {
          query: GetSectorizationsByContractIdDocument,
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

  function onEdit(row: ISectorsTableRow) {
    modalRef.current?.toggleModal(true);

    setSecteurDefaultValue(row);
  }

  async function handleUpdate(submitData: ISectorsTableRow) {
    const variables = {
      updateSectorizationId: submitData.id,
      data: {
        name: submitData.name,
        description: submitData.description,
        contract: contractId,
        polygonCoordinates: submitData.polygonData,
      },
    };
    void updateSectorization({
      variables,
      refetchQueries: [
        {
          query: GetSectorizationsByContractIdDocument,
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
            //console.log(error);
          });
      },
    });

    setSecteurDefaultValue(undefined);
    modalRef.current?.toggleModal(false);
  }

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.sectorizations?.data
          ?.map((sectorization) => {
            if (sectorization && sectorization.id && sectorization.attributes) {
              return {
                id: sectorization.id,
                editState: false,
                name: sectorization.attributes.name,
                polygonData: sectorization.attributes.polygonCoordinates,
                description: sectorization.attributes.description,
                createdAt: sectorization.attributes.createdAt,
                updatedAt: sectorization.attributes.updatedAt,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [pageData]);

  useEffect(() => {
    setPageData(data);
    setSecteurDefaultValue(undefined);
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (userPermissions.read) void getSectorizationsQuery();
      else router.push(`/${contractId}`);
    }
  }, [
    contractId,
    getSectorizationsQuery,
    isInitialized,
    router,
    userPermissions.read,
  ]);

  return (
    <div className="c-SectorsPage">
      <PageTitle title={title} />
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          isDisabled={!userPermissions.create}
          onClick={() => handleStartModal()}
        />
        <CommonModalWrapper
          onClose={handleCloseCommonModal}
          size={ICommonModalWrapperSize.LARGE}
          ref={modalRef}
        >
          <SectorForm
            onSubmitValid={(data) => onSubmit(data as ISectorsTableRow)}
            onSubmitAndModalRefresh={(data) =>
              onSubmitAndModalRefresh(data as ISectorsTableRow)
            }
            defaultValue={secteurDefaultValue}
            onUpdate={(data) => handleUpdate(data as ISectorsTableRow)}
            handleCloseModal={handleCloseModal}
          />
        </CommonModalWrapper>
      </div>
      <h2 className="c-SectorsPage__Title">{tableLabels.title}</h2>
      <div className="c-SectorsPage__Table">
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
              totalRows: pageData?.sectorizations?.meta.pagination.total ?? 0,
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
      <SectorsPage />
    </ContractLayout>
  );
}

import { useEffect, useState, useRef } from "react";
import { TableColumn } from "react-data-table-component";
import {
  useGetSectorizationsByContractIdLazyQuery,
  GetSectorizationsByContractIdQuery,
  GetSectorizationsByContractIdQueryVariables,
  useCreateSectorizationMutation,
  useDeleteSectorizationMutation,
  GetSectorizationsByContractIdDocument,
  useUpdateSectorizationMutation,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { TPolygon } from "../../../../lib/sectors";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonModalWrapper, {
  CommonModalWrapperRef,
  ICommonModalWrapperSize,
} from "../../../../components/Common/CommonModalWrapper/CommonModalWrapper";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import SectorModal from "../../../../components/Sector/SectorModal/SectorModal";
import "./secteurs.scss";

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
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
    updateSectorizationMutation,
    {
      loading: updateSectorizationMutationLoading,
      error: updateSectorizationMutationError,
    },
  ] = useUpdateSectorizationMutation();

  const [
    deleteSectorizationMutation,
    {
      loading: deleteSectorizationMutationLoading,
      error: deleteSectorizationMutationError,
    },
  ] = useDeleteSectorizationMutation();

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetSectorizationsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<ISectorsTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    deleteSectorizationMutationLoading ||
    updateSectorizationMutationLoading;
  const isLoading =
    loading || isLoadingMutation || updateSectorizationMutationLoading;
  const errors = [
    error,
    deleteSectorizationMutationError,
    updateSectorizationMutationError,
  ];
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [secteurDefaultValue, setSecteurDefaultValue] =
    useState<ISectorsTableRow>();
  let polygonData: TPolygon;

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
        <div onClick={() => onEdit(row)} className="c-SectorsPage__Link">
          {row.name}
        </div>
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

  const actionColumn = (row: ISectorsTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      onClick: () => onEdit(row),
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

  async function handlePolygon(polygon: TPolygon) {
    polygonData = polygon;
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
        polygonCoordinates: polygonData,
      },
    };
    createSectorization({
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
  };

  async function onDelete(row: ISectorsTableRow) {
    const variables = {
      deleteSectorizationId: row.id,
    };
    deleteSectorizationMutation({
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
      },
    };

    updateSectorizationMutation({
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
      void getSectorizationsQuery();
    }
  }, [getSectorizationsQuery, isInitialized]);

  return (
    <div className="c-SectorsPage">
      <PageTitle title={title} />
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() => handleStartModal()}
        />
        <CommonModalWrapper size={ICommonModalWrapperSize.LARGE} ref={modalRef}>
          <SectorModal
            onSubmitValid={(data) => onSubmit(data as ISectorsTableRow)}
            onSubmitAndModalRefresh={(data) =>
              onSubmitAndModalRefresh(data as ISectorsTableRow)
            }
            defaultValue={secteurDefaultValue}
            onUpdate={(data) => handleUpdate(data as ISectorsTableRow)}
            handleCloseModal={handleCloseModal}
            handlePolygon={handlePolygon}
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

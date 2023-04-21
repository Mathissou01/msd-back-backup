import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { TableColumn } from "react-data-table-component";
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
import {
  useGetSectorizationsByContractIdLazyQuery,
  GetSectorizationsByContractIdQueryVariables,
  useCreateSectorizationMutation,
  useDeleteSectorizationMutation,
  GetSectorizationsByContractIdDocument,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../contract-layout";
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

  async function onSubmit(submitData: ISectorsTableRow) {
    onSubmitAndModalRefresh(submitData);
    modalRef.current?.toggleModal(false);
    void getSectorizationsQuery();
  }

  async function onSubmitAndModalRefresh(submitData: ISectorsTableRow) {
    const variables = {
      data: {
        name: submitData.name,
        description: submitData.description,
        contract: contractId,
      },
    };
    return createSectorization({
      variables,
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
    await deleteSectorizationMutation({
      variables,
      refetchQueries: [
        {
          query: GetSectorizationsByContractIdDocument,
          variables: { contractId },
        },
      ],
    });

    void getSectorizationsQuery();
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

  const [getSectorizationsQuery, { data, loading, error }] =
    useGetSectorizationsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });

  const [createSectorization] = useCreateSectorizationMutation();

  const [
    deleteSectorizationMutation,
    {
      loading: deleteSectorizationMutationLoading,
      error: deleteSectorizationMutationError,
    },
  ] = useDeleteSectorizationMutation();

  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<ISectorsTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData || deleteSectorizationMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteSectorizationMutationError];
  const modalRef = useRef<CommonModalWrapperRef>(null);

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

  const actionColumn = (row: ISectorsTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/

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
              totalRows: data?.sectorizations?.meta.pagination.total ?? 0,
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

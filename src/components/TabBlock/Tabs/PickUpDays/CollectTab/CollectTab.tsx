import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../lib/common-data-table";
import {
  GetPickUpDaysByContractIdQuery,
  GetPickUpDaysByContractIdQueryVariables,
  useDeletePickUpDayByIdMutation,
  useGetPickUpDaysByContractIdLazyQuery,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { IDataTableAction } from "../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLabel from "../../../../Common/CommonLabel/CommonLabel";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../Common/CommonDataTable/CommonDataTable";

interface IPickUpTableRow extends IDefaultTableRow {
  name: string;
  flow: string;
  secteur: React.ReactNode[];
  modification: string;
}

export function PickUpDaysPage() {
  /* Static Data */
  const addButton = "Créer une collecte";
  const tableLabels = {
    title: "Liste des collectes",
    columns: {
      title: "Nom de la collecte",
      flux: "Flux",
      secteur: "Secteur",
      modification: "Modification",
    },
  };

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination) {
    return getPickUpDaysQuery({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function handleDelete(row: IPickUpTableRow) {
    setIsUpdatingData(true);
    return deletePickUpDayByIdMutation({
      variables: { deletePickUpDayId: row.id },
    });
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetPickUpDaysByContractIdQueryVariables = {
    contractId,
    sort: "name:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getPickUpDaysQuery, { data, loading, error }] =
    useGetPickUpDaysByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "cache-and-network",
    });
  const [
    deletePickUpDayByIdMutation,
    { loading: deletePickUpDayLoading, error: deletePickUpDayError },
  ] = useDeletePickUpDayByIdMutation({
    refetchQueries: ["getPickUpDaysByContractId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetPickUpDaysByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IPickUpTableRow>>([]);

  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData || deletePickUpDayLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deletePickUpDayError];

  const tableColumns: Array<TableColumn<IPickUpTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.title,
      selector: (row) => row.name,
      cell: (row) => row.name,
      sortable: true,
      grow: 1,
    },
    {
      id: "flow.name",
      name: tableLabels.columns.flux,
      selector: (row) => row.flow,
      sortable: true,
    },
    {
      id: "sectorizations.name",
      name: tableLabels.columns.secteur,
      selector: (row) => row.secteur.join(", "),
      cell: (row) => row.secteur,
      sortable: false,
    },

    {
      id: "updatedAt",
      name: tableLabels.columns.modification,
      selector: (row) => row.modification,
      sortable: true,
      minWidth: "148px",
    },
  ];

  const actionColumn = (row: IPickUpTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/services/jour-collecte/${row.id}`,
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      confirmStateOptions: {
        onConfirm: () => {
          handleDelete(row);
        },
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.pickUpDays?.data
          ?.map((pickUpDays) => {
            if (pickUpDays && pickUpDays.id && pickUpDays.attributes) {
              return {
                id: pickUpDays.id,
                editState: false,
                name: pickUpDays.attributes.name,
                flow: pickUpDays.attributes.flow?.data?.attributes?.name || "",
                secteur: pickUpDays.attributes.sectorizations?.data
                  ? pickUpDays.attributes.sectorizations?.data?.map(
                      (sector, index) =>
                        index < 3 && (
                          <CommonLabel
                            key={index}
                            text={sector?.attributes?.name}
                          />
                        ),
                    )
                  : [],
                modification: pickUpDays.attributes.updatedAt
                  ? formatDate(parseISO(pickUpDays.attributes.updatedAt))
                  : "-",
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
      void getPickUpDaysQuery();
    }
  }, [getPickUpDaysQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() =>
            router.push(`${currentRoot}/services/jour-collecte/create`)
          }
        />
      </div>
      <h2 className="o-TablePage__Title c-CollectTab__Title">
        {tableLabels.title}
      </h2>
      <div className="o-TablePage__Table c-CollectTab__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IPickUpTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.pickUpDays?.meta.pagination.total ?? 0,
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
          />
        </CommonLoader>
      </div>
    </div>
  );
}

export default PickUpDaysPage;
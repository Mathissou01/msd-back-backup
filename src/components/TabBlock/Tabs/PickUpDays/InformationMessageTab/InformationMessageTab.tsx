import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import {
  GetInformationMessagesByContractIdQuery,
  GetInformationMessagesByContractIdQueryVariables,
  useGetInformationMessagesByContractIdLazyQuery,
  useGetPickUpDaysByContractIdLazyQuery,
} from "../../../../../graphql/codegen/generated-types";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../lib/common-data-table";
import { removeNulls } from "../../../../../lib/utilities";
import { getRightsByLabel } from "../../../../../lib/user";
import { useUser } from "../../../../../hooks/useUser";
import CommonDataTable from "../../../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonLabel from "../../../../Common/CommonLabel/CommonLabel";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { IDataTableAction } from "../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import "./information-message-tab.scss";

interface IInformationMessageTableRow extends IDefaultTableRow {
  infoMessage: string;
  pickUpDays: React.ReactNode[];
}

interface IFilters extends Record<string, unknown> {
  pickUpDaysId?: string;
}

function InformationMessageTab() {
  /* Static Data */
  const addButton = "Créer un message d'information";
  const tableLabels = {
    title: "Liste des messages",
    columns: {
      infoMessage: "Message",
      pickUpDays: "Collectes associées",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getInformationMessages({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(filters?.pickUpDaysId &&
          filters.pickUpDaysId && {
            pickUpDaysId: filters?.pickUpDaysId,
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
  const defaultQueryVariables: GetInformationMessagesByContractIdQueryVariables =
    {
      contractId,
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };
  const [getInformationMessages, { data, loading, error }] =
    useGetInformationMessagesByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });
  const [
    getFilterPickUpDays,
    { data: pickUpDayData, loading: pickUpDayLoading, error: pickUpDayError },
  ] = useGetPickUpDaysByContractIdLazyQuery();

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("PickUpDay", userRights);
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetInformationMessagesByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<
    Array<IInformationMessageTableRow>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [filters, setFilters] = useState<IFilters>({});
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation || pickUpDayLoading;
  const errors = [error, pickUpDayError];
  const tableColumns: Array<TableColumn<IInformationMessageTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "infoMessage",
      name: tableLabels.columns.infoMessage,
      selector: (row) => row.infoMessage,
      cell: (row) => row.infoMessage,
      sortable: true,
      grow: 1,
    },

    {
      id: "pickUpDays.data.name",
      name: tableLabels.columns.pickUpDays,
      selector: (row) => row.pickUpDays?.join(", "),
      cell: (row) => row.pickUpDays,
      sortable: false,
    },
  ];
  const filtersNode = (
    <div className="c-InformationMessageTab__Filter">
      <div className="o-SelectWrapper">
        <select
          className="o-SelectWrapper__Select"
          value={filters.pickUpDaysId}
          onChange={(e) =>
            setFilters({ ...filters, pickUpDaysId: e.target.value })
          }
        >
          <option value="">{"- Collectes -"}</option>
          {pickUpDayData?.pickUpDays?.data
            .map((pickUpDay, index) => {
              if (pickUpDay && pickUpDay.id && pickUpDay.attributes) {
                return (
                  <option key={index} value={pickUpDay.id}>
                    {pickUpDay.attributes.name}
                  </option>
                );
              }
            })
            .filter(removeNulls) ?? []}
        </select>
      </div>
    </div>
  );

  useEffect(() => {
    if (data) {
      setTableData(
        data.informationMessages?.data
          ?.map((informationMessages) => {
            if (
              informationMessages &&
              informationMessages.id &&
              informationMessages.attributes?.pickUpDays
            ) {
              return {
                id: informationMessages.id,
                editState: false,
                infoMessage: informationMessages.attributes.infoMessage,
                pickUpDays:
                  informationMessages.attributes?.pickUpDays?.data.map(
                    (pickUpDay, index) =>
                      index < 3 && (
                        <CommonLabel
                          key={index}
                          text={pickUpDay.attributes?.name}
                        />
                      ),
                  ),
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data, pageData]);

  const actionColumn = (
    row: IInformationMessageTableRow,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      isDisabled: !userPermissions.update,
      alt: "Modifier",
      href: `${currentRoot}/services/jour-collecte/information-message/${row.id}`,
    },
  ];

  useEffect(() => {
    setPageData(data);
  }, [data, filters]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getInformationMessages();
      void getFilterPickUpDays();
    }
  }, [getInformationMessages, isInitialized, getFilterPickUpDays]);

  return (
    <div className="o-TablePage">
      {" "}
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          isDisabled={!userPermissions.create}
          onClick={() =>
            router.push(
              `${currentRoot}/services/jour-collecte/information-message/create`,
            )
          }
        />
      </div>
      <h2 className="o-TablePage__Title c-InformationMessageTab__Title">
        {tableLabels.title}
      </h2>
      <div className="o-TablePage c-InformationMessageTab__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IInformationMessageTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.informationMessages?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId={"infoMessage"}
            onLazyLoad={handleLazyLoad}
            filters={filters}
            filtersNode={filtersNode}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
          />
        </CommonLoader>
      </div>
    </div>
  );
}

export default InformationMessageTab;

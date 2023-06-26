import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import {
  GetInformationMessageByContractIdQuery,
  GetInformationMessageByContractIdQueryVariables,
  useGetInformationMessageByContractIdLazyQuery,
} from "../../../../../graphql/codegen/generated-types";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../lib/common-data-table";
import { removeNulls } from "../../../../../lib/utilities";
import CommonDataTable from "../../../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import CommonLabel from "../../../../Common/CommonLabel/CommonLabel";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { IDataTableAction } from "../../../../Common/CommonDataTable/DataTableActions/DataTableActions";

interface IInformationMessageTableRow extends IDefaultTableRow {
  infoMessage: string;
  pickUpDays: React.ReactNode[];
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
  async function handleLazyLoad(params: ICurrentPagination) {
    return getInformationMessageQuery({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
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
  const defaultQueryVariables: GetInformationMessageByContractIdQueryVariables =
    {
      contractId,
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };
  const [getInformationMessageQuery, { data, loading, error }] =
    useGetInformationMessageByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetInformationMessageByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<
    Array<IInformationMessageTableRow>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];
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
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/services/jour-collecte/information-message/${row.id}`,
    },
  ];

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getInformationMessageQuery();
    }
  }, [getInformationMessageQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      {" "}
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
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
export default InformationMessageTab;

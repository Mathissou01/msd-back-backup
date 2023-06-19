import React, { useEffect, useRef, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useContract } from "../../../../../hooks/useContract";
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

interface IInformationMessageTableRow extends IDefaultTableRow {
  infoMessage: string;
  pickUpDays: React.ReactNode[];
}

function InformationMessageTab() {
  /* Static Data */
  //TODO: Add for the next US
  //const addButton = "Créer un message d'information";
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
  //TODO: Add for the next US
  //const { currentRoot } = useNavigation();
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
    if (pageData) {
      setTableData(
        pageData?.informationMessages?.data
          ?.map((informationMessages) => {
            if (
              informationMessages &&
              informationMessages.id &&
              informationMessages.attributes?.pickUpDays
            ) {
              return {
                id: informationMessages.id,
                editState: false,
                infoMessage: informationMessages.attributes?.infoMessage,
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
  }, [pageData]);

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
      <h2 className="o-TablePage__Title c-InformationMessageTab__Title">
        {tableLabels.title}
      </h2>
      <div className="o-TablePage c-InformationMessageTab__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IInformationMessageTableRow>
            columns={tableColumns}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows:
                pageData?.informationMessages?.meta.pagination.total ?? 0,
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

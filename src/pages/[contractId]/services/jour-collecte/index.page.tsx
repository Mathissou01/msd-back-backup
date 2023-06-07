import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
  GetPickUpDaysByContractIdQueryVariables,
  useGetPickUpDaysByContractIdLazyQuery,
  GetPickUpDaysByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../lib/utilities";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLabel from "../../../../components/Common/CommonLabel/CommonLabel";

interface IPickUpTableRow extends IDefaultTableRow {
  name: string;
  flow: string;
  secteur: React.ReactNode[];

  modification: string;
}

export function PickUpDaysPage() {
  /* Static Data */
  //TODO: to use it in another US
  // const addButton = "Créer une pickupday";
  const title = "Jour de collecte";
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

  /* External Data */
  //TODO: to be used in a nother US
  // const { currentRoot } = useNavigation();

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
      fetchPolicy: "network-only",
    });

  /* Local Data */

  //TODO: to be used in a nother US
  // const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetPickUpDaysByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IPickUpTableRow>>([]);

  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];

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
      <PageTitle title={title} />

      {
        //TODO: create a pickupday collecte
        /* <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/edito/actualites/create`)}
        />
      </div> */
      }
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IPickUpTableRow>
            columns={tableColumns}
            //TODO: to be used in another US
            // actionColumn={actionColumn}
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

export default function IndexPage() {
  return (
    <ContractLayout>
      <PickUpDaysPage />
    </ContractLayout>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { useGetCgusByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import "./cgu-page.scss";

export interface ICGUTableRow extends IDefaultTableRow {
  title: string;
  hasMobile: boolean;
  status: boolean;
}

export function EditoCGUPage() {
  /* Static Data */
  const title = "Conditions générales";
  const tableLabels = {
    columns: {
      title: "Page",
      hasMobile: "Diffusion",
      status: "Statut",
    },
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const { loading, error, data } = useGetCgusByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<ICGUTableRow>>([]);
  const tableColumns: Array<TableColumn<ICGUTableRow>> = [
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
          href={`${currentRoot}/edito/conditions-generales/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.title}
        </Link>
      ),
      sortable: true,
      grow: 1,
    },
    {
      id: "hasMobile",
      name: tableLabels.columns.hasMobile,
      selector: (row) => (row.hasMobile ? "Mobile" : "Site internet"),
      sortable: true,
    },
    {
      id: "isActivated",
      name: tableLabels.columns.status,
      selector: (row) => (row.status ? "Actif" : "Brouillon"),
      sortable: true,
    },
  ];

  const actionColumn = (row: ICGUTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/edito/conditions-generales/${row.id}`,
    },
  ];

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
    }
  }, [isInitialized]);

  useEffect(() => {
    if (data) {
      const cgus: Array<ICGUTableRow> = [];
      data.cguSubServices?.data.forEach((cguSubService) => {
        cguSubService.attributes?.cgus?.data.forEach((item) => {
          if (item && item.id && item.attributes) {
            cgus.push({
              id: item.id,
              editState: false,
              title: item.attributes?.title ?? "",
              hasMobile: item.attributes?.hasMobile ?? false,
              status: item.attributes?.isActivated ?? false,
            });
          }
        });
      });
      setTableData(cgus);
    }
  }, [data]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <div className="c-EditoCguPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={[error]}>
          <CommonDataTable<ICGUTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            isLoading={loading}
            defaultSortFieldId="id"
          />
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoCGUPage />
    </ContractLayout>
  );
}

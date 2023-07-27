import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { useGetCookiesByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useContract } from "../../../../hooks/useContract";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import "./cookies-page.scss";

export interface ICookiesTableRow extends IDefaultTableRow {
  title: string;
  hasMobile: boolean;
  status: boolean;
}

export function EditoPolitiqueCookiesPage() {
  /* Static Data */
  const title = "Politique Cookies";
  const tableLabels = {
    title: "Les Cookies",
    columns: {
      title: "Liste des pages",
      hasMobile: "Diffusion",
      status: "Status",
    },
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const { loading, error, data } = useGetCookiesByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<ICookiesTableRow>>([]);
  const tableColumns: Array<TableColumn<ICookiesTableRow>> = [
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
          href={`${currentRoot}/edito/politique-cookies/${row.id}`}
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

  const actionColumn = (row: ICookiesTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/edito/politique-cookies/${row.id}`,
    },
  ];

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
    }
  }, [isInitialized]);

  useEffect(() => {
    if (data) {
      const cookies: Array<ICookiesTableRow> = [];
      data.cookiesSubServices?.data.forEach((cookieSubService) => {
        cookieSubService.attributes?.cookies?.data.forEach((item) => {
          if (item && item.id && item.attributes) {
            cookies.push({
              id: item.id,
              editState: false,
              title: item.attributes?.title ?? "",
              hasMobile: item.attributes?.hasMobile ?? false,
              status: item.attributes?.isActivated ?? false,
            });
          }
        });
      });
      setTableData(cookies);
    }
  }, [data]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <h2 className="c-EditoPolitiqueCookiesPage__Title">
        {tableLabels.title}
      </h2>
      <div className="c-EditoPolitiqueCookiesPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={[error]}>
          <CommonDataTable<ICookiesTableRow>
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
      <EditoPolitiqueCookiesPage />
    </ContractLayout>
  );
}

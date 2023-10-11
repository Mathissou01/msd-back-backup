import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { useGetCookiesSubServicesByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
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
  const title = "Politique de cookies";
  const tableLabels = {
    columns: {
      title: "Page",
      hasMobile: "Diffusion",
      status: "Statut",
    },
  };

  /* External Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Cookie", userRights);
  const { contractId } = useContract();
  const { loading, error, data } = useGetCookiesSubServicesByContractIdQuery({
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

      cell: userPermissions.update
        ? (row) => (
            <Link
              href={`${currentRoot}/edito/politique-cookies/${row.id}`}
              className="o-TablePage__Link"
            >
              {row.title}
            </Link>
          )
        : undefined,
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
      isDisabled: !userPermissions.update,
      href: `${currentRoot}/edito/politique-cookies/${row.id}`,
    },
  ];

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (!userPermissions.read) router.push(`/${contractId}`);
    }
  }, [contractId, isInitialized, router, userPermissions.read]);

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

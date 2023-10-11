import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { useGetConfidentialitySubServicesByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import "./confidentialite-page.scss";

export interface IConfidentialiteTableRow extends IDefaultTableRow {
  title: string;
  hasMobile: boolean;
  status: boolean;
}

export function EditoConfidentialitePage() {
  /* Static Data */
  const title = "Confidentialités";
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
  const userPermissions = getRightsByLabel("Confidentiality", userRights);
  const { contractId } = useContract();
  const { loading, error, data } =
    useGetConfidentialitySubServicesByContractIdQuery({
      variables: { contractId },
      fetchPolicy: "network-only",
    });

  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IConfidentialiteTableRow>>(
    [],
  );
  const tableColumns: Array<TableColumn<IConfidentialiteTableRow>> = [
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
              href={`${currentRoot}/edito/confidentialite/${row.id}`}
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

  const actionColumn = (
    row: IConfidentialiteTableRow,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      href: `${currentRoot}/edito/confidentialite/${row.id}`,
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
      const confidentialities: Array<IConfidentialiteTableRow> = [];
      data.confidentialitySubServices?.data.forEach(
        (confidentialitySubServices) => {
          confidentialitySubServices.attributes?.confidentialities?.data.forEach(
            (item) => {
              if (item && item.id && item.attributes) {
                confidentialities.push({
                  id: item.id,
                  editState: false,
                  title: item.attributes?.title ?? "",
                  hasMobile: item.attributes?.hasMobile ?? false,
                  status: item.attributes?.isActivated ?? false,
                });
              }
            },
          );
        },
      );
      setTableData(confidentialities);
    }
  }, [data]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <div className="c-EditoConfidentialityPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={[error]}>
          <CommonDataTable<IConfidentialiteTableRow>
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
      <EditoConfidentialitePage />
    </ContractLayout>
  );
}

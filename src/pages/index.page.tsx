import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { useHeaderContractId } from "../hooks/useHeaderContractId";
import { useUser } from "../hooks/useUser";
import { useGetUserContractsQuery } from "../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../lib/common-data-table";
import { getRightsByLabel } from "../lib/user";
import Header from "../components/Header/Header";
import PageTitle from "../components/PageTitle/PageTitle";
import CommonLoader from "../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../components/Common/CommonDataTable/CommonDataTable";
import "./root-home-page.scss";

interface IContractTableRow extends IDefaultTableRow {
  id: string;
  clientName: string;
  contractStatus: string;
  hasWebApp: boolean;
  hasWebSite: boolean;
  hasYesWeScan: boolean;
  dueDate: string;
  logoUrl?: string;
}

export default function RootHomePage() {
  /* Static Data */
  const labels = {
    title: "Mes clients",
    placeholder: "Rechercher un client",
    createClientButton: "Créer un client",
  };

  /* Methods */
  function getChannelServices(row: IContractTableRow) {
    const channels: Array<{ name: string; key: keyof IContractTableRow }> = [
      { name: "Application", key: "hasWebApp" },
      { name: "Internet", key: "hasWebSite" },
      { name: "YWS", key: "hasYesWeScan" },
    ];
    const channelServices = channels
      .filter((channel) => row[channel.key])
      .map((service) => service.name);
    return channelServices.join(", ");
  }

  function handleSearch() {
    setSearchText(searchInput);
  }

  function handleChange(event: ChangeEvent) {
    setSearchInput((event.target as HTMLInputElement).value);
  }

  /* Local Data */
  const { userRights, userUuid } = useUser();
  const userPermissions = getRightsByLabel("Contract", userRights);
  const router = useRouter();
  const { setHeaderContractId } = useHeaderContractId();
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const tableDataRef = useRef<Array<IContractTableRow>>();
  const [tableData, setTableData] = useState<Array<IContractTableRow>>([]);
  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  /* External Data */
  const { data, loading, error } = useGetUserContractsQuery({
    variables: {
      uuid: userUuid,
    },
  });

  const tableColumns: Array<TableColumn<IContractTableRow>> = [
    {
      cell: (row: IContractTableRow) =>
        row.logoUrl && (
          <Image
            src={row.logoUrl}
            alt={row.clientName}
            width={130}
            height={50}
            style={{ objectFit: "contain" }}
          />
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
    },
    {
      id: "name",
      name: "Nom",
      cell: (row) => (
        <Link
          href={`/${row.id}/gestion/informations`}
          className="o-TablePage__Link"
        >
          <button
            className="o-TablePage__Link"
            onClick={() => {
              setHeaderContractId(+row.id);
            }}
          >
            {row.clientName}
          </button>
        </Link>
      ),
      selector: (row) => row.clientName,
      sortable: true,
      width: "px",
    },
    {
      name: "Services",
      selector: (row) => getChannelServices(row),
      width: "350px",
    },
    {
      name: "Statut",
      selector: (row) => row.contractStatus,
      sortable: true,
    },
    {
      name: "Prochaine échéance",
      selector: (row) => row.dueDate && row.dueDate,
      sortable: true,
    },
  ];

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.getUserContracts?.length === 1) {
      const contractId = data.getUserContracts[0]?.id;
      setHeaderContractId(+`${contractId}`);
      router.push(`/${contractId}/gestion/informations`);
      return;
    }

    const tableData: IContractTableRow[] = [];

    if (data.getUserContracts) {
      for (let i = 0; i < data.getUserContracts.length; i++) {
        const contract = data.getUserContracts[i];

        if (!contract) {
          continue;
        }

        tableData.push({
          id: contract?.id ?? "",
          editState: false,
          clientName: contract.clientName ?? "",
          contractStatus: contract.contractStatus ?? "",
          hasWebApp: contract.channelType?.hasWebApp ?? false,
          hasWebSite: contract.channelType?.hasWebSite ?? false,
          hasYesWeScan: contract.channelType?.hasYesWeScan ?? false,
          dueDate: new Intl.DateTimeFormat().format(
            new Date(
              contract.dueDate !== null ? contract.dueDate ?? "" : "01-01-1970",
            ),
          ),
          logoUrl: contract.logo?.url ?? "",
        });
      }
    }

    setTableData(tableData);
    tableDataRef.current = tableData;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);

  useEffect(() => {
    if (!tableDataRef.current) {
      return;
    }

    setTableData(
      tableDataRef.current.filter((contract) => {
        return contract.clientName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }),
    );
  }, [searchText]);

  // TODO: detect ENTER key for search filter

  return (
    <>
      <Header isRoot={true} />
      <div className="o-Page__RootContainer">
        <main role="main" className="o-Page__Main c-RootHomePage">
          <PageTitle title={labels.title} />
          <div className="c-RootHomePage__Content">
            <CommonLoader isLoading={loading} errors={[error]}>
              <div className="c-RootHomePage__SearchContainer">
                <input
                  className="c-RootHomePage__Search"
                  type="text"
                  placeholder={labels.placeholder}
                  value={searchInput}
                  onChange={handleChange}
                />
                <CommonButton
                  picto="search"
                  style="primary"
                  onClick={() => handleSearch()}
                  paddingStyle="paddingMedium"
                />
                <div>
                  <CommonButton
                    label={labels.createClientButton}
                    style="primary"
                    picto="add"
                    isDisabled={!userPermissions.create}
                    onClick={() => router.push(`/create`)}
                  />
                </div>
              </div>
              <CommonDataTable
                columns={tableColumns}
                data={tableData}
                defaultSortFieldId={"name"}
                isLoading={loading}
                paginationOptions={{
                  hasPagination: true,
                  hasRowsPerPageOptions: false,
                  defaultRowsPerPage,
                  defaultPage,
                }}
              />
            </CommonLoader>
          </div>
        </main>
      </div>
    </>
  );
}

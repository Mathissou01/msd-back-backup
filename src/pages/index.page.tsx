import { TableColumn } from "react-data-table-component";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetContractsQuery } from "../graphql/codegen/generated-types";
import { removeNulls } from "../lib/utilities";
import Header from "../components/Header/Header";
import PageTitle from "../components/PageTitle/PageTitle";
import CommonLoader from "../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../components/Common/CommonButton/CommonButton";
import CommonDataTable, {
  IDefaultTableRow,
} from "../components/Common/CommonDataTable/CommonDataTable";
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

  /* External Data */
  const { data, loading, error } = useGetContractsQuery();

  /* Local Data */
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const tableDataRef = useRef<Array<IContractTableRow>>();
  const [tableData, setTableData] = useState<Array<IContractTableRow>>([]);
  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  const tableColumns: Array<TableColumn<IContractTableRow>> = [
    {
      cell: (row: IContractTableRow) =>
        row.logoUrl && (
          <Image
            src={row.logoUrl}
            alt={row.clientName}
            width={130}
            height={50}
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
          className="o-EditoPage__Link"
        >
          {row.clientName}
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
    if (data) {
      const tableData =
        data?.contracts?.data
          ?.map((contract) => {
            if (contract && contract.id && contract.attributes) {
              return {
                id: contract.id,
                editState: false,
                clientName: contract.attributes.clientName,
                contractStatus: contract.attributes.contractStatus,
                hasWebApp:
                  contract.attributes.channelType?.data?.attributes
                    ?.hasWebApp ?? false,
                hasWebSite:
                  contract.attributes.channelType?.data?.attributes
                    ?.hasWebSite ?? false,
                hasYesWeScan: contract.attributes?.hasYesWeScan ?? false,
                dueDate: new Intl.DateTimeFormat().format(
                  new Date(contract.attributes?.dueDate),
                ),
                logoUrl: contract.attributes?.logo?.data?.attributes?.url,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setTableData(tableData);
      tableDataRef.current = tableData;
    }
  }, [data]);

  useEffect(() => {
    if (tableDataRef.current) {
      setTableData(
        tableDataRef.current.filter((contract) => {
          return contract.clientName
            .toLowerCase()
            .includes(searchText.toLowerCase());
        }),
      );
    }
  }, [searchText]);

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

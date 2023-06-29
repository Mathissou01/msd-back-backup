import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useNavigation } from "../../../../hooks/useNavigation";
import {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import {
  GetRequestsByContractIdQuery,
  GetRequestsByContractIdQueryVariables,
  useDeleteRequestByIdMutation,
  useGetRequestsByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { formatDate, removeNulls } from "../../../../lib/utilities";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../../../components/Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import RequestAggregate from "../../../../components/Request/RequestAggregate/RequestAggregate";
import "./demandes-page.scss";
import { parseJSON } from "date-fns";

export interface IRequestTableRow extends IDefaultTableRow {
  name: string;
  recipient: string;
  author: string;
  status: boolean;
  requestsType: Array<IRequestTypeRow>;
}

interface IRequestTypeRow extends IDefaultTableRow {
  typeTitle: string;
  typeRecipient: string;
}

export function RequestsPage() {
  /* Static Data */
  const labels = {
    title: "Demandes",
    addButton: "Créer un nouveau formulaire de demande",
    tableLabels: {
      title: "Liste des formulaires de demande",
      columns: {
        name: "Formulaire / Type de demande",
        recipient: "Destinataires",
        author: "Auteur / Editeur / Date",
        status: "Status",
      },
    },
    warningModal: {
      text: "Souhaitez-vous vraiment supprimer le formulaire de demande ",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
    createRequest: "Créer un nouveau formulaire de demande",
  };

  /* Local Data */
  const [rowToBeDeleted, setRowToBeDeleted] = useState<IRequestTableRow>();

  const [modalText, setModalText] = useState("");

  /* External data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetRequestsByContractIdQueryVariables = {
    contractId: contractId,
    sort: "updatedAt:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };

  const [getRequests, { data, loading, error }] =
    useGetRequestsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });
  const [
    deleteRequest,
    { loading: deleteRequestLoading, error: deleteRequestError },
  ] = useDeleteRequestByIdMutation({
    refetchQueries: ["getRequestsByContractId"],
    awaitRefetchQueries: true,
  });

  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetRequestsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IRequestTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = deleteRequestLoading || isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteRequestError];
  const modalRef = useRef<CommonModalWrapperRef>();

  const tableColumns: Array<TableColumn<IRequestTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: labels.tableLabels.columns.name,
      selector: (row) => row.name,
      cell: (row) => <div className="c-RequestsPage__Link">{row.name}</div>,
      sortable: true,
      grow: 1,
    },
    {
      id: "recipient",
      name: labels.tableLabels.columns.recipient,
      selector: (row) => row.recipient,
    },
    {
      id: "updatedAt",
      name: labels.tableLabels.columns.author,
      selector: (row) => row.author,
      sortable: true,
    },
    {
      id: "isActivated",
      name: labels.tableLabels.columns.status,
      selector: (row) => (row.status ? "Actif" : "Brouillon"),
      sortable: true,
    },
  ];

  const actionColumn = (row: IRequestTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/services/demandes/${row.id}`,
    },
    {
      id: "delete",
      picto: "/images/pictos/delete.svg",
      confirmStateOptions: {
        onConfirm: () => {
          handleOpenModal(row);
        },
        confirmStyle: "warning",
      },
    },
  ];

  const expandedComponent: React.FC<
    ExpanderComponentProps<IRequestTableRow>
  > = ({ data }) => {
    return (
      <div className="c-RequestsPage__Table_expandedrow">
        <table>
          <tbody>
            {data.requestsType.map((rqt, index) => {
              return (
                <tr key={index}>
                  <td title={rqt.typeTitle}>{rqt.typeTitle}</td>
                  <td>{rqt.typeRecipient}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination) {
    return getRequests({
      variables: {
        contractId: contractId,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function onDelete(row: IRequestTableRow) {
    setIsUpdatingData(true);
    return deleteRequest({
      variables: { deleteRequestId: row.id },
    });
  }

  function formatEmails(emails: string): string {
    return emails.trim().replaceAll(";", "\n");
  }

  function handleOpenModal(row: IRequestTableRow) {
    setRowToBeDeleted(row);
    setModalText(`${labels.warningModal.text} "${row.name}" ?`);
    modalRef.current?.toggleModal(true);
  }

  function handleCloseModal() {
    setRowToBeDeleted(undefined);
    setModalText("");
    modalRef.current?.toggleModal(false);
  }

  function handleDeleteFromModal() {
    if (rowToBeDeleted) {
      void onDelete(rowToBeDeleted);
    }
    handleCloseModal();
  }

  function getRecipient(
    isEmail: boolean,
    email: string,
    isTSMS: boolean,
  ): string {
    let recipient = "";
    recipient += isEmail ? formatEmails(email) : "";
    if (recipient !== "" && isTSMS) {
      recipient += "\nTSMS";
    } else if (isTSMS) {
      recipient = "TSMS";
    }
    return recipient;
  }

  /* useEffects */
  useEffect(() => {
    if (data) {
      setTableData(
        data.requests?.data
          ?.map((request) => {
            if (
              request &&
              request.id &&
              request.attributes &&
              request.attributes.requestType
            ) {
              return {
                id: request.id,
                editState: false,
                expandableRow:
                  request.attributes.hasSeveralRequestTypes ?? false,
                name: request.attributes.name ?? "",
                recipient:
                  !request.attributes.hasSeveralRequestTypes &&
                  request.attributes.requestType
                    ? getRecipient(
                        request.attributes.requestType[0]?.isEmail ?? false,
                        request.attributes.requestType[0]?.email ?? "",
                        request.attributes.requestType[0]?.isTSMS ?? false,
                      )
                    : "",
                author:
                  `John Doe - ${formatDate(
                    parseJSON(request.attributes.updatedAt),
                  )}` ?? "",
                status: request.attributes.isActivated ?? false,
                requestsType: request.attributes.hasSeveralRequestTypes
                  ? request.attributes.requestType
                      .map((requestType) => {
                        if (requestType && requestType.id) {
                          return {
                            id: requestType.id,
                            editState: false,
                            typeTitle: requestType?.title ?? "",
                            typeRecipient: getRecipient(
                              requestType.isEmail ?? false,
                              requestType.email ?? "",
                              requestType.isTSMS ?? false,
                            ),
                          };
                        }
                      })
                      .filter(removeNulls)
                  : [],
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pageData]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getRequests();
    }
  }, [getRequests, isInitialized]);

  return (
    <div className="c-RequestsPage">
      <PageTitle title={labels.title} />
      <div>
        <CommonButton
          label={labels.createRequest}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/services/demandes/create`)}
        />
      </div>
      <h2 className="c-RequestsPage__Title">{labels.tableLabels.title}</h2>
      <div className="c-RequestsPage__Table">
        <CommonLoader
          isLoading={!isInitialized.current}
          isShowingContent={isLoadingMutation}
          errors={errors}
        >
          <CommonDataTable<IRequestTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            expandableRows={true}
            expandableRowsComponent={expandedComponent}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.requests?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId={"id"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          ></CommonDataTable>
        </CommonLoader>
      </div>
      <RequestAggregate />
      <CommonModalWrapper ref={modalRef}>
        <div>
          <span className="c-RequestsPage__ModalText">{modalText}</span>
          <div className="c-RequestsPage__ModalButtonsContainer">
            <CommonButton
              label={labels.warningModal.confirm}
              picto="check"
              style="primary"
              onClick={handleDeleteFromModal}
            />
            <CommonButton
              label={labels.warningModal.cancel}
              picto="cross"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </CommonModalWrapper>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <RequestsPage />
    </ContractLayout>
  );
}

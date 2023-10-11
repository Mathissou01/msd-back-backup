import { TableColumn } from "react-data-table-component";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import {
  GetYwsQrCodesQuery,
  GetYwsUnassociatedQrCodesByServiceIdDocument,
  useGetYwsQrCodesLazyQuery,
  useUpdateYwsQrCodeByIdMutation,
} from "../../../../../../graphql/codegen/generated-types";
import { getRightsByLabel } from "../../../../../../lib/user";
import { useUser } from "../../../../../../hooks/useUser";
import { ICurrentPagination } from "../../../../../../lib/common-data-table";
import { IDataTableAction } from "../../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import { removeNulls } from "../../../../../../lib/utilities";
import CommonDataTable from "../../../../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import { IYesWeScanTableRow } from "../YesWeScanServiceAssociationTab";
import YesWeScanAssociationDissociateModal from "./YesWeScanAssociationDissociateModal/YesWeScanAssociationDissociateModal";
import "./yes-we-scan-association-table.scss";

interface IYesWeScanAssociationTableRowProps {
  editModalRef: MutableRefObject<CommonModalWrapperRef | null>;
  setSelectedQrCode: Dispatch<SetStateAction<IYesWeScanTableRow | undefined>>;
}

export default function YesWeScanServiceAssociationTable({
  editModalRef,
  setSelectedQrCode,
}: IYesWeScanAssociationTableRowProps) {
  /* Static Data */
  const labels = {
    title: "QR Code associés",
    noAssociatedQRCode: "Aucun QR Code associé",
    table: {
      columns: {
        qrCodeId: "ID du QR Code",
        name: "Nom du point de signalement / d'apport",
        address: "Adresse",
      },
    },
  };
  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination) {
    return yesWeScanQrCodes({
      variables: {
        filters: {
          yesWeScanService: { id: { eq: ywsServiceId?.toString() } },
          typeAssociation: { notNull: true },
        },
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function handleConfirmDissociate(id: string) {
    return updateYesWeScanQrCode({
      variables: {
        ywsQrCodeId: id,
        data: {
          address: null,
          city: null,
          lat: null,
          long: null,
          dropOffMap: null,
          typeAssociation: null,
        },
      },
      refetchQueries: [GetYwsUnassociatedQrCodesByServiceIdDocument],
    }).then(() => {
      dissociateModalRef.current?.toggleModal(false);
    });
  }

  function handleOpenDissociateModal(id: string) {
    setSelectedQrCodeID(id);
    dissociateModalRef.current?.toggleModal(true);
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Yws", userRights);
  const router = useRouter();
  const { ywsServiceId } = router.query;
  const isInitialized = useRef(false);
  const dissociateModalRef = useRef<CommonModalWrapperRef>(null);
  const [tableData, setTableData] = useState<Array<IYesWeScanTableRow>>([]);
  const [selectedQrCodeID, setSelectedQrCodeID] = useState("");

  const [yesWeScanQrCodes, { data, loading, error }] =
    useGetYwsQrCodesLazyQuery({
      variables: {
        filters: {
          yesWeScanService: { id: { eq: ywsServiceId?.toString() } },
          typeAssociation: { notNull: true },
        },
        pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
      },
    });

  const [pageData, setPageData] = useState<GetYwsQrCodesQuery | undefined>(
    data,
  );

  const [
    updateYesWeScanQrCode,
    { loading: isLoadingMutation, error: updateMutationError },
  ] = useUpdateYwsQrCodeByIdMutation({
    refetchQueries: ["getYwsQrCodes"],
    awaitRefetchQueries: true,
  });
  const isLoading = loading || isLoadingMutation;
  const errors = [error, updateMutationError];

  const tableColumns: Array<TableColumn<IYesWeScanTableRow>> = [
    {
      id: "id",
      name: labels.table.columns.qrCodeId,
      selector: (row) => row.qrCodeId,
      grow: 3,
      sortable: true,
    },
    {
      id: "name",
      name: labels.table.columns.name,
      selector: (row) => row.name ?? "",
      grow: 7,
      sortable: true,
    },
    {
      id: "address",
      name: labels.table.columns.address,
      selector: (row) => row.address ?? "",
      grow: 6,
      sortable: true,
    },
  ];

  const actionColumn = (row: IYesWeScanTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      isDisabled: !userPermissions.update,
      alt: "Modifier",
      onClick: () => {
        setSelectedQrCode(row);
        editModalRef.current?.toggleModal(true);
      },
    },
    {
      id: "dissociate",
      picto: "unlink",
      isDisabled: !userPermissions.update,
      alt: "Dissocier",
      onClick: () => handleOpenDissociateModal(row.qrCodeId),
    },
  ];

  useEffect(() => {
    if (data) {
      const formattedData = data?.yesWeScanQrCodes?.data
        .map((qrCode) => ({
          qrCodeId: qrCode.id,
          address: qrCode?.attributes?.address,
          city: qrCode?.attributes?.city,
          name: qrCode?.attributes?.name,
          lat: qrCode?.attributes?.lat,
          long: qrCode?.attributes?.long,
          typeAssociation: qrCode?.attributes?.typeAssociation,
          dropOffMap: qrCode?.attributes?.dropOffMap,
        }))
        .filter(removeNulls);
      setTableData(formattedData as Array<IYesWeScanTableRow>);
    }
  }, [data, pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void yesWeScanQrCodes();
    }
  }, [yesWeScanQrCodes, isInitialized]);

  return (
    <div className="c-YesWeScanAssociationTable">
      <h2>{labels.title}</h2>
      <div className="c-YesWeScanAssociationTable__Container">
        <CommonLoader
          isLoading={!isInitialized.current}
          isShowingContent={isLoadingMutation}
          errors={errors}
        >
          {tableData.length >= 1 ? (
            <CommonDataTable<IYesWeScanTableRow>
              columns={tableColumns}
              actionColumn={actionColumn}
              data={tableData}
              defaultSortFieldId="id"
              isLoading={isLoading}
              lazyLoadingOptions={{
                isRemote: true,
                totalRows:
                  pageData?.yesWeScanQrCodes?.meta.pagination.total ?? 0,
              }}
              paginationOptions={{
                hasPagination: true,
                hasRowsPerPageOptions: false,
                defaultRowsPerPage,
                defaultPage,
              }}
              onLazyLoad={handleLazyLoad}
            />
          ) : (
            <span>{labels.noAssociatedQRCode}</span>
          )}
        </CommonLoader>
      </div>
      <YesWeScanAssociationDissociateModal
        modalRef={dissociateModalRef}
        selectedQrCodeID={selectedQrCodeID}
        handleConfirm={handleConfirmDissociate}
      />
    </div>
  );
}

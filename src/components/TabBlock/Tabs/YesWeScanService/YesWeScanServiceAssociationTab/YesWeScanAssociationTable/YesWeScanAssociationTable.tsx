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
  GetYwsUnassociatedQrCodesByServiceIdDocument,
  useGetYesWeScanQrCodesLazyQuery,
  useUpdateYwsQrCodeByIdMutation,
} from "../../../../../../graphql/codegen/generated-types";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../../lib/common-data-table";
import { IDataTableAction } from "../../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import { removeNulls } from "../../../../../../lib/utilities";
import CommonDataTable from "../../../../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import YesWeScanAssociationDissociateModal from "./YesWeScanAssociationDissociateModal/YesWeScanAssociationDissociateModal";
import "./yes-we-scan-association-table.scss";

interface IYesWeScanAssociationTableRowProps {
  setChosenQRCodeId: Dispatch<SetStateAction<string>>;
  editModalRef: MutableRefObject<CommonModalWrapperRef | null>;
}

interface IYesWeScanAssociationTableRow extends IDefaultTableRow {
  qrCodeId: string;
  address: string;
  city: string;
  name: string;
}

export default function YesWeScanServiceAssociationTable({
  setChosenQRCodeId,
  editModalRef,
}: IYesWeScanAssociationTableRowProps) {
  /* Static Data */
  const labels = {
    title: "QR Code associés",
    table: {
      columns: {
        qrCodeId: "ID du QR Code",
        name: "Nom du point de signalement / d'apport",
        address: "Adresse",
        city: "Ville",
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
  const router = useRouter();
  const { ywsServiceId } = router.query;
  const isInitialized = useRef(false);
  const dissociateModalRef = useRef<CommonModalWrapperRef>(null);
  const [tableData, setTableData] = useState<
    Array<IYesWeScanAssociationTableRow>
  >([]);
  const [selectedQrCodeID, setSelectedQrCodeID] = useState("");

  const [yesWeScanQrCodes, { data, loading, error }] =
    useGetYesWeScanQrCodesLazyQuery({
      variables: {
        filters: {
          yesWeScanService: { id: { eq: ywsServiceId?.toString() } },
          typeAssociation: { notNull: true },
        },
        pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
      },
    });

  const [
    updateYesWeScanQrCode,
    { loading: isLoadingMutation, error: updateMutationError },
  ] = useUpdateYwsQrCodeByIdMutation({
    refetchQueries: ["getYesWeScanQrCodes"],
    awaitRefetchQueries: true,
  });
  const isLoading = loading || isLoadingMutation;
  const errors = [error, updateMutationError];

  const tableColumns: Array<TableColumn<IYesWeScanAssociationTableRow>> = [
    {
      id: "qrCodeId",
      name: labels.table.columns.qrCodeId,
      selector: (row) => row.qrCodeId,
      grow: 2,
    },
    {
      id: "name",
      name: labels.table.columns.name,
      selector: (row) => row.name,
      grow: 8,
    },
    {
      id: "address",
      name: labels.table.columns.address,
      selector: (row) => row.address,
      grow: 6,
    },
    {
      id: "author",
      name: labels.table.columns.city,
      selector: (row) => row.city,
      grow: 6,
    },
  ];

  const actionColumn = (
    row: IYesWeScanAssociationTableRow,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      onClick: () => {
        setChosenQRCodeId(row.qrCodeId);
        editModalRef.current?.toggleModal(true);
      },
    },
    {
      id: "dissociate",
      picto: "unlink",
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
        }))
        .filter(removeNulls);
      setTableData(formattedData as Array<IYesWeScanAssociationTableRow>);
    }
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
          <CommonDataTable<IYesWeScanAssociationTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            defaultSortFieldId="id"
            isLoading={isLoading}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.yesWeScanQrCodes?.meta.pagination.total ?? 0,
            }}
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
      <YesWeScanAssociationDissociateModal
        modalRef={dissociateModalRef}
        selectedQrCodeID={selectedQrCodeID}
        handleConfirm={handleConfirmDissociate}
      />
    </div>
  );
}

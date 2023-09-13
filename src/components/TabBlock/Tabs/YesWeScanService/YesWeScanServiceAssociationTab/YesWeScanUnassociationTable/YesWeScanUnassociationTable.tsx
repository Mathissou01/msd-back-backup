import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  YesWeScanQrCodeEntity,
  useGetYwsUnassociatedQrCodesByServiceIdLazyQuery,
} from "../../../../../../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../../../../../../lib/common-data-table";
import { removeNulls } from "../../../../../../lib/utilities";
import CommonPagination from "../../../../../Common/CommonPagination/CommonPagination";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import "./yeswescan-unassiociation-table.scss";

interface IYesWeScanUnassociationTableProps {
  ywsServiceId: string;
  editModalRef: MutableRefObject<CommonModalWrapperRef | null>;
  setChosenQRCodeId: (qrCodeId: string) => void;
}

interface IYesWeScanUnassociationTableRow extends IDefaultTableRow {
  qrCodeId: string;
}

export default function YesWeScanUnassociationTable({
  ywsServiceId,
  editModalRef,
  setChosenQRCodeId,
}: IYesWeScanUnassociationTableProps) {
  /* Static data */
  const labels = {
    title: `QR Code non associés`,
    tabs: {
      reportingForm: "Formulaire de signalement",
      qrcode: "QR Code",
      qrcodeAssociation: "Association des QR Code",
    },
  };

  /* Local data */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<
    Array<IYesWeScanUnassociationTableRow>
  >([]);

  const [getUnassociatedQrCodes, { data, loading }] =
    useGetYwsUnassociatedQrCodesByServiceIdLazyQuery({
      variables: {
        ywsServiceId: ywsServiceId,
        pagination: { page: currentPage, pageSize: 60 },
      },
      fetchPolicy: "network-only",
    });

  /* Methods */
  function handleSelectQrCodeClick(qrCodeId: string) {
    setChosenQRCodeId(qrCodeId);
    editModalRef.current?.toggleModal(true);
  }

  useEffect(() => {
    if (data && data.yesWeScanQrCodes && data.yesWeScanQrCodes.data) {
      const formattedData = data.yesWeScanQrCodes.data
        .map((qrCode: YesWeScanQrCodeEntity) => {
          return {
            id: qrCode.id ?? "",
            qrCodeId: qrCode.id ?? "",
            editState: false,
          };
        })
        .filter(removeNulls);
      setTableData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getUnassociatedQrCodes();
    }
  }, [getUnassociatedQrCodes, isInitialized]);

  return (
    <CommonLoader isLoading={loading}>
      <div className="c-YesWeScanUnassociationTable">
        <h2 className="c-YesWeScanUnassociationTable__Title">{labels.title}</h2>
        {tableData && tableData.length >= 1 && (
          <>
            <div className="c-YesWeScanUnassociationTable__QrCodes">
              {tableData.map((qrCode) => {
                return (
                  <CommonButton
                    key={qrCode.id}
                    label={qrCode.id}
                    style="primary"
                    picto="edit"
                    fontStyle="fontLarge"
                    pictoPosition="right"
                    onClick={() => handleSelectQrCodeClick(qrCode.id)}
                  />
                );
              })}
            </div>
            <div>
              <CommonPagination
                currentPage={currentPage}
                onChangePage={(newPage) => setCurrentPage(newPage)}
                rowCount={60}
                noRowsPerPage
              />
            </div>
          </>
        )}
      </div>
    </CommonLoader>
  );
}

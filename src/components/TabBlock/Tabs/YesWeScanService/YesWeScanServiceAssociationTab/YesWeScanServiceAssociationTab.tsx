import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  Enum_Yeswescanqrcode_Typeassociation,
  useUpdateYesWeScanQrCodeByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import FormModal from "../../../../Form/FormModal/FormModal";
import YesWeScanAssociationModal from "../../../../YesWeScan/YesWeScanAssociationModal/YesWeScanAssociationModal";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";

interface IYesWeScanServiceAssociationModalSubmitData {
  updateYesWeScanQrCodeId: string;
  data: {
    typeAssociation?: Enum_Yeswescanqrcode_Typeassociation;
    name?: string;
    address?: string | null;
    city?: string | null;
    lat?: number | null;
    long?: number | null;
    dropOffMap?: string | null;
    yesWeScanService: string;
  };
}
interface IYesWeScanServiceAssociationTabProps {
  serviceName: string;
  serviceId: string;
}

export default function YesWeScanServiceAssociationTab({
  serviceName,
  serviceId,
}: IYesWeScanServiceAssociationTabProps) {
  /* Static Data */
  const labels = {
    qrcodeAssociation: "Associer un QR Code",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables: IYesWeScanServiceAssociationModalSubmitData = {
      updateYesWeScanQrCodeId: submitData.qrCodeId,
      data: {
        yesWeScanService: submitData.serviceId,
        typeAssociation:
          submitData.associationType === "1"
            ? Enum_Yeswescanqrcode_Typeassociation.SignalmentZone
            : Enum_Yeswescanqrcode_Typeassociation.DropOffMap,
        address: null,
        city: null,
        lat: null,
        long: null,
        dropOffMap: null,
      },
    };
    if (submitData.associationType === "1") {
      variables.data.name = submitData.reportingPointName;
      if (submitData.address) {
        variables.data.address = submitData.address;
        const addressSplit = submitData.address.split(" ");
        variables.data.city = addressSplit[addressSplit.length - 1];
      } else {
        variables.data.lat = +submitData.latitude;
        variables.data.long = +submitData.longitude;
      }
    } else {
      variables.data.name = submitData.dropOffMap.attributes.name;
      variables.data.address = submitData.dropOffMap.attributes.address;
      variables.data.city = submitData.dropOffMap.attributes.city;
      variables.data.lat = +submitData.dropOffMap.attributes.latitude;
      variables.data.long = +submitData.dropOffMap.attributes.longitude;
      variables.data.dropOffMap = submitData.dropOffMap.id;
    }

    updateQrCode({
      variables,
      // TODO : Add refetch queries when the two tables will be available
      refetchQueries: [],
    });
  }

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  // TODO : use setChosenQRCodeId to populate QR Code ID if we click on a specific QR Code ID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chosenQRCodeId, setChosenQRCodeId] = useState<string>("");
  const [
    updateQrCode,
    { loading: updateQrCodeLoading, error: updateQrCodeError },
  ] = useUpdateYesWeScanQrCodeByIdMutation();

  const isLoading = updateQrCodeLoading;
  const errors = [updateQrCodeError];

  return (
    <CommonLoader
      isLoading={isLoading}
      isShowingContent={isLoading}
      hasDelay={isLoading}
      errors={errors}
    >
      <div className="c-YesWeScanAssociation">
        <CommonButton
          label={labels.qrcodeAssociation}
          onClick={() => {
            modalRef.current?.toggleModal(true);
          }}
        />
        <FormModal
          modalRef={modalRef}
          modalTitle={labels.qrcodeAssociation}
          onSubmit={onSubmit}
        >
          <YesWeScanAssociationModal
            serviceName={serviceName}
            serviceId={serviceId}
            qrCodeId={chosenQRCodeId}
          />
        </FormModal>
      </div>
    </CommonLoader>
  );
}

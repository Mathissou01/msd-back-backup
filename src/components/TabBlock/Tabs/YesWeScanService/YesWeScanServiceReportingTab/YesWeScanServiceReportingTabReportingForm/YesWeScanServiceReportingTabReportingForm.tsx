import React, { useEffect, useState } from "react";
import { useGetYesWeScanFormByIdQuery } from "../../../../../../graphql/codegen/generated-types";
import YesWeScanReportingForm, {
  IYesWeScanFormFields,
} from "../../../../../YesWeScan/YesWeScanReportingForm";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import "./yeswescan-service-reporting-tab-reporting-form.scss";

interface IYesWeScanServiceReportingTabReportingFormProps {
  ywsServiceId: string;
  ywsFormId: string;
}

export default function YesWeScanServiceReportingTabReportingForm({
  ywsServiceId,
  ywsFormId,
}: IYesWeScanServiceReportingTabReportingFormProps) {
  /* Local Data */
  const [mappedData, setMappedData] = useState<IYesWeScanFormFields>();
  const { data: formData, loading } = useGetYesWeScanFormByIdQuery({
    fetchPolicy: "network-only",
    variables: {
      ywsFormId: ywsFormId,
    },
  });

  useEffect(() => {
    if (
      formData &&
      formData.yesWeScanForm &&
      formData.yesWeScanForm.data &&
      formData.yesWeScanForm.data.id &&
      formData.yesWeScanForm.data.attributes
    ) {
      const yesWeScanFormData = formData.yesWeScanForm.data.attributes;
      const mappedData: IYesWeScanFormFields = {
        id: formData.yesWeScanForm.data.id,
        logo: yesWeScanFormData?.logo?.data,
        reportButtons: yesWeScanFormData.reportButtons,
        pictureStatus: yesWeScanFormData.pictureStatus,
        thankYouMessage: yesWeScanFormData.thankYouMessage,
        displayEndingButton: yesWeScanFormData.displayEndingButton ? "1" : "0",
        endingButtonIntroduction:
          yesWeScanFormData.endingButtonIntroduction ?? "",
        endingButtonLabel: yesWeScanFormData.endingButtonLabel ?? "",
        endingButtonLink: yesWeScanFormData.endingButtonLink ?? "",
        hasEmail: yesWeScanFormData.hasEmail,
        hasTsms: yesWeScanFormData.hasTsms,
        mailRecipients: yesWeScanFormData.mailRecipients ?? "",
      };

      setMappedData(mappedData);
    }
  }, [formData]);

  return (
    <CommonLoader isLoading={loading}>
      <YesWeScanReportingForm
        ywsServiceId={ywsServiceId}
        ywsFormId={ywsFormId}
        isCreateMode={!formData?.yesWeScanForm?.data?.id ?? false}
        mappedData={mappedData}
      />
    </CommonLoader>
  );
}

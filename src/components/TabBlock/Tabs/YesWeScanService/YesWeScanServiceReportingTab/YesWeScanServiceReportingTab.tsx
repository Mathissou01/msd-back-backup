import React from "react";
import YesWeScanServiceReportingTabDiminutiveForm from "./YesWeScanServiceReportingTabDiminutiveForm/YesWeScanServiceReportingTabDiminutiveForm";
import YesWeScanServiceReportingTabReportingForm from "./YesWeScanServiceReportingTabReportingForm/YesWeScanServiceReportingTabReportingForm";
import "./yeswescan-service-reporting-tab.scss";

interface IYesWeScanServiceReportingTabProps {
  ywsShortName: string;
  ywsServiceId: string;
  ywsFormId: string;
}

export default function YesWeScanServiceReportingTab({
  ywsShortName,
  ywsServiceId,
  ywsFormId,
}: IYesWeScanServiceReportingTabProps) {
  return (
    <div className="c-YesWeScanServiceReportingTab">
      <YesWeScanServiceReportingTabDiminutiveForm
        ywsShortName={ywsShortName}
        ywsServiceId={ywsServiceId}
      />
      <YesWeScanServiceReportingTabReportingForm
        ywsServiceId={ywsServiceId}
        ywsFormId={ywsFormId}
      />
    </div>
  );
}

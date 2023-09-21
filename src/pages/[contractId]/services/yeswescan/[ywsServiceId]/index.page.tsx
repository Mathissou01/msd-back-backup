import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetYwsServiceByIdQuery } from "../../../../../graphql/codegen/generated-types";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../../components/TabBlock/TabBlock";
import YesWeScanServiceReportingTab from "../../../../../components/TabBlock/Tabs/YesWeScanService/YesWeScanServiceReportingTab/YesWeScanServiceReportingTab";
import YesWeScanServiceAssociationTab from "../../../../../components/TabBlock/Tabs/YesWeScanService/YesWeScanServiceAssociationTab/YesWeScanServiceAssociationTab";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import YesWeScanServiceQRCodeTab from "../../../../../components/TabBlock/Tabs/YesWeScanService/YesWeScanServiceQRCodeTab/YesWeScanServiceQRCodeTab";
import "./yws-service-page.scss";

interface IYesWeScanServicePageProps {
  ywsServiceId: string;
}
function YesWeScanServicePage({ ywsServiceId }: IYesWeScanServicePageProps) {
  /* Static Data */
  const labels = {
    title: `YesWeScan`,
    returnButton: "Retour",
    tabs: {
      reportingForm: "Formulaire de signalement",
      qrcode: "QR Code",
      qrcodeAssociation: "Association des QR Code",
    },
  };

  /* Local Data */
  const router = useRouter();
  const [isCheckingAuthorizedYws, setIsCheckingAuthorizedYws] =
    useState<boolean>(true);
  const { data, loading } = useGetYwsServiceByIdQuery({
    fetchPolicy: "network-only",
    variables: { serviceId: ywsServiceId },
  });
  const isLoading = loading || isCheckingAuthorizedYws;

  const serviceData = data?.yesWeScanService?.data;
  const tabs: Array<ITab> = [
    {
      name: "reportingForm",
      title: labels.tabs.reportingForm,
      content: (
        <YesWeScanServiceReportingTab
          ywsShortName={serviceData?.attributes?.shortName ?? ""}
          ywsServiceId={serviceData?.id ?? ""}
          ywsFormId={serviceData?.attributes?.yesWeScanForm?.data?.id ?? ""}
        />
      ),
      isEnabled: true,
    },
    {
      name: "qrcode",
      title: labels.tabs.qrcode,
      content: (
        <YesWeScanServiceQRCodeTab
          ywsServiceId={data?.yesWeScanService?.data?.id ?? ""}
          ywsShortName={
            data?.yesWeScanService?.data?.attributes?.shortName ?? ""
          }
        />
      ),
      isEnabled: true,
    },
    {
      name: "qrcodeAssociation",
      title: labels.tabs.qrcodeAssociation,
      content: (
        <YesWeScanServiceAssociationTab
          serviceName={serviceData?.attributes?.serviceName ?? ""}
          serviceId={serviceData?.id ?? ""}
        />
      ),
      isEnabled: true,
    },
  ];

  useEffect(() => {
    const currentTimestamp = new Date().getTime();
    const serviceAttributes = data?.yesWeScanService?.data?.attributes;
    if (data && !data.yesWeScanService?.data) {
      router.push("/404");
    }
    if (
      serviceAttributes &&
      (new Date(serviceAttributes.startDate).getTime() > currentTimestamp ||
        new Date(serviceAttributes.endDate).getTime() < currentTimestamp)
    ) {
      router.push("/403");
    } else if (serviceAttributes) {
      setIsCheckingAuthorizedYws(false);
    }
  }, [data, router]);

  return (
    <div className="c-YWSServicePage">
      <CommonLoader isLoading={isLoading}>
        <button
          className="c-YWSServicePage__ReturnButton"
          type="button"
          onClick={() => router.back()}
        >
          <span>{labels.returnButton}</span>
        </button>
        <PageTitle
          title={`${labels.title} - ${data?.yesWeScanService?.data?.attributes?.serviceName}`}
        />
        <TabBlock tabs={tabs} initialTabName="reportingForm" />
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  const ywsServiceId = useRoutingQueryId("ywsServiceId", "");
  return (
    ywsServiceId && (
      <ContractLayout>
        <YesWeScanServicePage ywsServiceId={ywsServiceId} />
      </ContractLayout>
    )
  );
}

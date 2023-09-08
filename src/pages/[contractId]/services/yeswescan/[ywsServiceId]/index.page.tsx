import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetYesWeScanServiceByIdQuery } from "../../../../../graphql/codegen/generated-types";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../../components/TabBlock/TabBlock";
import YesWeScanServiceReportingTab from "../../../../../components/TabBlock/Tabs/YesWeScanService/YesWeScanServiceReportingTab/YesWeScanServiceReportingTab";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
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
  const { data, loading } = useGetYesWeScanServiceByIdQuery({
    fetchPolicy: "network-only",
    variables: { serviceId: ywsServiceId },
  });

  const tabs: Array<ITab> = [
    {
      name: "reportingForm",
      title: labels.tabs.reportingForm,
      content: (
        <YesWeScanServiceReportingTab
          ywsShortName={
            data?.yesWeScanService?.data?.attributes?.shortName ?? ""
          }
          ywsServiceId={data?.yesWeScanService?.data?.id ?? ""}
          ywsFormId={
            data?.yesWeScanService?.data?.attributes?.yesWeScanForm?.data?.id ??
            ""
          }
        />
      ),
      isEnabled: true,
    },
    {
      name: "qrcode",
      title: labels.tabs.qrcode,
      content: <></>,
      isEnabled: true,
    },
    {
      name: "qrcodeAssociation",
      title: labels.tabs.qrcodeAssociation,
      content: <></>,
      isEnabled: true,
    },
  ];

  useEffect(() => {
    const currentTimestamp = new Date().getTime();
    const serviceAttributes = data?.yesWeScanService?.data?.attributes;
    if (
      serviceAttributes &&
      (new Date(serviceAttributes.startDate).getTime() > currentTimestamp ||
        new Date(serviceAttributes.endDate).getTime() < currentTimestamp)
    ) {
      router.push("/403");
    }
  }, [data, router]);

  return (
    <div className="c-YWSServicePage">
      <CommonLoader isLoading={loading}>
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

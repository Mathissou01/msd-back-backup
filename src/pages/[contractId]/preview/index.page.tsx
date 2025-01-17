import React, { useState } from "react";
import PreviewBanner from "../../../components/Preview/PreviewBanner/PreviewBanner";
import { useRouter } from "next/router";
import ShadowDOMContainer from "../../../components/Preview/ShadowDom/ShadowDomContainer";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";
import "./edito-actualites-preview-page.scss";

export default function PreviewPage() {
  /* Local Data */
  const router = useRouter();
  const { id, type } = router.query;
  const [width, setWidth] = useState<string>("100%");

  /*Methods */
  async function onFormatting(device: string) {
    switch (device) {
      case "desktop":
        setWidth("100%");
        break;
      case "tablet":
        setWidth("600px");
        break;
      case "mobile":
        setWidth("384px");
        break;
    }
  }

  return (
    <div>
      <PreviewBanner onFormatting={onFormatting} />
      {!router.isReady ? (
        <CommonSpinner />
      ) : (
        <div className="c-PreviewPage">
          <ShadowDOMContainer id={id} type={type} width={width} height="100%" />
        </div>
      )}
    </div>
  );
}

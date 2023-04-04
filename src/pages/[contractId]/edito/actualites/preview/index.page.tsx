import React, { useState } from "react";
import PreviewBanner from "../../../../../components/Preview/PreviewBanner/PreviewBanner";
import { useRouter } from "next/router";
import ShadowDOMContainer from "../../../../../components/Preview/ShadowDom/ShadowDomContainer";
import CommonSpinner from "../../../../../components/Common/CommonSpinner/CommonSpinner";
import "./edito-actualites-preview-page.scss";
export default function Preview() {
  const router = useRouter();
  const { id } = router.query;
  const [width, setWidth] = useState<string>("100%");

  async function onFormatting(device: string) {
    switch (device) {
      case "tablet":
        setWidth("1024px");
        break;
      case "mobile":
        setWidth("768px");
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
          <ShadowDOMContainer id={id} width={width} height={"100%"} />
        </div>
      )}
    </div>
  );
}

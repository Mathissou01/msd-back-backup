import React from "react";
import PreviewBanner from "../../../../../components/Preview/PreviewBanner/PreviewBanner";
import { useRouter } from "next/router";
import ShadowDOMContainer from "../../../../../components/Preview/ShadowDom/ShadowDomContainer";
import CommonSpinner from "../../../../../components/Common/CommonSpinner/CommonSpinner";
import "./edito-actualites-preview-page.scss";
export default function Preview() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <PreviewBanner />
      {!router.isReady ? (
        <CommonSpinner />
      ) : (
        <div className="c-PreviewPage">
          <ShadowDOMContainer id={id} width={"100%"} height={"100%"} />
        </div>
      )}
    </div>
  );
}

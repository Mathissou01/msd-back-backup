import React, { useEffect } from "react";
import { useGetContractByIdQuery } from "../../../graphql/codegen/generated-types";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import "./shadow-dom-format.scss";

const ShadowDomContainer = ({ id, type, width, height }) => {
  const { data, loading, error } = useGetContractByIdQuery({
    variables: {
      contractId:
        typeof window !== "undefined"
          ? window.location.pathname.split("/")[1]
          : "",
    },
  });
  console.log("data", data?.contract?.data?.attributes.clientName);
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      const iframe = document.querySelector("#external-iframe");
      iframe.addEventListener("load", () => {
        const shadowRoot = iframe.contentDocument.body.attachShadow({
          mode: "open",
        });
        const div = document.createElement("div");
        shadowRoot.appendChild(div);
      });
    });
  }, []);
  const iframeSrc = `${process.env.NEXT_PUBLIC_FO_URL}/${encodeURIComponent(
    data?.contract?.data?.attributes.clientName,
  )}/preview?type=${type}&id=${id}`;
  console.log("iframeSrc:", iframeSrc);

  return (
    <CommonLoader isLoading={loading} errors={error}>
      {data && data.contract?.data?.attributes.clientName && (
        <iframe
          id="external-iframe"
          src={`${process.env.NEXT_PUBLIC_FO_URL}/${encodeURIComponent(
            data?.contract?.data?.attributes.clientName,
          )}/preview?type=${type}&id=${id}`}
          width={width}
          height={height}
        />
      )}
    </CommonLoader>
  );
};

export default ShadowDomContainer;

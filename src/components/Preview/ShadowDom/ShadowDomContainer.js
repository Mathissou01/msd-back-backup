import React, { useEffect } from "react";
import "./shadow-dom-format.scss";

const ShadowDomContainer = ({ id, type, width, height }) => {
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

  return (
    <iframe
      id="external-iframe"
      src={`${process.env.NEXT_PUBLIC_FO_URL}/preview?type=${type}&id=${id}`}
      width={width}
      height={height}
    />
  );
};

export default ShadowDomContainer;

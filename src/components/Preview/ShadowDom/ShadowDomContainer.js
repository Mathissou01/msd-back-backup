import React, { useEffect } from "react";
const ShadowDomContainer = ({ id, width, height }) => {
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
      src={`http://localhost:3002/preview?id=${id}`}
      width={width}
      height={height}
    />
  );
};

export default ShadowDomContainer;

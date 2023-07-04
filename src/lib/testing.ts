import { prettyDOM } from "@testing-library/react";

export function removeUnstableHtmlPropertiesForTesting(
  htmlElement: HTMLElement,
  attributeName: string,
) {
  const domHTML = prettyDOM(htmlElement, Infinity).toString();
  if (!domHTML) return undefined;
  const regex = new RegExp(`${attributeName}(.*)"(.*)"`, "g");
  return domHTML.replaceAll(regex, "");
}

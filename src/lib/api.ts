import qs from "qs";

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function getAzureSearchURL(path = "") {
  return `${process.env.NEXT_PUBLIC_AZURE_SEARCH_URL}${path}`;
}

export async function fetchAzureSearch(
  path: string,
  urlParamsObject = {},
  options = {},
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      "api-key": "C91tu6oXTbJ9mdQMANN96N6skIsSPKTlbakF3sNpTuAzSeDe9I1T",
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, { encode: false });
  const requestUrl = `${getAzureSearchURL(
    `${path}${queryString ? `?${queryString}` : ""}`,
  )}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  return await response.json();
}

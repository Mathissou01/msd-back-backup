import qs from "qs";

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function getAzureSearchURL(path = "") {
  return `${process.env.NEXT_PUBLIC_AZURE_SEARCH_URL}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
) {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`,
  )}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  return await response.json();
}

interface IFetchGraphQLParams {
  query: {};
  baseUrl?: string;
  variables?: {};
  urlParamsObject?: {};
  options?: {};
}

export async function fetchGraphQL(params: IFetchGraphQLParams) {
  const mergedOptions = {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.query,
      variables: params.variables,
    }),
    ...params.options,
  };

  const queryString = qs.stringify(params.urlParamsObject);
  const requestUrl = getStrapiURL(
    `/graphql${queryString ? `?${queryString}` : ""}`,
  );

  return await fetch(requestUrl, mergedOptions).then((response) => {
    if (!response.ok) {
      throw new Error(`An error occurred please try again`);
    }
    return response.json();
  });
}

export async function fetchGraphQLDynamic(params: IFetchGraphQLParams) {
  const mergedOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.query,
      variables: params.variables,
    }),
    ...params.options,
  };

  const queryString = qs.stringify(params.urlParamsObject);
  const requestUrl = `${
    params.baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""
  }/api/graphql${queryString ? `?${queryString}` : ""}`;

  console.log(queryString);
  console.log(mergedOptions);
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  return await response.json();
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

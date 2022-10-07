import qs from "qs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStrapiURL } from "../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const mergedOptions = {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
      // ...req.headers,
    },
    body: JSON.stringify(req.body),
  };

  const queryString = qs.stringify(req.query);
  const requestUrl = getStrapiURL(
    `/graphql${queryString ? `?${queryString}` : ""}`,
  );
  const response = await fetch(requestUrl, mergedOptions).then((response) => {
    if (!response.ok) {
      throw new Error(`An error occurred please try again`);
    }
    return response.json();
  });

  return res.json(response);
}

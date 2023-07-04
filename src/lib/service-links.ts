import { removeNulls } from "./utilities";

export interface IPicto {
  data: {
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
}

export interface IServiceLink {
  type?: string;
  id?: string;
  name: string;
  externalLink?: string;
  isDisplayed: boolean;
  picto?: IPicto | null;
}

export interface IPartialServiceLink {
  __typename: string;
  name?: string | null;
}

export function isServiceLink(
  link: Partial<IPartialServiceLink>,
): link is IServiceLink {
  return "name" in link && "isDisplayed" in link;
}

export function remapServiceLinksDynamicZone(
  serviceLinks: Array<Partial<IPartialServiceLink> | null> | null,
): Array<IServiceLink> | null {
  return (
    serviceLinks
      ?.map((link) => {
        if (link) {
          const type = link.__typename;
          if (type && isServiceLink(link)) {
            return {
              type,
              id: link.id,
              name: link?.name,
              ...(link?.externalLink && { externalLink: link?.externalLink }),
              isDisplayed: link?.isDisplayed,
              picto: link?.picto,
            };
          }
        }
      })
      .filter(removeNulls) ?? null
  );
}

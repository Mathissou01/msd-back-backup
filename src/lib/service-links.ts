import { removeNulls } from "./utilities";

export interface IPicto {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface IServiceLink {
  type?: string;
  localId: number;
  name: string;
  externalLink?: string;
  isDisplayed: boolean;
  picto?: IPicto | null;
}

// eslint-disable-next-line
export function isServiceLink(link: any): link is IServiceLink {
  return "name" in link && "isDisplayed" in link;
}

export interface IPartialServiceLink {
  __typename: string;
  name?: string | null;
}

export function remapServiceLinksDynamicZone(
  serviceLinks: Array<Partial<IPartialServiceLink> | null> | null,
): Array<IServiceLink> | null {
  return (
    serviceLinks
      ?.map((link, index) => {
        if (link) {
          const type = link.__typename;
          if (type && isServiceLink(link)) {
            return {
              type,
              localId: index,
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

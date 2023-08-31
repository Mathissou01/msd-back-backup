import { removeNulls } from "./utilities";
import {
  ILocalFile,
  IUploadFileEntity,
  remapUploadFileEntityToLocalFile,
} from "./media";

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
  localId?: string;
  name: string;
  externalLink?: string;
  isDisplayed: boolean;
  picto?: ILocalFile | null;
}

export interface IStateServiceLink {
  externalLink?: string;
  id?: string;
  name: string;
  isDisplayed: boolean;
  picto?:
    | {
        data?: IUploadFileEntity | null | undefined;
        __typename: string;
      }
    | null
    | undefined;
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

export function isStateServiceLink(
  link: Partial<IPartialServiceLink>,
): link is IStateServiceLink {
  return "name" in link && "isDisplayed" in link && "picto" in link;
}

export function remapServiceLinksDynamicZone(
  serviceLinks: Array<Partial<IPartialServiceLink> | null> | null,
): Array<IServiceLink> | null {
  return (
    serviceLinks
      ?.map((link, i) => {
        if (link) {
          const type = link.__typename;
          if (type && isServiceLink(link)) {
            return {
              type,
              id: link.id,
              localId: `local-${i}`,
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

export function remapServicesLinkDynamicZonePicto(
  serviceLinks: Array<Partial<IPartialServiceLink> | null> | null,
): Array<IServiceLink> | null {
  return (
    serviceLinks
      ?.map((link, index) => {
        if (link) {
          const type = link.__typename;
          if (type && isStateServiceLink(link)) {
            const pictoData = link?.picto?.data;
            return {
              type,
              id: link.id,
              localId: `local-${index}`,
              name: link?.name,
              ...(link?.externalLink && { externalLink: link?.externalLink }),
              isDisplayed: link?.isDisplayed,
              picto: remapUploadFileEntityToLocalFile(pictoData),
            };
          }
        }
      })
      .filter(removeNulls) ?? null
  );
}

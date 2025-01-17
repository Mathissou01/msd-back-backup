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
  freeContents?: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
  isDisplayed: boolean;
  picto?: ILocalFile | null;
}

export interface IServiceLinkFromServer {
  type?: string;
  id?: string;
  localId?: string;
  name: string;
  externalLink?: string;
  isDisplayed: boolean;
  picto?: { data: { id: string; attributes: ILocalFile | null } };
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
  freeContents?: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

export interface IPartialServiceLink {
  __typename: string;
  name?: string | null;
}

export function isServiceLink(
  link: Partial<IPartialServiceLink>,
): link is IServiceLinkFromServer {
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
              ...(link?.picto?.data?.id &&
                !!link.picto.data.attributes && {
                  picto: {
                    id: link.picto.data.id,
                    url: link.picto.data.attributes.url ?? "",
                    alternativeText:
                      link.picto.data.attributes.alternativeText ?? "",
                    ext: link.picto.data.attributes.ext ?? "",
                    mime: link.picto.data.attributes.mime ?? "",
                    name: link.picto.data.attributes.name ?? "",
                    size: link.picto.data.attributes.size ?? 0,
                  },
                }),
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
              ...(link?.freeContents && { freeContents: link?.freeContents }),
            };
          }
        }
      })
      .filter(removeNulls) ?? null
  );
}

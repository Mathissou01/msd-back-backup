import axios from "axios";
import client from "../graphql/client";
import {
  GetUploadFilesDocument,
  GetUploadFoldersByPathIdDocument,
  GetUploadFoldersByPathIdQuery,
  Maybe,
  Scalars,
  UpdateUploadFileByIdDocument,
  UpdateUploadFileByIdMutation,
} from "../graphql/codegen/generated-types";

export const AcceptedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "image/tiff",
  "image/ico",
  "image/dvu",
  "text/csv",
  "application/pdf",
  "application/zip",
  "application/json",
  "application/xhtml+xml",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
type AcceptedMimeTypesTuple = typeof AcceptedMimeTypes;
export type TAcceptedMimeTypes = AcceptedMimeTypesTuple[number];

export const fileSizeLimitationOptions = {
  _30mb: 31457280, // 30 MB
  _200kb: 204800, // 200 KB
  _20mb: 20971520, // 20 MB
};

export interface IUploadFileEntityResponse {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<IUploadFileEntity>;
}

export interface IUploadFileEntity {
  __typename?: "UploadFileEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<{
    __typename?: "UploadFile";
    alternativeText?: Maybe<Scalars["String"]>;
    caption?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["DateTime"]>;
    ext?: Maybe<Scalars["String"]>;
    formats?: Maybe<Scalars["JSON"]>;
    hash: Scalars["String"];
    height?: Maybe<Scalars["Int"]>;
    mime: Scalars["String"];
    name: Scalars["String"];
    previewUrl?: Maybe<Scalars["String"]>;
    provider: Scalars["String"];
    provider_metadata?: Maybe<Scalars["JSON"]>;
    // related?: Array<IGenericMorph>;
    size: Scalars["Float"];
    updatedAt?: Maybe<Scalars["DateTime"]>;
    url: Scalars["String"];
    width?: Maybe<Scalars["Int"]>;
  }>;
}

export interface IFolder {
  id: string;
  name: string;
  path: string;
  pathId: number;
  children?: Array<string>;
  childrenAmount?: number;
  filesAmount?: number;
}

export interface ILocalFile {
  id?: string;
  alternativeText: string;
  createdAt?: string;
  ext: string;
  height?: number;
  mime: string;
  name: string;
  size: number;
  url: string;
  width?: number;
  // Extended attributes
  file?: File;
  folder?: string;
  isChecked?: boolean;
}

export function isMimeType(type: string): type is TAcceptedMimeTypes {
  return AcceptedMimeTypes.includes(type as TAcceptedMimeTypes);
}

export function isLocalFile(entity: unknown): entity is ILocalFile {
  return (
    typeof entity === "object" &&
    !!entity &&
    !("__typename" in entity) &&
    "alternativeText" in entity
  );
}

export function remapUploadFileEntityToLocalFile(
  uploadFile?: IUploadFileEntity | null,
): ILocalFile | null {
  let mappedData: ILocalFile | null = null;
  if (uploadFile?.id && uploadFile?.attributes) {
    const file = uploadFile?.attributes;
    mappedData = {
      id: uploadFile.id,
      alternativeText: file.alternativeText ?? "",
      name: file.name,
      ext: file.ext ?? file.name.split(".")[1],
      mime: file.mime,
      size: file.size,
      url: file.url,
      width: file.width ?? 0,
      height: file.height ?? 0,
      createdAt: new Date(file.createdAt).toLocaleDateString(),
    };
  }
  return mappedData;
}

export async function uploadFile(
  activePathId: number,
  file: ILocalFile,
  fileId?: string,
) {
  const { data: foldersData, errors: foldersErrors } =
    await client.query<GetUploadFoldersByPathIdQuery>({
      query: GetUploadFoldersByPathIdDocument,
      variables: { pathId: activePathId },
    });

  if (!foldersErrors) {
    if (file && file.file) {
      try {
        const formData = new FormData();

        formData.append("files", file.file, file.name);

        const API = "upload";
        const HOST = process.env.NEXT_PUBLIC_API_URL;
        const url = `${HOST}/${API}`;

        const config = {
          headers: {
            Authorization: "*",
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };

        const { status, data } = await axios.post(url, formData, config);

        if (status === 200) {
          const { data: updateUploadFileData } =
            await client.mutate<UpdateUploadFileByIdMutation>({
              mutation: UpdateUploadFileByIdDocument,
              variables: {
                updateUploadFileId: fileId ?? data[0].id,
                data: {
                  folder: file.folder ?? foldersData?.uploadFolders?.data[0].id,
                  name: file.name,
                  width: file.width ?? null,
                  height: file.height ?? null,
                  alternativeText: file.alternativeText ?? file.name,
                },
              },
              refetchQueries: [
                {
                  query: GetUploadFilesDocument,
                  variables: { activePathId: activePathId },
                },
                "getUploadFiles",
              ],
            });
          return {
            data: updateUploadFileData,
            result: data[0],
          };
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            message: error,
          };
        }
      }
    }
  }
}

export async function updateUploadedFile(pathId: number, file: ILocalFile) {
  const { errors: foldersErrors } =
    await client.query<GetUploadFoldersByPathIdQuery>({
      query: GetUploadFoldersByPathIdDocument,
      variables: { pathId },
    });

  if (!foldersErrors) {
    if (file && file.file) {
      try {
        const formData = new FormData();
        formData.append("files", file.file, file.name);

        const API = `upload/${file.id}`;
        const HOST = process.env.NEXT_PUBLIC_API_URL;
        const url = `${HOST}/${API}`;

        const config = {
          headers: {
            Authorization: "*",
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };

        const { status } = await axios.post(url, formData, config);
        return status;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            message: error,
          };
        }
      }
    }
  }
}

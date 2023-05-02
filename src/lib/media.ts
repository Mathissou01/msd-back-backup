import axios from "axios";
import client from "../graphql/client";
import {
  GetFilesPaginationByPathIdDocument,
  GetFolderByPathIdDocument,
  GetFolderByPathIdQuery,
  UpdateUploadFileDocument,
  UpdateUploadFileMutation,
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

export function isMimeType(type: string): type is TAcceptedMimeTypes {
  return AcceptedMimeTypes.includes(type as TAcceptedMimeTypes);
}

export const fileSizeLimitation_30mb = 31457280; // 30 MB
export const fileSizeLimitation_200kb = 204800; // 200 KB

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
  name: string;
  alternativeText: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  file?: File;
  width?: number;
  height?: number;
  createdAt?: string;
  hash?: string;
  provider?: string;
  folder?: string;
  id?: string;
  isChecked?: boolean;
}

export function handleReplaceSpecialChars(arg: string) {
  return arg.replace(/['"]/g, "") ?? arg;
}

export async function uploadFile(activePathId: number, file: ILocalFile) {
  const { data: getFolderByPathIdData, errors: getFolderByPathIdErrors } =
    await client.query<GetFolderByPathIdQuery>({
      query: GetFolderByPathIdDocument,
      variables: { pathId: activePathId },
    });

  if (!getFolderByPathIdErrors) {
    if (file) {
      try {
        const formData = new FormData();

        formData.append("files", file.file ?? "");

        const API = "graphql";
        const HOST = process.env.NEXT_PUBLIC_API_URL;
        const url = `${HOST}/${API}`;

        const config = {
          headers: {
            Authorization: "*",
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };

        const result = await axios.post(url, formData, config);

        if (result.data[0].id) {
          const { data: UpdateUploadFileMutationData } =
            await client.mutate<UpdateUploadFileMutation>({
              mutation: UpdateUploadFileDocument,
              variables: {
                updateUploadFileId: result.data[0].id,
                data: {
                  folder:
                    file.folder ??
                    getFolderByPathIdData?.uploadFolders?.data[0].id,
                  name: file.name,
                  width: file.width ?? null,
                  height: file.height ?? null,
                  alternativeText: file.alternativeText ?? file.name,
                },
              },
              refetchQueries: [
                {
                  query: GetFilesPaginationByPathIdDocument,
                  variables: { activePathId: activePathId },
                },
                "getFilesPaginationByPathId",
              ],
            });
          return {
            data: UpdateUploadFileMutationData,
            result: result.data[0],
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

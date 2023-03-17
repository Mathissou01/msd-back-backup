import axios from "axios";
import client from "../graphql/client";
import { IFileToEdit } from "../components/Media/MediaImportButton/MediaImportButton";
import {
  GetFilesPaginationByPathIdDocument,
  GetFolderByPathIdDocument,
  GetFolderByPathIdQuery,
  UpdateUploadFileDocument,
  UpdateUploadFileMutation,
} from "../graphql/codegen/generated-types";

export async function uploadFile(
  activePathId: number,
  selectedFiles: IFileToEdit[],
) {
  const selectedFilesInstance: IFileToEdit[] = [...selectedFiles];

  const { data: getFolderByPathIdData, errors: getFolderByPathIdErrors } =
    await client.query<GetFolderByPathIdQuery>({
      query: GetFolderByPathIdDocument,
      variables: { pathId: activePathId },
    });

  if (!getFolderByPathIdErrors) {
    for (const file of selectedFilesInstance) {
      if (file.file) {
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
            return UpdateUploadFileMutationData;
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      }
    }
  }
}

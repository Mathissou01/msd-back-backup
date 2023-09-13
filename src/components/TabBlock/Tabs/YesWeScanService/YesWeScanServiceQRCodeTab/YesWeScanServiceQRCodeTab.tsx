import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import {
  useCreateYwsQrCodeMutation,
  useGetYwsQrCodesByServiceIdQuery,
  useUpdateYwsQrCodeByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import FormInput from "../../../../Form/FormInput/FormInput";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import "./yeswescan-service-qrcode-tab.scss";

interface IQrCodeObject {
  id: string;
  canvas: HTMLCanvasElement;
}

interface IQrCodeUrl {
  id: string;
  url: string;
}

interface IQrCodeData {
  id: string;
  data: string;
}

interface IYesWeScanQRCodeTab {
  ywsServiceId: string;
  ywsShortName: string;
}
export default function YesWeScanServiceQRCodeTab({
  ywsServiceId,
  ywsShortName,
}: IYesWeScanQRCodeTab) {
  /* Static data */
  const defaultQrCodeToGenerate = 10;

  const labels = {
    input: "Quantité de nouveaux QR Code à générer",
    submitButton: "Télécharger les nouveaux QR Codes",
    alreadyCreatedQrCode: `QR Codes déjà générés`,
    downloadOldQrCodeButton: "Télécharger tous les QR Codes générés",
  };

  /* Local data */
  const { contract } = useContract();
  const form = useForm();
  const { handleSubmit } = form;

  const [createQrCode, { loading: loadingCreate }] = useCreateYwsQrCodeMutation(
    {
      fetchPolicy: "network-only",
      refetchQueries: ["getYwsQrCodesByServiceId"],
    },
  );

  const [updateQrCode, { loading: loadingUpdate }] =
    useUpdateYwsQrCodeByIdMutation({
      fetchPolicy: "network-only",
      refetchQueries: ["getYwsQrCodesByServiceId"],
    });

  const { data, loading } = useGetYwsQrCodesByServiceIdQuery({
    variables: {
      ywsServiceId: ywsServiceId,
    },
    fetchPolicy: "network-only",
  });

  /* Methods */
  async function onSubmit(values: FieldValues) {
    const qrCodeIdsGenerated: Array<string> = [];

    for (let i = 0; i < parseInt(values.qrCodeToGenerate); i++) {
      await createQRCodeInDb().then((qrCodeId) => {
        qrCodeIdsGenerated.push(qrCodeId);
      });
    }

    const qrCodeCanvasGenerated: Array<IQrCodeObject> = await Promise.all(
      qrCodeIdsGenerated.map(async (qrCodeId) => {
        return createQrCodeData(qrCodeId).then((qrCodeCanvas) => {
          return {
            id: qrCodeId,
            canvas: qrCodeCanvas,
          };
        });
      }),
    );

    const qrCodeUrlToDownload: Array<IQrCodeUrl> = await Promise.all(
      qrCodeCanvasGenerated.map(async (qrCodeCanvas) => {
        return updateQrCodeData(qrCodeCanvas.id, qrCodeCanvas.canvas).then(
          (qrCodeUrl) => {
            return {
              id: qrCodeCanvas.id,
              url: qrCodeUrl,
            };
          },
        );
      }),
    );

    const zip = await new JSZip();
    const qrCodes = await zip.folder("QRCodes");

    await Promise.all(
      qrCodeUrlToDownload.map(async (qrCodeUrl) => {
        await qrCodes?.file(
          `QRCODE-${ywsShortName}-${qrCodeUrl.id}.png`,
          qrCodeUrl.url.split(";base64,")[1],
          { base64: true },
        );
      }),
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "QRCODES.zip");
    });
  }

  async function createQRCodeInDb(): Promise<string> {
    return new Promise((resolve) => {
      createQrCode({
        variables: {
          data: {
            yesWeScanService: ywsServiceId,
          },
        },
      }).then((value) => {
        if (
          value &&
          value.data &&
          value.data.createYesWeScanQrCode &&
          value.data.createYesWeScanQrCode.data &&
          value.data.createYesWeScanQrCode.data.id
        )
          resolve(value.data.createYesWeScanQrCode.data.id);
      });
    });
  }

  async function createQrCodeData(
    qrCodeIdGenerated: string,
  ): Promise<HTMLCanvasElement> {
    const img = await document.createElement("img");
    const canvas = await document.createElement("canvas");
    return await QRCode.toDataURL(
      await `${process.env.NEXT_PUBLIC_BASE_HOST}/${encodeURI(
        contract.attributes?.clientName ?? "",
      )}/${ywsShortName}/${qrCodeIdGenerated}`,
      { width: 250 },
    )
      .then((qrCode) => {
        img.src = qrCode;
      })
      .then(async () => {
        canvas.width = 250;
        canvas.height = 250;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          await ctx.drawImage(img, 0, 0);
          await ctx.fillText(`${ywsShortName}-${qrCodeIdGenerated}`, 30, 240);
        }
        return canvas;
      });
  }

  async function updateQrCodeData(
    qrCodeIdGenerated: string,
    qrCodeDataCanvas: HTMLCanvasElement,
  ): Promise<string> {
    return new Promise((resolve) => {
      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/qrcode/${contract.id}/${ywsServiceId}/${qrCodeIdGenerated}`;
      const formData = new FormData();

      qrCodeDataCanvas.toBlob((blob) => {
        if (blob) {
          formData.append(
            `file`,
            blob,
            `QRCODE-${ywsShortName}-${qrCodeIdGenerated}.png`,
          );

          fetch(fetchUrl, {
            method: "POST",
            body: formData,
          }).then((response) => {
            if (response.ok) {
              response.text().then((qrCodeUrl) => {
                updateQrCode({
                  variables: {
                    ywsQrCodeId: qrCodeIdGenerated,
                    data: {
                      qrCodeUrl: qrCodeUrl,
                    },
                  },
                }).then(() => {
                  resolve(qrCodeDataCanvas.toDataURL("image/png"));
                });
              });
            }
          });
        }
      });
    });
  }

  async function downloadAllCreatedQRCodes() {
    const zip = await new JSZip();
    const createdQrCodes = await zip.folder("QRCodes");

    if (
      data &&
      data.yesWeScanQrCodes &&
      data.yesWeScanQrCodes.data &&
      data.yesWeScanQrCodes.data.length > 0
    ) {
      const blobs = await Promise.all(
        data.yesWeScanQrCodes.data.map(async (qrCode) => {
          if (
            qrCode &&
            qrCode.id &&
            qrCode.attributes &&
            qrCode.attributes.qrCodeUrl
          ) {
            return fetch(qrCode.attributes.qrCodeUrl)
              .then((response) => response.blob())
              .then((blob) => {
                if (blob)
                  return {
                    id: qrCode.id,
                    blob: blob,
                  };
              });
          }
        }),
      );

      const blobUrls =
        (await Promise.all<IQrCodeData | undefined>(
          blobs.map((blob) => {
            if (blob && blob.blob && blob.id) {
              return new Promise<IQrCodeData>((resolve) => {
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                  resolve({
                    id: blob.id ?? "",
                    data: (fileReader.result as string).split(";base64,")[1],
                  });
                };
                fileReader.readAsDataURL(blob.blob);
              });
            }
          }),
        )) ?? [];

      await blobUrls.map((url: IQrCodeData | undefined) => {
        if (url && url.id && url.data) {
          createdQrCodes?.file(
            `QRCODE-${ywsShortName}-${url.id}.png`,
            url.data,
            {
              base64: true,
            },
          );
        }
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "QRCODES.zip");
      });
    }
  }

  return (
    <CommonLoader isLoading={loading || loadingUpdate || loadingCreate}>
      <div className="c-YesWeScanServiceQRCodeTab">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="qrCodeToGenerate"
              type="number"
              label={labels.input}
              isRequired
              defaultValue={defaultQrCodeToGenerate.toString()}
            />
            <CommonButton
              label={labels.submitButton}
              style="primary"
              type="submit"
            />
          </form>
        </FormProvider>
        <div className="c-YesWeScanServiceQRCodeTab__AlreadyCreatedQRCode">
          <span>{`${labels.alreadyCreatedQrCode}: ${data?.yesWeScanQrCodes?.data.length}`}</span>
          <CommonButton
            label={`${labels.downloadOldQrCodeButton}`}
            onClick={downloadAllCreatedQRCodes}
          />
        </div>
      </div>
    </CommonLoader>
  );
}

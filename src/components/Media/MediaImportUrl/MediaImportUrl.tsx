import axios from "axios";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import FormInput from "../../Form/FormInput/FormInput";
import { ILocalFile, isMimeType } from "../../../lib/media";
import { ModalStatus } from "../MediaImportButton/MediaImportButton";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import "./media-import-url.scss";

interface IMediaImportUrlProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  selectedFiles: ILocalFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ILocalFile[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalStatus>>;
}

export default function MediaImportUrl({
  modalRef,
  selectedFiles,
  setSelectedFiles,
  setActiveModal,
}: IMediaImportUrlProps) {
  /** Static Data */
  const labels = {
    nextBtn: "Suivant",
    cancelBtn: "Annuler",
  };

  /* Local Data */
  const form = useForm({
    mode: "onChange",
  });
  const { handleSubmit, setError } = form;

  /** Method */
  async function onImportFromUrl(submitData: FieldValues) {
    const selectedFilesInstance: ILocalFile[] = [...selectedFiles];
    const urls: Array<string> = submitData["url"].split("\n");

    for (const url of urls) {
      if (onPatternValidation(url) === false) {
        setError("url", { message: "une URL est invalide" });
        return;
      }
    }

    if (submitData["url"] !== "") {
      for (const [index, url] of urls.entries()) {
        const fileName = url.split(/[#?]/)[0].split("/").pop();
        const extension = fileName?.split(".")[1];

        if (fileName && extension) {
          try {
            await axios({
              url,
              method: "GET",
              responseType: "blob",
            }).then((response) => {
              const mimeType: string = response.headers["content-type"];
              if (isMimeType(mimeType)) {
                const blob = new Blob([response.data], {
                  type: mimeType.toString(),
                });
                const file = new File([blob], fileName, {
                  lastModified: Number(new Date()),
                  type: mimeType.toString(),
                });

                if (mimeType.split("/")[0] === "image") {
                  const fr = new FileReader();

                  fr.onload = function () {
                    const img = new Image();

                    img.onload = function () {
                      if (img.width && img.height) {
                        selectedFilesInstance.push({
                          name: file.name,
                          alternativeText: file.name,
                          width: img.width,
                          height: img.height,
                          ext: `.${extension}`,
                          mime: file.type,
                          size: file.size,
                          url: URL.createObjectURL(file),
                          createdAt: new Date(
                            file.lastModified,
                          ).toLocaleDateString(),
                          file: file,
                        });
                      }
                    };

                    img.src = fr.result?.toString() ?? "";
                  };

                  fr.readAsDataURL(file);
                } else {
                  selectedFilesInstance.push({
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(blob),
                    file: file,
                    mime: mimeType,
                    ext: `.${extension}`,
                    alternativeText: "",
                    width: 0,
                    height: 0,
                    createdAt: file.lastModified.toString(),
                  });
                }

                if (index === urls.length - 1) {
                  setSelectedFiles(selectedFilesInstance);
                  setActiveModal(ModalStatus.UPLOAD_MODAL);
                }
              } else {
                setError("url", { message: "une URL est invalide" });
                return;
              }
            });
          } catch (error: unknown) {
            setError("url", { message: "Erreur réseau" });
            if (error instanceof Error) {
              return {
                message: error,
              };
            }
          }
        }
      }
    } else {
      setError("url", { message: "le champs est libre" });
    }
  }

  function onPatternValidation(url: string): boolean {
    const regex =
      /^https?:\/\/.*\/.*\.(png|gif|jpeg|jpg|svg|dvu|ico|tiff|pdf|csv|zip|xls|xlsx|json)\??.*$/gim;

    if (url.match(regex)) return true;
    return false;
  }

  return (
    <FormProvider {...form}>
      <form
        className="c-MediaImportUrl"
        onSubmit={handleSubmit(onImportFromUrl)}
      >
        <FormInput
          name="url"
          tagType="textarea"
          label="url"
          patternValidation={
            /^https?:\/\/.*\/.*\.(png|gif|jpeg|jpg|svg|dvu|ico|tiff|pdf|csv|zip|xls|xlsx|json)\??.*$/gim
          }
          patternValidationErrorMessage="une URL est invalide"
        />
        <div className="c-MediaImportUrl__Button">
          <CommonButton
            type="button"
            label={labels.cancelBtn}
            onClick={() => modalRef.current?.toggleModal(false)}
          />
          <CommonButton type="submit" label={labels.nextBtn} style="primary" />
        </div>
      </form>
    </FormProvider>
  );
}

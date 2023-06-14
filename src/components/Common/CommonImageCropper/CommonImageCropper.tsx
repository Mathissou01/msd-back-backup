import Image from "next/image";
import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview/CommonCanvasPreview";
import { useDebounceEffect } from "./canvasPreview/useDebounceEffect";
import "react-image-crop/src/ReactCrop.scss";
import "./common-image-cropper.scss";
import { ILocalFile } from "../../../lib/media";

interface ICommonImageCropperProps {
  fileToEdit: ILocalFile;
  activateCrop: () => void;
  onCropCompleted: (
    croppedFile: ILocalFile,
    croppedImage?: string,
    width?: number | undefined,
    height?: number | undefined,
  ) => void;
  onCropCanceled: () => void;
}

interface IBlob extends Blob {
  lastModifiedDate?: Date;
  name: string;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function CommonImageCropper({
  fileToEdit,
  onCropCompleted,
  onCropCanceled,
}: ICommonImageCropperProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [verifyCrop, setVerifyCrop] = useState<boolean>(false);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const [aspect] = useState<number | undefined>(16 / 9);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop],
  );

  const handleCrop = () => {
    if (completedCrop) {
      setVerifyCrop(true);

      const image = previewCanvasRef.current?.toDataURL(
        "image/" + fileToEdit.ext,
      );

      const isBase64 = (value: string) =>
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
          value,
        );
      const b64toBlob = (
        b64Data: string,
        contentType = "",
        sliceSize = 512,
      ) => {
        const newB64 = b64Data.split(",");
        if (!isBase64(newB64[1])) {
          throw new Error("Input is not a valid base64 string");
        }
        const byteCharacters = window.atob(newB64[1]);
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });

        return blob;
      };

      const blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: IBlob = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;

        return theBlob as File;
      };

      const blob = b64toBlob(image ?? "", fileToEdit.mime);
      const file = blobToFile(blob, fileToEdit.name);

      const croppedFile = {
        ...fileToEdit,
        name: file.name,
        size: file.size,
        mime: file.type,
        ext: fileToEdit.ext,
        width: Math.round(completedCrop.width),
        height: Math.round(completedCrop.height),
        date: new Date().toLocaleDateString(),
        url: URL.createObjectURL(blob),
        file,
      };

      onCropCompleted(
        croppedFile,
        URL.createObjectURL(blob),
        completedCrop.width,
        completedCrop.height,
      );
    }
  };

  return (
    <div className="c-CommonImageCropper">
      {!verifyCrop && (
        <>
          <div className="c-CommonImageCropper__NavBar">
            <button
              className="c-CommonImageCropper__ButtonCross"
              type="button"
              onClick={() => onCropCanceled()}
            >
              <Image
                src={"/images/pictos/cross.svg"}
                alt={""}
                width={30}
                height={30}
              />
            </button>
            <button
              className="c-CommonImageCropper__ButtonCheck"
              type="button"
              onClick={handleCrop}
            >
              <Image
                src={"/images/pictos/check.svg"}
                alt={""}
                width={25}
                height={25}
              />
            </button>
          </div>
          {!!fileToEdit.url && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              {!verifyCrop && (
                <Image
                  className="c-CommonImageCropper__Image"
                  ref={imgRef}
                  alt="Crop me"
                  src={fileToEdit.url}
                  onLoad={onImageLoad}
                  fill
                  crossOrigin="anonymous"
                />
              )}
            </ReactCrop>
          )}
        </>
      )}
      <div style={{ display: "none" }}>
        <canvas
          ref={previewCanvasRef}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

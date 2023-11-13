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
import PseudoImageFallback from "../../Accessibility/PseudoImageFallback/PseudoImageFallback";

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
  /* Static Data */
  const altTexts = {
    confirm: "Confirmer",
    cancel: "Annuler",
  };

  /* Local Data */
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [verifyCrop, setVerifyCrop] = useState<boolean>(false);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const blobUrlRef = useRef("");

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
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    if (completedCrop) {
      setVerifyCrop(true);

      const blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: IBlob = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;

        return theBlob as File;
      };

      previewCanvasRef.current.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to create blob");
        }
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }
        blobUrlRef.current = URL.createObjectURL(blob);

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
      });
    }
  };

  return (
    <div className="c-CommonImageCropper">
      {!verifyCrop && (
        <>
          <div className="c-CommonImageCropper__NavBar">
            <button
              className="c-CommonImageCropper__Button c-CommonImageCropper__Button_cross"
              type="button"
              onClick={() => onCropCanceled()}
              title={altTexts.cancel}
            >
              <PseudoImageFallback alt={altTexts.cancel} />
            </button>
            <button
              className="c-CommonImageCropper__Button c-CommonImageCropper__Button_check"
              type="button"
              onClick={handleCrop}
              title={altTexts.confirm}
            >
              <PseudoImageFallback alt={altTexts.confirm} />
            </button>
          </div>
          {!!fileToEdit.url && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              className="c-CommonImageCropper__ReactCrop"
            >
              {!verifyCrop && (
                <Image
                  className="c-CommonImageCropper__Image"
                  ref={imgRef}
                  alt={fileToEdit.alternativeText}
                  src={fileToEdit.url}
                  onLoad={onImageLoad}
                  width={500}
                  height={300}
                  crossOrigin="anonymous"
                />
              )}
            </ReactCrop>
          )}
        </>
      )}
      <div style={{ display: "none" }}>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid red",
              objectFit: "contain",
              width: completedCrop?.width,
              height: completedCrop?.height,
            }}
          />
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { IFileToEdit } from "../MediaImportButton/MediaImportButton";
import pdfIcon from "./../../../../public/images/pictos/pdf.svg";
import docIcon from "./../../../../public/images/pictos/doc.svg";
import "./media-card.scss";

export enum MediaCardParentOptions {
  HOME = "HOME",
  MODAL = "MODAL",
}

interface IMediaCard {
  file: { file: IFileToEdit };
  loading?: boolean;
  parent?: MediaCardParentOptions;
  handleEditFile: (file: IFileToEdit, width: number, height: number) => void;
  handleRemoveFile: () => void;
}

export default function MediaCard({
  file,
  loading,
  parent,
  handleEditFile,
  handleRemoveFile,
}: IMediaCard) {
  /* Local Data */
  const media = file.file;
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const ImgType = media.mime.split("/")[0];

  /** Methods */
  const getImgDimensions = (
    file: IFileToEdit,
    callback: (width: number, height: number) => void,
  ) => {
    const img = new window.Image();

    img.src = file.url;
    img.onload = () => {
      callback(img.width, img.height);
    };
  };

  getImgDimensions(media, (width: number, height: number) => {
    media.width = width;
    media.height = height;
    setImgWidth(width);
    setImgHeight(height);
  });

  const wrapperClassnames = classNames("c-MediaCard", {
    "c-MediaCard__Loading": loading,
  });

  return (
    <div className={wrapperClassnames}>
      {media.url && ImgType === "image" ? (
        <div className="c-MediaCard__Image">
          <Image
            src={media.url}
            width={245}
            height={158}
            alt={media.alternativeText}
          />
        </div>
      ) : media.ext === "pdf" ? (
        <div className="c-MediaCard__Doc">
          <Image src={pdfIcon} width={48} height={58} alt="" />
        </div>
      ) : (
        <div className="c-MediaCard__Doc">
          <Image src={docIcon} width={48} height={58} alt="" />
        </div>
      )}
      <div className="c-MediaCard__Description">
        <span className="c-MediaCard__Title">{media.name}</span>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__TypeFile">
            {ImgType === "image"
              ? `${media.ext} - ${imgWidth || media.width}x${
                  imgHeight || media.height
                }`
              : `${media.ext}`}
          </span>
          {parent === MediaCardParentOptions.MODAL && (
            <button
              type="button"
              className="c-MediaCard__Action_trash"
              onClick={handleRemoveFile}
            />
          )}
        </div>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__Tag">
            {ImgType === "image" ? "image" : "doc"}
          </span>
          <button
            type="button"
            className="c-MediaCard__Action_edit"
            onClick={() => handleEditFile(media, imgWidth, imgHeight)}
          />
        </div>
      </div>
      <input type="checkbox" className="c-MediaCard__Checkbox" />
    </div>
  );
}

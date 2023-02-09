import React from "react";
import Image from "next/image";
import "./media-card.scss";

import pdfIcon from "./../../../../public/images/pictos/pdf.svg";
import docIcon from "./../../../../public/images/pictos/doc.svg";

export default function MediaCard(file: { file: File }) {
  /* Local Data */
  const media = file.file;
  console.log(media);
  const fileUrl = URL.createObjectURL(media);
  const fileMediaName = media.name.split(".")[0].split(".")[0];
  const imgWidth = "100";
  const imgHeight = "100";
  const fileMimeType = media.type.split("/")[0];
  const fileExtention = media.name.split(".")[1];

  return (
    <div className="c-MediaCard">
      {fileUrl && fileMimeType === "image" ? (
        <div className="c-MediaCard__Image">
          <Image src={fileUrl} width={245} height={158} alt={fileMediaName} />
        </div>
      ) : fileExtention === "pdf" ? (
        <div className="c-MediaCard__Doc">
          <Image src={pdfIcon} width={48} height={58} alt="" />
        </div>
      ) : (
        <div className="c-MediaCard__Doc">
          <Image src={docIcon} width={48} height={58} alt="" />
        </div>
      )}
      <div className="c-MediaCard__Description">
        <span className="c-MediaCard__Title">{fileMediaName}</span>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__TypeFile">
            {`${fileExtention} - ${imgWidth}x${imgHeight}`}
          </span>
          <button type="button" className="c-MediaCard__Action_trash" />
        </div>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__Tag">{fileMimeType}</span>
          <button type="button" className="c-MediaCard__Action_edit" />
        </div>
      </div>
      <input type="checkbox" className="c-MediaCard__Checkbox" />
    </div>
  );
}

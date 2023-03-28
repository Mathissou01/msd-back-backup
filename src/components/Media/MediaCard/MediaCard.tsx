import React from "react";
import { ApolloError } from "@apollo/client";
import { IcheckedFile } from "../../../lib/uploadFile";
import CommonMediaCardThumbnail from "../../Common/CommonMediaCardThumbnail/CommonMediaCardThumbnail";
import { IFileToEdit } from "../MediaImportButton/MediaImportButton";
import "./media-card.scss";

interface IMediaCardProps {
  file: { file: IFileToEdit };
  loading?: boolean | undefined;
  errors?: (ApolloError | undefined)[];
  handleEditFile?: (file: IFileToEdit) => void;
  handleRemoveFile?: () => void;
  handleSelectedFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: IcheckedFile | undefined;
}

export default function MediaCard({
  file,
  loading,
  errors,
  handleEditFile,
  handleRemoveFile,
  handleSelectedFile,
  checked,
}: IMediaCardProps) {
  /* Local Data */
  const media = file.file;
  const imageType = media.mime.split("/")[0];

  return (
    <div className="c-MediaCard">
      <CommonMediaCardThumbnail
        media={media}
        imageType={imageType}
        loading={loading}
        errors={errors}
      />
      <div className="c-MediaCard__Description">
        <span className="c-MediaCard__Title">{media.name}</span>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__TypeFile">
            {imageType === "image"
              ? `${media.ext.slice(1)} - ${media.width}x${media.height}`
              : `${media.ext.slice(1)}`}
          </span>
          {handleRemoveFile && (
            <button
              type="button"
              className="c-MediaCard__Action_trash"
              onClick={handleRemoveFile}
            />
          )}
        </div>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__Tag">
            {imageType === "image" ? "image" : "doc"}
          </span>
          {handleEditFile && (
            <button
              type="button"
              className="c-MediaCard__Action_edit"
              onClick={() => handleEditFile(media)}
            />
          )}
        </div>
      </div>
      <input
        type="checkbox"
        className="c-MediaCard__Checkbox"
        onChange={handleSelectedFile}
        checked={checked?.status}
      />
    </div>
  );
}

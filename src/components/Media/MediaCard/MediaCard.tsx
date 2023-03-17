import React from "react";
import { IFileToEdit } from "../MediaImportButton/MediaImportButton";
import "./media-card.scss";
import { ApolloError } from "@apollo/client";
import CommonMediaCardThumbnail from "../../Common/CommonMediaCardThumbnail/CommonMediaCardThumbnail";

export enum MediaCardParentOptions {
  HOME = "HOME",
  MODAL = "MODAL",
}

interface IMediaCardProps {
  file: { file: IFileToEdit };
  loading?: boolean | undefined;
  errors?: (ApolloError | undefined)[];
  parent?: MediaCardParentOptions;
  handleEditFile: (file: IFileToEdit) => void;
  handleRemoveFile: () => void;
}

export default function MediaCard({
  file,
  loading,
  errors,
  parent,
  handleEditFile,
  handleRemoveFile,
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
            {imageType === "image" ? "image" : "doc"}
          </span>
          <button
            type="button"
            className="c-MediaCard__Action_edit"
            onClick={() => handleEditFile(media)}
          />
        </div>
      </div>
      <input type="checkbox" className="c-MediaCard__Checkbox" />
    </div>
  );
}

import React from "react";
import { ApolloError } from "@apollo/client";
import CommonMediaCardThumbnail from "../../Common/CommonMediaCardThumbnail/CommonMediaCardThumbnail";
import { ILocalFile } from "../../../lib/media";
import { getRightsByLabel } from "../../../lib/user";
import { useUser } from "../../../hooks/useUser";
import "./media-card.scss";

interface IMediaCardProps {
  file: ILocalFile;
  loading?: boolean;
  errors?: Array<ApolloError | undefined>;
  onEditFile?: (file: ILocalFile) => void;
  onRemoveFile?: () => void;
  onSelectedFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}

export default function MediaCard({
  file,
  loading,
  errors,
  onEditFile,
  onRemoveFile,
  onSelectedFile,
  isChecked,
}: IMediaCardProps) {
  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Medias", userRights);
  const imageType = file.mime.split("/")[0];

  return (
    <div className="c-MediaCard">
      <CommonMediaCardThumbnail
        media={file}
        imageType={imageType}
        loading={loading}
        errors={errors}
      />
      <div className="c-MediaCard__Description">
        <span className="c-MediaCard__Title">{file.name}</span>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__TypeFile">
            {imageType === "image"
              ? `${file.ext.slice(1)} - ${file.width}x${file.height}`
              : `${file.ext.slice(1)}`}
          </span>
          {onRemoveFile && userPermissions.delete && (
            <button
              type="button"
              className="c-MediaCard__Action_trash"
              onClick={onRemoveFile}
            />
          )}
        </div>
        <div className="c-MediaCard__Infos">
          <span className="c-MediaCard__Tag">
            {imageType === "image" ? "image" : "doc"}
          </span>
          {onEditFile && userPermissions.update && (
            <button
              type="button"
              className="c-MediaCard__Action_edit"
              onClick={() => onEditFile(file)}
            />
          )}
        </div>
      </div>
      {onSelectedFile && (
        <input
          type="checkbox"
          className="c-MediaCard__Checkbox"
          onChange={(e) => onSelectedFile(e)}
          checked={isChecked ?? false}
        />
      )}
    </div>
  );
}

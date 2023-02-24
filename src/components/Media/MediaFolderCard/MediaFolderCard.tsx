import classNames from "classnames";
import React from "react";
import MediaUpdateFolderButton from "../MediaUpdateFolderButton/MediaUpdateFolderButton";
import "./media-folder-card.scss";

interface IMediaFolderCardProps {
  id: string;
  name: string;
  path: string;
  picto: "folder";
  childrenAmount?: number;
  filesAmount?: number;
  onClick: () => void;
  localFolderPathId: `${number}`;
  //localActivePathId: number;
}

export default function MediaFolderCard({
  //localActivePathId
  id,
  name,
  path,
  picto,
  childrenAmount,
  filesAmount,
  localFolderPathId,
  onClick,
}: IMediaFolderCardProps) {
  const pictoClassNames = classNames("c-MediaFolderCard__Picto", {
    [`c-MediaFolderCard__Picto_${picto}`]: picto,
  });
  return (
    <div className="c-MediaFolderCard">
      <button className="c-MediaFolderCard__Button" onClick={onClick}>
        {picto && <div className={pictoClassNames} />}
        <div className="c-MediaFolderCard__Informations">
          <div className="c-MediaFolderCard__Title">{name}</div>
          <div className="c-MediaFolderCard__Description">
            {`${childrenAmount ?? 0} ${
              !childrenAmount || (childrenAmount && childrenAmount > 1)
                ? "dossiers"
                : "dossier"
            }, ${filesAmount ?? 0} ${
              !filesAmount || (filesAmount && filesAmount > 1)
                ? "medias"
                : "media"
            }`}
          </div>
        </div>
      </button>
      <div className="c-MediaFolderCard__Edit">
        <MediaUpdateFolderButton
          id={id}
          name={name}
          path={path}
          localFolderPathId={localFolderPathId}
        />
      </div>
    </div>
  );
}

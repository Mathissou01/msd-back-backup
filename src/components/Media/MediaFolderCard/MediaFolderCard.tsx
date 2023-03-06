import classNames from "classnames";
import React from "react";
import MediaUpdateFolderButton from "../MediaUpdateFolderButton/MediaUpdateFolderButton";
import "./media-folder-card.scss";
import { IFolder } from "../../../pages/[contractId]/edito/bibliotheque-de-medias/index.page";

interface IMediaFolderCardProps {
  folder: IFolder;
  picto: "folder";
  activePath: string;
  activePathId: number;
  onClick: () => void;
}

export default function MediaFolderCard({
  folder,
  picto,
  activePath,
  activePathId,
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
          <div className="c-MediaFolderCard__Title">{folder.name}</div>
          <div className="c-MediaFolderCard__Description">
            {`${folder.childrenAmount ?? 0} ${
              !folder.childrenAmount ||
              (folder.childrenAmount && folder.childrenAmount > 1)
                ? "dossiers"
                : "dossier"
            }, ${folder.filesAmount ?? 0} ${
              !folder.filesAmount ||
              (folder.filesAmount && folder.filesAmount > 1)
                ? "medias"
                : "media"
            }`}
          </div>
        </div>
      </button>
      <div className="c-MediaFolderCard__Edit">
        <MediaUpdateFolderButton
          folder={folder}
          activePath={activePath}
          activePathId={activePathId}
        />
      </div>
    </div>
  );
}

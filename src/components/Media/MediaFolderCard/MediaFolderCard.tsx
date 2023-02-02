import classNames from "classnames";
import React from "react";
import "./media-folder-card.scss";

interface IMediaFolderCardProps {
  name: string | null;
  picto: "folder";
  childrenAmount: number;
  filesAmount: number;
  onClick: () => void;
  //localActivePathId: number;
}

export default function MediaFolderCard({
  //localActivePathId
  name,
  picto,
  childrenAmount,
  filesAmount,
  onClick,
}: IMediaFolderCardProps) {
  const pictoClassNames = classNames("c-MediaFolderCard__Picto", {
    [`c-MediaFolderCard__Picto_${picto}`]: picto,
  });
  return (
    <button className="c-MediaFolderCard" onClick={onClick}>
      {picto && <div className={pictoClassNames} />}
      <div className="c-MediaFolderCard__Informations">
        <div className="c-MediaFolderCard__Title">{name}</div>
        <div className="c-MediaFolderCard__Description">
          {childrenAmount} {childrenAmount > 1 ? "dossiers" : "dossier"},{" "}
          {filesAmount} {filesAmount > 1 ? "médias" : "média"}
        </div>
      </div>
    </button>
  );
}

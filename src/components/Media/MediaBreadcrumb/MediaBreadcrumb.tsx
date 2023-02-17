import React from "react";
import classNames from "classnames";
import "./media-breadcrumb.scss";

export interface IMediaBreadcrumb {
  label: string;
  onClick: () => void;
}

interface IMediaBreadcrumbProps {
  foldersBreadcrumb: Array<IMediaBreadcrumb>;
}
export default function MediaBreadcrumb({
  foldersBreadcrumb,
}: IMediaBreadcrumbProps) {
  const mediaBreadcrumb = classNames("c-MediaBreadcrumb", {
    "c-MediaBreadcrumb_displayed": foldersBreadcrumb.length === 1,
  });
  return (
    <nav className={mediaBreadcrumb}>
      <ol className="c-MediaBreadcrumb__Navbar">
        {foldersBreadcrumb.map((folder, index) => (
          <li key={index} className="c-MediaBreadcrumb__NavbarItem">
            {foldersBreadcrumb.length - 1 == index ? (
              <span className="c-MediaBreadcrumb__Link">{folder.label}</span>
            ) : (
              <button
                className="c-MediaBreadcrumb__Link c-MediaBreadcrumb__Link_active"
                onClick={folder.onClick}
              >
                {folder.label}
              </button>
            )}
            {foldersBreadcrumb.length - 1 !== index && (
              <span className="c-MediaBreadcrumb__Separator" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

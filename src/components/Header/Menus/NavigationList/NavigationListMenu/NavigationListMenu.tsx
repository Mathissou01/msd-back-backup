import classNames from "classnames";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAbsoluteOrRelativeUrl } from "../../../../../lib/utilities";
import {
  ENavigationPages,
  useNavigation,
} from "../../../../../hooks/useNavigation";
import { IActiveMenu } from "../NavigationList";
import "./navigation-list-menu.scss";

interface INavigationListButtonProps {
  children?: ReactNode;
  path: keyof typeof ENavigationPages;
  activeMenu: IActiveMenu;
  pictoUrl: string;
  pictoAlt?: string;
  onClick?: (path: keyof typeof ENavigationPages) => void;
}

export default function NavigationListMenu({
  children,
  path,
  activeMenu,
  pictoUrl,
  pictoAlt = "",
  onClick,
}: INavigationListButtonProps) {
  const { currentRoot, currentPage, setCurrentPage } = useNavigation();
  const isMenu = !!children;
  const menuClassNames = classNames("c-NavigationListMenu", {
    "c-NavigationListMenu_open": isMenu
      ? path === activeMenu.menuName && activeMenu.isOpen
      : currentPage === path,
    "c-NavigationListMenu_menu": isMenu,
  });
  const isValidUrl = pictoUrl && isAbsoluteOrRelativeUrl(pictoUrl);

  return (
    <div className={menuClassNames}>
      {isMenu ? (
        <>
          <button
            className="c-NavigationListMenu__Button"
            onClick={() => onClick && onClick(path)}
          >
            {isValidUrl && (
              <div className="c-NavigationListMenu__Picto">
                <Image src={pictoUrl} alt={pictoAlt} width={18} height={18} />
              </div>
            )}
            <span className="c-NavigationListMenu__Label">
              {ENavigationPages[path]}
            </span>
          </button>
          <div className="c-NavigationListMenu__List">{children}</div>
        </>
      ) : (
        <Link
          className="c-NavigationListMenu__Button"
          href={`${currentRoot}${path}`}
          onClick={() => setCurrentPage(path)}
        >
          {isValidUrl && (
            <div className="c-NavigationListMenu__Picto">
              <Image src={pictoUrl} alt={pictoAlt} width={18} height={18} />
            </div>
          )}
          <span className="c-NavigationListMenu__Label">
            {ENavigationPages[path]}
          </span>
        </Link>
      )}
    </div>
  );
}

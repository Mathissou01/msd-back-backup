import classNames from "classnames";
import { ReactNode } from "react";
import Link from "next/link";
import { ENavigationPages } from "../../../../../lib/navigation";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { IActiveMenu } from "../NavigationList";
import "./navigation-list-menu.scss";
import { TNavigationPictoStyles } from "../../../../../lib/pictos";

interface INavigationListButtonProps {
  children?: ReactNode;
  path: keyof typeof ENavigationPages;
  activeMenu: IActiveMenu;
  picto: TNavigationPictoStyles;
  onClick?: (path: keyof typeof ENavigationPages) => void;
}

export default function NavigationListMenu({
  children,
  path,
  activeMenu,
  picto,
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
  const pictoClassNames = classNames("c-NavigationListMenu__Picto", {
    [`c-NavigationListMenu__Picto_${picto}`]: picto,
  });

  return (
    <div className={menuClassNames}>
      {isMenu ? (
        <>
          <button
            className="c-NavigationListMenu__Button"
            onClick={() => onClick && onClick(path)}
          >
            <div className={pictoClassNames} />
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
          <div className={pictoClassNames} />
          <span className="c-NavigationListMenu__Label">
            {ENavigationPages[path]}
          </span>
        </Link>
      )}
    </div>
  );
}

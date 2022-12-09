import classNames from "classnames";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAbsoluteOrRelativeUrl } from "../../../../../lib/utilities";
import "./navigation-list-menu.scss";

interface INavigationListButtonProps {
  children?: ReactNode;
  href?: string;
  label: string;
  pictoUrl: string;
  pictoAlt?: string;
  isOpen: boolean;
  onClick?: () => void;
}

export default function NavigationListMenu({
  children,
  href,
  label,
  pictoUrl,
  pictoAlt = "",
  isOpen,
  onClick,
}: INavigationListButtonProps) {
  const isMenu = !!children && !href;
  const menuClassNames = classNames("c-NavigationListMenu", {
    "c-NavigationListMenu_open": isOpen,
    "c-NavigationListMenu_menu": isMenu,
  });
  const isValidUrl = pictoUrl && isAbsoluteOrRelativeUrl(pictoUrl);

  return (
    <div className={menuClassNames}>
      {isMenu ? (
        <>
          <button className="c-NavigationListMenu__Button" onClick={onClick}>
            {isValidUrl && (
              <div className="c-NavigationListMenu__Picto">
                <Image src={pictoUrl} alt={pictoAlt} width={18} height={18} />
              </div>
            )}
            <span className="c-NavigationListMenu__Label">{label}</span>
          </button>
          <div className="c-NavigationListMenu__List">{children}</div>
        </>
      ) : (
        <Link
          className="c-NavigationListMenu__Button"
          href={href ?? "/"}
          onClick={onClick}
        >
          {isValidUrl && (
            <div className="c-NavigationListMenu__Picto">
              <Image src={pictoUrl} alt={pictoAlt} width={18} height={18} />
            </div>
          )}
          <span className="c-NavigationListMenu__Label">{label}</span>
        </Link>
      )}
    </div>
  );
}

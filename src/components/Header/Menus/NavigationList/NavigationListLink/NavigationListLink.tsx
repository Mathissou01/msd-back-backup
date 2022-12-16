import classNames from "classnames";
import Link from "next/link";
import "./navigation-list-link.scss";
import { ENavigationPages } from "../../../../../hooks/useNavigation";

interface INavigationListButtonProps {
  href: keyof typeof ENavigationPages;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function NavigationListLink({
  href,
  label,
  isActive,
  onClick,
}: INavigationListButtonProps) {
  const menuClassNames = classNames("c-NavigationListLink", {
    "c-NavigationListLink_active": isActive,
  });

  return (
    <Link className={menuClassNames} href={href ?? "/"} onClick={onClick}>
      <span className="c-NavigationListLink__Label">{label}</span>
    </Link>
  );
}

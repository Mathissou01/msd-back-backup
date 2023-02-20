import classNames from "classnames";
import Link from "next/link";
import {
  ENavigationPages,
  useNavigation,
} from "../../../../../hooks/useNavigation";
import "./navigation-list-link.scss";

interface INavigationListButtonProps {
  path: keyof typeof ENavigationPages;
  label?: string;
}

export default function NavigationListLink({
  path,
  label,
}: INavigationListButtonProps) {
  const { currentRoot, currentPage, setCurrentPage } = useNavigation();
  const menuClassNames = classNames("c-NavigationListLink", {
    "c-NavigationListLink_active": currentPage === path,
  });
  return (
    <Link
      className={menuClassNames}
      href={`${currentRoot}${path}`}
      onClick={() => setCurrentPage(path)}
    >
      <span className="c-NavigationListLink__Label">
        {label ?? ENavigationPages[path]}
      </span>
    </Link>
  );
}

import classNames from "classnames";
import Link from "next/link";
import { ENavigationPages } from "../../../../../lib/navigation";
import {
  isNavigationPath,
  useNavigation,
} from "../../../../../hooks/useNavigation";
import "./navigation-list-link.scss";

interface INavigationListButtonProps {
  path: keyof typeof ENavigationPages | string;
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
        {label ?? (isNavigationPath(path) ? ENavigationPages[path] : "")}
      </span>
    </Link>
  );
}

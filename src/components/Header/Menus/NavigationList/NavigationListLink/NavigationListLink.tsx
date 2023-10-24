import classNames from "classnames";
import Link from "next/link";
import { ENavigationPages } from "../../../../../lib/navigation";
import { getRightsByLabel } from "../../../../../lib/user";
import { useUser } from "../../../../../hooks/useUser";
import {
  isNavigationPath,
  useNavigation,
} from "../../../../../hooks/useNavigation";
import "./navigation-list-link.scss";

interface INavigationListButtonProps {
  path: keyof typeof ENavigationPages | string;
  label?: string;
  entityName?: string;
}

export default function NavigationListLink({
  path,
  label,
  entityName = "",
}: INavigationListButtonProps) {
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel(entityName, userRights);

  const { currentRoot, currentPage, setCurrentPage } = useNavigation();
  const menuClassNames = classNames("c-NavigationListLink", {
    "c-NavigationListLink_active": currentPage === path,
  });
  return (
    <Link
      className={menuClassNames}
      href={`${currentRoot}${path}`}
      style={{
        cursor: userPermissions.read ? "pointer" : "default",
      }}
      onClick={
        userPermissions.read
          ? () => setCurrentPage(path)
          : (e) => e.preventDefault()
      }
    >
      <span
        className={classNames("c-NavigationListLink__Label", {
          "c-NavigationListLink__Label_disabled": !userPermissions.read,
        })}
      >
        {label ?? (isNavigationPath(path) ? ENavigationPages[path] : "")}
      </span>
    </Link>
  );
}

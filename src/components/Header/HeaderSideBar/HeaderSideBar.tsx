import Link from "next/link";
import NavigationList from "../Menus/NavigationList/NavigationList";
import "./header-side-bar.scss";

export default function HeaderSideBar() {
  return (
    <nav className="c-HeaderSideBar" data-testid="side-bar">
      <NavigationList />
      <div className="c-HeaderSideBar__Logo">
        <Link href={"/"}>[Logo MSD]</Link>
      </div>
    </nav>
  );
}

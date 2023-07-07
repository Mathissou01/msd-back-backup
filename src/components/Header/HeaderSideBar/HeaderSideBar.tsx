import Link from "next/link";
import Image from "next/image";
import NavigationList from "../Menus/NavigationList/NavigationList";
import "./header-side-bar.scss";

export default function HeaderSideBar() {
  /* Static Data */
  const logoLink = "https://www.monservicedechets.com/";
  const altTextLogo = `Aller sur ${logoLink}`;

  return (
    <nav className="c-HeaderSideBar" data-testid="side-bar">
      <NavigationList />
      <div className="c-HeaderSideBar__LogoContainer">
        <Link href={logoLink}>
          <Image
            className="c-HeaderSideBar__LogoSuez"
            src="/images/monservicedechets-logo.svg"
            alt={altTextLogo}
            width={150}
            height={72}
          />
        </Link>
      </div>
    </nav>
  );
}

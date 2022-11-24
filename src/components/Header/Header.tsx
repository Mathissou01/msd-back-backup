import Head from "next/head";
import Link from "next/link";
import "./header.scss";

export default function Header() {
  return (
    <>
      <Head>
        <title>MSD-BACK</title>
        <meta name="description" content="wip" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <header role="banner" className="c-Header__TopBar" data-testid="top-bar">
        <nav role="navigation" className="c-Header__Nav">
          <ul className="c-Header__NavList c-Header__NavList_top">
            <li className="c-Header__NavItem">
              <Link href={"/"} style={{ fontWeight: "bold" }}>
                MSD-BACK
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <aside className="c-Header__LeftBar" data-testid="left-bar">
        <nav role="navigation" className="c-Header__Nav">
          <ul className="c-Header__NavList c-Header__NavList_side">
            <li className="c-Header__NavGroup">
              <span className="c-Header__NavItem">Personnalisation</span>
              <ul>
                <li className="c-Header__NavItem">
                  <Link href={`/personnalisation/accueil`}>
                    <span>Page d&apos;accueil</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

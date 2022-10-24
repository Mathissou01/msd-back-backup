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

      <nav className={"c-Header__TopBar"} data-testid={"top-bar"}>
        <Link href={"/"}>
          <a style={{ fontWeight: "bold" }}>MSD BACK</a>
        </Link>
        <Link href={"/page-add"}>
          <a>Nouvelle Page</a>
        </Link>
        <Link href={"/gis"}>
          <a>GIS</a>
        </Link>
        <Link href={"/date-add"}>
          <a>Nouvelles Dates</a>
        </Link>
      </nav>
      <aside className={"c-Header__LeftBar"} data-testid={"left-bar"}>
        <Link href={`/agenda`}>
          <a style={{ textTransform: "uppercase" }}>Agenda</a>
        </Link>
        <div>MENU</div>
        <div>MENU</div>
        <div>MENU</div>
        <div>MENU</div>
        <div>MENU</div>
      </aside>
    </>
  );
}

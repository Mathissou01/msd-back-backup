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
        <Link href={"/"} style={{ fontWeight: "bold" }}>
          MSD BACK
        </Link>
        <Link href={"/page-add"}>Nouvelle Page</Link>
        <Link href={"/gis"}>GIS</Link>
        <Link href={"/date-add"}>Nouvelles Dates</Link>
      </nav>
      <aside className={"c-Header__LeftBar"} data-testid={"left-bar"}>
        <Link href={`/agenda`} style={{ textTransform: "uppercase" }}>
          Agenda
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

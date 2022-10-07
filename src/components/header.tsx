import Head from "next/head";
import Link from "next/link";
import styles from "../styles/header.module.scss";

export default function Header() {
  return (
    <>
      <Head>
        <title>MSD-BACK</title>
        <meta name="description" content="wip" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <nav>
        <div className={styles.header__topBar}>
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
        </div>
        <div className={styles.header__leftBar}>
          <Link href={`/agenda`}>
            <a style={{ textTransform: "uppercase" }}>Agenda</a>
          </Link>
          <div>MENU</div>
          <div>MENU</div>
          <div>MENU</div>
          <div>MENU</div>
          <div>MENU</div>
        </div>
      </nav>
    </>
  );
}

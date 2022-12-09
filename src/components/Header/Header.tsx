import Head from "next/head";
import HeaderTopBar from "./HeaderTopBar/HeaderTopBar";
import HeaderSideBar from "./HeaderSideBar/HeaderSideBar";

export default function Header() {
  return (
    <>
      <Head>
        <title>MSD-BACK</title>
        <meta name="description" content="wip" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderTopBar />
      <HeaderSideBar />
    </>
  );
}

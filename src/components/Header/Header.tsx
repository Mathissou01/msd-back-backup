import Head from "next/head";
import HeaderTopBar from "./HeaderTopBar/HeaderTopBar";
import HeaderSideBar from "./HeaderSideBar/HeaderSideBar";

interface IHeaderProps {
  isRoot?: boolean;
}

export default function Header({ isRoot = false }: IHeaderProps) {
  return (
    <>
      <Head>
        <title>MSD-BACK</title>
        <meta name="description" content="wip" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderTopBar isRoot={isRoot} />
      {!isRoot && <HeaderSideBar />}
    </>
  );
}

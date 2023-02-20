import Link from "next/link";
import "./header-top-bar.scss";

interface IHeaderTopBarProps {
  isRoot?: boolean;
}

export default function HeaderTopBar({ isRoot = false }: IHeaderTopBarProps) {
  return (
    <>
      <header role="banner" className="c-HeaderTopBar" data-testid="top-bar">
        <div className="c-HeaderTopBar__Item c-HeaderTopBar__Logo">
          <Link href={"/"}>[Logo Collectivité]</Link>
        </div>
        <ul className="c-HeaderTopBar__List">
          <>
            {!isRoot ? (
              <>
                <li
                  className="c-HeaderTopBar__Item"
                  style={{ minWidth: "151px" }}
                >
                  <Link href={"/"}>[Client]</Link>
                </li>
                <div className="c-HeaderTopBar__Filler" aria-hidden={true} />
                <li
                  className="c-HeaderTopBar__Item"
                  style={{ minWidth: "316px" }}
                >
                  <Link href={"/"}>[Recherche]</Link>
                </li>
                <div className="c-HeaderTopBar__Filler" aria-hidden={true} />
                <li
                  className="c-HeaderTopBar__Item"
                  style={{ minWidth: "115px" }}
                >
                  <Link href={"/"}>[Site]</Link>
                </li>
              </>
            ) : (
              <div className="c-HeaderTopBar__Filler" />
            )}
            <div className="c-HeaderTopBar__Separator" aria-hidden={true} />
            <li className="c-HeaderTopBar__Item">
              <Link href={"/"}>[Us]</Link>
            </li>
          </>
        </ul>
      </header>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./header-top-bar.scss";

interface IHeaderTopBarProps {
  isRoot?: boolean;
  hasChangeContractsButton?: boolean;
}

export default function HeaderTopBar({
  isRoot = false,
  hasChangeContractsButton,
}: IHeaderTopBarProps) {
  /* Static Data */
  const changeContractLabel = "Changer de client";

  /* Local Data */
  const { contract } = useContract();

  return (
    <>
      <header role="banner" className="c-HeaderTopBar" data-testid="top-bar">
        <div className="c-HeaderTopBar__Item c-HeaderTopBar__Logo">
          {!isRoot && contract.attributes?.logo?.data?.attributes ? (
            <Link href={"/"}>
              <Image
                src={contract.attributes.logo.data.attributes.url}
                alt={`logo ${contract.attributes?.clientName}`}
                width={160}
                height={56}
                priority={true}
              />
            </Link>
          ) : (
            <Link href={"/"}>
              <Image
                src={"/images/suez-logo.svg"}
                alt={"logo suez"}
                width={160}
                height={56}
                priority={true}
              />
            </Link>
          )}
        </div>
        <ul className="c-HeaderTopBar__List">
          <>
            {!isRoot ? (
              <>
                {hasChangeContractsButton && (
                  <li className="c-HeaderTopBar__Item">
                    <Link href={"/"}>
                      <CommonButton
                        label={changeContractLabel}
                        style={"tertiary"}
                        picto="refreshArrows"
                        pictoPosition="right"
                      />
                    </Link>
                  </li>
                )}
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

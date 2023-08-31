import Image from "next/image";
import packageData from "../../../package.json";
import "./footer.scss";

interface IFooterProps {
  isRoot?: boolean;
}

export default function Footer({ isRoot = false }: IFooterProps) {
  return (
    <>
      {!isRoot && (
        <div className="c-Footer">
          <span className="c-Footer__Version">
            Version - {packageData.version}
          </span>
          <footer className="c-Footer__ContentContainer">
            <div className="c-Footer__Content">
              <Image
                className="c-Footer__LogoSuez"
                src="/images/suez-logo.svg"
                alt="logo_footer"
                width={110}
                height={50}
              />
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

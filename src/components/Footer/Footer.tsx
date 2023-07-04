import "./footer.scss";
import Image from "next/image";

interface IFooterProps {
  isRoot?: boolean;
}

export default function Footer({ isRoot = false }: IFooterProps) {
  return (
    <>
      {!isRoot && (
        <footer className="c-Footer">
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
      )}
    </>
  );
}

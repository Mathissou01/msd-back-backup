import fr from "date-fns/locale/fr";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import type { AppProps } from "next/app";
import "@suezenv/react-theme-components/assets/css/main.css";
import "../styles/globals.scss";

registerLocale("fr", fr);
setDefaultLocale("fr");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

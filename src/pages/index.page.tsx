import Link from "next/link";
import Header from "../components/Header/Header";

export default function HomePage() {
  return (
    <>
      <Header isRoot={true} />
      <div className="o-Page__RootContainer">
        <main role="main" className="o-Page__Main">
          <span>Root Homepage WIP</span>
          <br />
          <Link href="/1" style={{ textDecoration: "underline" }}>
            {"-> Contrat n°1"}
          </Link>
        </main>
      </div>
    </>
  );
}

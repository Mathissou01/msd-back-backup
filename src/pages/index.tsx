import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GetPages } from "src/graphql/queries/pages.graphql";
import Header from "../components/Header/Header";
import "./home-page.scss";

type Page = {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
  };
};

export default function HomePage() {
  const { data, loading, error } = useQuery(GetPages);
  const pages = data?.pages?.data ?? [];

  if (error) {
    console.error("error", error);
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <div className={"o-Page__Content"}>
          <h1 className={"o-Page__Title u-TextCenter"}>Pages</h1>
          <ul className={"c-Home__Pages"}>
            {loading ? (
              <p>Loading...</p>
            ) : pages && pages.length > 0 ? (
              <>
                {pages?.map((page: Page) => {
                  return (
                    <li key={page.id}>
                      <p>
                        Page n°{page.id}, titre: {page.attributes.title}
                      </p>
                    </li>
                  );
                })}
              </>
            ) : (
              <p>No results.</p>
            )}
          </ul>
          <Link href={"/page-add"}>
            <a style={{ textDecoration: "underline" }}>Ajouter une page</a>
          </Link>
        </div>
      </main>
    </>
  );
}

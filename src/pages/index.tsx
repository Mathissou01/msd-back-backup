import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchAPI } from "../lib/api";
import Header from "../components/header";
import styles from "../styles/home.module.scss";
import pageStyles from "../styles/page.module.scss";

type Page = {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
  };
};

type HomeProps = {
  pages: Array<Page>;
};

export default function Home({ pages }: HomeProps) {
  return (
    <>
      <Header />
      <main>
        <div className={pageStyles.page__content}>
          <h1>Pages</h1>
          {!!pages && pages.length > 0 && (
            <>
              <ul className={styles.home__pages}>
                {pages?.map((page: Page) => {
                  return (
                    <li key={page.id}>
                      <p>
                        Page n°{page.id}, titre: {page.attributes.title}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <Link href={"/page-add"}>
                <a style={{ textDecoration: "underline" }}>Ajouter une page</a>
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pagesData = await fetchAPI("/pages");
  return {
    props: { pages: pagesData.data },
  };
};

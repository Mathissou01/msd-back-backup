import React from "react";
import { GetServerSideProps } from "next";
import Header from "../components/header";
import styles from "../styles/page.module.scss";

type PageAddProps = {
  secret: string;
};

interface IForm {
  title: string;
  content: string;
  slug: string;
}

export default function PageAdd({ secret }: PageAddProps) {
  const [formData, setFormData] = React.useState<IForm>();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
      slug: { value: string };
    };
    setFormData({
      title: target.title.value,
      content: target.content.value,
      slug: target.slug.value,
    });

    if (formData) {
      window.open(
        encodeURI(
          `${
            process.env.NEXT_PUBLIC_FO_URL
          }/api/preview?secret=${secret}&slug=${encodeURIComponent(
            formData.slug,
          )}`,
        ),
        "_blank",
      );
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.page__content}>
          <h1>Pages</h1>
          <div className={styles.page__form}>
            <h2>Nouvelle page</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>
                <div>Titre</div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue="Page Brouillon"
                />
              </label>
              <label>
                <div>Contenu</div>
                <input
                  type="text"
                  id="content"
                  name="content"
                  defaultValue="Ceci est un brouillon."
                />
              </label>
              <label>
                <div>Slug</div>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  defaultValue="page-draft"
                />
              </label>
              <button type="submit" className={styles.page__preview}>
                Prévisualisation
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { secret: process.env.PREVIEW_SECRET },
  };
};

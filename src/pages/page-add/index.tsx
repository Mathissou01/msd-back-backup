import React from "react";
import Header from "../../components/Header/Header";

interface IForm {
  title: string;
  content: string;
  slug: string;
}

export default function PageAddPage() {
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
          `${process.env.NEXT_PUBLIC_FO_URL}/preview?slug=${encodeURIComponent(
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
        <div className={"o-Page__Content"}>
          <h1> Pages </h1>
          <div className={"o-Page__Form"}>
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
              <button type="submit" className={"o-Page__Preview"}>
                Prévisualisation
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

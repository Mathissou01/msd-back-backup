import PageTitle from "../../../components/PageTitle/PageTitle";

export default function editoPage() {
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
  };

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />{" "}
    </>
  );
}

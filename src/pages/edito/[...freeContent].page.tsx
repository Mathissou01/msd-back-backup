interface IGetStaticProps {
  params: { freeContent: string };
}

interface IEditoContenuLibrePageProps {
  route: string;
}

export default function EditoContenuLibrePage({
  route,
}: IEditoContenuLibrePageProps) {
  return (
    <section className="o-Page__Section">
      <div>WIP edito/{route}</div>
    </section>
  );
}

export async function getStaticProps({ params }: IGetStaticProps) {
  const route = params.freeContent;
  return { props: { route } };
}

export async function getStaticPaths() {
  // TODO: get all freeContentSubServices and map them here
  const paths = [
    { params: { freeContent: ["reduire-mes-dechets"] } },
    { params: { freeContent: ["valorisation-des-dechets"] } },
  ];
  return {
    paths,
    fallback: false,
  };
}

import ClientInformation from "../../components/ClientInformation/ClientInformation";
import Header from "../../components/Header/Header";

export default function ClientCreatePage() {
  return (
    <>
      <Header isRoot />
      <div className="o-Page__RootContainer">
        <main role="main" className="o-Page__Main c-RootHomePage">
          <div className="c-ClientCreatePage">
            <ClientInformation />
          </div>
        </main>
      </div>
    </>
  );
}

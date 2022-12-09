import NavigationListMenu from "./NavigationListMenu/NavigationListMenu";
import "./navigation-list.scss";
import { useState } from "react";
import NavigationListLink from "./NavigationListLink/NavigationListLink";

interface IActiveMenu {
  source: string | null;
  isOpen: boolean;
}

export default function NavigationList() {
  const temporaryLabels = {
    /* Static Data */
    // TODO: temporary static values, remove later
    // TODO: keep current navigation info in Context for this and breadcrumbs
    homepage: "Accueil",
    edito: {
      root: "Edito",
      colors: "Couleurs, logo, lien",
      menu: "Menu",
      homepage: "Page d'accueil",
      footer: "Footer",
      containers: "Types de conteneurs",
      inputs: "Types de lieux d'apport",
    },
    services: "Services",
    personnalisation: "Personnalisation",
    sectorsAndUsers: "Secteurs et Usagers",
    administration: "Gestion",
    bin: "Corbeille",
  };

  /* Methods */
  function handleClickMenu(source: string) {
    setActiveMenu({
      source,
      isOpen: activeMenu.source !== source ? true : !activeMenu.isOpen,
    });
  }

  function handleClickLink(source: string) {
    setActiveLink(source);
  }

  /* Local Data */
  const [activeMenu, setActiveMenu] = useState<IActiveMenu>({
    source: "edito",
    isOpen: true,
  });
  const [activeLink, setActiveLink] = useState("edito.homepage");

  return (
    <ul className="c-NavigationList">
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          href={"/"}
          label={temporaryLabels.homepage}
          pictoUrl="/images/pictos-temp/homepage.svg"
          isOpen={activeLink === "homepage"}
          onClick={() => handleClickLink("homepage")}
        />
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={temporaryLabels.edito.root}
          pictoUrl="/images/pictos-temp/edito.svg"
          isOpen={activeMenu.source === "edito" && activeMenu.isOpen}
          onClick={() => handleClickMenu("edito")}
        >
          <NavigationListLink
            href={"/"}
            label={temporaryLabels.edito.colors}
            isActive={activeLink === "edito.colors"}
            // onClick={() => handleClickLink("edito.colors")}
          />
          <NavigationListLink
            href={"/"}
            label={temporaryLabels.edito.menu}
            isActive={activeLink === "edito.menu"}
            // onClick={() => handleClickLink("edito.menu")}
          />
          <NavigationListLink
            href={"/personnalisation/accueil"}
            label={temporaryLabels.edito.homepage}
            isActive={activeLink === "edito.homepage"}
            onClick={() => handleClickLink("edito.homepage")}
          />
          <NavigationListLink
            href={"/"}
            label={temporaryLabels.edito.footer}
            isActive={activeLink === "edito.footer"}
            // onClick={() => handleClickLink("edito.footer")}
          />
          <NavigationListLink
            href={"/"}
            label={temporaryLabels.edito.containers}
            isActive={activeLink === "edito.containers"}
            // onClick={() => handleClickLink("edito.containers")}
          />
          <NavigationListLink
            href={"/"}
            label={temporaryLabels.edito.inputs}
            isActive={activeLink === "edito.inputs"}
            // onClick={() => handleClickLink("edito.inputs")}
          />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={temporaryLabels.services}
          pictoUrl="/images/pictos-temp/services.svg"
          isOpen={activeMenu.source === "services" && activeMenu.isOpen}
          // onClick={() => handleClickMenu("services")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={temporaryLabels.personnalisation}
          pictoUrl="/images/pictos-temp/personnalisation.svg"
          isOpen={activeMenu.source === "personnalisation" && activeMenu.isOpen}
          // onClick={() => handleClickMenu("personnalisation")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={temporaryLabels.sectorsAndUsers}
          pictoUrl="/images/pictos-temp/sectorsAndUsers.svg"
          isOpen={activeMenu.source === "sectorsAndUsers" && activeMenu.isOpen}
          // onClick={() => handleClickMenu("sectorsAndUsers")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={temporaryLabels.administration}
          pictoUrl="/images/pictos-temp/administration.svg"
          isOpen={activeMenu.source === "administration" && activeMenu.isOpen}
          // onClick={() => handleClickMenu("administration")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          href={"/"}
          label={temporaryLabels.bin}
          pictoUrl="/images/pictos-temp/bin.svg"
          isOpen={activeLink === "bin"}
          // onClick={() => handleClickLink("bin")}
        />
      </li>
    </ul>
  );
}

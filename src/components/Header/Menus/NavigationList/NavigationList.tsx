import { useState } from "react";
import NavigationListMenu from "./NavigationListMenu/NavigationListMenu";
import NavigationListLink from "./NavigationListLink/NavigationListLink";
import {
  ENavigationPages,
  useNavigation,
} from "../../../../hooks/useNavigation";
import "./navigation-list.scss";

interface IActiveMenu {
  menuName: keyof typeof ENavigationPages | null;
  isOpen: boolean;
}

export default function NavigationList() {
  /* Methods */
  function handleClickMenu(source: keyof typeof ENavigationPages) {
    setActiveMenu({
      menuName: source,
      isOpen: activeMenu.menuName !== source ? true : !activeMenu.isOpen,
    });
  }

  /* External Data */
  const { currentPage, setCurrentPage } = useNavigation();

  /* Local Data */
  const [activeMenu, setActiveMenu] = useState<IActiveMenu>({
    menuName: `/${currentPage.split("/")[1]}` as keyof typeof ENavigationPages,
    isOpen: currentPage !== ("/" || "/corbeille"),
  });

  return (
    <ul className="c-NavigationList">
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          href={"/"}
          label={ENavigationPages["/"]}
          pictoUrl="/images/pictos-temp/homepage.svg"
          isOpen={currentPage === "/"}
          onClick={() => setCurrentPage("/")}
        />
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={ENavigationPages["/edito"]}
          pictoUrl="/images/pictos-temp/edito.svg"
          isOpen={activeMenu.menuName === "/edito" && activeMenu.isOpen}
          onClick={() => handleClickMenu("/edito")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
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
          label={ENavigationPages["/services"]}
          pictoUrl="/images/pictos-temp/services.svg"
          isOpen={activeMenu.menuName === "/services" && activeMenu.isOpen}
          onClick={() => handleClickMenu("/services")}
        >
          <NavigationListLink
            href={"/services/points-collecte"}
            label={ENavigationPages["/services/points-collecte"]}
            isActive={currentPage === "/services/points-collecte"}
            onClick={() => setCurrentPage("/services/points-collecte")}
          />
          <NavigationListLink
            href={"/services/guide-tri"}
            label={ENavigationPages["/services/guide-tri"]}
            isActive={currentPage === "/services/guide-tri"}
            onClick={() => setCurrentPage("/services/guide-tri")}
          />
          <NavigationListLink
            href={"/services/jour-collecte"}
            label={ENavigationPages["/services/jour-collecte"]}
            isActive={currentPage === "/services/jour-collecte"}
            onClick={() => setCurrentPage("/services/jour-collecte")}
          />
          <NavigationListLink
            href={"/services/demandes"}
            label={ENavigationPages["/services/demandes"]}
            isActive={currentPage === "/services/demandes"}
            onClick={() => setCurrentPage("/services/demandes")}
          />
          <NavigationListLink
            href={"/services/yeswescan"}
            label={ENavigationPages["/services/yeswescan"]}
            isActive={currentPage === "/services/yeswescan"}
            onClick={() => setCurrentPage("/services/yeswescan")}
          />
          <NavigationListLink
            href={"/services/alertes"}
            label={ENavigationPages["/services/alertes"]}
            isActive={currentPage === "/services/alertes"}
            onClick={() => setCurrentPage("/services/alertes")}
          />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={ENavigationPages["/personnalisation"]}
          pictoUrl="/images/pictos-temp/personnalisation.svg"
          isOpen={
            activeMenu.menuName === "/personnalisation" && activeMenu.isOpen
          }
          onClick={() => handleClickMenu("/personnalisation")}
        >
          <NavigationListLink
            href={"/personnalisation/couleurs"}
            label={ENavigationPages["/personnalisation/couleurs"]}
            isActive={currentPage === "/personnalisation/couleurs"}
            onClick={() => setCurrentPage("/personnalisation/couleurs")}
          />
          <NavigationListLink
            href={"/personnalisation/menu"}
            label={ENavigationPages["/personnalisation/menu"]}
            isActive={currentPage === "/personnalisation/menu"}
            onClick={() => setCurrentPage("/personnalisation/menu")}
          />
          <NavigationListLink
            href={"/personnalisation/accueil"}
            label={ENavigationPages["/personnalisation/accueil"]}
            isActive={currentPage === "/personnalisation/accueil"}
            onClick={() => setCurrentPage("/personnalisation/accueil")}
          />
          <NavigationListLink
            href={"/personnalisation/footer"}
            label={ENavigationPages["/personnalisation/footer"]}
            isActive={currentPage === "/personnalisation/footer"}
            onClick={() => setCurrentPage("/personnalisation/footer")}
          />
          <NavigationListLink
            href={"/personnalisation/types-conteneurs"}
            label={ENavigationPages["/personnalisation/types-conteneurs"]}
            isActive={currentPage === "/personnalisation/types-conteneurs"}
            onClick={() => setCurrentPage("/personnalisation/types-conteneurs")}
          />
          <NavigationListLink
            href={"/personnalisation/types-apport"}
            label={ENavigationPages["/personnalisation/types-apport"]}
            isActive={currentPage === "/personnalisation/types-apport"}
            onClick={() => setCurrentPage("/personnalisation/types-apport")}
          />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          label={ENavigationPages["/secteurs-usagers"]}
          pictoUrl="/images/pictos-temp/sectorsAndUsers.svg"
          isOpen={
            activeMenu.menuName === "/secteurs-usagers" && activeMenu.isOpen
          }
          onClick={() => handleClickMenu("/secteurs-usagers")}
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
          label={ENavigationPages["/administration"]}
          pictoUrl="/images/pictos-temp/administration.svg"
          isOpen={
            activeMenu.menuName === "/administration" && activeMenu.isOpen
          }
          onClick={() => handleClickMenu("/administration")}
        >
          <p>link</p>
          <p>link</p>
          <p>link</p>
          <p>link</p>
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          href={"/corbeille"}
          label={ENavigationPages["/corbeille"]}
          pictoUrl="/images/pictos-temp/bin.svg"
          isOpen={currentPage === "/corbeille"}
          onClick={() => setCurrentPage("/corbeille")}
        />
      </li>
    </ul>
  );
}

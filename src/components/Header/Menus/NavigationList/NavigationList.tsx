import { useState } from "react";
import { ENavigationPages } from "../../../../lib/navigation";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useContract } from "../../../../hooks/useContract";
import NavigationListMenu from "./NavigationListMenu/NavigationListMenu";
import NavigationListLink from "./NavigationListLink/NavigationListLink";
import "./navigation-list.scss";

export interface IActiveMenu {
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

  /* Local Data */
  const { contract } = useContract();
  const { currentPage } = useNavigation();
  const [activeMenu, setActiveMenu] = useState<IActiveMenu>({
    menuName:
      currentPage === "/"
        ? currentPage
        : (`/${currentPage.split("/")[1]}/` as keyof typeof ENavigationPages),
    isOpen: currentPage !== ("/" || "/corbeille"),
  });

  const services = {
    news: {
      name: contract.attributes?.editorialService?.data?.attributes
        ?.newsSubService?.data?.attributes?.name,
      isActivated:
        contract.attributes?.editorialService?.data?.attributes?.newsSubService
          ?.data?.attributes?.isActivated,
    },
    freeContentSubServices:
      contract.attributes?.editorialService?.data?.attributes
        ?.freeContentSubServices?.data ?? [],
    tipSubService:
      contract.attributes?.editorialService?.data?.attributes?.tipSubService
        ?.data?.attributes?.name,
  };

  return (
    <ul className="c-NavigationList">
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/homepage.svg"
        />
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/edito/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/edito.svg"
          onClick={handleClickMenu}
        >
          {services.news.isActivated && (
            <NavigationListLink
              path={"/edito/actualites"}
              label={services.news.name}
            />
          )}
          {services.tipSubService && (
            <NavigationListLink
              path={"/edito/astuces"}
              label={services.tipSubService}
            />
          )}
          {/*<NavigationListLink path={"/edito/evenements"} />*/}
          {/*<NavigationListLink path={"/edito/astuces"} />*/}
          {services.freeContentSubServices &&
            services.freeContentSubServices.map(
              (freeContentSubService, index) => {
                if (freeContentSubService.attributes?.isActivated) {
                  return (
                    <NavigationListLink
                      key={index}
                      path={`/edito/contenu-libre/${freeContentSubService.id}`}
                      label={freeContentSubService.attributes.name}
                    />
                  );
                }
              },
            )}
          {/*<NavigationListLink path={"/edito/quiz"} />*/}
          {/*<NavigationListLink path={"/edito/chiffres-cles"} />*/}
          <NavigationListLink path={"/edito/bibliotheque-de-medias"} />
          <NavigationListLink path={"/edito/thematiques"} />
          <NavigationListLink path={"/edito/type-contenu"} />
          {/*<NavigationListLink path={"/edito/accessibilite"} />*/}
          {/*<NavigationListLink path={"/edito/conditions-generales"} />*/}
          {/*<NavigationListLink path={"/edito/politique-cookies"} />*/}
          {/*<NavigationListLink path={"/edito/confidentialite"} />*/}
          <NavigationListLink path={"/edito/contact"} />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/services/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/services.svg"
          onClick={handleClickMenu}
        >
          <NavigationListLink path={"/services/carte"} />
          <NavigationListLink path={"/services/guide-tri"} />
          <NavigationListLink path={"/services/mon-compteur-dechets"} />
          <NavigationListLink path={"/services/jour-collecte"} />
          <NavigationListLink path={"/services/demandes"} />
          {/*    <NavigationListLink path={"/services/yeswescan"} />*/}
          {/*    <NavigationListLink path={"/services/alertes"} />*/}
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/personnalisation/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/personnalisation.svg"
          onClick={handleClickMenu}
        >
          <NavigationListLink path={"/personnalisation/couleurs"} />
          <NavigationListLink path={"/personnalisation/menu"} />
          <NavigationListLink path={"/personnalisation/accueil"} />
          <NavigationListLink path={"/personnalisation/footer"} />
          {/*<NavigationListLink path={"/personnalisation/types-conteneurs"} />*/}
          {/*<NavigationListLink path={"/personnalisation/types-apport"} />*/}
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/secteurs-usagers/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/sectorsAndUsers.svg"
          onClick={handleClickMenu}
        >
          <NavigationListLink path={"/secteurs-usagers/secteurs"} />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/gestion/"}
          activeMenu={activeMenu}
          pictoUrl="/images/pictos-temp/administration.svg"
          onClick={handleClickMenu}
        >
          <NavigationListLink path={"/gestion/informations"} />
          <NavigationListLink path={"/gestion/flux"} />
        </NavigationListMenu>
      </li>
      {/*<li className="c-NavigationList__Item">*/}
      {/*  <NavigationListMenu*/}
      {/*    activeMenu={activeMenu}*/}
      {/*    path={"/corbeille/"}*/}
      {/*    pictoUrl="/images/pictos-temp/bin.svg"*/}
      {/*  />*/}
      {/*</li>*/}
    </ul>
  );
}

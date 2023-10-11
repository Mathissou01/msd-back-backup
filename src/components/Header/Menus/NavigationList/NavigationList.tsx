import { useEffect, useState } from "react";
import { IServices, isServiceActive } from "../../../../lib/contract";
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
  const [isChannelActivated, setIsChannelActivated] = useState<boolean>(false);

  const editorialAttributes =
    contract.attributes?.editorialService?.data?.attributes;

  const freeContentServices =
    editorialAttributes?.freeContentSubServices?.data ?? [];

  const services: IServices = {
    recyclingGuideService: {
      isActivated: contract.attributes?.recyclingGuideService?.data?.attributes
        ? isServiceActive(
            contract.attributes.recyclingGuideService.data.attributes,
          )
        : false,
    },
    dropOffMapService: {
      isActivated: contract.attributes?.dropOffMapService?.data?.attributes
        ? isServiceActive(contract.attributes.dropOffMapService.data.attributes)
        : false,
    },
    requestService: {
      isActivated: contract.attributes?.requestService?.data?.attributes
        ? isServiceActive(contract.attributes.requestService.data.attributes)
        : false,
    },
    yesWeScanService: {
      isActivated:
        contract.attributes?.channelType?.data?.attributes?.hasYesWeScan ??
        false,
    },
    alertNotificationService: {
      isActivated: contract.attributes?.alertNotificationService?.data
        ?.attributes
        ? isServiceActive(
            contract.attributes.alertNotificationService.data.attributes,
          )
        : false,
    },
    pickUpDayService: {
      isActivated: contract.attributes?.pickUpDayService?.data?.attributes
        ? isServiceActive(contract.attributes.pickUpDayService.data.attributes)
        : false,
    },
    newsService: {
      isActivated: editorialAttributes?.newsSubService?.data?.attributes
        ? isServiceActive(editorialAttributes.newsSubService.data.attributes)
        : false,
    },
    tipService: {
      isActivated: editorialAttributes?.tipSubService?.data?.attributes
        ? isServiceActive(editorialAttributes.tipSubService.data.attributes)
        : false,
    },
    quizService: {
      isActivated: editorialAttributes?.quizSubService?.data?.attributes
        ? isServiceActive(editorialAttributes.quizSubService.data.attributes)
        : false,
    },
    eventService: {
      isActivated: editorialAttributes?.eventSubService?.data?.attributes
        ? isServiceActive(editorialAttributes.eventSubService.data.attributes)
        : false,
    },
    contactUsService: {
      isActivated: editorialAttributes?.contactUsSubService?.data?.attributes
        ? isServiceActive(
            editorialAttributes.contactUsSubService.data.attributes,
          )
        : false,
    },
  };

  useEffect(() => {
    if (contract.attributes?.channelType?.data?.attributes) {
      const contractAttribute =
        contract.attributes?.channelType?.data?.attributes;
      contractAttribute.hasWebSite || contractAttribute.hasWebApp
        ? setIsChannelActivated(true)
        : setIsChannelActivated(false);
    }
  }, [contract.attributes?.channelType?.data?.attributes]);

  return (
    <ul className="c-NavigationList">
      <li className="c-NavigationList__Item">
        <NavigationListMenu path={"/"} activeMenu={activeMenu} picto="house" />
      </li>
      {isChannelActivated && (
        <li className="c-NavigationList__Item">
          <NavigationListMenu
            path={"/edito/"}
            activeMenu={activeMenu}
            picto="file"
            onClick={handleClickMenu}
          >
            {services.newsService.isActivated && (
              <NavigationListLink path={"/edito/actualites"} entityName="New" />
            )}
            {services.tipService.isActivated && (
              <NavigationListLink path={"/edito/astuces"} entityName="Tip" />
            )}
            {/* TODO: When the Event page is ready, we can uncomment the next line! */}
            {/* {services.eventService.isActivated && <NavigationListLink path={"/edito/evenements"} />} */}
            {freeContentServices &&
              freeContentServices.map((freeContentSubService, index) => {
                if (
                  freeContentSubService?.attributes &&
                  isServiceActive(freeContentSubService.attributes)
                ) {
                  return (
                    <NavigationListLink
                      key={index}
                      path={`/edito/contenu-libre/${freeContentSubService.id}`}
                      label={freeContentSubService.attributes.name}
                      entityName="FreeContent"
                    />
                  );
                }
              })}
            {/* TODO: When the Quiz page is ready, we can uncomment the next line! */}
            {/* {services.quizService.isActivated && <NavigationListLink path={"/edito/quiz"} />} */}
            {/*<NavigationListLink path={"/edito/chiffres-cles"} />*/}
            <NavigationListLink
              path={"/edito/bibliotheque-de-medias"}
              entityName="Medias"
            />
            <NavigationListLink path={"/edito/thematiques"} entityName="Tag" />
            <NavigationListLink
              path={"/edito/type-contenu"}
              entityName="ContentType"
            />
            {/*<NavigationListLink path={"/edito/accessibilite"} />*/}
            <NavigationListLink
              path={"/edito/conditions-generales"}
              entityName="Cgu"
            />
            <NavigationListLink
              path={"/edito/politique-cookies"}
              entityName="Cookie"
            />
            <NavigationListLink
              path={"/edito/confidentialite"}
              entityName="Confidentiality"
            />
            {services.contactUsService.isActivated && (
              <NavigationListLink
                path={"/edito/contact"}
                entityName="ContactUs"
              />
            )}
          </NavigationListMenu>
        </li>
      )}
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/services/"}
          activeMenu={activeMenu}
          picto="dashboard"
          onClick={handleClickMenu}
        >
          {services.dropOffMapService.isActivated && (
            <NavigationListLink
              path={"/services/carte"}
              entityName="DropOffMap"
            />
          )}
          {services.recyclingGuideService.isActivated && (
            <NavigationListLink
              path={"/services/guide-tri"}
              entityName="RecyclingGuide"
            />
          )}
          <NavigationListLink
            path={"/services/mon-compteur-dechets"}
            entityName="Mwc"
          />
          {services.pickUpDayService.isActivated && (
            <NavigationListLink
              path={"/services/jour-collecte"}
              entityName="PickUpDay"
            />
          )}
          {services.requestService.isActivated && (
            <NavigationListLink
              path={"/services/demandes"}
              entityName="Request"
            />
          )}
          {services.yesWeScanService.isActivated && (
            <NavigationListLink path={"/services/yeswescan"} entityName="Yws" />
          )}
          {services.alertNotificationService.isActivated && (
            <NavigationListLink
              path={"/services/alertes"}
              entityName="AlertNotification"
            />
          )}
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/personnalisation/"}
          activeMenu={activeMenu}
          picto="appWindowSettings"
          onClick={handleClickMenu}
        >
          <NavigationListLink
            path={"/personnalisation/couleurs"}
            entityName="ContractCustomization"
          />
          <NavigationListLink
            path={"/personnalisation/menu"}
            entityName="ContractMenu"
          />
          <NavigationListLink
            path={"/personnalisation/accueil"}
            entityName="Homepage"
          />
          <NavigationListLink
            path={"/personnalisation/footer"}
            entityName="Footer"
          />
          {/*<NavigationListLink path={"/personnalisation/types-conteneurs"} />*/}
          {/*<NavigationListLink path={"/personnalisation/types-apport"} />*/}
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/secteurs-usagers/"}
          activeMenu={activeMenu}
          picto="pin"
          onClick={handleClickMenu}
        >
          <NavigationListLink
            path={"/secteurs-usagers/secteurs"}
            entityName="Sectorization"
          />
          <NavigationListLink
            path={"/secteurs-usagers/usagers"}
            entityName="Audience"
          />
        </NavigationListMenu>
      </li>
      <li className="c-NavigationList__Item">
        <NavigationListMenu
          path={"/gestion/"}
          activeMenu={activeMenu}
          picto="bank"
          onClick={handleClickMenu}
        >
          <NavigationListLink
            path={"/gestion/informations"}
            entityName="Contract"
          />
          <NavigationListLink
            path={"/gestion/territoire"}
            entityName="Territory"
          />
          <NavigationListLink path={"/gestion/flux"} entityName="Flow" />
          <NavigationListLink
            path={"/gestion/services"}
            entityName="ActiveServices"
          />
          <NavigationListLink
            path={"/gestion/utilisateurs"}
            entityName="User"
          />
        </NavigationListMenu>
      </li>
      {/*<li className="c-NavigationList__Item">*/}
      {/*  <NavigationListMenu*/}
      {/*    activeMenu={activeMenu}*/}
      {/*    path={"/corbeille/"}*/}
      {/*    picto="trash"*/}
      {/*  />*/}
      {/*</li>*/}
    </ul>
  );
}

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  ContractEntity,
  useGetContractByIdLazyQuery,
  useGetContractsLazyQuery,
} from "../../graphql/codegen/generated-types";
import { isStringOfNumber } from "../../lib/utilities";
import { isServiceActive } from "../../lib/contract";
import { useUser } from "../../hooks/useUser";
import { useContract } from "../../hooks/useContract";
import {
  containsNavigationPath,
  isNavigationPath,
  matchLongestNavigationPath,
  useNavigation,
} from "../../hooks/useNavigation";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CommonLoader from "../../components/Common/CommonLoader/CommonLoader";

interface IContractLayoutProps {
  children: ReactNode;
}

export default function ContractLayout(props: IContractLayoutProps) {
  /* Local Data */
  const router = useRouter();
  const { contract, contractId, setContract, setContractId } = useContract();
  const [hasCheckedRoute, setHasCheckedRoute] = useState<boolean>(false);
  const [getContractById, { data, loading, error }] =
    useGetContractByIdLazyQuery();
  const { currentRoot, setCurrentRoot, currentPage, setCurrentPage } =
    useNavigation();
  const currentRootRef = useRef(currentRoot);
  const currentPageRef = useRef(currentPage);
  const { hasOtherContracts, setHasOtherContracts } = useUser();
  const [
    getContracts,
    { data: contractsData, loading: contractsLoading, error: contractsError },
  ] = useGetContractsLazyQuery();
  const isLoading = loading || contractsLoading || !hasCheckedRoute;
  const errors = [error, contractsError];

  const isRouteActivated = useCallback(
    (data: ContractEntity): boolean => {
      const pageURL = containsNavigationPath(router.route)[2];
      switch (pageURL) {
        case "/services/guide-tri":
          return data.attributes?.recyclingGuideService?.data?.attributes
            ? isServiceActive(
                data.attributes.recyclingGuideService.data.attributes,
              )
            : false;
        case "/services/carte":
          return data.attributes?.dropOffMapService?.data?.attributes
            ? isServiceActive(data.attributes.dropOffMapService.data.attributes)
            : false;
        case "/services/demandes":
          return data.attributes?.requestService?.data?.attributes
            ? isServiceActive(data.attributes.requestService.data.attributes)
            : false;
        case "/services/alertes":
          return data.attributes?.alertNotificationService?.data?.attributes
            ? isServiceActive(
                data.attributes.alertNotificationService.data.attributes,
              )
            : false;
        case "/services/jour-collecte":
          return data.attributes?.pickUpDayService?.data?.attributes
            ? isServiceActive(data.attributes.pickUpDayService.data.attributes)
            : false;
        case "/edito/actualites":
          return data.attributes?.editorialService?.data?.attributes
            ?.newsSubService?.data?.attributes
            ? isServiceActive(
                data.attributes?.editorialService?.data?.attributes
                  .newsSubService.data.attributes,
              )
            : false;
        case "/edito/astuces":
          return data.attributes?.editorialService?.data?.attributes
            ?.tipSubService?.data?.attributes
            ? isServiceActive(
                data.attributes?.editorialService?.data?.attributes
                  .tipSubService.data.attributes,
              )
            : false;
        case "/edito/quiz":
          return data.attributes?.editorialService?.data?.attributes
            ?.quizSubService?.data?.attributes
            ? isServiceActive(
                data.attributes?.editorialService?.data?.attributes
                  .quizSubService.data.attributes,
              )
            : false;
        case "/edito/evenements":
          return data.attributes?.editorialService?.data?.attributes
            ?.eventSubService?.data?.attributes
            ? isServiceActive(
                data.attributes?.editorialService?.data?.attributes
                  .eventSubService.data.attributes,
              )
            : false;
        case "/edito/contact":
          return data.attributes?.editorialService?.data?.attributes
            ?.contactUsSubService?.data?.attributes
            ? isServiceActive(
                data.attributes?.editorialService?.data?.attributes
                  .contactUsSubService.data.attributes,
              )
            : false;
        case "/edito/contenu-libre/[freeContentSubServiceId]": {
          const { freeContentSubServiceId } = router.query;
          const freeContentService =
            data.attributes?.editorialService?.data?.attributes?.freeContentSubServices?.data.find(
              (freeContentServices) =>
                freeContentServices.id === freeContentSubServiceId &&
                freeContentServices.attributes,
            );
          return freeContentService?.attributes
            ? isServiceActive(freeContentService.attributes)
            : false;
        }
      }
      return true;
    },
    [router.route, router.query],
  );

  useEffect(() => {
    if (currentRoot) {
      currentRootRef.current = currentRoot;
    }
  }, [currentRoot]);
  useEffect(() => {
    if (currentPage) {
      currentPageRef.current = currentPage;
    }
  }, [currentPage]);

  useEffect(() => {
    const localContractId = router.query.contractId?.toString()
      ? Number.parseInt(router.query.contractId?.toString())
        ? `${router.query.contractId}`
        : false
      : null;

    if (localContractId) {
      getContractById({ variables: { contractId: localContractId } });

      const newCurrentRoot = `/${localContractId}`;

      if (newCurrentRoot !== currentRoot) {
        setCurrentRoot(newCurrentRoot);
      }

      if (containsNavigationPath(router.route)) {
        const { virtualMatchingSlug, realMatchingSlug } =
          matchLongestNavigationPath(router.route, router.asPath);
        if (
          virtualMatchingSlug &&
          isNavigationPath(virtualMatchingSlug) &&
          realMatchingSlug &&
          realMatchingSlug !== currentPageRef.current
        ) {
          setCurrentPage(realMatchingSlug);
        }
      }

      if (hasOtherContracts === undefined) {
        getContracts();
      }
    } else if (localContractId === false) {
      router.push("/404");
      return;
    }
  }, [
    router,
    getContractById,
    currentRoot,
    setCurrentRoot,
    setCurrentPage,
    hasOtherContracts,
    getContracts,
  ]);

  useEffect(() => {
    if (data !== undefined) {
      const contract = data.contract?.data;
      if (contract && contract.id && isStringOfNumber(contract.id)) {
        setContract(contract);
        setContractId(contract.id);
        if (!isRouteActivated(contract)) {
          router.push("/403");
          return;
        }
      } else {
        router.push("/404");
        return;
      }
      setHasCheckedRoute(true);
    }
  }, [data, setContract, setContractId, router, isRouteActivated]);

  useEffect(() => {
    if (error) {
      setHasCheckedRoute(true);
    }
  }, [error]);

  useEffect(() => {
    if (contractsData !== undefined) {
      const hasOther =
        contractsData.contracts?.data &&
        contractsData.contracts.data.length > 1;
      setHasOtherContracts(hasOther ?? false);
    }
  }, [contractsData, setHasOtherContracts]);

  return (
    <CommonLoader isLoading={isLoading} errors={errors}>
      {contract &&
        contractId !== "0" &&
        currentPage &&
        hasOtherContracts !== undefined && (
          <>
            <Header hasChangeContractsButton={hasOtherContracts} />
            <div className="o-Page__Container">
              <div className="o-Page__SvgTopRightAngle" />
              <main role="main" className="o-Page__Main">
                {props.children}
              </main>
              <Footer />
            </div>
          </>
        )}
    </CommonLoader>
  );
}

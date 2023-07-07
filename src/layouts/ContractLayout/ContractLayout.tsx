import { ReactNode, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import {
  useGetContractByIdLazyQuery,
  useGetContractsLazyQuery,
} from "../../graphql/codegen/generated-types";
import { isStringOfNumber } from "../../lib/utilities";
import { useUser } from "../../hooks/useUser";
import { useContract } from "../../hooks/useContract";
import {
  containsNavigationPath,
  isNavigationPath,
  matchLongestNavigationPath,
  useNavigation,
} from "../../hooks/useNavigation";
import CommonLoader from "../../components/Common/CommonLoader/CommonLoader";

interface IContractLayoutProps {
  children: ReactNode;
}

export default function ContractLayout(props: IContractLayoutProps) {
  const router = useRouter();
  const { contract, contractId, setContract, setContractId } = useContract();
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
  const isLoading = loading || contractsLoading;
  const errors = [error, contractsError];

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
      } else {
        router.push("/404");
      }
    }
  }, [data, setContract, setContractId, router]);

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

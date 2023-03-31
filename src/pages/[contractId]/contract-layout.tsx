import { ReactNode, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import { useGetContractByIdLazyQuery } from "../../graphql/codegen/generated-types";
import { useContract } from "../../hooks/useContract";
import {
  containsNavigationPath,
  isNavigationPath,
  matchLongestNavigationPath,
  useNavigation,
} from "../../hooks/useNavigation";
import { isStringOfNumber } from "../../lib/utilities";

interface IContractLayoutProps {
  children: ReactNode;
}

export default function ContractLayout(props: IContractLayoutProps) {
  const router = useRouter();
  const { contract, contractId, setContract, setContractId } = useContract();
  const [getContractById, { data }] = useGetContractByIdLazyQuery();
  const { currentRoot, setCurrentRoot, currentPage, setCurrentPage } =
    useNavigation();
  const currentRootRef = useRef(currentRoot);
  const currentPageRef = useRef(currentPage);

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
    } else if (localContractId === false) {
      router.push("/404");
    }
  }, [router, getContractById, currentRoot, setCurrentRoot, setCurrentPage]);

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

  return (
    <>
      {contract && contractId !== "0" && currentPage && (
        <>
          <Header />
          <div className="o-Page__Container">
            <main role="main" className="o-Page__Main">
              {props.children}
            </main>
            {/*<Footer />*/}
          </div>
        </>
      )}
    </>
  );
}

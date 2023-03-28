import { ReactNode, useEffect } from "react";
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
  const { setCurrentRoot, currentPage, setCurrentPage } = useNavigation();

  useEffect(() => {
    const localContractId = router.query.contractId?.toString()
      ? Number.parseInt(router.query.contractId?.toString())
        ? `${router.query.contractId}`
        : false
      : null;

    if (localContractId) {
      getContractById({ variables: { contractId: localContractId } });
      setCurrentRoot(`/${localContractId}`);

      const slashes = [...router.route.matchAll(new RegExp("/", "gi"))].map(
        (a) => a.index,
      );
      const localSlug =
        slashes.length >= 2
          ? router.route.slice(router.route.indexOf("/", 1))
          : "/";
      const localRealSlug =
        slashes.length >= 2
          ? router.asPath.slice(router.asPath.indexOf("/", 1))
          : "/";
      if (containsNavigationPath(localSlug)) {
        const { routerPath, realPath } = matchLongestNavigationPath(
          localSlug,
          localRealSlug,
        );
        if (
          routerPath &&
          isNavigationPath(routerPath) &&
          realPath &&
          realPath !== currentPage
        ) {
          setCurrentPage(realPath);
        }
      }
    } else if (localContractId === false) {
      router.push("/404");
    }
  }, [router, getContractById, setCurrentRoot, currentPage, setCurrentPage]);

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

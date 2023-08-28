import { headerContractIdVar } from "../graphql/apolloState";

export function useHeaderContractId() {
  const setHeaderContractId = (newHeaderContractId: number) => {
    if (typeof window !== "undefined") {
      headerContractIdVar(newHeaderContractId);
      localStorage.setItem("HeaderContractId", newHeaderContractId.toString());
    }
  };

  return { setHeaderContractId };
}

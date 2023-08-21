import { headerContractIdVar } from "../graphql/apolloState";

export function useHeaderContractId() {
  const setHeaderContractId = (newHeaderContractId: number) => {
    headerContractIdVar(newHeaderContractId);
  };

  return { setHeaderContractId };
}

import { makeVar } from "@apollo/client";

function getInitialContractId(): number | null {
  try {
    const storedValue = localStorage.getItem("HeaderContractId");
    return storedValue ? +storedValue : null;
  } catch (error) {
    console.error("Failed to fetch HeaderContractId from localStorage:", error);
    return null;
  }
}

const initialContractId = getInitialContractId();

export const headerContractIdVar = makeVar<number | null>(initialContractId);

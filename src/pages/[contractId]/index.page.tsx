import ContractLayout from "./contract-layout";
import { useContract } from "../../hooks/useContract";

export default function ContractHomePage() {
  const { contract } = useContract();

  return (
    <ContractLayout>
      <span>Contract Homepage WIP</span>
      <br />
      <br />
      <span>
        Contrat n°{contract?.id}, {contract?.attributes?.clientName}
      </span>
    </ContractLayout>
  );
}

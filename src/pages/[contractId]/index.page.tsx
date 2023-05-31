import { useContract } from "../../hooks/useContract";
import ContractLayout from "../../layouts/ContractLayout/ContractLayout";

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

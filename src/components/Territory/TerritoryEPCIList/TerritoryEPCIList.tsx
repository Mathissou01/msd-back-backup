import React from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteEpciByIdMutation,
  useGetEpcisInformationsLazyQuery,
  useImportSirenByContractIdMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import DataTableForm from "../../Common/CommonDataTable/DataTableForm/DataTableForm";
import FormLabel from "../../Form/FormLabel/FormLabel";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import EPCIRowContent from "./EpciRowContent/EpciRowContent";
import { ITerritory } from "../../../pages/[contractId]/gestion/territoire/index.page";
import "./territory-epci-list.scss";

interface ISearchCitiesResult {
  name: string;
  siren: string;
}
interface ITerritoryEPCIListProps {
  territoryData: ITerritory;
  contractId: string;
}

export default function TerritoryEPCIList({
  territoryData,
  contractId,
}: ITerritoryEPCIListProps) {
  /* Static Data */
  const title = "Liste des EPCI";
  const labels = {
    addRow: "N° Siren ou nom de l'EPCI",
    addRowButton: "Ajouter un EPCI",
  };

  /* Methods*/
  function handleDelete(id: string) {
    const variables = {
      deleteEpciId: id,
    };
    return deleteEpci({
      variables,
    });
  }

  async function onAddRow() {
    const variables = {
      contractId: contractId,
      file: epci.siren,
    };
    return importSiren({
      variables,
    });
  }

  /* Local Data */
  const { getValues, setValue, watch } = useForm();
  const epci = watch("chosenEPCI");
  const [importSiren] = useImportSirenByContractIdMutation({
    fetchPolicy: "network-only",
    refetchQueries: ["getTerritoriesByContractId"],
    awaitRefetchQueries: true,
  });

  const [getEpcisInformations, { loading: epcisInformationsLoading }] =
    useGetEpcisInformationsLazyQuery({
      fetchPolicy: "network-only",
    });

  const [deleteEpci] = useDeleteEpciByIdMutation({
    fetchPolicy: "network-only",
    refetchQueries: ["getTerritoriesByContractId"],
    awaitRefetchQueries: true,
  });

  async function searchFunction(
    searchValue: string,
  ): Promise<Array<ISearchCitiesResult>> {
    let searchResults: Array<ISearchCitiesResult> = [];
    await getEpcisInformations({
      variables: { searchTerm: searchValue },
      onCompleted: (results) => {
        if (
          results.getEpcisInformations &&
          results.getEpcisInformations.length > 0
        ) {
          searchResults =
            results.getEpcisInformations.filter(removeNulls).map((epci) => {
              return {
                name: epci.name ?? "",
                siren: epci.code ?? "",
              };
            }) ?? [];
        }
      },
    });
    return searchResults;
  }

  return (
    <div className="c-TerritoryEPCIList">
      <h2 className="c-TerritoryEPCIList__Title">{title}</h2>
      <div>
        {territoryData?.epci?.map((epci) =>
          epci.attributes?.name && epci.attributes?.siren ? (
            <EPCIRowContent
              key={epci.id}
              name={epci.attributes.name}
              siren={epci.attributes.siren}
              communes={epci.attributes?.cities?.data.length || 0}
              epci={epci}
              handleDelete={handleDelete}
            />
          ) : null,
        )}
        <DataTableForm
          onFormSubmit={() => onAddRow()}
          submitButtonLabel={labels.addRowButton}
        >
          <FormLabel label={labels.addRow} forId="city" labelStyle="table" />
          <FormAutoCompleteInput<ISearchCitiesResult>
            name="epci"
            searchFunction={searchFunction}
            displayTransformFunction={(result) => `${result.name} ` ?? ""}
            selectTransformFunction={(result) => {
              setValue("chosenEPCI", result);
              return `${result.name}` ?? undefined;
            }}
            isLoading={epcisInformationsLoading}
            isRequired
            defaultValue={getValues("epci")}
          />
        </DataTableForm>
      </div>
    </div>
  );
}

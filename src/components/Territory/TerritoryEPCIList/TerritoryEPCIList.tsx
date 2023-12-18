import React from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteCityByIdMutation,
  useDeleteEpciByIdMutation,
  useGetCitiesByEpciIdLazyQuery,
  useGetEpcisInformationsLazyQuery,
  useImportSirenByContractIdMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { getRightsByLabel } from "../../../lib/user";
import { useUser } from "../../../hooks/useUser";
import DataTableForm from "../../Common/CommonDataTable/DataTableForm/DataTableForm";
import FormLabel from "../../Form/FormLabel/FormLabel";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import EPCIRowContent from "./EpciRowContent/EpciRowContent";
import { ITerritory } from "../../../pages/[contractId]/gestion/territoire/index.page";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
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
    noRecordsLabel: "Il n'y a pas de données à afficher",
  };

  /* Methods*/
  function handleDelete(id: string) {
    const variables = {
      deleteEpciId: id,
    };
    getCitiesByEpciId({
      variables: {
        epciId: id,
      },
      onCompleted(cities) {
        cities.cities?.data.map((city) => {
          deleteCity({
            variables: {
              cityId: city.id ?? "",
            },
          });
        });
      },
    });
    return deleteEpci({
      variables,
    });
  }

  async function onAddRow() {
    const variables = {
      contractId: contractId,
      file: epci.siren,
    };
    return await importSiren({
      variables,
    });
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Territory", userRights);
  const { getValues, setValue, watch } = useForm();
  const epci = watch("chosenEPCI");
  const [importSiren, { loading: loadingImportSiren }] =
    useImportSirenByContractIdMutation({
      fetchPolicy: "network-only",
      refetchQueries: [
        "getTerritoriesByContractId",
        "getContractCitiesByContractId",
      ],
      awaitRefetchQueries: true,
    });

  const [getEpcisInformations, { loading: epcisInformationsLoading }] =
    useGetEpcisInformationsLazyQuery({
      fetchPolicy: "network-only",
    });

  const [getCitiesByEpciId, { loading: getCitiesLoading }] =
    useGetCitiesByEpciIdLazyQuery({
      fetchPolicy: "network-only",
    });

  const [deleteEpci] = useDeleteEpciByIdMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      "getTerritoriesByContractId",
      "getContractCitiesByContractId",
    ],
    awaitRefetchQueries: true,
  });

  const [deleteCity] = useDeleteCityByIdMutation({
    fetchPolicy: "network-only",
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
        <CommonLoader isLoading={loadingImportSiren}>
          {territoryData?.epci.length > 0 ? (
            territoryData?.epci?.map((epci) => {
              if (epci && epci.id && epci.attributes && epci.attributes.name) {
                return (
                  <EPCIRowContent
                    key={epci.id}
                    epci={epci}
                    handleDelete={handleDelete}
                  />
                );
              }
            })
          ) : (
            <div className="c-TerritoryEPCIList__NoRecords">
              <span>{labels.noRecordsLabel}</span>
            </div>
          )}
        </CommonLoader>
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
            isLoading={epcisInformationsLoading || getCitiesLoading}
            isRequired
            isDisabled={!userPermissions.update}
            defaultValue={getValues("epci")}
          />
        </DataTableForm>
      </div>
    </div>
  );
}

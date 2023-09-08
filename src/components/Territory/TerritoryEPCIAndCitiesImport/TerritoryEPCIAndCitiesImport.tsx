import { useRef, useState } from "react";
import {
  GetTerritoriesByContractIdDocument,
  useImportMunicipalitiesByContractIdMutation,
  useImportSirenByContractIdMutation,
} from "../../../graphql/codegen/generated-types";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./territory-epci-and-cities-import.scss";

interface ITerritoryEPCIAndCitiesImport {
  contractId: string;
}

export default function TerritoryEPCIAndCitiesImport({
  contractId,
}: ITerritoryEPCIAndCitiesImport) {
  /* Static Data */
  const labels = {
    title: "EPCI et Communes",
    import: "Importer un fichier CSV",
    chooseFile: "Choisir un fichier",
    municipalitiesImportSuccessMessage: "Les communes ont bien été importées",
    epcisImportSuccessMessage: "Les EPCIs ont bien été importés",
    importNoInseeOrSirenErrorMessage:
      "Le fichier sélectionné ne contient pas de colonne INSEE ou SIREN",
    importNoDataErrorMessage:
      "Le fichier sélectionné ne contient pas de données",
    importMunicipalitiesErrorMessage:
      "Le fichier sélectionné contient des codes INSEE invalides",
    importEPCIsErrorMessage:
      "Le fichier sélectionné contient des codes SIREN invalides",
    errorModal: {
      close: "OK",
    },
  };

  /* Methods */
  async function handleFileChange(event: { target: HTMLInputElement }) {
    const target: HTMLInputElement | null = event.target;
    if (target.files !== null && target.files.length === 1) {
      const file = target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (eventOnLoad) {
          const csvdata = eventOnLoad.target?.result;
          if (!csvdata) {
            handleCSVError(labels.importNoDataErrorMessage);
            return;
          }
          const rowData = csvdata.toString().split("\n");
          const columns = rowData[0].split(";");
          const usefulColumnIndexForCitiesImport = columns.findIndex(
            (column) => {
              const lowerCaseColumn = column.toLowerCase();
              return (
                lowerCaseColumn === "insee" || lowerCaseColumn === "code insee"
              );
            },
          );
          const usefulColumnIndexForEPCIsImport = columns.findIndex(
            (column) => {
              return column.toLowerCase() === "siren";
            },
          );
          let importType = "";
          if (usefulColumnIndexForCitiesImport >= 0) {
            importType = "cities";
          } else if (usefulColumnIndexForEPCIsImport >= 0) {
            importType = "epcis";
          } else {
            handleCSVError(labels.importNoInseeOrSirenErrorMessage);
            return;
          }
          const usefulData = [];
          const citiesRegex = /\b\d{5}\b/g;
          const epcisRegex = /\b\d{9}\b/g;
          for (let rowIndex = 1; rowIndex < rowData.length; rowIndex++) {
            const rowColData = rowData[rowIndex].split(";");
            let dataValue = "";
            if (importType === "cities") {
              const city = rowColData[usefulColumnIndexForCitiesImport];
              if (!city) {
                continue;
              }
              if (city.match(citiesRegex)) {
                dataValue = city;
              } else {
                handleCSVError(labels.importMunicipalitiesErrorMessage);
                return;
              }
            } else if (importType === "epcis") {
              const epci = rowColData[usefulColumnIndexForEPCIsImport];
              if (!epci) {
                continue;
              }
              if (epci.match(epcisRegex)) {
                dataValue = epci;
              } else {
                handleCSVError(labels.importEPCIsErrorMessage);
                return;
              }
            }
            if (dataValue && usefulData.indexOf(dataValue) < 0) {
              usefulData.push(dataValue);
            }
          }
          if (usefulData.length === 0) {
            handleCSVError(labels.importNoDataErrorMessage);
            return;
          }
          const formattedUsefulData = usefulData.join(";");
          const variablesAndRefetchQueries = {
            variables: { contractId, file: formattedUsefulData },
            refetchQueries: [
              {
                query: GetTerritoriesByContractIdDocument,
                variables: { contractId },
              },
              "getContractCitiesByContractId",
            ],
          };
          if (importType === "cities") {
            importMunicipalities(variablesAndRefetchQueries).then(() => {
              setImportSuccessMessage(
                labels.municipalitiesImportSuccessMessage,
              );
              setImportErrorMessage("");
            });
          } else if (importType === "epcis") {
            importSiren(variablesAndRefetchQueries).then(() => {
              setImportSuccessMessage(labels.epcisImportSuccessMessage);
              setImportErrorMessage("");
            });
          }
        };
      }
    }
  }

  function handleCSVError(errorMessage: string) {
    setImportSuccessMessage("");
    setImportErrorMessage(errorMessage);
    if (inputRef.current !== null) {
      inputRef.current.value = "";
    }
    modalRef.current?.toggleModal(true);
  }

  /* Local Data */
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string>("");
  const [importErrorMessage, setImportErrorMessage] = useState<string>("");
  const [
    importMunicipalities,
    { loading: importMunicipalitiesLoading, error: importMunicipalitiesError },
  ] = useImportMunicipalitiesByContractIdMutation();
  const [
    importSiren,
    { loading: importSirenLoading, error: importSirenError },
  ] = useImportSirenByContractIdMutation();

  const isLoading = importMunicipalitiesLoading || importSirenLoading;
  const errors = [importMunicipalitiesError, importSirenError];

  return (
    <div className="c-TerritoryEPCIAndCitiesImport">
      <h2 className="c-TerritoryEPCIAndCitiesImport__Title">{labels.title}</h2>
      <CommonLoader
        isLoading={isLoading}
        isShowingContent={isLoading}
        hasDelay={isLoading}
        errors={errors}
      >
        <div className="c-TerritoryEPCIAndCitiesImport__ImportContainer">
          <span>{labels.import}</span>
          <input
            id="csv-file"
            type="file"
            hidden
            ref={inputRef}
            onChange={handleFileChange}
            accept=".csv"
          />
          <CommonButton
            type="button"
            style="primary"
            label={labels.chooseFile}
            onClick={() => inputRef.current?.click()}
          />
        </div>
        {importSuccessMessage && (
          <span className="c-TerritoryEPCIAndCitiesImport__ImportMessage_success">
            {importSuccessMessage}
          </span>
        )}
      </CommonLoader>
      <CommonModalWrapper ref={modalRef}>
        <div className="c-TerritoryEPCIAndCitiesImport__ImportErrorModal">
          <span className="c-TerritoryEPCIAndCitiesImport__ImportMessage_error">
            {importErrorMessage}
          </span>
          <CommonButton
            type="button"
            label={labels.errorModal.close}
            onClick={() => {
              modalRef.current?.toggleModal(false);
            }}
          />
        </div>
      </CommonModalWrapper>
    </div>
  );
}

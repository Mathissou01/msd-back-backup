import { createRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TableColumn } from "react-data-table-component";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../lib/common-data-table";
import { useUser } from "../../../hooks/useUser";
import {
  useCreateCityMutation,
  useDeleteCityByIdMutation,
  useGetCitiesInformationsLazyQuery,
  useGetContractCitiesByContractIdLazyQuery,
  useUpdateCityByIdMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import { getRightsByLabel } from "../../../lib/user";
import { IDataTableAction } from "../../Common/CommonDataTable/DataTableActions/DataTableActions";
import DataTableForm from "../../Common/CommonDataTable/DataTableForm/DataTableForm";
import DataTableInput from "../../Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../Common/CommonDataTable/CommonDataTable";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import FormLabel from "../../Form/FormLabel/FormLabel";
import "./territory-client-cities.scss";

interface IContractCitiesTableRow extends IDefaultTableRow {
  id: string;
  cityName: string;
  cityInsee: string;
  citySiren: string;
  cityPostalCode: string;
  cityDepartment: string;
  cityRegion: string;
}

interface ISearchCitiesResult {
  name: string;
  department: IDepartment;
  region: IRegion;
  siren: string;
  insee: string;
}

interface IDepartment {
  code: string;
  name: string;
}

interface IRegion {
  code: string;
  name: string;
}

interface ITerritoryClientCitiesProps {
  territoryId: string;
}

export default function TerritoryClientCities({
  territoryId,
}: ITerritoryClientCitiesProps) {
  /* Static data */
  const labels = {
    clientMunicipality: "Liste des communes",
    columns: {
      cityName: "Communes",
      cityInsee: "Insee",
      citySiren: "Siren",
      cityPostalCode: "CP",
      cityDepartment: "Département",
      cityRegion: "Région",
    },
    addRow: "N°Insee, Siren, Code postal ou nom de la commune",
    addRowButton: "Ajouter une commune",
  };

  async function handleLazyLoad(params: ICurrentPagination) {
    return getContractCities({
      variables: {
        contractId: contractId,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function onAddRow() {
    const city = watch("chosenCity");
    const cityName = city.name;
    const existingCity = tableData.find((row) => row.cityName === cityName);
    if (existingCity) {
      setcustomErrorMessage("Cette commune à déjà été créée");
      return;
    }
    const variables = {
      data: {
        territories: [territoryId],
        name: city.name,
        insee: city.insee,
        siren: city.siren,
        postalCode: city.postalCode,
        department: city.department.name,
        region: city.region.name,
      },
    };

    return createContractCity({
      variables,
    });
  }

  function onEditState(
    row: IContractCitiesTableRow,
    i: number,
    setValue?: boolean,
  ) {
    let copiedStates = confirmStatesRef.current;
    let copiedData = tableDataRef.current;
    if (
      copiedStates.filter(Boolean).length > 0 &&
      (!copiedStates[i] || setValue === true)
    ) {
      copiedStates = new Array(tableData?.length).fill(false);
      copiedData = tableData.map((row) => {
        return { ...row, editState: false };
      });
    }
    setTableData(
      copiedData.map((data) => {
        if (data.id === row.id) {
          return { ...data, editState: setValue ?? !data.editState };
        } else {
          return { ...data };
        }
      }),
    );
    setConfirmStates([
      ...copiedStates.slice(0, i),
      setValue ?? !copiedStates[i],
      ...copiedStates.slice(i + 1),
    ]);
  }

  function getRef(i: number) {
    inputRefs.current[i] = createRef();
    return inputRefs.current[i];
  }

  async function onConfirmEdit(row: IContractCitiesTableRow, i: number) {
    const variables = {
      cityId: row.id,
      data: {
        name: inputRefs.current[i].current?.value,
      },
    };
    return updateContractCity({
      variables,
    });
  }

  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Territory", userRights);
  const isInitialized = useRef(false);
  const { contractId } = useContract();
  const defaultPage = 1;
  const defaultRowsPerPage = 30;
  const [tableData, setTableData] = useState<Array<IContractCitiesTableRow>>(
    [],
  );
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [confirmStates, setConfirmStates] = useState<Array<boolean>>([]);
  const confirmStatesRef = useRef<Array<boolean>>([]);
  const tableDataRef = useRef<Array<IContractCitiesTableRow>>(tableData);
  const { getValues, setValue, watch } = useForm();
  const [customErrorMessage, setcustomErrorMessage] = useState("");
  const [getContractCities, { data, loading, error }] =
    useGetContractCitiesByContractIdLazyQuery();

  const [createContractCity, { loading: loadingCreate, error: errorCreate }] =
    useCreateCityMutation({
      refetchQueries: ["getContractCitiesByContractId"],
    });

  const [deleteContractCity, { loading: loadingDelete, error: errorDelete }] =
    useDeleteCityByIdMutation({
      refetchQueries: ["getContractCitiesByContractId"],
    });

  const [updateContractCity, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateCityByIdMutation({
      refetchQueries: ["getContractCitiesByContractId"],
    });

  const [getCitiesInformation, { loading: loadingCities, error: errorCities }] =
    useGetCitiesInformationsLazyQuery({
      fetchPolicy: "network-only",
    });

  async function searchFunction(
    searchValue: string,
  ): Promise<Array<ISearchCitiesResult>> {
    let searchResults: Array<ISearchCitiesResult> = [];
    setcustomErrorMessage("");
    await getCitiesInformation({
      variables: { searchTerm: searchValue },
      onCompleted: (results) => {
        if (
          results.getCitiesInformations &&
          results.getCitiesInformations.length > 0
        ) {
          searchResults =
            results.getCitiesInformations.filter(removeNulls).map((city) => {
              return {
                name: city.name ?? "",
                postalCode: city.postalCode ?? "",
                department: {
                  code: city.department?.code ?? "",
                  name: city.department?.name ?? "",
                },
                region: {
                  code: city.region?.code ?? "",
                  name: city.region?.name ?? "",
                },
                siren: city.siren ?? "",
                insee: city.insee ?? "",
              };
            }) ?? [];
        }
      },
    });
    return searchResults;
  }

  const tableColumns: Array<TableColumn<IContractCitiesTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: labels.columns.cityName,
      selector: (row) => row.cityName,
      cell: (row, rowIndex) => (
        <DataTableInput
          ref={getRef(rowIndex)}
          isEditState={row.editState}
          data={row.cityName}
        />
      ),
      sortable: true,
    },
    {
      id: "insee",
      name: labels.columns.cityInsee,
      selector: (row) => row.cityInsee,
      sortable: true,
    },
    {
      id: "siren",
      name: labels.columns.citySiren,
      selector: (row) => row.citySiren,
      sortable: true,
    },
    {
      id: "postalCode",
      name: labels.columns.cityPostalCode,
      selector: (row) => row.cityPostalCode,
      sortable: true,
    },
    {
      id: "department",
      name: labels.columns.cityDepartment,
      selector: (row) => row.cityDepartment,
      sortable: true,
    },
    {
      id: "region",
      name: labels.columns.cityRegion,
      selector: (row) => row.cityRegion,
      sortable: true,
    },
  ];

  const actionColumn = (
    row: IContractCitiesTableRow,
    rowIndex: number,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      onClick: () => onEditState(row, rowIndex),
      confirmStateOptions: {
        onConfirm: () => onConfirmEdit(row, rowIndex),
        onCancel: () => onEditState(row, rowIndex, false),
      },
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      isDisabled: !userPermissions.delete,
      onClick: () => {
        deleteContractCity({
          variables: {
            cityId: row.id,
          },
        });
      },
    },
  ];

  /* External data */
  const isLoading = loading || loadingCreate || loadingDelete || loadingUpdate;
  const errors = [error, errorCreate, errorDelete, errorUpdate, errorCities];

  useEffect(() => {
    if (data && data.cities && data.cities.data) {
      setTableData(
        data.cities.data
          .map((city) => {
            if (city.attributes) {
              return {
                id: city.id ?? "",
                editState: false,
                cityName: city.attributes?.name ?? "",
                cityInsee: city.attributes?.insee ?? "",
                citySiren: city.attributes?.siren ?? "",
                cityPostalCode: city.attributes?.postalCode ?? "",
                cityDepartment: city.attributes?.department ?? "",
                cityRegion: city.attributes?.region ?? "",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);

  useEffect(() => {
    if (confirmStates.length !== tableData.length) {
      setConfirmStates(new Array(tableData?.length).fill(false));
    }
    tableDataRef.current = tableData;
    confirmStatesRef.current = confirmStates;
  }, [confirmStates, tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getContractCities({ variables: { contractId } });
    }
  }, [contractId, getContractCities, isInitialized]);

  return (
    <div className="c-ClientCities">
      <h2 className="c-ClientCities__Title">{labels.clientMunicipality}</h2>
      <CommonLoader isLoading={false} errors={errors}>
        <CommonDataTable<IContractCitiesTableRow>
          columns={tableColumns}
          data={tableData}
          actionColumn={actionColumn}
          lazyLoadingOptions={{
            isRemote: true,
            totalRows: data?.cities?.meta.pagination.total ?? 0,
          }}
          onLazyLoad={handleLazyLoad}
          isLoading={isLoading}
          paginationOptions={{
            hasPagination: true,
            hasRowsPerPageOptions: false,
            defaultRowsPerPage,
            defaultPage,
          }}
        />
        <DataTableForm
          onFormSubmit={() => onAddRow()}
          submitButtonLabel={labels.addRowButton}
        >
          <FormLabel label={labels.addRow} forId="city" labelStyle="table" />
          <FormAutoCompleteInput<ISearchCitiesResult>
            name="city"
            searchFunction={searchFunction}
            displayTransformFunction={(result) =>
              `${result.name} - ${result.department.name}` ?? ""
            }
            selectTransformFunction={(result) => {
              setValue("chosenCity", result);
              return `${result.name} - ${result.department.name}` ?? undefined;
            }}
            isLoading={loadingCities}
            isRequired
            isDisabled={!userPermissions.update}
            defaultValue={getValues("city")}
          />
        </DataTableForm>
        {customErrorMessage && customErrorMessage !== "" && (
          <em className="c-CommonFormErrorText u-ErrorText" role="alert">
            {customErrorMessage}
          </em>
        )}
      </CommonLoader>
    </div>
  );
}

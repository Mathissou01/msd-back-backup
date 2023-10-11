import React, { useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  GetWasteFamiliesByContractIdDocument,
  useGetWasteFamiliesByContractIdQuery,
  useUpdateWasteFamilyByIdMutation,
  WasteFamilyEntity,
  WasteFormEntity,
} from "../../../../../graphql/codegen/generated-types";
import { TableColumn } from "react-data-table-component";
import "./waste-family-tab.scss";
import CommonDataTable from "../../../../Common/CommonDataTable/CommonDataTable";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import { IDataTableAction } from "../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import FormInput from "../../../../Form/FormInput/FormInput";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import FormModal from "../../../../Form/FormModal/FormModal";
import { useContract } from "../../../../../hooks/useContract";
import { removeNulls } from "../../../../../lib/utilities";
import { IDefaultTableRow } from "../../../../../lib/common-data-table";
import { useUser } from "../../../../../hooks/useUser";
import { getRightsByLabel } from "../../../../../lib/user";

interface IWasteFamilyTableRow extends IDefaultTableRow {
  id: string;
  familyName: string;
  count: number;
  wasteForms: Array<WasteFormEntity>;
}

export default function WasteFamilyTab() {
  /* Static Data */
  const tableLabels = {
    hintText: "Vous pouvez renommer les familles",
    columns: {
      familyName: "Famille de déchet",
      count: "Fiche déchets associées",
    },
  };

  /* Methods */
  function handleEdit(row: IWasteFamilyTableRow): void {
    modalRef.current?.toggleModal(true);

    setDefaultValue(row);
  }

  async function handleUpdate(submitData: FieldValues) {
    if (defaultValue) {
      const variables = {
        data: {
          familyName: submitData.familyName,
        },
        updateWasteFamilyId: defaultValue?.id,
      };

      await updateWasteFamily({
        variables,
        refetchQueries: [
          {
            query: GetWasteFamiliesByContractIdDocument,
            variables: { contractId },
          },
        ],
      });

      setDefaultValue(undefined);
      modalRef.current?.toggleModal(false);
    }
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("RecyclingGuide", userRights);
  const [tableData, setTableData] = useState<Array<IWasteFamilyTableRow>>([]);
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [defaultValue, setDefaultValue] = useState<IWasteFamilyTableRow>();
  const tableColumns: Array<TableColumn<IWasteFamilyTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "familyName",
      name: tableLabels.columns.familyName,
      selector: (row) => row.familyName,
      cell: userPermissions.update
        ? (row) => (
            <button
              className="o-TablePage__Link"
              onClick={() => handleEdit(row)}
            >
              {row.familyName}
            </button>
          )
        : undefined,
      sortable: true,
      grow: 4,
    },
    {
      id: "count",
      name: tableLabels.columns.count,
      selector: (row) => row.count,
      sortable: true,
      minWidth: "225px",
    },
  ];
  const actionColumn = (row: IWasteFamilyTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      isDisabled: !userPermissions.update,
      alt: "Modifier",
      onClick: () => handleEdit(row),
    },
  ];

  /* External Data */
  const { contractId } = useContract();
  const {
    data: getWasteFamiliesData,
    loading: getWasteFamiliesLoading,
    error: getWasteFamiliesError,
  } = useGetWasteFamiliesByContractIdQuery({
    variables: {
      contractId,
      sort: "familyName:asc",
    },
  });
  const [
    updateWasteFamily,
    { loading: updateWasteFamilyLoading, error: updateWasteFamilyError },
  ] = useUpdateWasteFamilyByIdMutation();

  useEffect(() => {
    if (getWasteFamiliesData) {
      setTableData(
        getWasteFamiliesData.recyclingGuideService?.data?.attributes?.wasteFamilies?.data
          .map((item: WasteFamilyEntity) => {
            if (item && item.id && item.attributes) {
              return {
                id: item.id,
                editState: false,
                familyName: item.attributes.familyName,
                count: item.attributes.wasteForms?.data.length ?? 0,
                wasteForms: item.attributes.wasteForms?.data ?? [],
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [getWasteFamiliesData]);

  return (
    <div className="c-WasteFamily">
      <CommonLoader
        isLoading={getWasteFamiliesLoading || updateWasteFamilyLoading}
        hasDelay={false}
        errors={[getWasteFamiliesError, updateWasteFamilyError]}
        isFlexGrow={false}
      >
        <p>{tableLabels.hintText}</p>
        <CommonDataTable<IWasteFamilyTableRow>
          columns={tableColumns}
          data={tableData}
          actionColumn={actionColumn}
          isLoading={getWasteFamiliesLoading || updateWasteFamilyLoading}
          defaultSortFieldId={"familyName"}
        />
      </CommonLoader>
      <FormModal
        modalRef={modalRef}
        modalTitle="Modification d'une famille de déchet"
        hasRequiredChildren="all"
        onSubmit={handleUpdate}
        formValidationMode="onChange"
      >
        <FormInput
          type="text"
          name="familyName"
          label="Nom de la Famille"
          isRequired
          isDisabled={!userPermissions.update}
          defaultValue={defaultValue?.familyName}
        />
        <FormInput
          type="text"
          name="wasteform"
          label="Déchets associés"
          isDisabled={!userPermissions.update}
          defaultValue={defaultValue?.wasteForms
            .map((wasteForm) => wasteForm.attributes?.name)
            .join(", ")}
        />
      </FormModal>
    </div>
  );
}

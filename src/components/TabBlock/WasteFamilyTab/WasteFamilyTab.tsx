import React, { useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { removeNulls } from "../../../lib/utilities";
import {
  GetWasteFamilyDocument,
  useGetRecyclingGuideServiceByContractQuery,
  useUpdateWasteFamilyMutation,
  WasteFamilyEntity,
  WasteFormEntity,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { TableColumn } from "react-data-table-component";
import { IDataTableAction } from "../../Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonDataTable, {
  IDefaultTableRow,
} from "../../Common/CommonDataTable/CommonDataTable";
import FormModal from "../../Form/FormModal/FormModal";
import FormInput from "../../Form/FormInput/FormInput";
import "./waste-family-tab.scss";

interface IWasteFamilyTableRow extends IDefaultTableRow {
  id: string;
  title: string;
  count: number;
  wasteForms: Array<WasteFormEntity>;
}

export default function WasteFamilyTab() {
  /* Static Data */
  const tableLabels = {
    hintText: "Vous pouvez renommer les familles",
    columns: {
      title: "Famille de déchet",
      count: "Fiche déchets associées",
    },
  };
  /* Local Data */
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
      id: "title",
      name: tableLabels.columns.title,
      selector: (row) => row.title,
      cell: (row) => row.title,
      sortable: true,
      grow: 4,
    },
    {
      id: "count",
      name: tableLabels.columns.count,
      selector: (row) => row.count,
      sortable: true,
    },
  ];
  const actionColumn = (row: IWasteFamilyTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      onClick: () => handleEdit(row),
    },
  ];

  /* External Data */
  const { contractId } = useContract();
  const {
    data: getRecyclingGuideServiceData,
    loading: getRecyclingGuideServiceLoading,
    error: getRecyclingGuideServiceError,
  } = useGetRecyclingGuideServiceByContractQuery({
    variables: {
      contractId,
    },
  });
  const [
    updateWasteFamilyMutation,
    {
      loading: updateWasteFamilyMutationLoading,
      error: updateWasteFamilyMutationError,
    },
  ] = useUpdateWasteFamilyMutation();

  /* Methods */
  function handleEdit(row: IWasteFamilyTableRow): void {
    modalRef.current?.toggleModal(true);

    setDefaultValue(row);
  }

  async function handleUpdate(submitData: FieldValues) {
    if (defaultValue) {
      const variables = {
        data: {
          familyName: submitData.title,
          recyclingGuideService:
            getRecyclingGuideServiceData?.recyclingGuideServices?.data[0].id,
        },
        updateWasteFamilyId: defaultValue?.id,
      };

      await updateWasteFamilyMutation({
        variables,
        refetchQueries: [
          {
            query: GetWasteFamilyDocument,
            variables: { contractId },
          },
        ],
      });

      setDefaultValue(undefined);
      modalRef.current?.toggleModal(false);
    }
  }

  useEffect(() => {
    if (getRecyclingGuideServiceData) {
      setTableData(
        getRecyclingGuideServiceData.recyclingGuideServices?.data[0].attributes?.wasteFamilies?.data
          .map((item: WasteFamilyEntity) => {
            if (item && item.id && item.attributes) {
              return {
                id: item.id,
                editState: false,
                title: item.attributes.familyName,
                count: item.attributes.wasteForms?.data.length ?? 0,
                wasteForms: item.attributes.wasteForms?.data ?? [],
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [getRecyclingGuideServiceData]);

  return (
    <div className="c-WasteFamily">
      <CommonLoader
        isLoading={
          getRecyclingGuideServiceLoading || updateWasteFamilyMutationLoading
        }
        hasDelay={false}
        errors={[getRecyclingGuideServiceError, updateWasteFamilyMutationError]}
        isFlexGrow={false}
      >
        <p>{tableLabels.hintText}</p>
        <CommonDataTable<IWasteFamilyTableRow>
          columns={tableColumns}
          actionColumn={actionColumn}
          data={tableData}
          isLoading={
            getRecyclingGuideServiceLoading || updateWasteFamilyMutationLoading
          }
          defaultSortFieldId={"title"}
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
          name="title"
          label="Nom de la Famille"
          isRequired
          defaultValue={defaultValue?.title}
        />
        <FormInput
          type="text"
          name="wasteform"
          label="Déchets associés"
          defaultValue={defaultValue?.wasteForms
            .map((wasteForm) => wasteForm.attributes?.name)
            .join(", ")}
        />
      </FormModal>
    </div>
  );
}

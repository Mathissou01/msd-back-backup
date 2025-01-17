import { useRouter } from "next/router";
import { TableColumn } from "react-data-table-component";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  GetContentTypesByContractIdDocument,
  useGetContentTypesByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useContentTypeMutations } from "../../../../hooks/useContentTypeMutations";
import { useUser } from "../../../../hooks/useUser";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import DataTableInput from "../../../../components/Common/CommonDataTable/Inputs/DataTableInput/DataTableInput";
import DataTableTextArea from "../../../../components/Common/CommonDataTable/Inputs/DataTableTextArea/DataTableTextArea";
import DataTableForm from "../../../../components/Common/CommonDataTable/DataTableForm/DataTableForm";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import "./edito-type-contenu-page.scss";

interface IContentTypeTableRow {
  id: string;
  subServiceId: string;
  editState: boolean;
  name: string;
  description: string;
  type:
    | "cookiesSubService"
    | "accessibilitySubService"
    | "contactUsSubService"
    | "cguSubService"
    | "confidentialitySubService"
    | "newsSubService"
    | "tipSubService"
    | "quizSubService"
    | "eventSubService"
    | "freeContentSubService"
    | string;
}

export function EditoTypeContenuPage() {
  /* Static Data */
  const title = "Types de contenu";
  const description =
    "Ajoutez un type de contenu. Les types de contenu permettent de publier des pages dans une nouvelle rubrique. Nous vous conseillons de limiter le nombre de types de contenu personnalisés.";
  const tableLabels = {
    title: "Liste des types de contenu",
    columns: {
      name: "Type de contenu",
      description: "Description",
    },
    addRow: {
      title: "Ajouter un type de contenu",
      nameLabel: "Nom du type",
      descriptionLabel: "Description",
      maxCharactersLabel: "caractères maximum",
    },
  };
  const tableValidation = {
    maxLengthName: 30,
    maxLengthDescription: 70,
  };

  /* Methods */
  function getInputRef(i: number) {
    inputRefs.current[i] = createRef();
    return inputRefs.current[i];
  }

  function getTextAreaRef(i: number) {
    textAreaRefs.current[i] = createRef();
    return textAreaRefs.current[i];
  }

  function onEditState(
    row: IContentTypeTableRow,
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

  async function onConfirm(row: IContentTypeTableRow, i: number) {
    if (
      row.name === inputRefs.current[i].current?.value &&
      row.description === textAreaRefs.current[i].current?.value
    ) {
      onEditState(row, i, false);
      return;
    }
    setIsUpdatingData(true);
    const variables = {
      updateSubServiceId: row.subServiceId,
      data: {
        name: inputRefs.current[i].current?.value,
        description: textAreaRefs.current[i].current?.value,
      },
    };
    switch (row.type) {
      case "cookiesSubService":
        return updateCookies({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "accessibilitySubService":
        return updateAccessibility({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "contactUsSubService":
        return updateContactUs({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "cguSubService":
        return updateCgu({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "confidentialitySubService":
        return updateConfidentiality({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "newsSubService":
        return updateNews({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "tipSubService":
        return updateTip({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "quizSubService":
        return updateQuiz({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "eventSubService":
        return updateEvent({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
      case "freeContentSubService":
        return updateFreeContent({
          variables,
          refetchQueries: [
            {
              query: GetContentTypesByContractIdDocument,
              variables: { contractId },
            },
          ],
        });
    }
  }

  async function onDelete(row: IContentTypeTableRow) {
    // TODO: delete feature
    console.log("delete ?", row);
    // const variables = {
    //   deleteTagId: row.subServiceId,
    // };
    // return deleteContentTypeMutation({
    //   variables,
    //   refetchQueries: [
    //     {
    //       query: GetContentTypesByContractIdDocument,
    //       variables: { contractId },
    //     },
    //   ],
    // });
  }

  async function onAddRow(data: FieldValues) {
    setIsUpdatingData(true);
    const variables = {
      contractId,
      name: data["name"],
      description: data["description"],
    };
    return createContentType({
      variables,
      refetchQueries: [
        {
          query: GetContentTypesByContractIdDocument,
          variables: { contractId },
        },
      ],
    });
  }

  /* External Data */
  const router = useRouter();
  const { contract } = useContract();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("ContentType", userRights);
  const contractId = contract.id ?? "";
  const {
    loading: dataLoading,
    error,
    data,
  } = useGetContentTypesByContractIdQuery({
    variables: { contractId },
  });
  const {
    mutations,
    loading: loadingMutation,
    errors: mutationErrors,
  } = useContentTypeMutations();
  const {
    updateCookies,
    updateAccessibility,
    updateContactUs,
    updateCgu,
    updateConfidentiality,
    updateNews,
    updateTip,
    updateQuiz,
    updateEvent,
    updateFreeContent,
    createContentType,
  } = mutations;

  /* Local Data */
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const textAreaRefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>([]);
  const [tableData, setTableData] = useState<Array<IContentTypeTableRow>>([]);
  const tableDataRef = useRef<Array<IContentTypeTableRow>>(tableData);
  const [confirmStates, setConfirmStates] = useState<Array<boolean>>([]);
  const confirmStatesRef = useRef<Array<boolean>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData || loadingMutation;
  const isLoading = dataLoading || isLoadingMutation;
  const errors = [...mutationErrors, error];

  const tableColumns: Array<TableColumn<IContentTypeTableRow>> = [
    {
      id: "id",
      selector: (row) => row.subServiceId,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.name,
      selector: (row) => row.name,
      cell: userPermissions.update
        ? (row, rowIndex) => (
            <DataTableInput
              ref={getInputRef(rowIndex)}
              isEditState={row.editState}
              data={row.name}
              maxLengthValidation={tableValidation.maxLengthName}
            />
          )
        : undefined,
      sortable: true,
    },
    {
      id: "description",
      name: tableLabels.columns.description,
      selector: (row) => row.description,
      cell: userPermissions.update
        ? (row, rowIndex) => (
            <DataTableTextArea
              ref={getTextAreaRef(rowIndex)}
              isEditState={row.editState}
              data={row.description}
              maxLengthValidation={tableValidation.maxLengthDescription}
            />
          )
        : undefined,
      sortable: true,
    },
  ];
  const actionColumn = (
    row: IContentTypeTableRow,
    rowIndex: number,
  ): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      onClick: () => onEditState(row, rowIndex),
      confirmStateOptions: {
        onConfirm: () => onConfirm(row, rowIndex),
        onCancel: () => onEditState(row, rowIndex, false),
      },
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      isDisabled: !userPermissions.delete,
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (!userPermissions.read) router.push(`/${contractId}`);
    setTableData(
      data?.getContentTypeDTOs
        ?.map((contentType) => {
          if (contentType) {
            return {
              id: `${contentType.type}_${contentType.subServiceId}`,
              ...contentType,
              description: contentType.description ?? "",
              editState: false,
            };
          }
        })
        .filter(removeNulls) ?? [],
    );
  }, [contractId, data, router, userPermissions.read]);

  useEffect(() => {
    if (confirmStates.length !== tableData.length) {
      setConfirmStates(new Array(tableData?.length).fill(false));
    }
    tableDataRef.current = tableData;
    confirmStatesRef.current = confirmStates;
  }, [confirmStates, tableData]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  return (
    <>
      <div className="c-EditoTypeContenuPage">
        <PageTitle title={title} description={description} />
        <h2 className="c-EditoTypeContenuPage__Title">{tableLabels.title}</h2>
        <div className="c-EditoTypeContenuPage__Table">
          <CommonLoader
            isLoading={isLoading}
            isShowingContent={isLoadingMutation}
            hasDelay={isLoadingMutation}
            errors={errors}
          >
            <CommonDataTable
              columns={tableColumns}
              actionColumn={actionColumn}
              data={tableData}
              defaultSortFieldId={"name"}
              isLoading={isLoading}
            />
            <DataTableForm
              title={tableLabels.addRow.title}
              onFormSubmit={onAddRow}
            >
              <FormInput
                type="text"
                name="name"
                label={tableLabels.addRow.nameLabel}
                maxLengthValidation={tableValidation.maxLengthName}
                minLengthValidation={1}
                validationLabel={`${tableValidation.maxLengthName} ${tableLabels.addRow.maxCharactersLabel}`}
                isRequired={true}
                isDisabled={isLoadingMutation || !userPermissions.create}
                labelStyle="table"
                validationStyle="multiline"
              />
              <FormInput
                type="text"
                name="description"
                label={tableLabels.addRow.descriptionLabel}
                maxLengthValidation={tableValidation.maxLengthDescription}
                minLengthValidation={1}
                validationLabel={`${tableValidation.maxLengthDescription} ${tableLabels.addRow.maxCharactersLabel}`}
                isDisabled={isLoadingMutation || !userPermissions.create}
                labelStyle="table"
                validationStyle="multiline"
              />
            </DataTableForm>
          </CommonLoader>
        </div>
      </div>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoTypeContenuPage />
    </ContractLayout>
  );
}

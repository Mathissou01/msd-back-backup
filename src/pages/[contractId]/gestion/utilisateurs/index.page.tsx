import { useEffect, useState, useRef } from "react";
import { TableColumn } from "react-data-table-component";
import {
  useCreateBackOfficeUserLazyQuery,
  useDeleteBackOfficeUserByUuidLazyQuery,
  useGetBackOfficeUserListByContractIdLazyQuery,
  useUpdateBackOfficeUserByUuidLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonModalWrapper, {
  CommonModalWrapperRef,
  ICommonModalWrapperSize,
} from "../../../../components/Common/CommonModalWrapper/CommonModalWrapper";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import UserForm from "../../../../components/Users/UserForm/UserForm";
import "./users.scss";

enum IUserRole {
  "superAdmin" = "Super Admin",
  "contributor" = "Contributeur",
  "localAdminSuez" = "Admin local Suez",
}

export interface IUsersTableRow extends IDefaultTableRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export function GestionUtilisateursPage() {
  /* Static Data */
  const labels = {
    addButton: "Créer un utilisateur",
    title: "Liste des utilisateurs",
    columns: {
      firstNameFamilyName: "Prénom Nom",
      email: "Email",
      phone: "Téléphone",
      role: "Profil",
    },
  };

  /* Methods */
  async function handleLazyLoad() {
    return getUsersQuery({});
  }

  async function onSubmit(submitData: IUsersTableRow) {
    submitAndModalRefresh(submitData);
    modalRef.current?.toggleModal(false);
  }

  async function submitAndModalRefresh(submitData: IUsersTableRow) {
    const variables = {
      contract: contractId,
      firstName: submitData.firstName,
      lastName: submitData.lastName,
      email: submitData.email,
      phoneNumber: submitData.phone,
      role: submitData.role,
    };
    createUser({
      variables: variables,
    }).then(() => {
      getUsersQuery();
    });
  }

  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
    setUserDefaultValue(undefined);
  };

  const handleCloseCommonModal = () => {
    setUserDefaultValue(undefined);
  };

  async function onDelete(row: IUsersTableRow) {
    const variables = {
      uuid: row.id,
    };

    deleteUser({
      variables: variables,
    }).then(() => {
      getUsersQuery();
    });
  }

  function onEdit(row: IUsersTableRow) {
    setUserDefaultValue(row);
    modalRef.current?.toggleModal(true);
  }

  async function handleUpdate(submitData: IUsersTableRow) {
    const variables = {
      uuid: submitData.id,
      firstName: submitData.firstName,
      lastName: submitData.lastName,
      email: submitData.email,
      phoneNumber: submitData.phone,
      role: submitData.role,
      isRoleUpdated: submitData.role === userDefaultValue?.role,
    };

    updateUser({
      variables: variables,
    }).then(() => {
      getUsersQuery();
      setUserDefaultValue(undefined);
      modalRef.current?.toggleModal(false);
    });
  }

  /* Local Data */
  const { contractId } = useContract();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const isInitialized = useRef(false);

  const [getUsersQuery, { data, loading, error }] =
    useGetBackOfficeUserListByContractIdLazyQuery({
      variables: {
        contractId: contractId,
      },
      fetchPolicy: "network-only",
    });

  const [createUser, { loading: createUserLoading, error: createUserError }] =
    useCreateBackOfficeUserLazyQuery({
      fetchPolicy: "network-only",
    });

  const [deleteUser, { loading: deleteUserLoading, error: deleteUserError }] =
    useDeleteBackOfficeUserByUuidLazyQuery({
      fetchPolicy: "network-only",
    });

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useUpdateBackOfficeUserByUuidLazyQuery({
      fetchPolicy: "network-only",
    });
  const [tableData, setTableData] = useState<Array<IUsersTableRow>>([]);
  const isLoading =
    loading || createUserLoading || deleteUserLoading || updateUserLoading;
  const errors = [error, createUserError, deleteUserError, updateUserError];
  const modalRef = useRef<CommonModalWrapperRef>(null);

  const [userDefaultValue, setUserDefaultValue] = useState<IUsersTableRow>();

  const tableColumns: Array<TableColumn<IUsersTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "firstName",
      name: labels.columns.firstNameFamilyName,
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      id: "email",
      name: labels.columns.email,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      id: "phone",
      name: labels.columns.phone,
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      id: "role",
      name: labels.columns.role,
      selector: (row) => IUserRole[row.role as keyof typeof IUserRole],
      sortable: true,
    },
  ];

  const actionColumn = (row: IUsersTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      onClick: () => onEdit(row),
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (data && data.getBackOfficeUserListByContractId) {
      setTableData(
        data.getBackOfficeUserListByContractId.map((user) => {
          return {
            id: user?.uuid ?? "",
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
            phone: user?.phoneNumber ?? "",
            role: user?.role ?? "",
            editState: false,
          };
        }),
      );
    }
    setUserDefaultValue(undefined);
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getUsersQuery();
    }
  }, [getUsersQuery, isInitialized]);

  return (
    <div className="c-UsersPage">
      <PageTitle title={labels.title} />
      <div>
        <CommonButton
          label={labels.addButton}
          style="primary"
          picto="add"
          onClick={() => handleStartModal()}
        />
        <CommonModalWrapper
          onClose={handleCloseCommonModal}
          size={ICommonModalWrapperSize.MEDIUM}
          ref={modalRef}
        >
          <UserForm
            onSubmitValid={(data) => onSubmit(data as IUsersTableRow)}
            defaultValue={userDefaultValue}
            onUpdate={(data) => handleUpdate(data as IUsersTableRow)}
            handleCloseModal={handleCloseModal}
          />
        </CommonModalWrapper>
      </div>
      <h2 className="c-UsersPage__Title">{labels.title}</h2>
      <div className="c-UsersPage__Table">
        <CommonLoader
          isLoading={!isInitialized.current}
          isShowingContent={isLoading}
          errors={errors}
        >
          <CommonDataTable<IUsersTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.getBackOfficeUserListByContractId?.length ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId="name"
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          />
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <GestionUtilisateursPage />
    </ContractLayout>
  );
}

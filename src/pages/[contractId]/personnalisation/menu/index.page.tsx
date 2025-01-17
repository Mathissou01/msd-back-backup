import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getRightsByLabel } from "../../../../lib/user";
import {
  GetContractMenuByContractIdDocument,
  useGetContractMenuByContractIdQuery,
  useUpdateContractMenuByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import {
  IServiceLink,
  remapServiceLinksDynamicZone,
} from "../../../../lib/service-links";
import { extractMenu } from "../../../../lib/graphql-data";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import FormServiceLinks from "../../../../components/Form/FormServiceLinks/FormServiceLinks";
import "./personnalisation-menu-page.scss";

export function PersonnalisationMenuPage() {
  /* Static Data */
  const title = "Menu";
  const description =
    "Choisissez, personnalisez et ordonnez les entrées du menu de gauche";
  const formLabels = {
    title: "Menu",
    description: "Ordre d’affichage du menu",
    editModalTitle: "Menu",
    editModalNameLabel: "Texte du lien",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const returnValues = submitData["serviceLinks"].map(
        (link: IServiceLink) => {
          return {
            __typename: link.type,
            id: link.id,
            name: link.name,
            picto: link.picto,
            isDisplayed: link.isDisplayed,
          };
        },
      );
      const variables = {
        updateMenuPageId: submitData["id"],
        data: {
          serviceLinks: returnValues,
        },
      };
      return updateContractMenu({
        variables,
        refetchQueries: [
          {
            query: GetContractMenuByContractIdDocument,
            variables: { contractId },
          },
        ],
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contract } = useContract();
  const contractId = contract.id ?? "";
  const { loading, error, data } = useGetContractMenuByContractIdQuery({
    variables: { contractId },
  });
  const [
    updateContractMenu,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateContractMenuByIdMutation();

  /* Local Data */
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("ContractMenu", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data) {
      const contractMenu = extractMenu(data);
      if (
        contractMenu?.id &&
        contractMenu.attributes?.serviceLinks &&
        contractMenu.attributes?.serviceLinks?.length > 0
      ) {
        const mappedData = {
          id: contractMenu.id,
          serviceLinks: remapServiceLinksDynamicZone(
            contractMenu.attributes.serviceLinks,
          ),
        };
        form.reset(mappedData);
      }
    }
  }, [data, form]);

  return (
    <>
      <PageTitle title={title} description={description} />
      <div className="c-PersonnalisationMenuPage">
        <CommonLoader
          isLoading={loading || isSubmitting || mutationLoading}
          isShowingContent={isSubmitting || mutationLoading}
          hasDelay={isSubmitting || mutationLoading}
          errors={[error, mutationError]}
        >
          <FormProvider {...form}>
            <form
              className="c-PersonnalisationMenuPage__Form"
              onSubmit={handleSubmit(onSubmitValid)}
              ref={useFocusFirstElement()}
            >
              <div className="c-PersonnalisationMenuPage__Group">
                <h2 className="c-PersonnalisationFooterPage__Title">
                  {formLabels.title}
                </h2>
                <FormServiceLinks
                  name="serviceLinks"
                  label={formLabels.description}
                  editModalTitle={formLabels.editModalTitle}
                  editModalNameLabel={formLabels.editModalNameLabel}
                  isDisabled={mutationLoading || !userPermissions.update}
                />
              </div>
              <div className="c-PersonnalisationMenuPage__Buttons">
                <CommonButton
                  type="submit"
                  label={formLabels.submitButtonLabel}
                  style="primary"
                  picto="check"
                  isDisabled={!isDirty || !userPermissions.update}
                />
                <CommonButton
                  type="button"
                  label={formLabels.cancelButtonLabel}
                  picto="cross"
                  onClick={onCancel}
                  isDisabled={!isDirty}
                />
              </div>
            </form>
          </FormProvider>
        </CommonLoader>
      </div>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationMenuPage />
    </ContractLayout>
  );
}

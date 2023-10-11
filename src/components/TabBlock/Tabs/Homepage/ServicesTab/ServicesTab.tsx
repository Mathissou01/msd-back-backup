import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import FormInput from "../../../../Form/FormInput/FormInput";
import {
  AudienceEntity,
  useGetServicesBlocksByContractIdAndAudienceIdQuery,
  useUpdateServicesBlockByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { IServiceLink } from "../../../../../lib/service-links";
import { extractServicesBlock } from "../../../../../lib/graphql-data";
import { getRightsByLabel } from "../../../../../lib/user";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import { useUser } from "../../../../../hooks/useUser";
import { useContract } from "../../../../../hooks/useContract";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import FormServiceLinks from "../../../../Form/FormServiceLinks/FormServiceLinks";
import ServicesTabAddButton from "./ServicesTabAddButton/ServicesTabAddButton";
import "./services-tab.scss";

interface IServicesBlock {
  id: string;
  titleContent: string;
  serviceLinks: Array<IServiceLink>;
}

interface IServicesTabProps {
  audience?: AudienceEntity;
}

export default function ServicesTab({ audience }: IServicesTabProps) {
  /* Static Data */
  const title = "Services";
  const maxLimitDisplay = 6;
  const formLabels = {
    titleContent: "Titre du bloc",
    blockDisplayedLabel:
      "Ordre d’affichage des services sur la page d’accueil (accès rapide)",
    secondaryLabel: `Vous pouvez choisir d’afficher jusqu’à ${maxLimitDisplay} blocs maximum, à choisir en fonction du menu défini préalablement`,
    blockNotDisplayedLabel: "Bloc non affichés",
    blockNotDisplayedSecondaryLabel:
      "Nombre maximum de blocs atteints. Pour afficher un autre bloc, vous devez masquer un bloc ci-dessus.",
    editModalTitle: "Encart service",
    editModalNameLabel: "Texte du bouton",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };

  /* Method */
  function onModalSubmit(data: FieldValues) {
    if (
      data["createModal_name"] &&
      data["createModal_externalLink"] &&
      data["createModal_picto"] &&
      servicesBlockData?.serviceLinks
    ) {
      const newLink: IServiceLink = {
        type: "ComponentLinksExternal",
        isDisplayed: false,
        name: data["createModal_name"],
        externalLink: data["createModal_externalLink"],
        picto: data["createModal_picto"],
      };
      const newServiceLinks = [...servicesBlockData.serviceLinks, newLink];
      setServicesBlockData({
        ...servicesBlockData,
        serviceLinks: newServiceLinks,
      });
      form.setValue("serviceLinks", newServiceLinks, { shouldDirty: true });
    }
  }

  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const returnTitleContent = submitData["titleContent"];
      const returnValues = submitData["serviceLinks"].map(
        (link: IServiceLink) => {
          return {
            __typename: link.type,
            isDisplayed: link.isDisplayed,
            name: link.name,
            externalLink: link.externalLink,
            picto: link.picto?.id,
          };
        },
      );
      const variables = {
        updateServicesBlockId: submitData["id"],
        data: {
          titleContent: returnTitleContent,
          serviceLinks: returnValues,
        },
      };
      return updateServicesBlock({
        variables,
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const getServicesBlockVariables: {
    contractId: string;
    audienceId: string;
  } = {
    contractId,
    audienceId: "",
  };
  if (audience && audience.id) {
    getServicesBlockVariables.audienceId = audience.id;
  }
  const { loading, error, data } =
    useGetServicesBlocksByContractIdAndAudienceIdQuery({
      variables: getServicesBlockVariables,
      fetchPolicy: "network-only",
    });
  const [
    updateServicesBlock,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateServicesBlockByIdMutation({
    refetchQueries: ["getServicesBlocksByContractIdAndAudienceId"],
    awaitRefetchQueries: true,
  });

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Homepage", userRights);
  const [servicesBlockData, setServicesBlockData] = useState<IServicesBlock>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data) {
      const serviceBlockMapped = extractServicesBlock(data);
      if (
        serviceBlockMapped.id &&
        serviceBlockMapped.titleContent &&
        serviceBlockMapped.serviceLinks
      ) {
        const mappedData = {
          id: serviceBlockMapped.id,
          titleContent: serviceBlockMapped.titleContent,
          serviceLinks: serviceBlockMapped.serviceLinks.map(
            (serviceLink, index) => {
              serviceLink.localId = `local-${index}`;
              return serviceLink;
            },
          ),
        };
        setServicesBlockData(mappedData);
        form.reset(mappedData);
      }
    }
  }, [form, data]);

  return (
    <div
      className="c-ServicesTab"
      id="panel-services"
      role="tabpanel"
      aria-labelledby="tab-services"
    >
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <h2 className="c-ServicesTab__Title">{title}</h2>
        <FormProvider {...form}>
          <form
            className="c-ServicesTab__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-ServicesTab__Block">
              <div className="c-ServicesTab__Group">
                <FormInput
                  type="text"
                  name="titleContent"
                  label={formLabels.titleContent}
                  isRequired={true}
                  isDisabled={mutationLoading || !userPermissions.update}
                  defaultValue={servicesBlockData?.titleContent}
                />
              </div>
            </div>
            <div className="c-ServicesTab__ServiceLinks">
              <FormServiceLinks
                name="serviceLinks"
                label={formLabels.blockDisplayedLabel}
                secondaryLabel={formLabels.secondaryLabel}
                editModalTitle={formLabels.editModalTitle}
                editModalNameLabel={formLabels.editModalNameLabel}
                isDisabled={mutationLoading || !userPermissions.update}
                isSortByIsDisplayed={true}
                isSplitDisplay={true}
                splitLabel={formLabels.blockNotDisplayedLabel}
                splitSecondaryLabel={formLabels.blockNotDisplayedSecondaryLabel}
                maxLimitIsDisplayed={maxLimitDisplay}
              />
              <ServicesTabAddButton onSubmit={onModalSubmit} />
            </div>
            <div className="c-ServicesTab__Buttons">
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
  );
}

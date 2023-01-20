import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import FormInput from "../../Form/FormInput/FormInput";
import {
  GetServicesBlockTabDocument,
  useGetServicesBlockTabQuery,
  useUpdateServicesBlockTabMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { IServiceLink } from "../../../lib/service-links";
import FormServiceLinks from "../../Form/FormServiceLinks/FormServiceLinks";
import ServicesTabAddButton from "./ServicesTabAddButton/ServicesTabAddButton";
import "./services-tab.scss";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import { extractServicesBlock } from "../../../lib/graphql-data";

interface IServicesBlock {
  id: string;
  titleContent: string;
  serviceLinks: Array<IServiceLink>;
}

export default function ServicesTab() {
  /* Static Data */
  const title = "Services";
  const maxLimitDisplay = 6;
  const formLabels = {
    titleContent: "Titre du bloc",
    blockDisplayedLabel:
      "Ordre d’affichage des services sur la page d’accueil (accès rapide)",
    secondaryLabel: `Vous pouvez choisir d’afficher jusqu’à ${maxLimitDisplay} blocs maximum`,
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
    const modalData = data["createModal"];
    if (modalData && servicesBlockData?.serviceLinks) {
      const newLink: IServiceLink = {
        type: "ComponentLinksExternal",
        localId: servicesBlockData.serviceLinks.length,
        isDisplayed: false,
        name: modalData["name"],
        externalLink: modalData["externalLink"],
        picto: modalData["picto"],
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
            picto: link.picto,
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
      return updateServicesBlockTab({
        variables,
        refetchQueries: [
          {
            query: GetServicesBlockTabDocument,
            variables: { contractId },
          },
          "getServicesBlockTab",
        ],
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetServicesBlockTabQuery({
    variables: { contractId },
  });
  const [
    updateServicesBlockTab,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateServicesBlockTabMutation();
  /* Local Data */
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
          serviceLinks: serviceBlockMapped.serviceLinks,
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
                  isDisabled={mutationLoading}
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
                splitLabel={formLabels.blockNotDisplayedLabel}
                splitSecondaryLabel={formLabels.blockNotDisplayedSecondaryLabel}
                maxLimitIsDisplayed={maxLimitDisplay}
                isDisabled={mutationLoading}
                isSplitDisplay={true}
              />
              <ServicesTabAddButton onSubmit={onModalSubmit} />
            </div>
            <div className="c-ServicesTab__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isDirty}
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

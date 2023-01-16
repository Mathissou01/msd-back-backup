import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  GetMenuPageDocument,
  useGetMenuPageQuery,
  useUpdateMenuPageMutation,
} from "../../../graphql/codegen/generated-types";
import { FocusFirstElement, removeNulls } from "../../../lib/utilities";
import { IServiceLink, isServiceLink } from "../../../lib/service-links";
import { extractMenu } from "../../../lib/graphql-data";
import { useContract } from "../../../hooks/useContract";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
import FormServiceLinks from "../../../components/Form/FormServiceLinks/FormServiceLinks";
import "./personnalisation-menu-page.scss";

export default function PersonnalisationMenuPage() {
  /* Static Data */
  const title = "Menu";
  const description =
    "Choisissez, personnalisez et ordonnez les entrées du menu de gauche";
  const formLabels = {
    title: "Menu",
    description: "Ordre d’affichage du menu",
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
            name: link.name,
            isDisplayed: link.isDisplayed,
            picto: link.picto,
          };
        },
      );
      const variables = {
        updateMenuPageId: submitData["id"],
        data: {
          serviceLinks: returnValues,
        },
      };
      updateMenuPage({
        variables,
        refetchQueries: [
          {
            query: GetMenuPageDocument,
            variables: { contractId },
          },
          "getMenuPage",
        ],
      });
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetMenuPageQuery({
    variables: { contractId },
  });
  const [updateMenuPage, { loading: mutationLoading, error: mutationError }] =
    useUpdateMenuPageMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
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
          serviceLinks: contractMenu.attributes.serviceLinks
            .map((link, index) => {
              if (link) {
                const type = link.__typename;
                if (type && isServiceLink(link)) {
                  return {
                    type,
                    localId: index,
                    name: link?.name,
                    isDisplayed: link?.isDisplayed,
                    picto: link?.picto,
                  };
                }
              }
            })
            .filter(removeNulls),
        };
        form.reset(mappedData);
      }
    }
  }, [data, form]);

  const spinnerTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isSubmitting) {
      if (!isShowingSpinner) {
        spinnerTimerRef.current = setTimeout(() => {
          setIsShowingSpinner(true);
        }, 200);
      }
    } else {
      clearTimeout(spinnerTimerRef.current);
      setIsShowingSpinner(false);
    }
  }, [isShowingSpinner, isSubmitting]);

  const focusRef = useCallback((node: HTMLFormElement) => {
    FocusFirstElement(node);
  }, []);

  {
    // TODO: layout shift, handle error redirect,
  }
  if (loading) return <CommonSpinner />;
  if (error) return <span>{error?.message}</span>;
  if (mutationError) return <span>{mutationError?.message}</span>;
  return (
    <>
      <PageTitle title={title} description={description} />
      <div className="c-PersonnalisationMenuPage">
        {isShowingSpinner && <CommonSpinner isCover={true} />}
        <FormProvider {...form}>
          <form
            className="c-PersonnalisationMenuPage__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={focusRef}
          >
            <div className="c-PersonnalisationMenuPage__Group">
              <h2 className="c-PersonnalisationFooterPage__Title">
                {formLabels.title}
              </h2>
              <FormServiceLinks
                name="serviceLinks"
                label={formLabels.description}
                isDisabled={mutationLoading}
              />
            </div>
            <div className="c-PersonnalisationMenuPage__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButtonLabel}
                style="primary"
                isDisabled={!isDirty}
              />
              <CommonButton
                type="button"
                label={formLabels.cancelButtonLabel}
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

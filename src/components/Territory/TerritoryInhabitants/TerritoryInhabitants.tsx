import { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  GetTerritoriesByContractIdDocument,
  useUpdateTerritoryByIdMutation,
} from "../../../graphql/codegen/generated-types";
import { useFocusFirstElement } from "../../../hooks/useFocusFirstElement";
import CommonButton from "../../Common/CommonButton/CommonButton";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import FormInput from "../../Form/FormInput/FormInput";
import "./territory-inhabitants.scss";

interface ITerritoryInhabitants {
  contractId: string;
  id: string;
  inhabitants: string;
}

export default function TerritoryInhabitants({
  contractId,
  id,
  inhabitants,
}: ITerritoryInhabitants) {
  /* Static Data */
  const labels = {
    nbInhabitants: "Nombre d'habitants",
    submitButton: "Enregistrer les modifications",
    cancelButton: "Annuler les modifications",
  };

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["nbInhabitants"]) {
      const variables = {
        updateTerritoryId: id,
        data: {
          numberOfInhabitants: submitData["nbInhabitants"],
        },
      };
      return updateTerritory({
        variables,
        refetchQueries: [
          {
            query: GetTerritoriesByContractIdDocument,
            variables: { contractId },
          },
        ],
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* Local Data */
  const form = useForm({
    mode: "onChange",
  });
  const { formState, handleSubmit, resetField } = form;
  const { isDirty, isSubmitting } = formState;
  const [
    updateTerritory,
    { loading: updateTerritoryLoading, error: updateTerritoryError },
  ] = useUpdateTerritoryByIdMutation();

  useEffect(() => {
    if (inhabitants) {
      resetField("nbInhabitants", {
        defaultValue: inhabitants,
        keepDirty: false,
      });
    }
  }, [inhabitants, resetField]);

  return (
    <CommonLoader
      isLoading={isSubmitting || updateTerritoryLoading}
      isShowingContent={isSubmitting || updateTerritoryLoading}
      hasDelay={isSubmitting || updateTerritoryLoading}
      errors={[updateTerritoryError]}
    >
      <div className="c-TerritoryInhabitants">
        <FormProvider {...form}>
          <form
            className="c-TerritoryInhabitants__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-TerritoryInhabitants__NbInhabitants">
              <FormInput
                type="number"
                name="nbInhabitants"
                label={labels.nbInhabitants}
                isRequired
                isDisabled={updateTerritoryLoading}
                defaultValue={inhabitants}
                withoutWheelBehaviour
              />
            </div>
            <div className="c-TerritoryInhabitants__Buttons">
              <CommonButton
                type="submit"
                label={labels.submitButton}
                style="primary"
                picto="check"
                isDisabled={!isDirty}
              />
              <CommonButton
                type="button"
                label={labels.cancelButton}
                picto="cross"
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </CommonLoader>
  );
}

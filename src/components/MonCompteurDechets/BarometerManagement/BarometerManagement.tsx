import React, { useEffect, useState } from "react";
import "./barometer-management.scss";
import { FormProvider, useForm } from "react-hook-form";
import {
  useGetBaroMeterParamsQuery,
  useGetMwcAverageProductionQuery,
  useUpdateBarometerParamsMutation,
} from "../../../graphql/codegen/generated-types";
import CommonButton from "../../Common/CommonButton/CommonButton";
import BarometerForm from "./BarometerForm/BarometerForm";
import CommonSpinner from "../../Common/CommonSpinner/CommonSpinner";
import BarometerLegend from "./BarometerLegend/BarometerLegend";
import BarometerInsight from "./BarometerInsight/BarometerInsight";
import { useContract } from "../../../hooks/useContract";

interface IBarometerParams {
  low: number;
  medium: number;
  high: number;
  veryHigh: number;
}

const defaultValues = {
  low: 75,
  medium: 125,
  high: 226,
  veryHigh: 247,
};

const texts = {
  title: "Paramétrer l'affichage du baromètre de production des déchets",
  info: "La production moyenne de déchets par mois dans votre collectivité est de",
  kg: "kg",
  subInfo:
    "La production moyenne de votre collectivité est calculée à partir des informations saisies dans l'onglet flux.",
};

const label = {
  save: "Enregistrer les modifications",
  cancel: "Annuler les modifications",
  reset: "Réinitialiser les valeurs par défaut",
};

export default function BarometerManagement() {
  const { contractId } = useContract();
  const [barometerValues, setBarometerValues] = useState({
    low: defaultValues.low,
    medium: defaultValues.medium,
    high: defaultValues.high,
    veryHigh: defaultValues.veryHigh,
  });

  const { data: barometerData, loading } = useGetBaroMeterParamsQuery({
    variables: { mwCounterServiceId: contractId },
  });

  const { data: averageProduction } = useGetMwcAverageProductionQuery({
    variables: { contractId: contractId },
  });

  const [updateBarometerParams] = useUpdateBarometerParamsMutation({
    refetchQueries: ["getBaroMeterParams"],
  });

  const methods = useForm({
    defaultValues: barometerValues,
    mode: "all",
    shouldUnregister: true,
  });

  const onSubmit = (data: IBarometerParams) => {
    return updateBarometerParams({
      variables: {
        updateMwCounterServiceId: contractId,
        data: {
          barometerParams: {
            low: data.low,
            medium: data.medium,
            high: data.high,
            veryHigh: data.veryHigh,
          },
        },
      },
    });
  };

  useEffect(() => {
    const barometerParams: IBarometerParams =
      barometerData?.mwCounterService?.data?.attributes?.barometerParams;

    if (barometerParams) {
      setBarometerValues({
        low: barometerParams.low,
        medium: barometerParams.medium,
        high: barometerParams.high,
        veryHigh: barometerParams.veryHigh,
      });
      methods.reset(barometerParams);
    }
  }, [barometerData, methods]);

  return (
    <div className="c-BarometerManagement">
      <div className="c-BarometerManagement__Header">
        <h3>{texts.title}</h3>
        <div className="c-BarometerManagement__Info">
          <p>
            {texts.info}
            <b>
              {" "}
              {averageProduction?.getMwcAverageProduction?.toFixed(2)}{" "}
              {texts.kg}
            </b>
            <br />
            <i>{texts.subInfo}</i>
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            className="c-BarometerManagement__Container"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {loading ? (
              <CommonSpinner />
            ) : (
              <div className="c-BarometerManagement__ProductionContainer">
                <BarometerForm />
                {averageProduction?.getMwcAverageProduction &&
                  averageProduction?.getMwcAverageProduction > 0 && (
                    <div className="c-BarometerManagement__Barometer">
                      <BarometerInsight
                        averageProduction={Number(
                          averageProduction?.getMwcAverageProduction,
                        )}
                      />
                      <BarometerLegend />
                    </div>
                  )}
              </div>
            )}

            <div className="c-BarometerManagement__ButtonContainer">
              <CommonButton
                type="button"
                label={label.reset}
                onClick={() => methods.reset(defaultValues)}
              />
              <div className="c-BarometerManagement__Buttons">
                <CommonButton
                  type="button"
                  label={label.cancel}
                  onClick={() => methods.reset(barometerValues)}
                />
                <CommonButton
                  type="submit"
                  label={label.save}
                  style="primary"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

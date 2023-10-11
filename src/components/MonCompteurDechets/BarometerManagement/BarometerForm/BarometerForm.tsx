/* eslint-disable react-hooks/exhaustive-deps */
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
import "./barometer-form.scss";

const texts = {
  title: "Baromètre",
  productionConcidered: "La production est considérée comme",
  low: "faible",
  medium: "moyenne",
  high: "élevée",
  veryHigh: "très élevée",
  ifItIsLessThan: "si elle est inférieure à",
  ifItIsBetween: "si elle est comprise entre",
  and: "et",
  ofTheAverageProduction: "% de la production moyenne",
};

const errorMessages = {
  low: {
    required: "La valeur faible est requise",
    max: "La valeur faible doit être inférieure à la valeur moyenne",
  },
  medium: {
    required: "La valeur moyenne est requise",
    min: "La valeur moyenne doit être supérieure à la valeur faible",
    max: "La valeur moyenne doit être inférieure à la valeur élevée",
  },
  high: {
    required: "La valeur élevée est requise",
    min: "La valeur élevée doit être supérieure à la valeur moyenne",
    max: "La valeur élevée doit être inférieure à la valeur très élevée",
  },
  veryHigh: {
    required: "La valeur très élevée est requise",
    min: "La valeur très élevée doit être supérieure à la valeur élevée",
  },
};

export default function BarometerForm() {
  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Mwc", userRights);
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    trigger(["low", "medium", "high", "veryHigh"]);
  }, [
    watch("low"),
    watch("medium"),
    watch("high"),
    watch("veryHigh"),
    trigger,
  ]);

  return (
    <div className="c-BarometerForm__ProductionFormBlock">
      <div className="c-BarometerForm__TextContainer">
        <p>
          {texts.productionConcidered} <b>{texts.low}</b>
        </p>

        <div className="c-BarometerForm__TextInput">
          <p>{texts.ifItIsLessThan}</p>
          <div>
            <input
              id="low"
              type="number"
              disabled={!userPermissions.update}
              {...register("low", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: errorMessages.low.required,
                },
                max: {
                  value: watch("medium"),
                  message: errorMessages.low.max,
                },
              })}
              className="c-BarometerForm__Input"
            />
          </div>
          <p>{texts.ofTheAverageProduction}</p>
        </div>
      </div>

      {errors.low && (
        <p className="c-BarometerForm__Error">
          {errors.low?.message as string}
        </p>
      )}
      <div className="c-BarometerForm__TextContainer">
        <p>
          {texts.productionConcidered} <b>{texts.medium}</b>
        </p>
        <div className="c-BarometerForm__TextInput">
          <p>{texts.ifItIsBetween}</p>
          <input
            id="lowDisable"
            type="number"
            value={watch("low")}
            className="c-BarometerForm__Input"
            disabled={true}
          />
          <p> % {texts.and}</p>
          <input
            id="medium"
            type="number"
            disabled={!userPermissions.update}
            {...register("medium", {
              valueAsNumber: true,
              required: {
                value: true,
                message: errorMessages.medium.required,
              },
              min: {
                value: watch("low"),
                message: errorMessages.medium.min,
              },
              max: {
                value: watch("high"),
                message: errorMessages.medium.max,
              },
            })}
            className="c-BarometerForm__Input"
          />
          <p>{texts.ofTheAverageProduction}</p>
        </div>
      </div>
      {errors.medium && (
        <p className="c-BarometerForm__Error">
          {errors.medium?.message as string}
        </p>
      )}
      <div className="c-BarometerForm__TextContainer">
        <p>
          {texts.productionConcidered} <b>{texts.high}</b>
        </p>
        <div className="c-BarometerForm__TextInput">
          <p>{texts.ifItIsBetween}</p>
          <input
            id="mediumDisable"
            type="number"
            value={watch("medium")}
            className="c-BarometerForm__Input"
            disabled={true}
          />
          <p> % {texts.and}</p>
          <input
            id="high"
            type="text"
            disabled={!userPermissions.update}
            {...register("high", {
              valueAsNumber: true,
              required: {
                value: true,
                message: errorMessages.high.required,
              },
              min: {
                value: watch("medium"),
                message: errorMessages.high.min,
              },
              max: {
                value: watch("veryHigh"),
                message: errorMessages.high.max,
              },
            })}
            className="c-BarometerForm__Input"
          />
          <p>{texts.ofTheAverageProduction}</p>
        </div>
      </div>
      {errors.high && (
        <p className="c-BarometerForm__Error">
          {errors.high?.message as string}
        </p>
      )}
      <div className="c-BarometerForm__TextContainer">
        <p>
          {texts.productionConcidered} <b>{texts.veryHigh}</b>
        </p>
        <div className="c-BarometerForm__TextInput">
          {texts.ifItIsBetween}
          <input
            id="highDisable"
            type="number"
            value={watch("high")}
            className="c-BarometerForm__Input"
            disabled={true}
          />
          <p> % {texts.and}</p>
          <input
            id="veryHigh"
            type="number"
            disabled={!userPermissions.update}
            {...register("veryHigh", {
              valueAsNumber: true,
              required: {
                value: true,
                message: errorMessages.veryHigh.required,
              },
              min: {
                value: watch("high"),
                message: errorMessages.veryHigh.min,
              },
            })}
            className="c-BarometerForm__Input"
          />
          <p>{texts.ofTheAverageProduction}</p>
        </div>
      </div>
      {errors.veryHigh && (
        <p className="c-BarometerForm__Error">
          {errors.veryHigh?.message as string}
        </p>
      )}
    </div>
  );
}

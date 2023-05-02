import React, { useEffect, useRef } from "react";
import Image from "next/image";
import chroma from "chroma-js";
import { useFormContext } from "react-hook-form";
import FormRadioInput from "../FormRadioInput/FormRadioInput";
import FormInput from "../FormInput/FormInput";
import CommonSvg from "../../Common/CommonSvg/CommonSvg";
import "./form-color-palette.scss";

interface IColorPalette {
  contrastText?: string;
  primaryColor?: string;
  primaryColorDark?: string;
  primaryColorLight?: string;
  secondaryColor?: string;
  secondaryColorDark?: string;
  secondaryColorLight?: string;
}

interface IFormColorPaletteProps {
  colorPalette: IColorPalette | undefined;
  defaultColorPalette: IColorPalette | undefined;
  colorMode: boolean;
  primaryErrorMsg: boolean;
  setColorPalette: (
    value: React.SetStateAction<IColorPalette | undefined>,
  ) => void;
  setColorMode: (value: React.SetStateAction<boolean>) => void;
  setPrimaryErrorMsg: (value: React.SetStateAction<boolean>) => void;
}

export default function FormColorPalette({
  colorPalette,
  defaultColorPalette,
  colorMode,
  primaryErrorMsg,
  setColorPalette,
  setColorMode,
  setPrimaryErrorMsg,
}: IFormColorPaletteProps) {
  /* Static Data */
  const labels = {
    defaultColor: "Couleurs par déaut",
    personalizedColor: "Couleurs personnalisées",
    primaryColor: "Couleur principale",
    secondaryColor: "Couleur secondaire",
    colorHintText: "Format hexadécimal, ex: #458203",
    colorPaletteTitle: "Palette créée à partir de vos couleurs",
    exampleColorsElementTitle: "Examples d'utilisation de vos couleurs",
    exampleTitleElement: "Les services de ma ville",
    exampleSearchButtonElement: "Rechercher",
    exampleCardTitleElement: "Point de collecte",
    exampleDateElement: "8 juin 2022",
  };
  const alertPicto = "/images/pictos/alert.svg";
  const contractTextLight = "#FAF8F4";
  const contractTextDark = "#030F40";

  /* Local Data */
  const { watch } = useFormContext();
  const primaryColorWatch = watch("primaryColor");
  const secondaryColorWatch = watch("secondaryColor");
  const primaryColorWatchRef = useRef(null);
  const secondaryColorWatchRef = useRef(null);

  /* Methods */
  function handleRadioInputChange(data: unknown): void {
    if (data === "0") {
      setColorMode(true);
    } else {
      setColorMode(false);
    }
  }

  function makeDarkerColor(color: string): string {
    return chroma(color).darken().hex();
  }

  function makeLighterColor(color: string): string {
    return chroma(color).alpha(0.1).hex();
  }

  useEffect(() => {
    if (primaryColorWatch) {
      if (chroma.valid(primaryColorWatch)) {
        setPrimaryErrorMsg(false);
        if (primaryColorWatchRef.current !== primaryColorWatch) {
          const colorPaletteInstance = { ...colorPalette };
          colorPaletteInstance.primaryColor = primaryColorWatch;
          colorPaletteInstance.primaryColorDark =
            makeDarkerColor(primaryColorWatch);
          colorPaletteInstance.primaryColorLight =
            makeLighterColor(primaryColorWatch);

          if (chroma.contrast(primaryColorWatch, contractTextDark) >= 4.5) {
            colorPaletteInstance.contrastText = contractTextDark;

            setColorPalette(colorPaletteInstance);
            primaryColorWatchRef.current = primaryColorWatch;
          } else if (
            chroma.contrast(primaryColorWatch, contractTextLight) >= 4.5
          ) {
            colorPaletteInstance.contrastText = contractTextLight;

            setColorPalette(colorPaletteInstance);
            primaryColorWatchRef.current = primaryColorWatch;
          } else {
            setPrimaryErrorMsg(true);
          }
        }
      }
    }
  }, [primaryColorWatch, colorPalette, setColorPalette, setPrimaryErrorMsg]);

  useEffect(() => {
    if (secondaryColorWatch) {
      if (chroma.valid(secondaryColorWatch)) {
        if (secondaryColorWatchRef.current !== secondaryColorWatch) {
          const colorPaletteInstance = { ...colorPalette };
          colorPaletteInstance.secondaryColor = secondaryColorWatch;
          colorPaletteInstance.secondaryColorDark =
            makeDarkerColor(secondaryColorWatch);
          colorPaletteInstance.secondaryColorLight =
            makeLighterColor(secondaryColorWatch);

          setColorPalette(colorPaletteInstance);
          secondaryColorWatchRef.current = secondaryColorWatch;
        }
      }
    }
  }, [secondaryColorWatch, colorPalette, setColorPalette]);

  return (
    <>
      <FormRadioInput
        name="colorMode"
        displayName=""
        options={[
          {
            value: 0,
            label: labels.defaultColor,
          },
          {
            value: 1,
            label: labels.personalizedColor,
          },
        ]}
        defaultValue={colorMode ? "0" : "1"}
        onChange={handleRadioInputChange}
      />
      {colorMode && (
        <>
          <div className="c-FormColorPalette__InputWrapper">
            <FormInput
              label={labels.primaryColor}
              name="defaultPrimaryColor"
              validationLabel={labels.colorHintText}
              isDisabled
              defaultValue={
                process.env.NEXT_PUBLIC_COLOR_BRAND_PRIMARY || "#9bcd41"
              }
            />
            <FormInput
              label={labels.secondaryColor}
              name="defaultSecondaryColor"
              validationLabel={labels.colorHintText}
              isDisabled
              defaultValue={
                process.env.NEXT_PUBLIC_COLOR_BRAND_SECONDARY ||
                process.env.NEXT_PUBLIC_COLOR_BRAND_PRIMARY ||
                "#ffc229"
              }
            />
          </div>
        </>
      )}
      {!colorMode && (
        <>
          <div className="c-FormColorPalette__InputWrapper">
            <FormInput
              label={labels.primaryColor}
              name="primaryColor"
              validationLabel={labels.colorHintText}
              defaultValue={colorPalette?.primaryColor ?? ""}
              isRequired
              minLengthValidation={4}
              maxLengthValidation={7}
              patternValidation={/^#(?:[0-9a-f]{3}){1,2}$/i}
            />
            <FormInput
              label={labels.secondaryColor}
              name="secondaryColor"
              validationLabel={labels.colorHintText}
              defaultValue={colorPalette?.secondaryColor ?? ""}
              // minLengthValidation={4}
              maxLengthValidation={7}
              patternValidation={/^#(?:[0-9a-f]{3}){1,2}$/i}
            />
          </div>
          {primaryErrorMsg && (
            <div className="c-FormColorPalette__AccessibilityErrorMsg">
              <Image
                src={alertPicto}
                width={15}
                height={15}
                alt=""
                className="c-FormColorPalette__AlertPicto"
              />
              <h6>Accessibilité</h6>
              <p>
                La couleur principale que vous avez choisie ne permet pas
                d&#39;atteindre un contraste suffisant. Le contraste doit être
                de 4,5 minimum avec du texte clair (#FAF8F4) ou du texte foncé
                (#030F40). Vous pouvez saisir une autre couleur de votre choix.{" "}
                <br /> Pour vous aider, vous pouvez utiliser l&#39;outil{" "}
                <u>tanagaru contrast finder</u>. <br />
                <u>Trouver une couleur contrastée avec un texte clair</u>
                <br />
                <u>Trouver une couleur contrastée avec un texte foncé</u>
              </p>
            </div>
          )}
          <div className="c-FormColorPalette__ColorPalette">
            <div className="c-FormColorPalette__SampleColors">
              <h2 className="c-FormColorPalette__Title">
                {labels.colorPaletteTitle}
              </h2>
              <div
                className="c-FormColorPalette__MainColor"
                style={{
                  backgroundColor:
                    colorPalette?.primaryColor ??
                    defaultColorPalette?.primaryColor,
                }}
              >
                {((colorPalette?.primaryColor &&
                  colorPalette?.primaryColor.length > 4) ||
                  defaultColorPalette?.primaryColor) && (
                  <span className="c-FormColorPalette__DisplayColor">
                    {colorPalette?.primaryColor ??
                      defaultColorPalette?.primaryColor}
                  </span>
                )}
              </div>
              <div
                className="c-FormColorPalette__Darker"
                style={{
                  backgroundColor:
                    colorPalette?.primaryColorDark ??
                    defaultColorPalette?.primaryColorDark,
                }}
              ></div>
              <div
                className="c-FormColorPalette__Lighter"
                style={{
                  backgroundColor:
                    colorPalette?.primaryColorLight ??
                    defaultColorPalette?.primaryColorLight,
                }}
              ></div>
              <div
                className="c-FormColorPalette__MainColor c-FormColorPalette__MainColor_lowHeight"
                style={{
                  backgroundColor:
                    colorPalette?.secondaryColor ??
                    defaultColorPalette?.secondaryColor ??
                    defaultColorPalette?.secondaryColor,
                }}
              >
                {((colorPalette?.secondaryColor &&
                  colorPalette?.secondaryColor.length > 4) ||
                  defaultColorPalette?.secondaryColor) && (
                  <span className="c-FormColorPalette__DisplayColor">
                    {colorPalette?.secondaryColor ??
                      defaultColorPalette?.secondaryColor}
                  </span>
                )}
              </div>
              <div
                className="c-FormColorPalette__Darker"
                style={{
                  backgroundColor:
                    colorPalette?.secondaryColorDark ??
                    defaultColorPalette?.secondaryColorDark,
                }}
              ></div>
              <div
                className="c-FormColorPalette__Lighter"
                style={{
                  backgroundColor:
                    colorPalette?.secondaryColorLight ??
                    defaultColorPalette?.secondaryColorLight,
                }}
              ></div>
            </div>
            <div className="c-FormColorPalette__SampleColors">
              <h2 className="c-FormColorPalette__PageTitle">
                {labels.exampleColorsElementTitle}
              </h2>
              <div className="c-FormColorPalette__ElementWrapper">
                <h2>{labels.exampleTitleElement}</h2>
                <div
                  className="c-FormColorPalette__Line"
                  style={{
                    borderColor:
                      colorPalette?.secondaryColor ??
                      defaultColorPalette?.secondaryColor,
                  }}
                ></div>
              </div>
              <div className="c-FormColorPalette__ElementWrapper">
                <button
                  style={{
                    backgroundColor:
                      colorPalette?.primaryColor ??
                      defaultColorPalette?.primaryColor,
                  }}
                  className="c-FormColorPalette__SearchButton"
                  type="button"
                >
                  <div className="c-FormColorPalette__ButtonPicto">
                    <CommonSvg
                      color={colorPalette?.contrastText}
                      dimensions={[
                        "M1.47 13.357a9.063 9.063 0 1 0 16.683-7.09 9.063 9.063 0 0 0-16.682 7.09v0ZM16.219 16.22l7.029 7.03",
                      ]}
                    />
                  </div>
                  <span style={{ color: colorPalette?.contrastText }}>
                    {labels.exampleSearchButtonElement}
                  </span>
                </button>
              </div>
              <div className="c-FormColorPalette__ElementWrapper">
                <div className="c-FormColorPalette__Card">
                  <div
                    className="c-FormColorPalette__CardPicto"
                    style={{
                      backgroundColor:
                        colorPalette?.primaryColorLight ??
                        defaultColorPalette?.secondaryColorLight,
                    }}
                  >
                    <CommonSvg
                      color={
                        colorPalette?.primaryColor ??
                        defaultColorPalette?.primaryColor
                      }
                      dimensions={[
                        "M23.25 9V4.65a1.5 1.5 0 0 0-.943-1.393l-6-2.4a1.5 1.5 0 0 0-1.114 0L8.807 3.412a1.5 1.5 0 0 1-1.114 0L1.779 1.046a.75.75 0 0 0-1.029.7v14.373a1.5 1.5 0 0 0 .943 1.393l6 2.4a1.5 1.5 0 0 0 1.114 0l2.881-1.153M8.25 3.519v16.5M15.75.75v7.5m3 7.199a.375.375 0 0 1 .375.375m-.75 0a.375.375 0 0 1 .375-.375m0 .751a.375.375 0 0 1-.375-.375m.75-.001a.375.375 0 0 1-.375.375",
                        "M18.75 11.324a4.5 4.5 0 0 1 4.5 4.5c0 1.921-2.688 5.576-3.909 7.138a.749.749 0 0 1-1.182 0c-1.221-1.561-3.909-5.217-3.909-7.138a4.5 4.5 0 0 1 4.5-4.5Z",
                      ]}
                    />
                  </div>
                  <div className="c-FormColorPalette__Name">
                    {labels.exampleCardTitleElement}
                  </div>
                </div>
              </div>
              <div className="c-FormColorPalette__ElementWrapper">
                <div className="c-FormColorPalette__Date">
                  <div
                    className="c-FormColorPalette__DatePicto"
                    style={{
                      backgroundColor:
                        colorPalette?.secondaryColorLight ??
                        defaultColorPalette?.secondaryColorLight,
                    }}
                  >
                    <CommonSvg
                      width="50"
                      height="50"
                      color={
                        colorPalette?.secondaryColorDark ??
                        defaultColorPalette?.secondaryColorDark
                      }
                      dimensions={[
                        "M21.75 3.75H2.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h19.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5Zm-21 6h22.5M6.75 6V.75M17.25 6V.75",
                        "M5.625 13.5a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm0 5.25a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75ZM12 13.5a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm0 5.25a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm6.375-5.25a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm0 5.25a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Z",
                      ]}
                    />
                    {labels.exampleDateElement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

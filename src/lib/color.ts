import chroma from "chroma-js";

export interface IDefaultColorPalette {
  contrastDefaultLight: string;
  contrastDefaultDark: string;
  contrastText: string;
  primaryColor: string;
  primaryColorDark: string;
  primaryColorLight: string;
  secondaryColor: string;
  secondaryColorDark: string;
  secondaryColorLight: string;
}

export interface IColorPalette {
  contrastText?: string;
  primaryColor?: string;
  primaryColorDark?: string;
  primaryColorLight?: string;
  secondaryColor?: string;
  secondaryColorDark?: string;
  secondaryColorLight?: string;
}

const contrastDefaultLight = "#FAF8F4";
const contrastDefaultDark = "#030f40";
const contrastText = contrastDefaultDark;
const primaryColor = "#9BCD41";
const primaryColorDark = makeDarkerColor(primaryColor);
const primaryColorLight = makeLighterColor(primaryColor);
const secondaryColor = "#FFC229";
const secondaryColorDark = makeDarkerColor(secondaryColor);
const secondaryColorLight = makeLighterColor(secondaryColor);

export const defaultColorPalette: IDefaultColorPalette = {
  contrastDefaultLight,
  contrastDefaultDark,
  contrastText,
  primaryColor,
  primaryColorDark,
  primaryColorLight,
  secondaryColor,
  secondaryColorDark,
  secondaryColorLight,
};

export function makeDarkerColor(color: string): string {
  return chroma(color).darken().hex();
}

export function makeLighterColor(color: string): string {
  return chroma(color).alpha(0.1).hex();
}

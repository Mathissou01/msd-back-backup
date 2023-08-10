import { addMinutes, setHours, setMinutes } from "date-fns";

export type TWeekDayName =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";
type TWeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TWeekDayIndexString = `${TWeekDayIndex}`;

export interface IDay {
  name: TWeekDayName;
  index: TWeekDayIndex;
}

export const weekDays: Array<IDay> = [
  { name: "Lundi", index: 1 },
  { name: "Mardi", index: 2 },
  { name: "Mercredi", index: 3 },
  { name: "Jeudi", index: 4 },
  { name: "Vendredi", index: 5 },
  { name: "Samedi", index: 6 },
  { name: "Dimanche", index: 0 },
];

type D2 = 0 | 1 | 2;
type D3 = D2 | 3;
type D5 = D3 | 4 | 5;
type D9 = D5 | 6 | 7 | 8 | 9;
export type THour = `0${D9}` | `${D2}${D3}`;
export type TMinute = `0${D9}` | `${D5}${D9}`;
export type THourMinute = `${THour}${TMinute}`;

export function timeStringToDate(
  timeStr?: string,
  minuteOffset?: number,
): Date | null {
  if (!timeStr) return null;
  const hours = Number.parseInt(timeStr.substring(0, 2));
  const minutes = Number.parseInt(timeStr.substring(2, 4));
  const time = setHours(setMinutes(new Date(), minutes), hours);
  if (minuteOffset) {
    return addMinutes(time, minuteOffset);
  } else {
    return time;
  }
}

export function dateToSlotString(date: Date | null) {
  if (!date) return "";
  return `${date.getHours().toString().padStart(2, "0")}${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

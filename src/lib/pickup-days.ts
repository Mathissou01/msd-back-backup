import { Maybe } from "graphql/jsutils/Maybe";
import {
  Enum_Pickupday_Periodicity,
  InputMaybe,
  RequestEntity,
} from "../graphql/codegen/generated-types";

import { IFormSingleMultiselectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";

enum EPeriodicityStatus {
  WEEKLY = "hebdomadaire",
  MONTHLY = "mensuel",
}

enum EPickUpDayCollectType {
  DOOR_TO_DOOR = "CollectDoorToDoor_",
  VOLUNTARY = "CollectVoluntary_",
}

enum EMonthlyStatus {
  MONTHLY_FIRST = "le premier",
  MONTHLY_LAST = "le dernier",
  MONTHLY_DATE = "le N du mois",
}

enum EDaysOfTheWeek {
  MONDAY = "Lundi",
  TUESDAY = "Mardi",
  WEDNESDAY = "Mercredi",
  THURSDAY = "Jeudi",
  FRIDAY = "Vendredi",
  SATURDAY = "Samedi",
  SUNDAY = "Dimanche",
}

interface IHebdomadireAdvancedSelection {
  hebdomadaire: {
    selection: Array<string>;
  };
}

interface IMensuelAdvancedSelection {
  mensuel: {
    choice: string;
    selection: Array<string> | number;
  };
}

interface IPickUpDayStaticVariablesFields {
  updatePickUpDayId: string;
  data: {
    name: string;
    pickUpDayService: Maybe<string>;
    sectorizations: InputMaybe<string>[] | null;
    cities: InputMaybe<string>[] | null;
    flow: string;
    collectDoorToDoor: string;
    collectVoluntary: string;
    periodicity?: InputMaybe<Enum_Pickupday_Periodicity>;
    advancedSelection:
      | IHebdomadireAdvancedSelection
      | IMensuelAdvancedSelection;
    includeHoliday: boolean;
    pickUpHours: string;
    complementaryMention: string;
    buttonLabel: string;
    request: string;
    externalLink: string;
    audiences: Array<string>;
  };
}

interface IPickUpDayStaticMappedFields {
  pickUpId: string;
  name: string;
  sectorizationsMode: string;
  sectorizations?: Array<IFormSingleMultiselectOption>;
  cities?: Array<IFormSingleMultiselectOption>;
  flow:
    | {
        id: string;
      }
    | string
    | null;
  collects: string;
  periodicity?: string | null;
  choice?: string;
  daysOfTheMonth?: string;
  days?: string | number | null;
  includeHoliday: boolean;
  pickUpHours?: string | null;
  complementaryMention?: string | null;
  buttonLabel?: string;
  shortcutFormMode: string;
  request?: RequestEntity;
  externalLink?: string;
  audiences?: Array<IFormSingleMultiselectOption>;
}

const dayOptions = [
  { label: EDaysOfTheWeek.MONDAY, value: EDaysOfTheWeek.MONDAY },
  { label: EDaysOfTheWeek.TUESDAY, value: EDaysOfTheWeek.TUESDAY },
  { label: EDaysOfTheWeek.WEDNESDAY, value: EDaysOfTheWeek.WEDNESDAY },
  { label: EDaysOfTheWeek.THURSDAY, value: EDaysOfTheWeek.THURSDAY },
  { label: EDaysOfTheWeek.FRIDAY, value: EDaysOfTheWeek.FRIDAY },
  { label: EDaysOfTheWeek.SATURDAY, value: EDaysOfTheWeek.SATURDAY },
  { label: EDaysOfTheWeek.SUNDAY, value: EDaysOfTheWeek.SUNDAY },
];

const recurrenceOptions = [
  {
    option: EMonthlyStatus.MONTHLY_FIRST,
    label: EMonthlyStatus.MONTHLY_FIRST,
  },
  {
    option: EMonthlyStatus.MONTHLY_LAST,
    label: EMonthlyStatus.MONTHLY_LAST,
  },
  {
    option: EMonthlyStatus.MONTHLY_DATE,
    label: EMonthlyStatus.MONTHLY_DATE,
  },
];

const periodicityOptions = [
  {
    option: EPeriodicityStatus.WEEKLY,
    label: EPeriodicityStatus.WEEKLY,
  },
  {
    option: EPeriodicityStatus.MONTHLY,
    label: EPeriodicityStatus.MONTHLY,
  },
];

export {
  EPeriodicityStatus,
  EMonthlyStatus,
  EDaysOfTheWeek,
  EPickUpDayCollectType,
  dayOptions,
  recurrenceOptions,
  periodicityOptions,
};
export type {
  IHebdomadireAdvancedSelection,
  IMensuelAdvancedSelection,
  IPickUpDayStaticVariablesFields,
  IPickUpDayStaticMappedFields,
};

enum EPeriodicityStatus {
  WEEKLY = "hebdomadaire",
  MONTHLY = "mensuel",
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
  dayOptions,
  recurrenceOptions,
  periodicityOptions,
};
export type { IHebdomadireAdvancedSelection, IMensuelAdvancedSelection };

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  idAddress?: string | null;
  streetNumber?: number | string | null;
  streetName?: string | null;
  city?: string | null;
  postalCode?: string | null;
  addressLabel?: string | null;
  dwellingType: string;
  userType: string;
  householdSize: number;
  consent?: IConsent[];
  activeCounter?: boolean;
  activationDate?: Date;
  communication?: ICommunication;
}

export interface IConsent {
  acceptanceDate: Date;
  version: string;
}

export interface ICommunication {
  alerts: ICommunicationType;
  tips: ICommunicationType;
  sociologicalSurveys: boolean;
  evolutionServices: boolean;
}

export interface ICommunicationType {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface IUserRightData {
  label: string;
  rights: IRightsData;
}

export interface IRightsData {
  create: boolean;
  delete: boolean;
  read: boolean;
  update: boolean;
}

export function getRightsByLabel(
  entityLabel: string,
  rights: Array<IUserRightData>,
): IRightsData {
  for (let i = 0; i < rights.length; i++) {
    if (rights[i].label === entityLabel) {
      return rights[i].rights;
    }
  }

  return {
    create: false,
    read: false,
    update: false,
    delete: false,
  };
}

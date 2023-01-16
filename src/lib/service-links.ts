export interface IPicto {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface IServiceLink {
  type?: string;
  localId: number;
  name: string;
  isDisplayed: boolean;
  picto?: IPicto | null;
  externalLink?: string;
}

// eslint-disable-next-line
export function isServiceLink(link: any): link is IServiceLink {
  return "name" in link && "isDisplayed" in link;
}

export enum EStatus {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
  Activated = "activated",
}

export enum EStatusLabel {
  draft = "Brouillon",
  published = "Publié",
  archived = "Archivé",
  activated = "Actif",
}

const statusMap = new Map<string, EStatus>(
  Object.values(EStatus).map((v) => [v, v]),
);

export function valueToEStatus(value?: string | null): EStatus {
  const mapped = value ? statusMap.get(value) : EStatus.Draft;
  return mapped ?? EStatus.Draft;
}

export const statusLabels = {
  archived: "Archivé",
  draft: "Brouillon",
  published: "Publié",
  activated: "Actif",
};

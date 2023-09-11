/* Styles used with SCSS settings 'pictos' at '_settings.pictos.scss' and Mixin 'pictos' at '_tools.pictos.scss' */
export enum EAllPictoStyles {
  /* ACTION */
  "edit",
  "fileDouble",
  "trash",
  "eye",
  "eyeClosed",
  "yes",
  "no",
  /* NAVIGATION */
  "house",
  "file",
  "dashboard",
  "appWindowSettings",
  "pin",
  "bank",
  /* BLOCKS */
  "expandVertical",
  "picture",
  "text",
  "video",
  "textCase",
  /* BLOCKS Request */
  "attachment",
  "chatBubble",
  "taskList",
  "paragraphJustified",
  "arrowRectangle",
  "calendar",
  "checkboxIcon",
  "questionCircle",
  "listNumbers",
  "user",
  "cumbersome",
  /* PUBLISH */
  "windowUpload",
  "windowCancel",
  /* MEDIA */
  "import",
  "addPhoto",
  "pdf",
  /* PREVIEW */
  "screen",
  "tablet",
  "phone",
  "printer",
  /* OTHER */
  "warning",
  "check",
  "cross",
  "plus",
  "add",
  "arrowUp",
  "arrowDown",
  "arrowLeft",
  "arrowCorner",
  "search",
  "history",
  "polygon",
  "refreshArrows",
}

/* Full list of pictos, correspond to '$picto-names' in '_settings.pictos.scss' */
export type TAllPictoStyles = keyof typeof EAllPictoStyles;

/* Partial list of pictos, corresponds to mixin argument in 'navigation-list-menu.scss' */
export type TNavigationPictoStyles = Extract<
  TAllPictoStyles,
  | "house"
  | "file"
  | "dashboard"
  | "appWindowSettings"
  | "pin"
  | "bank"
  | "trash"
>;

/* Partial list of pictos, corresponds to mixin argument in 'data-table-actions.scss' */
export type TActionPictoStyles = Extract<
  TAllPictoStyles,
  "edit" | "fileDouble" | "trash" | "eye" | "eyeClosed" | "yes" | "no"
>;

/* Partial list of pictos, corresponds to mixin argument in 'dynamic-block-wrapper.scss' */
export type TBlockPictoStyles = Extract<
  TAllPictoStyles,
  | "expandVertical"
  | "picture"
  | "text"
  | "video"
  | "textCase"
  | "pin"
  | "attachment"
  | "chatBubble"
  | "taskList"
  | "paragraphJustified"
  | "arrowRectangle"
  | "calendar"
  | "checkboxIcon"
  | "questionCircle"
  | "listNumbers"
  | "user"
  | "cumbersome"
  | "polygon"
  | "dashboard"
>;

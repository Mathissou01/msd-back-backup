import { format } from "date-fns";

export const removeNulls = <S>(
  value: S | undefined | Record<string, never>,
): value is Exclude<S, null> =>
  value != null && Object.keys(value).length !== 0;

export function FocusFirstElement(node: Element) {
  if (node) {
    const focusableModalElements = node.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select",
    );

    const firstElement = focusableModalElements[0] as HTMLElement;
    firstElement?.focus();
  }
}

export function isTruthyObjectOrArray(value: unknown): boolean {
  return (
    (!!value && !Array.isArray(value)) ||
    (!!value &&
      Array.isArray(value) &&
      value.filter((i) => i !== undefined).length > 0)
  );
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isStringOfNumber(value: unknown): value is `${number}` {
  return typeof value === "string" && !isNaN(Number.parseInt(value));
}

export function comparePropertyValueByPriority(
  key: string,
  priorityList: { [key: string]: number },
  order = "asc",
) {
  // eslint-disable-next-line
  return function (
    a: Record<string, unknown> | null,
    b: Record<string, unknown> | null,
  ) {
    if (
      !a ||
      !Object.prototype.hasOwnProperty.call(a, key) ||
      typeof a[key] !== "string" ||
      !b ||
      !Object.prototype.hasOwnProperty.call(b, key) ||
      typeof b[key] !== "string"
    )
      return 0;

    const first =
      (a[key] as string).toLowerCase() in priorityList
        ? priorityList[a[key] as string]
        : Number.MAX_SAFE_INTEGER;
    const second =
      (b[key] as string).toLowerCase() in priorityList
        ? priorityList[b[key] as string]
        : Number.MAX_SAFE_INTEGER;

    let result = 0;
    if (first < second) result = -1;
    else if (first > second) result = 1;
    return order === "desc" ? ~result : result;
  };
}

export function removeQuotesInString(arg: string) {
  return arg.replace(/['"]/g, "") ?? arg;
}

export function formatDate(
  date: Date | string | number | null,
  dateFormat = "dd/MM/yyyy",
): string {
  if (
    (date instanceof Date && !isNaN(Number(date))) ||
    typeof date === "number"
  ) {
    return format(date, dateFormat);
  }

  return typeof date === "string" ? date : "";
}

export const commonDateStringFormat = "dd/MM/yyyy HH:mm";

export function formatFileSize(size: number, isUpload: boolean): string {
  if (!isUpload) {
    // Strapi sends data as KB
    size *= 1000;
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (size >= 1000 && i < units.length - 1) {
    size /= 1000;
    i++;
  }

  // Vérifie si la partie décimale est égale à zéro
  const isInteger = size % 1 === 0;

  // Utilise toFixed uniquement si la partie décimale n'est pas égale à zéro
  const formattedSize = isInteger ? size.toString() : size.toFixed(2);

  return formattedSize + " " + units[i];
}

export function isTypename<Typename>(
  entity: unknown,
  typename: string,
): entity is Typename {
  return (
    typeof entity === "object" &&
    !!entity &&
    "__typename" in entity &&
    entity.__typename === typename
  );
}

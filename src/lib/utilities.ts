export const removeNulls = <S>(
  value: S | undefined,
): value is Exclude<S, null> => value != null;

export function isAbsoluteOrRelativeUrl(url: string) {
  const regex = new RegExp(
    "^((http|https)\\/\\/(www\\.)?[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,})|((\\/)?\\S\\s?)+$",
  );
  return regex.test(url);
}

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

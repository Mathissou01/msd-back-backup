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

export const removeNulls = <S>(value: S | undefined): value is S =>
  value != null;

export function isAbsoluteOrRelativeUrl(url: string) {
  const regex = new RegExp(
    "^((http|https)\\/\\/(www\\.)?[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,})|((\\/)?\\S\\s?)+$",
  );
  return regex.test(url);
}

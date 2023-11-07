import _ from "lodash";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { removeNulls } from "../../lib/utilities";
import FormLayoutTabBlock, {
  IFormLayoutTab,
} from "./FormLayoutTabBlock/FormLayoutTabBlock";
import "./form-layout.scss";

export interface IFormlayoutOptions<Fields> {
  onSubmitValid: (data: FieldValues) => void;
  defaultValues?: Fields;
  nestedFieldsToFocus?: Array<string>;
}

interface IFormLayoutProps<Fields> {
  buttonContent: ReactNode;
  formContent?: ReactNode;
  tabs?: Array<IFormLayoutTab>;
  defaultTab?: number;
  sidebarContent?: ReactNode;
  formOptions: IFormlayoutOptions<Fields>;
  returnButton?: ReactNode;
}

export default function FormLayout<Fields extends FieldValues>({
  buttonContent,
  formContent,
  tabs,
  defaultTab = 0,
  sidebarContent,
  formOptions,
  returnButton,
}: IFormLayoutProps<Fields>) {
  /* Methods */
  function onError() {
    setCanFocus(true);
  }

  function getHtmlElementsFromErrors(errors: FieldErrors): Array<HTMLElement> {
    const errorsKeys = Object.keys(errors);
    let htmlElements: Array<HTMLElement> = [];
    if (errorsKeys.length > 0) {
      htmlElements = errorsKeys
        .map((name) => {
          const blockError = errors[name];
          if (
            blockError &&
            "message" in blockError &&
            "type" in blockError &&
            "ref" in blockError
          ) {
            return document.getElementById(name);
          } else if (
            formOptions.nestedFieldsToFocus?.includes(name) &&
            errors[name]
          ) {
            const blocksErrors = { ...errors[name] };
            return Object.keys(blocksErrors)
              .map((block) => {
                const blockErrors = _.get(blocksErrors, block);
                if (
                  "message" in blockErrors &&
                  "type" in blockErrors &&
                  "ref" in blockErrors
                ) {
                  return document.getElementById(`${name}.${block}`);
                } else {
                  return Object.keys(blockErrors).map((field) =>
                    document.getElementById(`${name}.${block}.${field}`),
                  );
                }
              })
              .flat();
          }
        })
        .flat()
        .filter(removeNulls);
    }
    return htmlElements;
  }

  function setTabsInErrorFromErrors(
    errors: FieldErrors,
    tabs?: Array<IFormLayoutTab>,
  ): Array<number> {
    const errorsKeys = Object.keys(errors);
    const tabsContainingError: Array<number> = [];
    if (tabs && errorsKeys.length > 0) {
      // Sort errors into corresponding tabs
      errorsKeys.forEach((errorsKey) => {
        tabs.forEach((tab, tabIndex) => {
          if (
            tab.fieldsToFocus.includes(errorsKey) &&
            tabsContainingError.indexOf(tabIndex) === -1
          ) {
            tabsContainingError.push(tabIndex);
          }
        });
      });
      // Set tabsInError if value is different
      if (
        JSON.stringify(tabsContainingError.sort()) !==
        JSON.stringify(tabsInError.sort())
      ) {
        setTabsInError(tabsContainingError);
      }
    } else if (errorsKeys.length === 0 && tabsInError.length > 0) {
      setTabsInError([]);
    }
    return tabsContainingError;
  }

  function keepOnlyElementsFromActiveTab(
    elements: Array<HTMLElement>,
    tabsContainingError: Array<number>,
  ) {
    const newElements = [...elements];
    if (tabsContainingError.length > 0) {
      // If activeTab contains errors, keep only elements inside active tab
      if (tabsContainingError.includes(activeTab)) {
        const activeTabData = tabs?.filter(
          (_, tabIndex) => tabIndex === activeTab,
        )[0];
        const fieldsIndexesToRemove: Array<number> = [];
        elements.forEach((element, elementIndex) => {
          const fieldMustBeRemoved = activeTabData?.fieldsToFocus.every(
            (fieldToFocus) => {
              return !element.id.includes(fieldToFocus);
            },
          );
          if (fieldMustBeRemoved) {
            fieldsIndexesToRemove.push(elementIndex);
          }
        });
        fieldsIndexesToRemove.forEach((fieldsIndexToRemove) => {
          delete newElements[fieldsIndexToRemove];
        });
      } else if (!tabsContainingError.includes(activeTab)) {
        // If not, switch to first tab containing errors
        setActiveTab(tabsContainingError[0]);
      }
    }
    return newElements.filter(removeNulls);
  }

  function scrollAndFocusErrorElement(elements: Array<HTMLElement>) {
    if (elements.length > 0) {
      // Sort elements by highest to lowest in page
      setTimeout(() => {
        elements.sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        );
        // scroll first element in view
        const errorElement = elements[0];
        errorElement.focus({ preventScroll: true });
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }

  /* Local Data */
  const form = useForm<Fields>({
    mode: "onChange",
    // TODO: strange typing error where <Fields> seems unassignable to <DeepPartial<Fields>> ?
    defaultValues: formOptions.defaultValues as DefaultValues<Fields>,
    shouldFocusError: false,
  });
  const [canFocus, setCanFocus] = useState(false);
  const [activeTab, setActiveTab] = useState(
    tabs?.[defaultTab].isEnabled
      ? defaultTab
      : tabs?.some((tab) => tab.isEnabled)
      ? tabs?.findIndex((tab) => tab.isEnabled)
      : 0,
  );
  const [tabsInError, setTabsInError] = useState<Array<number>>([]);
  const { handleSubmit, reset } = form;
  const errors = form.formState.errors;
  const tabsContainingError = setTabsInErrorFromErrors(errors, tabs);
  if (Object.keys(errors).length > 0 && canFocus) {
    let elements = getHtmlElementsFromErrors(errors);
    elements = keepOnlyElementsFromActiveTab(elements, tabsContainingError);
    scrollAndFocusErrorElement(elements);
    setCanFocus(false);
  }

  useEffect(() => {
    reset(formOptions.defaultValues);
  }, [formOptions, reset]);

  return (
    <>
      <FormProvider {...form}>
        <form
          className="c-FormLayout"
          onSubmit={handleSubmit(formOptions.onSubmitValid, onError)}
        >
          <div className="c-FormLayout__ReturnButton">{returnButton}</div>
          <div className="c-FormLayout__Buttons">{buttonContent}</div>
          <div className="c-FormLayout__Form">
            {tabs && defaultTab !== undefined && (
              <>
                <FormLayoutTabBlock
                  tabs={tabs}
                  activeTab={activeTab}
                  sidebarContent={sidebarContent}
                  tabsInError={tabsInError}
                  onTabChange={(i) => setActiveTab(i)}
                />
              </>
            )}
            {!tabs && (
              <>
                <div className="c-FormLayout__Content">{formContent}</div>
                <div className="c-FormLayout__SideBar">{sidebarContent}</div>
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}

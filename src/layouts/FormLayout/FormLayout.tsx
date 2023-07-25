import _ from "lodash";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { removeNulls } from "../../lib/utilities";
import { useLeavePageConfirm } from "../../hooks/useLeavePageConfirm";
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
  tabs?: IFormLayoutTab[];
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

  /* Local Data */
  const form = useForm<Fields>({
    mode: "onChange",
    // TODO: strange typing error where <Fields> seems unassignable to <DeepPartial<Fields>> ?
    defaultValues: formOptions.defaultValues as DefaultValues<Fields>,
    shouldFocusError: false,
  });
  useLeavePageConfirm(form.formState.isDirty);
  const [canFocus, setCanFocus] = useState(false);
  const [tabsInError, setTabsInError] = useState<Array<number>>([]);
  const [activeTab, setActiveTab] = useState<number>(defaultTab);
  const { handleSubmit, reset } = form;
  const sidebar = <div className="c-FormLayout__SideBar">{sidebarContent}</div>;

  if (formOptions.nestedFieldsToFocus && form.formState.errors && canFocus) {
    const errors = form.formState.errors;
    const errorsKeys = Object.keys(errors);
    let elements: Array<HTMLElement> = [];
    // Get all HTMLElement corresponding to each form errors
    if (errorsKeys.length > 0) {
      elements = errorsKeys
        .map((name) => {
          if (formOptions.nestedFieldsToFocus?.includes(name) && errors[name]) {
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
    // Sort errors into corresponding tabs, set tabsInError
    const tabsContainingError: Array<number> = [];
    if (tabs) {
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
      if (
        JSON.stringify(tabsContainingError.sort()) !==
        JSON.stringify(tabsInError.sort())
      ) {
        setTabsInError(tabsContainingError);
      }
    }
    // If tabs, keep only elements inside active tab
    if (tabs && tabsContainingError.includes(activeTab)) {
      const newElements = [...elements];
      const activeTabData = tabs.filter(
        (_, tabIndex) => tabIndex === activeTab,
      )[0];
      const fieldsIndexesToRemove: Array<number> = [];
      elements.forEach((element, elementIndex) => {
        const fieldMustBeRemoved = activeTabData.fieldsToFocus.every(
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
      elements = newElements;
    }
    // Sort elements by highest to lowest in page, scroll first element in view
    if (elements.length > 0) {
      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
      );
      const errorElement = elements[0];
      setTimeout(() => {
        errorElement.focus({ preventScroll: true });
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      setCanFocus(false);
    }
  } else if (
    Object.keys(form.formState.errors).length === 0 &&
    tabsInError.length > 0
  ) {
    setTabsInError([]);
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
            {/* TODO: maybe rework tabs implementation */}
            {tabs && defaultTab !== undefined && (
              <>
                <FormLayoutTabBlock
                  tabs={tabs}
                  initialTabName={tabs[defaultTab].name}
                  formSidebar={sidebar}
                  tabsInError={tabsInError}
                  onTabChange={(tabIndex: number) => setActiveTab(tabIndex)}
                />
              </>
            )}
            {!tabs && (
              <>
                <div className="c-FormLayout__Content">{formContent}</div>
                {sidebar}
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}

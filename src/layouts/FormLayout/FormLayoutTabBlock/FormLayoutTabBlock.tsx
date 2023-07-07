import React, { ReactElement, useEffect, useState } from "react";
import classNames from "classnames";
import FormLayoutTabHeader, {
  IFormLayoutTabHeader,
} from "./FormLayoutTabHeader/FormLayoutTabHeader";
import "./form-layout-tab-block.scss";

export interface IFormLayoutTab extends IFormLayoutTabHeader {
  content: ReactElement;
  fieldsToFocus: Array<string>;
}

interface ITabBlockProps {
  tabs: Array<IFormLayoutTab>;
  initialTabName: string;
  isAlignLeftMediaLibrary?: boolean;
  formSidebar: JSX.Element;
  tabsInError: Array<number>;
  onTabChange?: (tabIndex: number) => void;
}

export default function FormLayoutTabBlock({
  tabs,
  initialTabName,
  isAlignLeftMediaLibrary = false,
  formSidebar,
  tabsInError,
  onTabChange,
}: ITabBlockProps) {
  function clickTab(tabIndex: number) {
    setActiveTab(tabIndex);
    if (onTabChange) {
      onTabChange(tabIndex);
    }
  }

  const [initialTabIndex, setInitialTabIndex] = useState(
    tabs.findIndex((tab) => tab.isEnabled && tab.name === initialTabName),
  );
  const [activeTab, setActiveTab] = useState<number>(
    initialTabIndex >= 0 ? initialTabIndex : 0,
  );

  useEffect(() => {
    setInitialTabIndex(
      tabs.findIndex((tab) => tab.isEnabled && tab.name === initialTabName),
    );
    setActiveTab(initialTabIndex >= 0 ? initialTabIndex : 0);
  }, [initialTabIndex, initialTabName, tabs]);

  useEffect(() => {
    if (tabsInError.length > 0 && !tabsInError.includes(activeTab)) {
      setActiveTab(tabsInError[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabsInError]);

  return (
    <div className="c-FormLayoutTabBlock">
      <FormLayoutTabHeader
        tabs={tabs}
        selectedTab={activeTab}
        onClick={clickTab}
        isAlignStart={isAlignLeftMediaLibrary}
        tabsInError={tabsInError}
      />
      <div className="c-FormLayoutTabBlock__Content">
        <div className="c-FormLayoutTabBlock__Content_withSidebar">
          {tabs.map((tab, tabIndex) => {
            return (
              <div
                key={tabIndex}
                className={classNames("c-FormLayout__Content", {
                  [`c-FormLayout__Content_invisible`]: activeTab !== tabIndex,
                })}
              >
                {tab.content}
              </div>
            );
          })}
          {formSidebar}
        </div>
      </div>
    </div>
  );
}

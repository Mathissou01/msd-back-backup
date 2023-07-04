import React, { ReactElement, useEffect, useState } from "react";
import TabHeader, { ITabHeader } from "./TabHeader/TabHeader";
import "./tab-block.scss";

export interface ITab extends ITabHeader {
  content: ReactElement;
}

interface ITabBlockProps {
  tabs: Array<ITab>;
  initialTabName: string;
  isAlignLeftMediaLibrary?: boolean;
  formSidebar?: JSX.Element;
}

export default function TabBlock({
  tabs,
  initialTabName,
  isAlignLeftMediaLibrary = false,
  formSidebar,
}: ITabBlockProps) {
  function clickTab(tabIndex: number) {
    setActiveTab(tabIndex);
  }

  const CurrentTabComponent = () => {
    return tabs[activeTab]?.content;
  };

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

  return (
    <div className="c-TabBlock">
      <TabHeader
        tabs={tabs}
        selectedTab={activeTab}
        onClick={clickTab}
        isAlignStart={isAlignLeftMediaLibrary}
      />
      <div className="c-TabBlock__Content">
        {formSidebar && (
          <div className="c-TabBlock__Content_withSidebar">
            {tabs.map((tab, tabIndex) => {
              return (
                <div
                  key={tabIndex}
                  className={`c-FormLayout__Content ${
                    activeTab === tabIndex
                      ? ""
                      : "c-FormLayout__Content_invisible"
                  }`}
                >
                  {tab.content}
                </div>
              );
            })}
            {formSidebar}
          </div>
        )}
        {!formSidebar && <CurrentTabComponent />}
      </div>
    </div>
  );
}

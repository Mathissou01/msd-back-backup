import React, { ReactElement, useEffect, useState } from "react";
import TabHeader from "./TabHeader/TabHeader";
import "./tab-block.scss";

export interface Tab {
  name: string;
  title: string;
  content: ReactElement;
  isEnabled: boolean;
}

interface ITabBlockProps {
  tabs: Array<Tab>;
  initialTabName: string;
}

export default function TabBlock({ tabs, initialTabName }: ITabBlockProps) {
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
      <TabHeader tabs={tabs} selectedTab={activeTab} onClick={clickTab} />
      <div className="c-TabBlock__Content">
        <CurrentTabComponent />
      </div>
    </div>
  );
}

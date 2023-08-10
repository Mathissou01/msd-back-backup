import React, { ReactElement, ReactNode } from "react";
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
  activeTab: number;
  isAlignLeftMediaLibrary?: boolean;
  sidebarContent: ReactNode;
  tabsInError: Array<number>;
  onTabChange: (tabIndex: number) => void;
}

export default function FormLayoutTabBlock({
  tabs,
  activeTab,
  isAlignLeftMediaLibrary = false,
  sidebarContent,
  tabsInError,
  onTabChange,
}: ITabBlockProps) {
  return (
    <div className="c-FormLayoutTabBlock">
      <FormLayoutTabHeader
        tabs={tabs}
        selectedTab={activeTab}
        onClick={(i) => onTabChange?.(i)}
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
          <div className="c-FormLayout__SideBar">{sidebarContent}</div>
        </div>
      </div>
    </div>
  );
}

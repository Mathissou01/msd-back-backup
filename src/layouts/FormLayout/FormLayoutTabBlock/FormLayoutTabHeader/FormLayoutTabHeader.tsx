import classNames from "classnames";
import "./form-layout-tab-header.scss";

export interface IFormLayoutTabHeader {
  name: string;
  title: string;
  isEnabled: boolean;
}

interface IFormLayoutTabHeaderProps {
  tabs: Array<IFormLayoutTabHeader>;
  selectedTab: number;
  isAlignStart?: boolean;
  onClick: (tabIndex: number) => void;
  tabsInError: Array<number>;
}

export default function FormLayoutTabHeader({
  tabs,
  selectedTab,
  isAlignStart,
  onClick,
  tabsInError,
}: IFormLayoutTabHeaderProps) {
  const tabHeaderClassNames = classNames("c-FormLayoutTabHeader", {
    "c-FormLayoutTabHeader_alignLeft": isAlignStart,
  });
  return (
    <nav className={tabHeaderClassNames} role="tablist">
      {tabs.map(
        (tab, index) =>
          tab.isEnabled && (
            <button
              role="tab"
              key={tab.name}
              id={`tab-${tab.name}`}
              className={classNames("c-FormLayoutTabHeader__Tab", {
                "c-FormLayoutTabHeader__Tab_active": index === selectedTab,
              })}
              aria-selected={index === selectedTab}
              aria-controls={`panel-${tab.name}`}
              tabIndex={index === selectedTab ? 0 : -1}
              onClick={() => onClick(index)}
              type="button"
            >
              <span
                className={classNames("c-FormLayoutTabHeader__Tab_tabText", {
                  "c-FormLayoutTabHeader__Tab_tabText_error":
                    tabsInError.find((tabInError) => tabInError === index) !==
                    undefined,
                })}
              >
                {tab.title}
              </span>
            </button>
          ),
      )}
    </nav>
  );
}

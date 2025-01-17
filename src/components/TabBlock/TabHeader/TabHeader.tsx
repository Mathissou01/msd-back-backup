import classNames from "classnames";
import "./tab-header.scss";

export interface ITabHeader {
  name: string;
  title: string;
  isEnabled: boolean;
}

interface ITabHeaderProps {
  tabs: Array<ITabHeader>;
  selectedTab: number;
  isAlignStart?: boolean;
  onClick: (tabIndex: number) => void;
}

export default function TabHeader({
  tabs,
  selectedTab,
  isAlignStart,
  onClick,
}: ITabHeaderProps) {
  const tabHeaderClassNames = classNames("c-TabHeader", {
    "c-TabHeader_alignLeft": isAlignStart,
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
              className={`c-TabHeader__Tab ${
                index === selectedTab ? "c-TabHeader__Tab_active" : ""
              }`}
              aria-selected={index === selectedTab}
              aria-controls={`panel-${tab.name}`}
              tabIndex={index === selectedTab ? 0 : -1}
              onClick={() => onClick(index)}
              type="button"
            >
              <span>{tab.title}</span>
            </button>
          ),
      )}
    </nav>
  );
}

import "./tab-header.scss";
import { Tab } from "../TabBlock";

interface ITabHeaderProps {
  tabs: Array<Tab>;
  selectedTab: number;
  onClick: (tabIndex: number) => void;
}

export default function TabHeader({
  tabs,
  selectedTab,
  onClick,
}: ITabHeaderProps) {
  return (
    <div className="c-TabHeader">
      {tabs.map(
        (tab, index) =>
          tab.isEnabled && (
            <button
              key={index}
              className={`c-TabHeader__Tab ${
                index === selectedTab ? "c-TabHeader__Tab_active" : ""
              }`}
              onClick={() => onClick(index)}
            >
              <span>{tab.title}</span>
            </button>
          ),
      )}
    </div>
  );
}

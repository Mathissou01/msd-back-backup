import classNames from "classnames";
import React, { useState } from "react";
import "./data-table-filters.scss";

export interface IDataTableFilter<T> {
  label: string;
  selector?: (row: T) => boolean;
  lazyLoadSelector?: Record<string, unknown> | null;
  count?: number | null;
  defaultActive?: boolean;
}

interface ICommonDataFiltersProps<T> {
  tabs: Array<IDataTableFilter<T>>;
  onFilter: (filter: IDataTableFilter<T>) => void;
}

export default function DataTableFilters<T>({
  tabs,
  onFilter,
}: ICommonDataFiltersProps<T>) {
  /* Methods */
  function handleClick(i: number, tab: IDataTableFilter<T>) {
    setActiveTab(i);
    onFilter(tab);
  }

  /* Local Data */
  const defaultActiveTab = tabs.findIndex((tab) => !!tab.defaultActive);
  const [activeTab, setActiveTab] = useState<number>(
    defaultActiveTab !== -1 ? defaultActiveTab : 0,
  );

  return (
    <div className="c-DataTableFilters">
      {tabs.map((tab, index) => {
        return (
          <button
            className={classNames("c-DataTableFilters__Filter", {
              "c-DataTableFilters__Filter_active": index === activeTab,
            })}
            key={index}
            onClick={() => handleClick(index, tab)}
          >
            {`${tab.label} (${tab.count ?? "-"})`}
          </button>
        );
      })}
    </div>
  );
}

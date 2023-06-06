import classNames from "classnames";
import React, { useState } from "react";
import "./common-button-group.scss";

export interface ICommonButtonGroupSingle {
  label: string;
  value?: string;
  defaultActive?: boolean;
}

interface ICommonButtonGroupProps {
  buttons: Array<ICommonButtonGroupSingle>;
  onChange: (button: ICommonButtonGroupSingle) => void;
}

export default function CommonButtonGroup({
  buttons,
  onChange,
}: ICommonButtonGroupProps) {
  /* Methods */
  function handleClick(i: number, button: ICommonButtonGroupSingle) {
    setActiveTab(i);
    onChange(button);
  }

  /* Local Data */
  const defaultActiveTab = buttons.findIndex(
    (button) => !!button.defaultActive,
  );
  const [activeTab, setActiveTab] = useState<number>(
    defaultActiveTab !== -1 ? defaultActiveTab : 0,
  );

  return (
    <div className="c-CommonButtonGroup">
      {buttons.map((button, index) => {
        return (
          <button
            className={classNames("c-CommonButtonGroup__Filter", {
              "c-CommonButtonGroup__Filter_active": index === activeTab,
            })}
            key={index}
            onClick={() => handleClick(index, button)}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}

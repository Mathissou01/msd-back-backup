import React from "react";
// TODO
//import CommonToggle from "../../Common/CommonToggle/CommonToggle";
import "./flow-card.scss";

interface IFlowCardProps {
  name?: string;
}

export function FlowCard({ name }: IFlowCardProps) {
  // TODO
  // const [isActivated, setIsActivated] = useState(name === "Ordure Ménagère");

  // const onChangeHandler = (checked: boolean) => {
  //   setIsActivated(checked);
  // };
  // console.log(isActivated);

  return (
    <div className="c-FlowCard">
      <div className="c-FlowCard__Name">{name}</div>
      <div className="c-FlowCard__Modifications">
        {/* TODO : add <div className="c-FlowCard__Edit"> Edit</div> */}
        {/* TODO : add <div className="c-FlowCard__ToogleActivation">
          <CommonToggle
            onChange={onChangeHandler}
            checked={isActivated}
            disabled={name === "Ordure Ménagère" ? true : false}
          />
        </div> */}
      </div>
    </div>
  );
}

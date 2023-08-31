import classNames from "classnames";
import FormLabel from "../../../Form/FormLabel/FormLabel";
import { ISelectFlowData } from "../MCDFlow";

interface ICommonSelectProps {
  datas: Array<ISelectFlowData>;
  setSelectedItems: (items: Array<string>) => void;
  selectedItems: Array<string>;
  label: string;
  setSelectedFlow: React.Dispatch<React.SetStateAction<string | null>>;
  onFlowChange: () => void;
}

export default function CommonSelectFlow({
  datas,
  setSelectedItems,
  selectedItems,
  label,
  setSelectedFlow,
  onFlowChange,
}: ICommonSelectProps) {
  return (
    <div className="c-FormSelect">
      <FormLabel label={label} />
      <div className="o-SelectWrapper">
        <select
          className={classNames("o-SelectWrapper__Select", {
            "o-SelectWrapper__Select_placeholder": selectedItems.length < 0,
          })}
          name="flowSelect"
          id="flowSelect"
          value=""
          onChange={(e) => {
            setSelectedItems([...selectedItems, e.target.value]);
            setSelectedFlow(e.target.value);
            onFlowChange();
          }}
        >
          <option defaultValue={"Ajouter un nouveau flux"} value={""} disabled>
            Ajouter un nouveau flux
          </option>
          {datas?.map(
            (flowData) =>
              (flowData.id !== selectedItems.toString() && (
                <option
                  key={flowData.id}
                  value={`${flowData.id};${flowData.name}`}
                >
                  {flowData.name}
                </option>
              )) ??
              [],
          )}
        </select>
      </div>
    </div>
  );
}

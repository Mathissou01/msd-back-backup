import { DropOffMapEntity } from "../../../graphql/codegen/generated-types";
import classNames from "classnames";
import "./yeswescan-dropoff-card.scss";
interface IYesWeScanDropOffCardProps {
  onChoseDropOffMap: (dropOffMap: DropOffMapEntity) => void;
  dropOffMap: DropOffMapEntity;
  chosenDropOff: string;
}
export default function YesWeScanDropOffCard({
  onChoseDropOffMap,
  dropOffMap,
  chosenDropOff,
}: IYesWeScanDropOffCardProps) {
  const dropOffMapAddress = JSON.parse(
    dropOffMap.attributes?.BANFeatureProperties,
  );
  return (
    <button
      type="button"
      className={classNames(
        "c-YesWeScanDropOffCard",
        chosenDropOff === dropOffMap.id
          ? "c-YesWeScanDropOffCard_selected"
          : "",
      )}
      onClick={() => onChoseDropOffMap(dropOffMap)}
    >
      <strong>{dropOffMap.attributes?.name}</strong>
      <p>{dropOffMapAddress.name}</p>
      <p>{`${dropOffMapAddress.postcode} ${dropOffMapAddress.city}`}</p>
    </button>
  );
}

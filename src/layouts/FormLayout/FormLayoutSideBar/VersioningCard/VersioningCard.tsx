import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import { useRouter } from "next/router";
import { useNavigation } from "../../../../hooks/useNavigation";
import {
  navigationPathMap,
  TNavigationEntities,
} from "../../../../lib/navigation";
import "./versioning-card.scss";

interface IVersioningCardProps {
  customId: string;
  typename: TNavigationEntities;
  additionalPath?: string;
}

export default function VersioningCard({
  customId,
  typename,
  additionalPath,
}: IVersioningCardProps) {
  /* Static Data */
  const label = "Gérer les versions";

  /* Local Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();

  return (
    <div className="c-VersioningCard">
      <CommonButton
        type="button"
        style="primary"
        picto="history"
        label={label}
        onClick={() =>
          router.push(
            `${currentRoot}${navigationPathMap[typename].path}${
              additionalPath ? additionalPath : ""
            }/version/${customId}`,
          )
        }
      />
    </div>
  );
}

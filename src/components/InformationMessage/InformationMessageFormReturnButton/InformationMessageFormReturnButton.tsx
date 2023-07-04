import { useRouter } from "next/router";
import { useNavigation } from "../../../hooks/useNavigation";
import "./information-message-form-return-button.scss";

export interface IInformationMessageFormReturnButtonLabels {
  return: string;
}

export default function InformationMessageFormReturnButton() {
  /* Static Data */
  const returnButtonLabel = "Retour";

  /* Local Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();

  return (
    <div className="c-InformationMessageFormReturnButton">
      <button
        className="c-InformationMessageFormReturnButton__ReturnButton"
        type="button"
        onClick={() =>
          router.push({
            pathname: `${currentRoot}/services/jour-collecte`,
            query: { tab: "informationMessage" },
          })
        }
      >
        <span>{returnButtonLabel}</span>
      </button>
    </div>
  );
}

import Image from "next/image";
import { useRouter } from "next/router";
import { useNavigation } from "../../../hooks/useNavigation";
import "./information-message-form-return-button.scss";

export interface IInformationMessageFormReturnButtonLabels {
  return: string;
}

export default function InformationMessageFormReturnButton() {
  /* Static Data */
  const returnButtonLabels = "Retour";

  /* Local Data */
  const router = useRouter();

  /* External Data */
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
        <Image
          className="c-InformationMessageFormReturnButton__ArrowImage"
          src={"/images/pictos/arrow-down.svg"}
          alt={""}
          width={16}
          height={16}
        />
        <label>{returnButtonLabels}</label>
      </button>
    </div>
  );
}

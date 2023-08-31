import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { useNavigation } from "../../../hooks/useNavigation";
import "./information-message-form-return-button.scss";

interface IInformationMessageFormReturnButtonProps {
  path: string;
  query?: ParsedUrlQueryInput;
}

export default function InformationMessageFormReturnButton({
  path,
  query,
}: IInformationMessageFormReturnButtonProps) {
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
            pathname: `${currentRoot}${path}`,
            query,
          })
        }
      >
        <span>{returnButtonLabel}</span>
      </button>
    </div>
  );
}

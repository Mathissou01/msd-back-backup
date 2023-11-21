import React from "react";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import "./common-return-button.scss";
import { useNavigation } from "../../../hooks/useNavigation";

interface ICommonReturnButtonProps {
  path?: string;
  query?: ParsedUrlQueryInput;
}

export default function CommonReturnButton({
  path,
  query,
}: ICommonReturnButtonProps) {
  /* Static Data */
  const label = "Retour";

  /* Local Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();

  return (
    <button
      className="c-CommonReturnButton__BackButton"
      type="button"
      onClick={() =>
        query !== undefined && path !== undefined
          ? router.push({ pathname: `${currentRoot}${path}`, query })
          : router.back()
      }
    >
      <span>{label}</span>
    </button>
  );
}

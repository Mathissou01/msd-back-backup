import React, { useState } from "react";
import CommonToggle from "../Common/CommonToggle/CommonToggle";
import { IAudience } from "../../pages/[contractId]/secteurs-usagers/usagers/index.page";
import {
  GetAudiencesDocument,
  useUpdateAudienceByIdMutation,
} from "../../graphql/codegen/generated-types";
import "./users-card.scss";
interface IAudiencesBlockProps {
  audience: IAudience;
}
export default function UsersBlock({ audience }: IAudiencesBlockProps) {
  /* Toggle properties */
  const onChangeHandler = (isToggleActiveUpdated: boolean) => {
    if (isToggleActiveUpdated) {
      setIsToggleActive(true);
    } else {
      setIsToggleActive(false);
    }

    const variables = {
      updateAudienceId: audience.id,
      data: {
        isActive: isToggleActiveUpdated,
      },
    };
    return updateAudience({
      variables,
      refetchQueries: [
        {
          query: GetAudiencesDocument,
          variables: { id: audience.id },
        },
      ],
    });
  };
  /* Local Data */
  const [isToggleActive, setIsToggleActive] = useState<boolean>();
  const [updateAudience] = useUpdateAudienceByIdMutation({
    refetchQueries: ["getAudiences", "getCollectionMethods"],
  });
  return (
    <div className="c-UsersBlock">
      <div className="c-UsersBlock__Head">
        <h4>{audience.type}</h4>
        <CommonToggle
          onChange={(isToggleActiveUpdated) =>
            onChangeHandler(isToggleActiveUpdated)
          }
          checked={isToggleActive ? isToggleActive : audience.isActive}
          disabled={audience.type === ""}
        />
      </div>
      {/*  FUTURE FEATURE : Modification de sous-profil */}
      {/*<div className="c-UsersBlock__Content">*/}
      {/*  <span>Individuel</span>*/}
      {/*  <div className="c-UsersBlock__PictoContainer">*/}
      {/*    <button className="c-UsersBlock__EditPicto"></button>*/}
      {/*    <button className="c-UsersBlock__RemovePicto"></button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="c-UsersBlock__Content">*/}
      {/*  <span>Individuel</span>*/}
      {/*  <div className="c-UsersBlock__PictoContainer">*/}
      {/*    <button className="c-UsersBlock__EditPicto"></button>*/}
      {/*    <button className="c-UsersBlock__RemovePicto"></button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*  FUTURE FEATURE : Ajouter un sous-profil */}
      {/*<button className="c-UsersBlock__AddContainer">*/}
      {/*  <button className="c-UsersBlock__AddPicto"></button>*/}
      {/*  <span>Ajouter un sous-profil</span>*/}
      {/*</button>*/}
    </div>
  );
}

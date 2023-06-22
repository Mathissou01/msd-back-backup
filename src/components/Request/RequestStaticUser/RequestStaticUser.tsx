import classNames from "classnames";
import { useEffect, useState } from "react";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import "./request-static-user.scss";

export interface IRequestStaticUserLabels {
  staticUserContainerActivationLabel: string;
  staticUserLabel: string;
  staticUserCivilitySelectLabel: string;
  staticUserCivilitySelectTrueOption: string;
  staticUserCivilitySelectFalseOption: string;
  staticUserNameFieldStateSelectLabel: string;
  staticUserEmailFieldStateSelectLabel: string;
  staticUserPhoneFieldStateSelectLabel: string;
  staticMandatoryFieldStateSelectLabelTrueOption: string;
  staticMandatoryFieldStateSelectLabelFalseOption: string;
  staticUserSMSCheckboxStateLabel: string;
}

export type TRequestStaticUser =
  | "hasUser"
  | "displayUserCivility"
  | "isUserNameMandatory"
  | "isUserEmailMandatory"
  | "isUserPhoneMandatory"
  | "userAllowSMSNotification";

interface IRequestStaticUserProps {
  labels: IRequestStaticUserLabels;
  enabledFieldsOverride?: Array<TRequestStaticUser>;
  hasUser: boolean;
}

type TUserFieldsOption = "true" | "false";

export default function RequestStaticFieldsUser({
  labels,
  enabledFieldsOverride,
  hasUser,
}: IRequestStaticUserProps) {
  /* Methods */
  function hasFieldEnabled(fieldName: TRequestStaticUser) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  function requestDisplayCivilitySelectDisplayTransformFunction(
    displayUserCivility: string,
  ): string {
    return displayUserCivility
      ? labels.staticUserCivilitySelectTrueOption
      : labels.staticUserCivilitySelectFalseOption;
  }

  function requestMandatoryFieldsSelectDisplayTransformFunction(
    mandatoryFieldValue: string,
  ): string {
    return mandatoryFieldValue
      ? labels.staticMandatoryFieldStateSelectLabelTrueOption
      : labels.staticMandatoryFieldStateSelectLabelFalseOption;
  }

  const displayUserCivilityOptions: Array<IOptionWrapper<TUserFieldsOption>> = [
    { option: "true", label: labels.staticUserCivilitySelectTrueOption },
    { option: "false", label: labels.staticUserCivilitySelectFalseOption },
  ];
  const mandatoryFieldOptions: Array<IOptionWrapper<TUserFieldsOption>> = [
    {
      option: "true",
      label: labels.staticMandatoryFieldStateSelectLabelTrueOption,
    },
    {
      option: "false",
      label: labels.staticMandatoryFieldStateSelectLabelFalseOption,
    },
  ];
  const [localHasUser, setLocalHasUser] = useState<boolean>(false);

  useEffect(() => {
    setLocalHasUser(hasUser);
  }, [hasUser]);
  return (
    <>
      <div className="c-RequestStaticUser">
        {hasFieldEnabled("hasUser") && (
          <div className="c-RequestStaticUser__HasUser">
            <FormCheckbox
              name={"hasUser"}
              label={labels.staticUserContainerActivationLabel}
              defaultChecked={false}
              onClick={() => setLocalHasUser(!localHasUser)}
            />

            {localHasUser && (
              <div className="c-RequestStaticUser__UserContainer">
                <div className="c-RequestStaticUser__Header">
                  <div
                    className={classNames("c-RequestStaticUser__Picto", {
                      [`c-RequestStaticUser__Picto_user`]: "user",
                    })}
                  />
                  <div className="c-RequestStaticUser__Title">
                    {labels.staticUserLabel}
                  </div>
                </div>
                <div className="c-RequestStaticUser__Fields">
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__DisplayUserCivility">
                    <FormSelect<string>
                      label={labels.staticUserCivilitySelectLabel}
                      name="displayUserCivility"
                      displayTransform={
                        requestDisplayCivilitySelectDisplayTransformFunction
                      }
                      options={displayUserCivilityOptions}
                      isRequired
                    />
                  </div>
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__IsUserNameMandatory">
                    <FormSelect<string>
                      label={labels.staticUserNameFieldStateSelectLabel}
                      name="isUserNameMandatory"
                      displayTransform={
                        requestMandatoryFieldsSelectDisplayTransformFunction
                      }
                      options={mandatoryFieldOptions}
                      isRequired
                    />
                  </div>
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__IsUserEmailMandatory">
                    <FormSelect<string>
                      label={labels.staticUserEmailFieldStateSelectLabel}
                      name="isUserEmailMandatory"
                      displayTransform={
                        requestMandatoryFieldsSelectDisplayTransformFunction
                      }
                      options={mandatoryFieldOptions}
                      isRequired
                    />
                  </div>
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__IsUserPhoneMandatory">
                    <FormSelect<string>
                      label={labels.staticUserPhoneFieldStateSelectLabel}
                      name="isUserPhoneMandatory"
                      displayTransform={
                        requestMandatoryFieldsSelectDisplayTransformFunction
                      }
                      options={mandatoryFieldOptions}
                      isRequired
                    />
                  </div>
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__UserAllowSMSNotification">
                    <FormCheckbox
                      name={"userAllowSMSNotification"}
                      label={labels.staticUserSMSCheckboxStateLabel}
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

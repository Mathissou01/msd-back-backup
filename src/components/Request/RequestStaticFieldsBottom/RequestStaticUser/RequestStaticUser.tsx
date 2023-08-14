import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IOptionWrapper } from "../../../Form/FormMultiselect/FormMultiselect";
import FormCheckbox from "../../../Form/FormCheckbox/FormCheckbox";
import FormSelect from "../../../Form/FormSelect/FormSelect";
import "./request-static-user.scss";

export interface IRequestStaticUserLabels {
  staticUserContainerActivationLabel: string;
  staticUserLabel: string;
  staticUserLastBlockLabel: string;
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

interface IRequestStaticUserProps {
  labels: IRequestStaticUserLabels;
  hasUser: boolean;
}

type TUserFieldsOption = "true" | "false";

export default function RequestStaticUser({
  labels,
  hasUser,
}: IRequestStaticUserProps) {
  /* Methods */
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

  /* Local Data */
  const [localHasUser, setLocalHasUser] = useState<boolean>(false);
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
  const { watch } = useFormContext();
  const requestTypes = watch("requestType", { nest: true });

  useEffect(() => {
    setLocalHasUser(hasUser);
  }, [hasUser]);

  return (
    <>
      <div className="c-RequestStaticUser__HasUser">
        <FormCheckbox
          name={"hasUser"}
          label={labels.staticUserContainerActivationLabel}
          onClick={() => setLocalHasUser(!localHasUser)}
        />
        {localHasUser && (
          <div className="c-RequestStaticUser__UserContainer">
            <div className="c-RequestStaticUser__Header">
              <div className="c-RequestStaticUser__Picto" />
              <div className="c-RequestStaticUser__Title">
                {labels.staticUserLabel}
              </div>
              <div className="c-RequestStaticUser__LastBlock">
                {labels.staticUserLastBlockLabel}
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
              {requestTypes &&
                Array.isArray(requestTypes) &&
                requestTypes
                  .map((requestType) => requestType.isTSMS)
                  .some((isTSMS) => !!isTSMS) && (
                  <div className="c-RequestStaticUser__Field c-RequestStaticUser__UserAllowSMSNotification">
                    <FormCheckbox
                      name={"userAllowSMSNotification"}
                      label={labels.staticUserSMSCheckboxStateLabel}
                      defaultChecked={false}
                    />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

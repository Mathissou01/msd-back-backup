import React from "react";
import { useFormContext } from "react-hook-form";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormInput from "../../Form/FormInput/FormInput";
import "./request-address-fields.scss";

export interface IRequestAddressFields {
  staticAddressContainerActivationLabel: string;
  staticAddressContainerLabel: string;
  staticAddressFirstBlockLabel: string;
  staticAddressInputLabel: string;
}

interface RequestAddressProps {
  labels: IRequestAddressFields;
}

export default function RequestAddressFields({ labels }: RequestAddressProps) {
  /* Local Data */
  const { resetField, getValues } = useFormContext();
  const { watch } = useFormContext();
  const watchHasAddress = watch("hasAddress");

  return (
    <div className="c-RequestAddressFields">
      <FormCheckbox
        label={labels.staticAddressContainerActivationLabel}
        name="hasAddress"
        onClick={() => resetField("fieldAddressLabel", { defaultValue: "" })}
      />
      {watchHasAddress && (
        <div className="c-RequestAddressFields__AddressContainer">
          <div className="c-RequestAddressFields__Header">
            <div className="c-RequestAddressFields__Picto" />
            <div className="c-RequestAddressFields__Title">
              {labels.staticAddressContainerLabel}
            </div>
            <div className="c-RequestAddressFields__FirstBlock">
              {labels.staticAddressFirstBlockLabel}
            </div>
          </div>
          <div className="c-RequestAddressFields__Fields">
            <FormInput
              name="fieldAddressLabel"
              defaultValue={getValues("fieldAddressLabel")}
              isRequired={true}
              label={labels.staticAddressInputLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

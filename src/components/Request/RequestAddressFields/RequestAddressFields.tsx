import React from "react";
import { useFormContext } from "react-hook-form";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormInput from "../../Form/FormInput/FormInput";
import "./request-address-fields.scss";

export interface IRequestAddressFields {
  addressCheckboxLabel: string;
  addressLabel: string;
  secondaryAddressLabel: string;
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
        label={labels.addressCheckboxLabel}
        name="hasAddress"
        onClick={() => resetField("fieldAddressLabel", { defaultValue: "" })}
      />
      {watchHasAddress && (
        <FormInput
          name="fieldAddressLabel"
          defaultValue={getValues("fieldAddressLabel")}
          isRequired={true}
          label={labels.addressLabel}
          validationLabel={labels.secondaryAddressLabel}
        />
      )}
    </div>
  );
}

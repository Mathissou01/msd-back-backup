import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import "./form-switch.scss";

interface IFormSwitchProps {
  name: string;
  isDisabled?: boolean;
}

export default function FormSwitch({ name, isDisabled }: IFormSwitchProps) {
  /* Local Data */
  const { register } = useFormContext();

  return (
    <>
      <input
        className="c-FormSwitch__Input"
        type="checkbox"
        id={name}
        {...register(name)}
        data-testid="form-switch"
        disabled={isDisabled}
      />
      <label
        htmlFor={name}
        className={classNames("c-FormSwitch__Label", {
          ["c-FormSwitch__Label_isDisabled"]: isDisabled,
        })}
      >
        {name}
      </label>
    </>
  );
}

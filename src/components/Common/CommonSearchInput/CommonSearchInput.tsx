import CommonButton from "../CommonButton/CommonButton";
import CommonInput from "../CommonInput/CommonInput";
import "./common-search-input.scss";

interface ICommonSearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  onClick: () => void;
}

export default function CommonSearchInput({
  value,
  handleChange,
  onClick,
}: ICommonSearchInputProps) {
  return (
    <div className="c-CommonSearchInput">
      <CommonInput type="text" value={value} onChange={handleChange} />
      <CommonButton
        picto="search"
        onClick={onClick}
        paddingStyle="paddingSmall"
      />
    </div>
  );
}

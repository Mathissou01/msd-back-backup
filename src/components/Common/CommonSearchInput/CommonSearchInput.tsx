import CommonButton from "../CommonButton/CommonButton";
import CommonInput from "../CommonInput/CommonInput";
import "./common-search-input.scss";

interface ICommonSearchInputProps {
  value: string;
  handleChange: (value: string) => void;
  onClick: () => void;
  placeholder?: string;
}

export default function CommonSearchInput({
  value,
  handleChange,
  onClick,
  placeholder,
}: ICommonSearchInputProps) {
  const input = document.getElementById("searchInput");

  input?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchButton")?.click();
    }
  });

  return (
    <div className="c-CommonSearchInput">
      <CommonInput
        id="searchInput"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <CommonButton
        formLabelId="searchButton"
        picto="search"
        onClick={onClick}
        paddingStyle="paddingSmall"
        style="primary"
      />
    </div>
  );
}

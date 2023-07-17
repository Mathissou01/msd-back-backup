import { IBlocksSubHeading } from "../../../../../../lib/dynamic-blocks";
import { IOptionWrapper } from "../../../../FormMultiselect/FormMultiselect";
import FormInput from "../../../../FormInput/FormInput";
import FormSelect from "../../../../FormSelect/FormSelect";
import "./sub-heading-block.scss";

type TSubHeadingTagOption = "h2" | "h3" | "h4" | "h5" | "h6";

const subHeadingTagOptions: Array<IOptionWrapper<TSubHeadingTagOption>> = [
  { option: "h2", label: "H2" },
  { option: "h3", label: "H3" },
  { option: "h4", label: "H4" },
  { option: "h5", label: "H5" },
  { option: "h6", label: "H6" },
];

interface ISubHeadingBlockProps {
  blockName: string;
}

export default function SubHeadingBlock({ blockName }: ISubHeadingBlockProps) {
  const labels = {
    text: "Texte du titre",
    tag: "Niveau de titre",
  };
  const fieldNames: { [name: string]: keyof IBlocksSubHeading } = {
    text: "subHeadingText",
    tag: "subHeadingTag",
  };

  return (
    <div className="c-SubHeadingRow">
      <div className="c-SubHeadingRow__Description">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.text}`}
          label={labels.text}
          isRequired
        />
      </div>
      <div>
        <FormSelect<TSubHeadingTagOption>
          name={`${blockName}.${fieldNames.tag}`}
          label={labels.tag}
          options={subHeadingTagOptions}
          isRequired
        />
      </div>
    </div>
  );
}

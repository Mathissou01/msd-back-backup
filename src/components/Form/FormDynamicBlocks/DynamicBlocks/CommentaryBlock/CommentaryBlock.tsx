import { Enum_Componentblockscommentary_Commentarystatus } from "../../../../../graphql/codegen/generated-types";
import { IBlocksCommentary } from "../../../../../lib/dynamic-blocks";
import { IOptionWrapper } from "../../../FormMultiselect/FormMultiselect";
import FormInput from "../../../FormInput/FormInput";
import FormSelect from "../../../FormSelect/FormSelect";
import "./commentary-block.scss";

const commentaryStatusOptions: Array<
  IOptionWrapper<keyof typeof Enum_Componentblockscommentary_Commentarystatus>
> = [
  {
    option: Enum_Componentblockscommentary_Commentarystatus.Facultatif,
    label: Enum_Componentblockscommentary_Commentarystatus.Facultatif,
  },
  {
    option: Enum_Componentblockscommentary_Commentarystatus.Obligatoire,
    label: Enum_Componentblockscommentary_Commentarystatus.Obligatoire,
  },
];

interface ICommentaryBlockProps {
  blockName: string;
}

export default function CommentaryBlock({ blockName }: ICommentaryBlockProps) {
  const labels = {
    status: `Statut du champ "Commentaire"`,
    label: `Libellé du champ "Commentaire"`,
    placeholder: `Placeholder du champ "Commentaire"`,
  };
  const fieldNames: { [name: string]: keyof IBlocksCommentary } = {
    status: "commentaryStatus",
    label: "commentaryLabel",
    placeholder: "commentaryPlaceholder",
  };

  return (
    <div className="c-CommentaryBlock">
      <div className="c-CommentaryBlock__Status">
        <FormSelect<
          keyof typeof Enum_Componentblockscommentary_Commentarystatus
        >
          name={`${blockName}.${fieldNames.status}`}
          label={labels.status}
          options={commentaryStatusOptions}
          isRequired
        />
      </div>
      <FormInput
        type="text"
        name={`${blockName}.${fieldNames.label}`}
        label={labels.label}
        maxLengthValidation={50}
        isRequired
      />
      <FormInput
        type="text"
        name={`${blockName}.${fieldNames.placeholder}`}
        maxLengthValidation={50}
        label={labels.placeholder}
      />
    </div>
  );
}

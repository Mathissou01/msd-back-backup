import { useFormContext } from "react-hook-form";

interface IHorizontalRuleBlockProps {
  blockName: string;
}

export default function HorizontalRuleBlock({
  blockName,
}: IHorizontalRuleBlockProps) {
  const { register } = useFormContext();
  return <input type="hidden" {...register(`${blockName}.hr`)} />;
}

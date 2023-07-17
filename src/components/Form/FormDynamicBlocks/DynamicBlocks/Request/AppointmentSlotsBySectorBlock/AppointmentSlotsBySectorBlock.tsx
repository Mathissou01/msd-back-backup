import { MultiValue } from "react-select";
import { useMount } from "react-use";
import { IBlocksAppointmentSlotsBySector } from "../../../../../../lib/dynamic-blocks";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../../FormSingleMultiselect/FormSingleMultiselect";
import "./appointment-slots-by-sector-block.scss";

interface IAppointmentSlotsBySectorBlockProps {
  blockName: string;
  onChangeTitle: (newTitle: string) => void;
}

export default function AppointmentSlotsBySectorBlock({
  blockName,
  onChangeTitle,
}: IAppointmentSlotsBySectorBlockProps) {
  /* Static Data */
  const defaultTitle = "Nouvel encart créneaux par secteur(s)";
  const labels = {
    sectors: "Secteur(s)",
  };
  const fieldNames: { [name: string]: keyof IBlocksAppointmentSlotsBySector } =
    {
      // TODO: how this structured/called on the API ?
      sectors: "sectors",
    };

  /* Methods */
  function onSectorsChange(
    selectedOptions: MultiValue<IFormSingleMultiselectOption>,
  ) {
    if (selectedOptions.length >= 1) {
      const newTitle = selectedOptions.map((option) => option.label).join(", ");
      onChangeTitle(newTitle);
    } else {
      onChangeTitle(defaultTitle);
    }
  }

  /* Local Data */
  // TODO: does this work with existing data loaded from API ?
  useMount(() => onChangeTitle(defaultTitle));

  return (
    <div className="c-AppointmentSlotsBySectorBlock">
      <div>
        <FormSingleMultiselect
          name={`${blockName}.${fieldNames.sectors}`}
          label={labels.sectors}
          options={[
            { label: "Secteur Nord", value: "1" },
            { label: "Secteur Sud", value: "2" },
            { label: "Secteur A", value: "3" },
            { label: "Secteur B", value: "4" },
            { label: "Secteur C", value: "5" },
            { label: "Secteur D", value: "6" },
            { label: "Secteur E", value: "7" },
            { label: "Secteur F", value: "8" },
            { label: "Secteur G", value: "9" },
          ]}
          isMulti={true}
          onSelectChange={onSectorsChange}
        />
      </div>
      <span>Créneaux</span>
      <span>Message affichés sous les créneaux</span>
      <span>Message affiché en cas d’absence de créneaux</span>
    </div>
  );
}

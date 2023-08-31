import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  useGetMwcHasTipsQuery,
  useUpdateMwcHasTipsMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import "./has-tips-management.scss";

const title = "Astuces";
const label = {
  tipsText: "Afficher les astuces concernant la production de déchets",
  save: "Enregistrer les modifications",
  cancel: "Annuler les modifications",
};

interface IHasTips {
  hasTips: boolean;
}

export default function HasTipsManagement() {
  const { contractId } = useContract();

  const { data } = useGetMwcHasTipsQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
      },
    },
  });

  const [updateMwcHasTips] = useUpdateMwcHasTipsMutation({
    refetchQueries: ["getMwcHasTips"],
  });

  const hasTips =
    data?.mwCounterServices?.data[0]?.attributes?.hasTips || false;

  const form = useForm({
    defaultValues: {
      hasTips: hasTips,
    },
  });

  const onSubmit = (data: IHasTips) => {
    updateMwcHasTips({
      variables: {
        contractId: contractId,
        data: {
          hasTips: data.hasTips,
        },
      },
    });
  };

  useEffect(() => {
    form.reset({
      hasTips: hasTips,
    });
  }, [data, form, hasTips]);

  return (
    <FormProvider {...form}>
      <form
        className="c-HasTipsManagement"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="c-HasTipsManagement__FormWrapper">
          <p className="c-HasTipsManagement__Title">{title}</p>
          <FormCheckbox name="hasTips" label={label.tipsText} />
        </div>
        <div className="c-HasTipsManagement__ButtonWrapper">
          <CommonButton
            label={label.cancel}
            type="button"
            onClick={() =>
              form.reset({
                hasTips: hasTips,
              })
            }
          />
          <CommonButton label={label.save} type="submit" style="primary" />
        </div>
      </form>
    </FormProvider>
  );
}

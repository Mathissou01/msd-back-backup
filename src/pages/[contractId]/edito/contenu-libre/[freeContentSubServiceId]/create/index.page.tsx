import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCreateFreeContentByFreeContentSubServiceIdMutation } from "../../../../../../graphql/codegen/generated-types";
import { IEditoBlock, TDynamicFieldOption } from "../../../../../../lib/edito";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { ICommonSelectOption } from "../../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../../contract-layout";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../../components/Edito/EditoForm/EditoForm";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";

interface IEditoFreeContentCreatePage {
  freeContentSubServiceId: string;
}

export function EditoFreeContentCreatePage({
  freeContentSubServiceId,
}: IEditoFreeContentCreatePage) {
  /* Static Data */
  const title = "Créer un article";
  const formLabels = {
    staticTitle: "Titre de l'article",
    staticTagsLabel: "Thématique ",
    staticTagsLabelDescription: "(Tags)",
    staticShortDescription: "Description courte",
    staticShortDescriptionMaxCharacters:
      "caractères maximum, affichés dans l'aperçu de l'article",
  };

  /* Methods */
  async function onSubmit(freeContactsInputData: FieldValues) {
    const variables = {
      data: {
        freeContentSubService: freeContentSubServiceId,
        title: freeContactsInputData.title,
        tags: freeContactsInputData.tags?.map(
          (option: ICommonSelectOption) => option.value,
        ),
        shortDescription: freeContactsInputData.shortDescription,
        blocks: freeContactsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
        unpublishedDate: freeContactsInputData.unpublishedDate,
      },
    };
    setIsReloading(true);
    return createFreeContentsMutation({
      variables,
      onCompleted: (result) => {
        if (result.createFreeContent?.data?.id) {
          router.push(
            `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${result.createFreeContent?.data?.id}`,
          );
        }
      },
    });
  }

  /* External Data */
  const [
    createFreeContentsMutation,
    { loading: createMutationLoading, error: createMutationError },
  ] = useCreateFreeContentByFreeContentSubServiceIdMutation();

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const [isReloading, setIsReloading] = useState(false);
  const isLoading = createMutationLoading;
  const errors = [createMutationError];
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
  ];

  return (
    <div className="o-EditoEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading || isReloading} errors={errors}>
          <EditoForm
            dynamicFieldsOptions={dynamicFieldOptions}
            onSubmitValid={onSubmit}
            labels={formLabels}
          />
        </CommonLoader>
      </>
    </div>
  );
}

export default function IndexPage() {
  const router = useRouter();
  const [freeContentSubServiceId, setFreeContentSubServiceId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = router?.query?.freeContentSubServiceId;
    let localFreeContentSubServiceId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localFreeContentSubServiceId = query.toString();
      } else if (query.toString() === "create") {
        localFreeContentSubServiceId = "0";
      } else {
        localFreeContentSubServiceId = false;
      }
    }
    if (
      localFreeContentSubServiceId &&
      localFreeContentSubServiceId !== freeContentSubServiceId
    ) {
      setIsLoading(true);
      setFreeContentSubServiceId(localFreeContentSubServiceId);
    } else if (localFreeContentSubServiceId === false) {
      void router.push("/404");
    }
  }, [router, freeContentSubServiceId, setFreeContentSubServiceId]);

  useEffect(() => {
    setIsLoading(false);
  }, [freeContentSubServiceId]);

  return (
    <ContractLayout>
      {!isLoading && freeContentSubServiceId && (
        <EditoFreeContentCreatePage
          freeContentSubServiceId={freeContentSubServiceId}
        />
      )}
    </ContractLayout>
  );
}

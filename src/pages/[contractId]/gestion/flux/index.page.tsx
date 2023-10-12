import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import {
  useGetFlowsQuery,
  useUpdateFlowByIdMutation,
  useGetCollectionMethodsQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { cleanCollectionMethods, IFlow } from "../../../../lib/flows";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import FlowsBlock from "../../../../components/Flows/FlowsBlock";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../../../components/Common/CommonModalWrapper/CommonModalWrapper";
import FlowModal from "../../../../components/Flows/FlowModal/FlowModal";

export function FluxActivationPage() {
  /* Static Data */
  const title = "Activation des flux";
  const description =
    "Vous pouvez renommer, masquer et modifier les attributs associés aux flux pour ce contrat";
  const pageLabel = "Flux à activer pour ce contrat";

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateFlowId: submitData.id,
      data: {
        name: submitData.name,
        recyclingGesture: submitData.recyclingGesture,
        color: submitData.color.id,
        code: submitData.code,
        collectDoorToDoors: !submitData.collectDoorToDoors
          ? []
          : collectionMethods?.collectDoorToDoors?.data
              .filter(
                (collectionMethod) =>
                  submitData["doorToDoor/" + collectionMethod.id],
              )
              .map((collectionMethod) => collectionMethod.id ?? ""),
        collectDropOffs: !submitData.collectDropOffs
          ? []
          : collectionMethods?.collectDropOffs?.data
              .filter(
                (collectionMethod) =>
                  submitData["collectDropOffs/" + collectionMethod.id],
              )
              .map((collectionMethod) => collectionMethod.id ?? "") ?? [],
        collectVoluntaries: !submitData.collectVoluntaries
          ? []
          : collectionMethods?.collectVoluntaries?.data
              .filter(
                (collectionMethod) =>
                  submitData["collectVoluntaries/" + collectionMethod.id],
              )
              .map((collectionMethod) => collectionMethod.id ?? "") ?? [],
      },
    };

    await updateFlow({ variables });

    modalRef.current?.toggleModal(false);
  }

  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
  };

  /* Local Data */
  const router = useRouter();
  const { contractId } = useContract();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Flow", userRights);
  const [flows, setFlows] = useState<IFlow[]>([]);
  const [openedFlow, setOpenedFlow] = useState<IFlow | null>(null);
  const modalRef = useRef<CommonModalWrapperRef>(null);

  const { data, loading, error } = useGetFlowsQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
      },
    },
    fetchPolicy: "network-only",
  });
  const {
    data: collectionMethods,
    loading: collectionLoading,
    error: collectionError,
  } = useGetCollectionMethodsQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "network-only",
  });
  const [updateFlow, { loading: mutationLoading, error: mutationError }] =
    useUpdateFlowByIdMutation({
      refetchQueries: ["getFlows", "getCollectionMethods"],
      awaitRefetchQueries: true,
    });
  const isLoading = loading || collectionLoading || mutationLoading;
  const errors = [error, collectionError, mutationError];

  useEffect(() => {
    if (!userPermissions.read) router.push(`/${contractId}`);

    if (data) {
      setFlows(
        data?.flows?.data
          ?.map((flow) => {
            if (
              flow &&
              flow.id &&
              flow.attributes &&
              flow.attributes?.isActivated !== null &&
              flow.attributes?.isActivated !== undefined &&
              flow.attributes.collectDoorToDoors !== null &&
              flow.attributes.color &&
              flow.attributes.color.data &&
              flow.attributes.color.data.id
            ) {
              return {
                id: flow.id,
                name: flow.attributes.name ?? "",
                isActivated: flow.attributes?.isActivated,
                recyclingGesture: flow.attributes.recyclingGesture,
                color: flow.attributes.color.data.id,
                code: flow.attributes.code ?? "",
                hexaCode:
                  flow.attributes.color?.data?.attributes?.hexaCode ?? "",
                collectDoorToDoors: cleanCollectionMethods(
                  flow.attributes.collectDoorToDoors?.data ?? [],
                ),
                collectDropOffs: cleanCollectionMethods(
                  flow.attributes.collectDropOffs?.data ?? [],
                ),
                collectVoluntaries: cleanCollectionMethods(
                  flow.attributes.collectVoluntaries?.data ?? [],
                ),
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [contractId, data, router, userPermissions.read]);

  return (
    <>
      <PageTitle title={title} description={description} />
      <CommonLoader isLoading={isLoading} errors={errors} isFlexGrow={false}>
        <h2 className="c-FluxActivationPage__Title">{pageLabel}</h2>
        <FlowsBlock
          flows={flows}
          onOpenFlow={(flow) => {
            setOpenedFlow(flow);
            modalRef.current?.toggleModal(true);
          }}
        />
        <CommonModalWrapper ref={modalRef}>
          {openedFlow && (
            <FlowModal
              flow={openedFlow}
              onSubmitValid={onSubmit}
              handleCloseModal={handleCloseModal}
            />
          )}
        </CommonModalWrapper>
      </CommonLoader>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <FluxActivationPage />
    </ContractLayout>
  );
}

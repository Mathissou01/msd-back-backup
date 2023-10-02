import React, { useEffect, useRef, useState } from "react";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import {
  useGetActivatedMwcFlowsByContractIdQuery,
  useGetMwcFlowsByContractIdLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonSelectFlow from "./CommonSelectFlow/CommonSelectFlow";
import MCDFlowForm from "./MCDFlowForm/MCDFlowForm";
import "./MCD-flow.scss";
export interface ISelectFlowData {
  id: string;
  name: string;
}

const labels = {
  title: "Liste des flux pris en compte dans le compteur déchets",
};

export default function Flow() {
  const isInitialized = useRef(false);
  const { contractId } = useContract();

  const [selectedFlows, setSelectedFlows] = useState<Array<string>>([]);

  const [showSelect, setShowSelect] = useState(true);

  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);

  const [getFlows, { data: dataMwcAllFlows }] =
    useGetMwcFlowsByContractIdLazyQuery({
      variables: {
        contractId: contractId,
      },
    });

  const { data: dataFlowActivated } = useGetActivatedMwcFlowsByContractIdQuery({
    variables: {
      contractId: contractId,
    },
  });

  const handleSelectFlowChange = () => {
    setShowSelect(false);
  };

  const removeFlow = (flowId: string) => {
    setSelectedFlows((prevFlows) =>
      prevFlows.filter((id) => id !== flowId.split(";")[0]),
    );
  };

  const flowData: ISelectFlowData[] = (
    dataMwcAllFlows?.mwcFlows?.data || []
  ).map((flow) => ({
    id: flow?.attributes?.flow?.data?.id ?? "",
    name: flow?.attributes?.flow?.data?.attributes?.name ?? "",
  }));

  const filteredDataFlowActivated = dataFlowActivated?.flows?.data
    ?.filter(
      (item) =>
        item?.attributes?.code === "OMR" || item?.attributes?.code === "CS", //TODO: to remove in a future version
    )
    ?.map((flow) => ({
      id: flow?.id ?? "",
      name: flow?.attributes?.name ?? "",
    }))
    .filter((d) => !flowData?.some((flow) => flow?.name === d.name));

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getFlows();
    }
  }, [getFlows, isInitialized]);

  return (
    <div className="c-Flow">
      <h2 className="c-Flow__Title">{labels.title}</h2>
      <div className="c-Flow__Wrapper">
        <CommonLoader isLoading={!isInitialized.current}>
          {dataMwcAllFlows?.mwcFlows?.data?.map((d, index) => {
            const formatFlowData = {
              id: d.attributes?.flow?.data?.id ?? "",
              name: d.attributes?.flow?.data?.attributes?.name ?? "",
            };
            return (
              <MCDFlowForm
                key={index}
                setSelectedFlowId={setSelectedFlowId}
                flow={formatFlowData}
                setSelectedFlow={setShowSelect}
                onRemove={() => removeFlow(d.attributes?.flow?.data?.id ?? "")}
              />
            );
          })}

          {selectedFlowId && (
            <MCDFlowForm
              setSelectedFlow={setShowSelect}
              setSelectedFlowId={setSelectedFlowId}
              flowIdName={{
                id: selectedFlowId.split(";")[0],
                name: selectedFlowId.split(";")[1],
              }}
              onRemove={() => removeFlow(selectedFlowId.split(";")[0])}
            />
          )}

          {showSelect &&
            filteredDataFlowActivated &&
            filteredDataFlowActivated.length > 0 && (
              <div className="c-Flow__ListFlowsDashed">
                <CommonSelectFlow
                  label={`Associer un ${
                    filteredDataFlowActivated &&
                    filteredDataFlowActivated.length <= 1
                      ? "autre"
                      : ""
                  } flux`}
                  datas={filteredDataFlowActivated}
                  setSelectedItems={setSelectedFlows}
                  selectedItems={selectedFlows}
                  setSelectedFlow={setSelectedFlowId}
                  onFlowChange={handleSelectFlowChange}
                />
              </div>
            )}
        </CommonLoader>
      </div>
    </div>
  );
}

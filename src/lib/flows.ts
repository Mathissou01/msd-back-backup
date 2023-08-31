import {
  CollectDoorToDoorEntity,
  CollectDropOffEntity,
  CollectVoluntaryEntity,
} from "../graphql/codegen/generated-types";

export interface IFlow {
  id: string;
  name: string;
  isActivated: boolean;
  recyclingGesture: string;
  color: string;
  hexaCode: string;
  code: string | null | undefined;
  collectDoorToDoors: Array<ICollectionMethods>;
  collectDropOffs: Array<ICollectionMethods>;
  collectVoluntaries: Array<ICollectionMethods>;
}

export interface ICollectionMethods {
  id: string;
  name: string;
}

export const cleanCollectionMethods = (
  dirtyCollectionMethods:
    | Array<CollectDoorToDoorEntity>
    | Array<CollectDropOffEntity>
    | Array<CollectVoluntaryEntity>,
): Array<ICollectionMethods> => {
  return dirtyCollectionMethods.map((collectionMethod) => {
    return {
      id: collectionMethod.id ?? "",
      name: collectionMethod.attributes?.name ?? "",
    };
  });
};

export const dirtyCollectionMethods = (
  cleanCollectionMethods: Array<ICollectionMethods>,
):
  | Array<CollectDoorToDoorEntity>
  | Array<CollectDropOffEntity>
  | Array<CollectVoluntaryEntity> => {
  return cleanCollectionMethods.map((collectionMethod) => {
    return {
      id: collectionMethod.id ?? "",
      attributes: {
        name: collectionMethod.name,
      },
    };
  });
};

import { removeNulls } from "./utilities";

export interface IEditoBlock {
  type?: string;
  id?: string;
}

// eslint-disable-next-line
export function isEditoBlock(block: any): block is IEditoBlock {
  return "id" in block;
}

export interface IPartialEditoBlock {
  __typename: string;
  name?: string | null;
}

export function remapEditoBlocksDynamicZone(
  blocks?: Array<Partial<IPartialEditoBlock> | null> | null,
): Array<IEditoBlock> | null {
  return (
    blocks
      ?.map((block) => {
        if (block) {
          const type = block.__typename;
          if (type && isEditoBlock(block)) {
            return {
              type,
              id: block.id,
            };
          }
        }
      })
      .filter(removeNulls) ?? null
  );
}

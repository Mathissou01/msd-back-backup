import type { CodegenConfig } from "@graphql-codegen/cli";

import { config as configDotenv } from "dotenv";

configDotenv();

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  documents: "./src/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/codegen/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./src/graphql/codegen/generated-types.ts": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
};

export default config;

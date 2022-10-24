import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.API_URL}/graphql`,
  documents: "./src/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    // "src/graphql/codegen": {
    //   preset: "client",
    //   plugins: [],
    // },
    // "src/graphql/codegen/graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
    "./src/graphql/codegen/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./queries.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
      config: {
        relativeToCwd: true,
        prefix: "",
      },
    },
    // "./src/graphql/codegen/resolvers-types.ts": {
    //   config: { useIndexSignature: true },
    //   plugins: ["typescript", "typescript-resolvers"],
    // },
  },
};

export default config;

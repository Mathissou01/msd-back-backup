import { faker } from "@faker-js/faker";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { asyncMap } from "@apollo/client/utilities";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import schemaString from "src/graphql/codegen/schema.graphql";
// import { Resolvers } from "./codegen/resolvers-types";

export default function getMockedClient(delay = 0) {
  const schema = makeExecutableSchema({
    typeDefs: schemaString,
    // resolvers,
  });
  const mocks = {
    ID: () => faker.datatype.number(),
    Int: () => faker.datatype.number(),
    Float: () => faker.datatype.float(),
    String: () => faker.lorem.words(),
    DateTime: () => faker.date.soon(10),
  };
  const preserveResolvers = true;
  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers,
  });
  const schemaLink = new SchemaLink({ schema: schemaWithMocks });

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const mockDelayMiddleware = new ApolloLink((operation, forward) => {
    return asyncMap(forward(operation), async (response) => {
      await timeout(delay);
      return response;
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: mockDelayMiddleware.concat(schemaLink),
  });
}

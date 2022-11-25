import { faker } from "@faker-js/faker";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { asyncMap } from "@apollo/client/utilities";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import schemaString from "src/graphql/codegen/schema.graphql";
import {
  ComponentMsdEditorialMock,
  GetServicesMock,
} from "./queries/GetServices.mock";
import { ContractCustomizationEntityResponseCollectionMock } from "./queries/GetQuizAndTipsBlock.mock";

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
    Date: () => faker.date.soon(10),
    DateTime: () => faker.date.soon(10),
    Boolean: () => faker.datatype.boolean(),
    // Queries
    ServiceEntityResponseCollection: () => GetServicesMock,
    ComponentMsdEditorial: () => ComponentMsdEditorialMock,
    ContractCustomizationEntityResponseCollection: () =>
      ContractCustomizationEntityResponseCollectionMock,
  };
  const preserveResolvers = true;
  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers,
  });
  const schemaLink = new SchemaLink({
    schema: schemaWithMocks,
  }) as unknown as ApolloLink;

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
    link: mockDelayMiddleware.concat(schemaLink),
    cache: new InMemoryCache(),
  });
}

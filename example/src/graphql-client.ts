import ApolloClient from "apollo-boost";

const GRAPHQL_API_URL = "https://fakerql.com/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_API_URL
});

# query-matic

![](https://img.shields.io/npm/v/query-matic.svg?colorB=%232ecc71)
![](https://img.shields.io/bundlephobia/min/query-matic.svg?colorB=%233498db)

## Props

| Name         | Required | Value                                                                                          | Description                                                                                                                                              |
| ------------ | -------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children     | ✅       | `(result: QueryResult, query?: (variables: TVariables) => React.ReactNode`                     | A function returning the UI you want to render based on your query result.                                                                               |
| query        | ✅       | `DocumentNode`                                                                                 | A GraphQL document that consists of a single query to be sent down to the server.                                                                        |
| variables    | -        | `TVariables`                                                                                   | A map going from variable name to variable value, where the variables are used within the GraphQL query.                                                 |
| onError      | -        | `(error: ApolloError) => void`                                                                 | A callback executed in the event of an error.                                                                                                            |
| onCompleted  | -        | `(data: TData | {}) => void`                                                                   | A callback executed once your query successfully completes.                                                                                              |
| errorPolicy  | -        | `"none" | "ignore" | "all"`                                                                    | Specifies the [ErrorPolicy](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-config-options-errorPolicy) to be used for this query |
| fetchPolicy  | -        | `"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"` | Specifies the [FetchPolicy](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-config-options-fetchPolicy) to be used for this query |
| fetchResults | -        | `boolean`                                                                                      | Whether or not to fetch results                                                                                                                          |
| metadata     | -        | `any`                                                                                          | Arbitrary metadata stored in the store with this query. Designed for debugging, developer tools, etc.                                                    |

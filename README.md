# programmatic-query

![](https://img.shields.io/npm/v/programmatic-query.svgcolorB=%232ecc71)

## `Query` Props

The follow props are identical in use to the `Query` component in `react-apollo`:

- `skip`
- `query`
- `variables`
- `onError`
- `onCompleted`
- `errorPolicy`
- `fetchPolicy`

[Read more about these props here.](https://www.apollographql.com/docs/react/essentials/queries.html#props)

### `children` - `function`

A render prop to return a UI based on the query executed on component mount.

Configurable to allow the execution of the query to be handled by a seperate event other than the component mount.

To switch between the **_result only_** and **_with query handler_** behavior, pass a parameter name for the query handler to allow the query to be fired when the handler is invoked. Otherwise to use the default behavior, omit the second render prop argument and the query will be fired on component mount.

#### Render Prop - **RESULT ONLY**

Query is fired immediately upon component mount with any passed configuration to the Query component:

```jsx
const App = () => (
  <Query
    query={gql`
      {
        allTodos {
          id
          text
        }
      }
    `}
  >
    {({ data, error, loading, networkStatus }) => (
      <Component>
        {data && data}
        {error && error}
        {loading && "Loading.."}
      </Component>
    )}
  </Query>
);
```

See `children` prop [here](https://www.apollographql.com/docs/react/api/react-apollo.html#query-props)

#### Render Prop - **WITH QUERY HANDLER**

```jsx
const App = () => (
  <Query
    query={gql`
      {
        allTodos {
          id
          text
        }
      }
    `}
  >
    {({ data, error, loading, networkStatus }, fetchAllTodos) => (
      <Component>
        {data && data}
        {error && error}
        {loading && "Loading.."}
        <Button onPress={() => fetchAllTodos()}>Fetch All Todos</Button>
      </Component>
    )}
  </Query>
);
```

### `fetchOnMount` - `boolean`

Specify if the query is fired on component mount even when a query handler is passed.
Useful to easily fetch data on load, and allow a refetch via the query handler.

Uses the `variables` passed as the query prop as the `variable` argument.

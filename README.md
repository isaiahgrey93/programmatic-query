![](https://img.shields.io/npm/v/programmatic-query.svg?colorB=%232ecc71)
![](https://img.shields.io/bundlephobia/min/programmatic-query.svg?colorB=%233498db)

# programmatic-query

Alternative `Query` component for `react-apollo` to make manually fired queries less painful.

See the example use case different between `react-apollo` and `programmatic-query` [here](https://github.com/isaiahgrey93/programmatic-query/blob/master/example/src/App.tsx).

## Setup

**Install**

```bash
yarn add programmatic-query
# or
npm install programmatic-query
```

**Usage**

```javascript
import { Query } from "programmatic-query";
```

- [Use like `Query` component from `react-apollo` ](https://github.com/isaiahgrey93/programmatic-query#render-prop---result-only)
- [Use to manually fire queries with extended render prop argument](https://github.com/isaiahgrey93/programmatic-query#render-prop---with-query-handler)

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
Uses the `variables` passed as the query prop as the `variable` argument.

```jsx
({ data, error, loading, networkStatus }) => (
  <Component>
    {data && data}
    {error && error}
    {loading && "Loading..."}
  </Component>
)
```

See `children` prop [here](https://www.apollographql.com/docs/react/api/react-apollo.html#query-props)

Configurable to allow the execution of the query to be handled by a separate event other than the component mount.

To switch between the **_default_** behavior and **_manual query handler_** behavior, pass a parameter name for the query handler as the second argument to `children`, to allow the query to be fired when the handler is invoked. This will prevent the default component mount fetch.
To use the default behavior simply omit the second render prop argument and the query will be fired on component mount.

#### Render Prop - **DEFAULT EXAMPLE**

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
        {loading && "Loading..."}
      </Component>
    )}
  </Query>
);
```

#### Render Prop - **MANUAL QUERY HANDLER EXAMPLE**

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
    {({ data, error, loading, networkStatus }, fetchQuery) => (
      <Component>
        {data && data}
        {error && error}
        {loading && "Loading..."}
        <Button onPress={() => fetchQuery()}>Fetch All Todos</Button>
      </Component>
    )}
  </Query>
);
```

### `fetchOnMount` - `boolean`

When using the **_manual query handler_** version of the "children" render prop function above, you may re-enable the default fetch on component mount by setting this value to true. This prop has no effect when using the **_default behavior_** version of the "children" function. Useful to easily fetch data on load, and allow a refetch via the query handler.

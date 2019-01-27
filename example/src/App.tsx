import React, { Fragment } from "react";

import { Query as ReactApolloQuery } from "react-apollo";
import { Query as ProgrammaticQuery } from "programmatic-query";

import gql from "graphql-tag";

const FETCH_TODOS = gql`
  {
    Todo(id: 1) {
      id
      title
      completed
    }
  }
`;

const App = () => (
  <div style={styles.container}>
    <div style={styles.column}>
      <ReactApolloQuery query={FETCH_TODOS}>
        {({ data, error, loading }) => (
          <Fragment>
            <h1>
              <code>{"react-apollo - <Query />"}</code>
            </h1>
            <div style={styles.row}>
              <b>Data:</b> {JSON.stringify(data)}
            </div>
            <div style={styles.row}>
              <b>Loading:</b> {JSON.stringify(loading)}
            </div>
            <div style={styles.row}>
              <b>Error:</b> {JSON.stringify(error)}
            </div>
          </Fragment>
        )}
      </ReactApolloQuery>
    </div>
    <div style={styles.column}>
      <ProgrammaticQuery
        fetchOnMount
        query={FETCH_TODOS}
        fetchPolicy={"no-cache"}
      >
        {({ data, error, loading }, fetchTodos) => (
          <Fragment>
            <h1>
              <code>{"programmatic-query - <Query />"}</code>
            </h1>
            <div style={styles.row}>
              <b>Data:</b> {JSON.stringify(data)}
            </div>
            <div style={styles.row}>
              <b>Loading:</b> {JSON.stringify(loading)}
            </div>
            <div style={styles.row}>
              <b>Error:</b> {JSON.stringify(error)}
            </div>
            <div style={styles.row}>
              <button onClick={() => fetchTodos()}>Fetch Todo</button>
            </div>
          </Fragment>
        )}
      </ProgrammaticQuery>
    </div>
  </div>
);

const styles = {
  container: {
    flex: 1,
    display: "flex"
  },
  column: {
    width: "50%",
    padding: 24
  },
  row: {
    padding: 12
  }
};

export default App;

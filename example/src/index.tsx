import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";

import App from "./App";
import { client } from "./graphql-client";

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

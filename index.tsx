import React, { Component } from "react";

import { DocumentNode } from "graphql";
import { ApolloError, NetworkStatus } from "apollo-client";
import { ApolloConsumer } from "react-apollo";

type QueryResult<Tdata = any> = {
  data?: Tdata;
  error?: ApolloError;
  loading?: boolean;
  networkStatus?: NetworkStatus;
};

type QueryHandlerParams = {
  variables?: QueryVariables;
};

type FetchPolicy =
  | "cache-first"
  | "cache-and-network"
  | "network-only"
  | "cache-only"
  | "no-cache"
  | "standby";

type ErrorPolicy = "none" | "ignore" | "all";

type QueryHandler = (params?: QueryHandlerParams) => any;

type QueryRenderProp = (
  result: QueryResult,
  query?: QueryHandler
) => JSX.Element | any;

type SuccessHandler = (data: any) => void;

type ErrorHandler = (error: ApolloError) => void;

type QueryVariables = { [key: string]: any };

interface QueryProps {
  skip?: boolean;
  query: DocumentNode;
  client?: any;
  variables?: QueryVariables;
  onError?: ErrorHandler;
  onCompleted?: SuccessHandler;
  errorPolicy?: ErrorPolicy;
  fetchPolicy?: FetchPolicy;
  children: QueryRenderProp;
  fetchOnMount?: boolean;
}

const INITIAL_STATE: QueryResult = {
  data: undefined,
  error: undefined,
  loading: undefined,
  networkStatus: undefined
};

class QueryRequest extends Component<QueryProps> {
  state: QueryResult = INITIAL_STATE;

  request = async (params?: QueryHandlerParams) => {
    const {
      skip,
      query,
      client,
      variables,
      onError,
      onCompleted,
      errorPolicy,
      fetchPolicy
    } = this.props;

    if (skip || !client) return;

    try {
      this.setState(() => ({ ...INITIAL_STATE, loading: true }));

      const response = await client.query({
        query,
        fetchPolicy,
        errorPolicy,
        variables: variables ? variables : params ? params.variables : {}
      });

      this.setState(
        () => ({ ...INITIAL_STATE, ...response }),
        () => onCompleted && onCompleted(response ? response.data : {})
      );

      return response;
    } catch (error) {
      this.setState(
        () => ({ ...INITIAL_STATE, error, loading: false }),
        () => onError && onError(error)
      );
    }
  };

  componentDidMount() {
    const { children, fetchOnMount } = this.props;

    if (fetchOnMount || children.length <= 1) {
      this.request();
    }
  }

  render() {
    const { props, request, state } = this;
    const { children: render } = props;

    return render(state, request);
  }
}

export const Query = (props: QueryProps) => (
  <ApolloConsumer>
    {client => <QueryRequest client={client} {...props} />}
  </ApolloConsumer>
);

export default Query;

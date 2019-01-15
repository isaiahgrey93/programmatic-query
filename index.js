import { Component } from "react";

export class ProgrammaticQuery extends Component {
  state = {};

  query = async payload => {
    const {
      query,
      variables,
      onError,
      onCompleted,
      errorPolicy,
      fetchPolicy,
      fetchResults
    } = this.props;

    try {
      this.setState(() => ({ loading: true }));

      const response = await client.query({
        query,
        variables: variables ? variables : payload,
        errorPolicy,
        fetchPolicy,
        fetchResults
      });

      this.setState(
        () => ({ ...response }),
        () => {
          if (onCompleted) {
            onCompleted(response.data);
          }
        }
      );

      return response;
    } catch (error) {
      this.setState(
        () => ({ error }),
        () => {
          if (onError) {
            onError(error);
          }
        }
      );
    } finally {
      this.setState(() => ({ loading: false }));
    }
  };

  componentDidMount() {
    const { children } = this.props;

    if (children.length !== 2) {
      this.query();
    }
  }

  render() {
    return this.props.children(this.state, this.query);
  }
}

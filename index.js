var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
const INITIAL_STATE = {
    data: undefined,
    error: undefined,
    loading: undefined,
    networkStatus: undefined
};
class QueryRequest extends Component {
    constructor() {
        super(...arguments);
        this.state = INITIAL_STATE;
        this.request = (params) => __awaiter(this, void 0, void 0, function* () {
            const { skip, query, client, variables, onError, onCompleted, errorPolicy, fetchPolicy } = this.props;
            if (skip || !client)
                return;
            try {
                this.setState(() => (Object.assign({}, INITIAL_STATE, { loading: true })));
                const response = yield client.query({
                    query,
                    fetchPolicy,
                    errorPolicy,
                    variables: variables ? variables : params ? params.variables : {}
                });
                this.setState(() => (Object.assign({}, INITIAL_STATE, response)), () => onCompleted && onCompleted(response ? response.data : {}));
                return response;
            }
            catch (error) {
                this.setState(() => (Object.assign({}, INITIAL_STATE, { error, loading: false })), () => onError && onError(error));
            }
        });
    }
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
export const Query = (props) => (React.createElement(ApolloConsumer, null, client => React.createElement(QueryRequest, Object.assign({ client: client }, props))));
export default Query;

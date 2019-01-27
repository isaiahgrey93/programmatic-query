/// <reference types="react" />
import { DocumentNode } from "graphql";
import { ApolloError, NetworkStatus } from "apollo-client";
declare type QueryResult<Tdata = any> = {
    data?: Tdata;
    error?: ApolloError;
    loading?: boolean;
    networkStatus?: NetworkStatus;
};
declare type QueryHandlerParams = {
    variables?: QueryVariables;
};
declare type FetchPolicy = "cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby";
declare type ErrorPolicy = "none" | "ignore" | "all";
declare type QueryHandler = (params?: QueryHandlerParams) => any;
declare type QueryRenderProp = (result: QueryResult, query?: QueryHandler) => JSX.Element | any;
declare type SuccessHandler = (data: any) => void;
declare type ErrorHandler = (error: ApolloError) => void;
declare type QueryVariables = {
    [key: string]: any;
};
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
export declare const Query: (props: QueryProps) => JSX.Element;
export default Query;

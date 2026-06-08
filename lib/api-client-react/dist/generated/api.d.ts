import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { CreateLeadInput, CreateReviewInput, ErrorResponse, GetLeadsParams, HealthStatus, Lead, Review } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetReviewsUrl: () => string;
/**
 * @summary Get all reviews
 */
export declare const getReviews: (options?: RequestInit) => Promise<Review[]>;
export declare const getGetReviewsQueryKey: () => readonly ["/api/reviews"];
export declare const getGetReviewsQueryOptions: <TData = Awaited<ReturnType<typeof getReviews>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getReviews>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetReviewsQueryResult = NonNullable<Awaited<ReturnType<typeof getReviews>>>;
export type GetReviewsQueryError = ErrorType<unknown>;
/**
 * @summary Get all reviews
 */
export declare function useGetReviews<TData = Awaited<ReturnType<typeof getReviews>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateReviewUrl: () => string;
/**
 * @summary Submit a new review
 */
export declare const createReview: (createReviewInput: CreateReviewInput, options?: RequestInit) => Promise<Review>;
export declare const getCreateReviewMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
        data: BodyType<CreateReviewInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
    data: BodyType<CreateReviewInput>;
}, TContext>;
export type CreateReviewMutationResult = NonNullable<Awaited<ReturnType<typeof createReview>>>;
export type CreateReviewMutationBody = BodyType<CreateReviewInput>;
export type CreateReviewMutationError = ErrorType<ErrorResponse>;
/**
* @summary Submit a new review
*/
export declare const useCreateReview: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
        data: BodyType<CreateReviewInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createReview>>, TError, {
    data: BodyType<CreateReviewInput>;
}, TContext>;
export declare const getGetLeadsUrl: (params: GetLeadsParams) => string;
/**
 * @summary Get all leads (admin only)
 */
export declare const getLeads: (params: GetLeadsParams, options?: RequestInit) => Promise<Lead[]>;
export declare const getGetLeadsQueryKey: (params?: GetLeadsParams) => readonly ["/api/leads", ...GetLeadsParams[]];
export declare const getGetLeadsQueryOptions: <TData = Awaited<ReturnType<typeof getLeads>>, TError = ErrorType<ErrorResponse>>(params: GetLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getLeads>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetLeadsQueryResult = NonNullable<Awaited<ReturnType<typeof getLeads>>>;
export type GetLeadsQueryError = ErrorType<ErrorResponse>;
/**
 * @summary Get all leads (admin only)
 */
export declare function useGetLeads<TData = Awaited<ReturnType<typeof getLeads>>, TError = ErrorType<ErrorResponse>>(params: GetLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateLeadUrl: () => string;
/**
 * @summary Submit a new lead from contact form
 */
export declare const createLead: (createLeadInput: CreateLeadInput, options?: RequestInit) => Promise<Lead>;
export declare const getCreateLeadMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadInput>;
}, TContext>;
export type CreateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof createLead>>>;
export type CreateLeadMutationBody = BodyType<CreateLeadInput>;
export type CreateLeadMutationError = ErrorType<ErrorResponse>;
/**
* @summary Submit a new lead from contact form
*/
export declare const useCreateLead: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map
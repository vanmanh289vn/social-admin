import { IPagination } from "../../helpers";

export const LOAD_USERS_PAGING_REQUEST = 'LOAD_USERS_PAGING_REQUEST';
export const LOAD_USERS_PAGING_SUCCESS = 'LOAD_USERS_PAGING_SUCCESS';
export const LOAD_USERS_PAGING_FAILURE = 'LOAD_USERS_PAGING_FAILURE';

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface LoadUsersPagingRequest {
    type: typeof LOAD_USERS_PAGING_REQUEST;
}

interface LoadUsersPagingSuccess {
    type: typeof LOAD_USERS_PAGING_SUCCESS;
    payload: IPagination<IUser>;
}

interface LoadUsersPagingFailure {
    type: typeof LOAD_USERS_PAGING_FAILURE;
    payload: {
        error: string;
    };
}

export interface UsersState {
    items: IUser[];
    totalItems: number;
    totalPage: number;
    pageSize: number;
    loading: boolean;
    deletedCount: number;
    error: string | null;
}

export type UsersActionTypes = 
    | LoadUsersPagingRequest
    | LoadUsersPagingSuccess
    | LoadUsersPagingFailure;

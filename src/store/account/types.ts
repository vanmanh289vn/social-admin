export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOAD_CURRENT_LOGIN_USER_REQUEST = 'LOAD_CURRENT_LOGIN_USER_REQUEST';
export const LOAD_CURRENT_LOGIN_USER_SUCCESS = 'LOAD_CURRENT_LOGIN_USER_SUCCESS';
export const LOAD_CURRENT_LOGIN_USER_FAILURE = 'LOAD_CURRENT_LOGIN_USER_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export interface AuthenticateUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];

}

interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        username: string;
        password: string;
    };
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: {
        token: string;
        user: AuthenticateUser;
    };
}

interface LoginFailure {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    };
}

interface Logout {
    type: typeof LOG_OUT;
}

interface LoadCurrentLoginUserRequest {
    type: typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

interface LoadCurrentLoginUserSuccess {
    type: typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
    payload: {
        user: AuthenticateUser;
    };
}

interface LoadCurrentLoginUserFailure {
    type: typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
    payload: {
        error: string;
    };
}

export interface AccountState {
    user: AuthenticateUser | null;
    loading: boolean;
    error: string | null;
    token: string | null;

}

export type AccountActionTypes = 
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | Logout
    | LoadCurrentLoginUserRequest
    | LoadCurrentLoginUserSuccess
    | LoadCurrentLoginUserFailure;
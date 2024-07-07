export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export interface AuthenticateUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;

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
    | Logout;
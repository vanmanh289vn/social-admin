import {
    AccountActionTypes, 
    AccountState,
    LOAD_CURRENT_LOGIN_USER_FAILURE,
    LOAD_CURRENT_LOGIN_USER_REQUEST,
    LOAD_CURRENT_LOGIN_USER_SUCCESS,
    LOG_OUT, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS 
} from './types';

const initialState: AccountState = {
    user: null,
    loading: false,
    error: null,
    token: null
};

const accountReducer = (
    state: AccountState = initialState,
    action: any
): AccountState => {
    switch(action.type){
        case LOGIN_REQUEST: {
            return {...state, loading: true};
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                token: null,
                error: action.payload.error
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                user: null,
                error: null,
                token: null
            }
        }
        case LOAD_CURRENT_LOGIN_USER_REQUEST: {
            return {...state, loading: true}
        }
        case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
            return {
                ...state, 
                loading: false,
                user: action.payload.user,
            }
        }
        case LOAD_CURRENT_LOGIN_USER_FAILURE: {
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
            }
        }
        default:
            return state;
    }
};

export {accountReducer};
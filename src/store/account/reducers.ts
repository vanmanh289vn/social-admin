import {
    AccountActionTypes, 
    AccountState,
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
                token: action.payload.token
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
        default:
            return state;
    }
};

export {accountReducer};
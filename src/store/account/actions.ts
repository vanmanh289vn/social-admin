
import { AccountActionTypes, LOG_OUT, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types"
import { userService } from "../../services";
import { Dispatch } from "react";
import { history } from '../../helpers';

export const login = (username: string, password: string, from: string) => {
    return (dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: username,
                password: password,
            },
        });

        userService.login(username, password).then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res,
            });
            history.push(from);
        }, (error) => {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {error: error.toString()},
            });
        });
    };
};

export const logout = (): AccountActionTypes => {
    return { type: LOG_OUT};
};
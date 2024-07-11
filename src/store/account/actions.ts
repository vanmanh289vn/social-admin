
import { AccountActionTypes, LOAD_CURRENT_LOGIN_USER_FAILURE, LOAD_CURRENT_LOGIN_USER_REQUEST, LOAD_CURRENT_LOGIN_USER_SUCCESS, LOG_OUT, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types"
import { userService } from "../../services";
import { Dispatch } from "react";
import { history } from '../../helpers';

export const login = (username: string, password: string, from: string) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: username,
                password: password,
            },
        });

        // userService.login(username, password).then((res) => {
        //     dispatch({
        //         type: LOGIN_SUCCESS,
        //         payload: res,
        //     });
        //     history.push(from);
        // }, (error) => {
        //     dispatch({
        //         type: LOGIN_FAILURE,
        //         payload: {error: error.toString()},
        //     });
        // });

        try {
            const response = await userService.login(username, password);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response,
            });
            history.push(from);
        } catch (error: any) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {error: error.toString()},
            });
        }
    };
};

export const logout = (): AccountActionTypes => {
    return { type: LOG_OUT};
};

export const getCurrentLoginUser = () => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({
            type: LOAD_CURRENT_LOGIN_USER_REQUEST,
        });
        try {
            const response = await userService.getCurrentLoginUser();
            dispatch({
                type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
                payload: {user: response},
            });
        } catch (error: any) {
            dispatch({
                type: LOAD_CURRENT_LOGIN_USER_FAILURE,
                payload: {error: error.toString()}
            });
        }
    };
};
import { AnyAction, Dispatch } from "redux"
import { ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS, DELETE_USERS_FAILURE, DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, IAddUserRequest, IUpdateUserRequest, LOAD_USERS_PAGING_FAILURE, LOAD_USERS_PAGING_REQUEST, LOAD_USERS_PAGING_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UsersActionTypes } from "./types"
import { userService } from "../../services";
import { ALERT_ERROR, ALERT_SUCCESS, AlertActionTypes, CLEAR_ALERT } from "../alert/types";
import { ThunkDispatch } from "redux-thunk";

export const loadUserPaging = (
    keyword: string,
    currentPage: number,
    pageSize: number
) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: LOAD_USERS_PAGING_REQUEST,
            });

            const res = await userService.getUsersPaging(
                keyword,
                currentPage,
                pageSize
            );

            dispatch({
                type: LOAD_USERS_PAGING_SUCCESS,
                payload: res
            });

        } catch (error: any) {
            dispatch({
                type: LOAD_USERS_PAGING_FAILURE,
                payload: {error: error.toString()},
            });
        }
    };
};

export const addUser = (user: IAddUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: ADD_USER_REQUEST,
            });

            var result = await userService.addUser(user);

            if (result.status === 201) {
                dispatch({
                    type: ADD_USER_SUCCESS,
                });
    
                dispatch({
                    type: ALERT_SUCCESS,
                    payload: { message : 'Thêm người dùng thành công!'}
                });

            } else {

                dispatch({
                    type: ADD_USER_FAILURE,
                    payload: { error: result.message },
                });

                dispatch({
                    type: ALERT_ERROR,
                    payload: { message : 'Thêm người dùng thất bại!'}
                });
            }

        } catch (error: any) {
            dispatch({
                type: ADD_USER_FAILURE,
                payload: { error: error.toString() },
            });

            dispatch({
                type: ALERT_ERROR,
                payload: { message : 'Thêm người dùng thất bại!  (case Catch)'}
            });
        }

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000);
    };
};

export const updateUser = (id: string, user: IUpdateUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: UPDATE_USER_REQUEST,
            });

            await userService.updateUser(id, user);

            dispatch({
                type: UPDATE_USER_SUCCESS,
            });

            dispatch({
                type: ALERT_SUCCESS,
                payload: { message : 'Sửa người dùng thành công!'}
            });

        } catch (error: any) {
            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: { error: error.toString()}
            });

            dispatch({
                type: ALERT_ERROR,
                payload: { message : 'Sửa người dùng thất bại!  (case Catch)'}
            });
        }

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000);
    };
};

export const getUserById = (id: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: GET_USER_BY_ID_REQUEST,
            });

            const res = await userService.getUserById(id);

            dispatch({
                type: GET_USER_BY_ID_SUCCESS,
                payload: {
                    user: res,
                },
            });
        } catch (error: any) {
            dispatch({
                type: GET_USER_BY_ID_FAILURE,
                payload: { error: error.toString()},
            });
        }
    };
};

export const deleteUsers = (userIds: string[]) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        try {
            dispatch({
                type: DELETE_USERS_REQUEST,
            });

            await userService.deleteUsers(userIds);

            dispatch({
                type: DELETE_USERS_SUCCESS,

            });

        } catch (error: any) {
            dispatch({
                type: DELETE_USERS_FAILURE,
                payload: { error: error.toString() },
            });
        }
    };
};
import { Dispatch } from "redux"
import { ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS, IAddUserRequest, LOAD_USERS_PAGING_FAILURE, LOAD_USERS_PAGING_REQUEST, LOAD_USERS_PAGING_SUCCESS, UsersActionTypes } from "./types"
import { userService } from "../../services";
import { ALERT_ERROR, ALERT_SUCCESS, AlertActionTypes, CLEAR_ALERT } from "../alert/types";

export const loadUserPaging = (
    keyword: string,
    currentPage: number,
    // pageSize: number
) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: LOAD_USERS_PAGING_REQUEST,
            });

            const res = await userService.getUsersPaging(
                keyword,
                currentPage,
                // pageSize
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
    
                console.log('Add user success ...');
                console.log(result);
    
                dispatch({
                    type: ALERT_SUCCESS,
                    payload: { message : 'Thêm người dùng thành công!'}
                });

                console.log('Alert success ... them nguoi dung thanh cong ...');

            } else {
                console.log('Add user failure ...');
                console.log(result);

                dispatch({
                    type: ADD_USER_FAILURE,
                    payload: { error: result.message },
                });

                dispatch({
                    type: ALERT_ERROR,
                    payload: { message : 'Thêm người dùng thất bại!'}
                });

                console.log('Alert failure ... them nguoi dung that bai ...');
            }

        } catch (error: any) {
            console.log('Add user failure ... (case Catch)');
            dispatch({
                type: ADD_USER_FAILURE,
                payload: { error: error.toString() },
            });

            dispatch({
                type: ALERT_ERROR,
                payload: { message : 'Thêm người dùng thất bại!  (case Catch)'}
            });

            console.log('Alert failure ... them nguoi dung that bai ...  (case Catch)');
        }

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000);
    };
};
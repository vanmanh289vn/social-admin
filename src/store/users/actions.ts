import { Dispatch } from "redux"
import { ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS, IAddUserRequest, LOAD_USERS_PAGING_FAILURE, LOAD_USERS_PAGING_REQUEST, LOAD_USERS_PAGING_SUCCESS, UsersActionTypes } from "./types"
import { userService } from "../../services";

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
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: ADD_USER_REQUEST,
            });

            await userService.addUser(user);

            dispatch({
                type: ADD_USER_SUCCESS,
            });
            
        } catch (error: any) {
            dispatch({
                type: ADD_USER_FAILURE,
                payload: { error: error.toString() },
            });
        }
    };
};
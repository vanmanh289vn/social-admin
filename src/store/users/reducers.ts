import { LOAD_USERS_PAGING_FAILURE, LOAD_USERS_PAGING_REQUEST, LOAD_USERS_PAGING_SUCCESS, UsersState } from "./types";

const initialState: UsersState = {
    items: [],
    totalItems: 0,
    totalPage: 0,
    pageSize: 0,
    loading: false,
    deletedCount: 0,
    error: null,
}

const usersReducer = (
    state: UsersState = initialState,
    action: any
): UsersState => {
    switch (action.type) {
        case LOAD_USERS_PAGING_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case LOAD_USERS_PAGING_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                totalItems: action.payload.totalItems,
                totalPage: action.payload.totalPage,
                pageSize: action.payload.pageSize,
                loading: false,
                error: null,
            };
        }
        case LOAD_USERS_PAGING_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
            };
        }
        default:
            return state;
    }
};

export { usersReducer };
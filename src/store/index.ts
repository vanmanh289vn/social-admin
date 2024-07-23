import { combineReducers } from "redux";
import { accountReducer } from "./account/reducers";
import thunk  from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setAuthToken } from "../helpers";
import { usersReducer } from "./users/reducers";
import { alertReducer } from "./alert/reducers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account'],
};


const rootReducer = combineReducers({
    account: accountReducer,
    users: usersReducer,
    alert: alertReducer,
});

const persistedReducer = persistReducer<AppState, any>(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;


// @reduxjs/toolkit đã tích hợp sẵn thunk middleware, vì vậy không cần thêm nó một cách thủ công. 
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false, // Vô hiệu hóa kiểm tra tuần tự hóa
        }),
    });

const persistedStore = persistStore(store);

let currentState = store.getState() as AppState;

store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState() as AppState;
    // if the token changes set the value in localStorage and axios headers
    if (previousState.account.token !== currentState.account.token) {
        const token = currentState.account.token;
        if (token) {
            setAuthToken(token);
        }
    }
});

export { store, persistedStore };

export type AppDispatch = typeof store.dispatch;
import { combineReducers } from "redux";
import { accountReducer } from "./account/reducers";
import thunk  from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account'],
};


const rootReducer = combineReducers({
    account: accountReducer,
});

const persistedReducer = persistReducer<AppState, any>(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;



const store = configureStore({
    // reducer: rootReducer,
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const persistedStore = persistStore(store);

export { store, persistedStore };

export type AppDispatch = typeof store.dispatch;
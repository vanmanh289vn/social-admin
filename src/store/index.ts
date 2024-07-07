import { applyMiddleware, combineReducers } from "redux";
import { accountReducer } from "./account/reducers";
import { thunk }  from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    account: accountReducer
});

export type AppState = ReturnType<typeof rootReducer>;

// export default function configureStore() {
//     const middlewares = [thunkMiddleware];
//     const middlewareEnhancer = applyMiddleware(...middlewares);

//     return createStore(rootReducer, middlewareEnhancer);
// }

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
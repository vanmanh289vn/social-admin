import axios from "axios";
import env from "react-dotenv";
import { store } from "../store";
import { logout } from "../store/account/actions";
import { history } from "./history";
import { UrlConstants } from "../constants";

const api = axios.create({
    baseURL: `${env.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            // can xem lai cho nay co thuc hien dc ko nhe!!!
            store.dispatch(logout());
            history.push(UrlConstants.LOGIN);
        }
        return Promise.reject(err);
    }
);

export { api };
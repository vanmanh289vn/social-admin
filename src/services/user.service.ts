// import env from "react-dotenv";
import { api, IPagination } from "../helpers";
import { IAddUserRequest, IUser } from "../store/users/types";



// const login = async (username: string, password: string) => {

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({username, password}),
    // };

    // return fetch(`${env.API_URL}/api/auth/signin`, requestOptions)
    // .then(handleResponse)
    // .then(
    //     (response) => {
    //         sessionStorage.setItem('user', JSON.stringify(response));
    //         return response;
    //     }
    // );

    // const handleResponse = (response: any) => {
    //     return response.text().then((text: string) => {
    //         const data = text && JSON.parse(text);
    //         if(!response.ok) {
    //             if (response.status === 401) {
    //                 logout();
    //             }

    //             const error = (data && data.message) || response.statusText;
    //             return Promise.reject(error);
    //         }

    //         return data;
    //     });
    // };

const login = async (username: string, password: string) => {

const body = { username, password };
return await api.post<any>('/auth/signin', body).then((response) => {
    // sessionStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
    });
};

const getCurrentLoginUser = async (): Promise<any> => {
    return await api.get<any>('/auth/signin').then((response) => {
        return response.data;
    });
};

// ham nay co the se khong dung den ... xoa di sau nay...
const logout = () => {
    sessionStorage.removeItem('user');
}

const getUsersPaging = async (
    keyword: string,
    page: number,
    // pageSize: number
): Promise<IPagination<IUser>> => {
    const res = await api.get<IPagination<IUser>>(`/user/all?keyword=${keyword}&page=${page}`)
    .then((response) => {
        return response.data;
    });
    return res;
};

const addUser = async (user: IAddUserRequest): Promise<any> => {
    const res = await api.post(`/user`, user)
    .then((response) => {
        return response.data;
    });
    return res;
};



export const userService = {
    login,
    logout,
    getCurrentLoginUser,
    getUsersPaging,
    addUser,
}
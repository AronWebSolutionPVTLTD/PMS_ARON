import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";
const config = {
    withCredentials: true,
};
const getAllUser = () => {
    return http.get(`${BASE_URL}/user/all`)
}
const createUser = data => {
    return http.post(`${BASE_URL}/user/register`, data);
};

const editUser = (id, data) => {
    return http.put(`${BASE_URL}/api/user/${id}`, data);
};

const removeUser = id => {
    return http.delete(`${BASE_URL}/api/user/${id}`);
};

const login = data => {
    return http.post(`${BASE_URL}/user/login`, data,config);
};

const activate = data => {
    return http.post(`${BASE_URL}/user/activate`,data);
};
export default {
    getAllUser,
    createUser,
    editUser,
    removeUser,
    login,activate
};
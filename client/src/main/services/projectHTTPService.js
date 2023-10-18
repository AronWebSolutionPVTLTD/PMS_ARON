import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllProject = () => {
    return http.get(`${BASE_URL}/projects`)
}


const createProject = data => {
    return http.post(`${BASE_URL}/projects`, data);
};

const editProject = (id, data) => {
    return http.put(`${BASE_URL}/projects/${id}`, data);
};

const removeProject = id => {
    return http.delete(`${BASE_URL}/projects/${id}`);
};

const uploadFile = (data) => {
    return http.post(`${BASE_URL}/api/addfile`, data)
}

const uploadFile2 = (data) => {
    return http.get(`${BASE_URL}/projects/monthly`, data)
}

const uploadFile3 = (data) => {
    return http.get(`${BASE_URL}/projects/yearly`, data)
}

export default {
    getAllProject,
    createProject,
    editProject,
    removeProject,
    uploadFile,uploadFile2,uploadFile3
};
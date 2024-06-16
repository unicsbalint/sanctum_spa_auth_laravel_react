import axios from "axios";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

const API_URL = "https://algoverzum.hu/api";
const APIUtils = {
    post: (apiEndPoint, payload = {}) => {
        const url = `${API_URL}/${apiEndPoint}`;
        return axios.post(url, payload);
    },
    get: (apiEndPoint, payload = {}) => {
        const url = `${API_URL}/${apiEndPoint}`;
        return axios.get(url, {params: payload});
    }
};

export default APIUtils;
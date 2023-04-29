import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Unexpected Error");
        } else {
            return Promise.reject(error);
        }
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;

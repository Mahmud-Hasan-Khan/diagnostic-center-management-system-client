import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://diagnostic-center-management-system-server-with-mongoose.vercel.app'
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    //interceptor 401 & 401 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('error', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
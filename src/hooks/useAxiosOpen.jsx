import axios from "axios";

const axiosOpen = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://diagnostic-center-management-system-server-with-mongoose.vercel.app'
})

const useAxiosOpen = () => {
    return axiosOpen;
};

export default useAxiosOpen;
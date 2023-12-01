import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const useAllTests = () => {

    const axiosOpen = useAxiosOpen();

    const { data: tests = [], refetch } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosOpen.get('/allTests');
            return res.data;
        }
    })
    return [tests, refetch]
};

export default useAllTests;
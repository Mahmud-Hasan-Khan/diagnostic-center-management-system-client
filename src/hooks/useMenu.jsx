import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const useMenu = () => {

    const axiosOpen = useAxiosOpen();

    const { data: menu = [], refetch, isPending: loading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosOpen.get('/menu')
            return res.data;
        }
    });

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         });
    // }, [])
    return [menu, loading, refetch]
}

export default useMenu;
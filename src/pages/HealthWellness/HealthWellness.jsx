import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import BlogCard from "./BlogCard";
import { Helmet } from "react-helmet-async";

const HealthWellness = () => {
    const axiosOpen = useAxiosOpen();
    //data Load Using TanStack Query
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosOpen.get('/healthWellness');
            return res.data;
        }
    })
    // console.log(blogs);

    return (
        <div className="grid grid-cols-1 gap-1">
            <Helmet>
                <title>Health Wellness | MediCare</title>
            </Helmet>
            {
                blogs.map(blog => <BlogCard key={blog._id} blog={blog} ></BlogCard>)
            }
        </div>
    );
};

export default HealthWellness;
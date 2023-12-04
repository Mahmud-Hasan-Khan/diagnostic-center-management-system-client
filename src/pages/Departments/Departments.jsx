import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import Container from "../../components/shared/Container/Container"
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import DepartmentCard from "./DepartmentCard";

const Departments = () => {
    const axiosOpen = useAxiosOpen();

    //data Load Using TanStack Query
    const { data: departments = [] } = useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
            const res = await axiosOpen.get('/departments');
            return res.data;
        }
    })
    console.log(departments);

    return (
        <div>
            <Helmet>
                <title>Departments | MediCare</title>
            </Helmet>
            <Container>
                <SectionTitle heading="Departments" subheading="All Our Departments"></SectionTitle>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 place-content-center">
                    {
                        departments.map(department => <DepartmentCard key={department._id} department={department} ></DepartmentCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Departments;
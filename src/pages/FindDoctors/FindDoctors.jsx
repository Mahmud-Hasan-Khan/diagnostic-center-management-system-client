import { useState } from "react";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import DoctorCard from "./DoctorCard";
import Container from '../../components/shared/Container/Container'

const FindDoctors = () => {
    const axiosOpen = useAxiosOpen();
    const [searchQuery, setSearchQuery] = useState('');

    //data Load Using TanStack Query
    const { data: doctors = [], isPending: loading } = useQuery({
        queryKey: ['doctors', searchQuery],
        queryFn: async () => {
            const res = await axiosOpen.get('/findDoctors');
            const filteredDoctors = res.data.filter((reservation) =>
                reservation.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return filteredDoctors;
        }
    });

    return (

        <Container>
            <Helmet>
                <title>Find Doctor | MediCare</title>
            </Helmet>
            <div >
                <SectionTitle heading="Find Doctors" subheading="All Our Doctors Available"></SectionTitle>
                <div>
                    <div className="flex flex-col-reverse items-center justify-between">
                        <div className="mx-auto pb-4">
                            <h1 className='text-[#e00000] text-center lg:text-3xl lg:px-3 font-medium py-2'>Find Doctor by Name</h1>
                            <div className="w-full px-3 flex items-center gap-2 justify-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by Doctor Name"
                                        className=" px-5 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900 pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaSearch className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
                        </div>
                    ) : doctors && doctors.length > 0 ? (
                        <div>
                            <div className="px-6">
                                <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-2">Total Doctor Available {doctors.length}</h4>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
                                {
                                    doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor} ></DoctorCard>)
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-lg text-[#ac52b4] font-medium">No Reservation found.</div>
                    )}
                </div>

            </div>
        </Container>
    );
};

export default FindDoctors;
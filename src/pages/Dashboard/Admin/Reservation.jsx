import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Reservation = () => {

    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    //data Load Using TanStack Query
    const { data: reservations = [], refetch, isPending: loading } = useQuery({
        queryKey: ['reservations', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get('/allReservations');
            const filteredReservations = res.data.filter((reservation) =>
                reservation.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return filteredReservations;
        }
    });

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <Helmet>
                <title>Reservations | Admin Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="All The Reservations " subheading="Specific test Appointment "></SectionTitle>
                <div>
                    <div className="flex flex-col-reverse items-center justify-between">
                        <div className="mx-auto pb-4">
                            <h1 className='text-[#e00000] text-center lg:text-3xl lg:px-3 font-medium py-2'>Find Reservations by Email</h1>
                            <div className="w-full px-3 flex items-center gap-2 justify-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by Email"
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
                    ) : reservations && reservations.length > 0 ? (
                        <div className="px-6">
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-2">Total Test Appointment Found {reservations.length}</h4>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="bg-[#00AEEF] text-white text-base font-normal">
                                            <th>Serial</th>
                                            <th>Test Name</th>
                                            <th>User Email</th>
                                            <th>Test Date </th>
                                            <th>Test Status</th>
                                            <th>Report Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.map((test, index) => (
                                            <tr key={test._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className="font-medium">{test?.testTitle}</p>
                                                </td>
                                                <td>
                                                    <p className="bg-base-300 rounded-full px-2 text-center text-base">{test?.email}</p>
                                                </td>
                                                <td>{moment(test?.appointmentDate).format("Do MMM YYYY")}</td>
                                                <td>{test?.testStatus}</td>
                                                <td>{test?.reportStatus}</td>
                                                {/* <td>
                                                    {test?.testStatus === 'Canceled' ? <button disabled onClick={() => handleCancelAppointment(test._id)}
                                                        className="bg-base-300  p-2 rounded text-[#e00000] font-medium"
                                                    >
                                                        Already Canceled
                                                    </button> : <button onClick={() => handleCancelAppointment(test._id)}
                                                        className="bg-[#e00000] hover:bg-[#ff9416] p-2 rounded text-white font-medium"
                                                    >
                                                        Cancel Appointment
                                                    </button>}
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-lg text-[#ac52b4] font-medium">No Reservation found.</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Reservation;



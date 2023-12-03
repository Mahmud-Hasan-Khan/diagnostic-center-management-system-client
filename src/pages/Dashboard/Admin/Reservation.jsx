import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const Reservation = () => {

    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [reportLinks, setReportLinks] = useState("");

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

    const handleCancelReservation = (id) => {
        Swal.fire({
            title: "Are you sure to cancel the Reservation?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/upcomingAppointment/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Reservation has been canceled",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    const handleReportStatus = (id) => {
        Swal.fire({
            title: "Are you sure to Upload the Test Result?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateReportStatus/${id}`, { reportLink: reportLinks[id] })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Test Result has been uploaded",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <Helmet>
                <title>Reservations | Admin Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="All The Reservations " subheading="Update Reservation Status"></SectionTitle>
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
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-2">Total Reservation Found {reservations.length}</h4>
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
                                                <td>
                                                    {test?.testStatus === 'Canceled' ? (<span className="bg-red-100  px-4 py-2 rounded text-[#e00000] font-medium"
                                                    >
                                                        Canceled
                                                    </span>) : test?.testStatus === 'Done' ? (<span className="bg-green-300 px-4 py-2 rounded font-medium" > Test Done </span>) : <button onClick={() => handleCancelReservation(test._id)}
                                                        className="bg-[#e00000] hover:bg-[#ff9416] p-2 rounded text-white font-medium"
                                                    >
                                                        Cancel Now
                                                    </button>}
                                                </td>

                                                <td>
                                                    {test?.reportStatus === 'Delivered' ? (
                                                        <button disabled className="bg-[#00afef24] px-4 py-2 rounded text-[#00AEEF] font-medium">
                                                            Delivered
                                                        </button>
                                                    ) : test?.testStatus === 'Canceled' ? (
                                                        <span className="bg-red-100  px-4 py-2 rounded text-[#e00000] font-medium">Reservation Canceled</span>
                                                    ) : (
                                                        <div className="flex gap-1">
                                                            <div>
                                                                <input
                                                                    type="url"
                                                                    placeholder="Enter Report Link"
                                                                    required
                                                                    value={reportLinks[test._id] || ''}
                                                                    onChange={(e) => setReportLinks({ ...reportLinks, [test._id]: e.target.value })}
                                                                    className="px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900 w-36"
                                                                />
                                                            </div>
                                                            <button
                                                                onClick={() => handleReportStatus(test._id)}
                                                                className="bg-lime-500 hover:bg-[#ff9416] p-2 rounded text-white font-medium"
                                                            >
                                                                Submit Report
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>

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



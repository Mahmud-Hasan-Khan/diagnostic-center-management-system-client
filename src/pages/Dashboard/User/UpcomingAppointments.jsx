import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const UpcomingAppointments = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    //data Load Using TanStack Query
    const { data: appointments = [], refetch, isPending: loading } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcomingAppointments?email=${user?.email}`);
            return res.data;
        }
    })

    const handleCancelAppointment = (id) => {
        Swal.fire({
            title: "Are you sure to cancel the appointment?",
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
                                text: "Your Appointment has been canceled",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    return (
        <div className="bg-white rounded-lg">
            <Helmet>
                <title>Upcoming Appointments | Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="Upcoming Appointments" subheading="Manage Your Appointments"></SectionTitle>
                <div className="lg:mt-6">
                    {loading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
                        </div>
                    ) : appointments && appointments.length > 0 ? (
                        <div className="max-w-5xl mx-auto">
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium">Total Appointment Found {appointments.length}</h4>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="bg-[#00AEEF] text-white text-base font-normal ">
                                            <th>Serial</th>
                                            <th>Test Name</th>
                                            <th>Appointment Date </th>
                                            <th>Appointment Time</th>
                                            <th>Appointment Status</th>
                                            <th>Cancel Appointment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((test, index) => (
                                            <tr key={test._id}>
                                                <th>{index + 1}</th>
                                                <td>{test?.testTitle}</td>
                                                <td>{moment(test?.appointmentDate).format("Do MMM YYYY")}</td>
                                                <td>{test?.appointmentTime}</td>
                                                <td>{test?.testStatus}</td>
                                                <td>
                                                    {test?.testStatus === 'Canceled' ? <button disabled onClick={() => handleCancelAppointment(test._id)}
                                                        className="bg-base-300  p-2 rounded text-[#e00000] font-medium"
                                                    >
                                                        Already Canceled
                                                    </button> : <button onClick={() => handleCancelAppointment(test._id)}
                                                        className="bg-[#e00000] hover:bg-[#ff9416] p-2 rounded text-white font-medium"
                                                    >
                                                        Cancel Appointment
                                                    </button>}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-lg text-[#ac52b4] font-medium">No jobs found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingAppointments;
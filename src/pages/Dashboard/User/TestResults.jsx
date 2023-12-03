import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import moment from "moment";

const TestResults = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    //data Load Using TanStack Query
    const { data: TestResults = [], isPending: loading } = useQuery({
        queryKey: ['TestResults', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/testResults?email=${user?.email}&reportStatus="Delivered"`)

            return res.data;
        },
        enabled: !!user,
    });
    console.log(TestResults);

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <Helmet>
                <title>Test Result | {user?.displayName} Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="All The Reservations " subheading="Update Reservation Status"></SectionTitle>
                <div>
                    {loading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
                        </div>
                    ) : TestResults && TestResults.length > 0 ? (
                        <div className="px-6">
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-2">Total Reservation Found {TestResults.length}</h4>
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
                                        {TestResults.map((test, index) => (
                                            <tr key={test._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className="font-medium">{test?.testTitle}</p>
                                                </td>
                                                <td>
                                                    <p className="bg-base-300 rounded-full px-2 text-center text-base">{test?.email}</p>
                                                </td>
                                                <td>{moment(test?.appointmentDate).format("Do MMM YYYY")}</td>

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

export default TestResults;
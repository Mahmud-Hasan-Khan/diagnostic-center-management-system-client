import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

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
                <title>Test Result | Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="Tests Results" subheading="You Can Download Your Test Result"></SectionTitle>
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
                                                <td>
                                                    <p className="font-medium bg-green-300 px-4 py-2 rounded text-center flex items-center gap-1"><IoCheckmarkDoneSharp className="text-lg"></IoCheckmarkDoneSharp> {test?.testStatus}</p>
                                                </td>
                                                <td>
                                                    <Link className="text-white font-medium bg-orange-500 px-4 py-2 rounded text-center hover:shadow-lg flex items-center gap-1" to={test?.reportLink} target="_blank" rel="noopener noreferrer"><FaCloudDownloadAlt className="text-lg"></FaCloudDownloadAlt> Download Report</Link>
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

export default TestResults;
import Swal from "sweetalert2";
import useAllTests from "../../../hooks/useAllTests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import moment from "moment";
import { MdOutlineDeleteOutline, MdOutlineRateReview } from "react-icons/md";
import { Link } from "react-router-dom";

const ManageAllTest = () => {

    const [tests, refetch, loading] = useAllTests();
    const axiosSecure = useAxiosSecure();
    // console.log(tests);

    const handleDeleteJob = (id) => {
        Swal.fire({
            title: "Are you sure to delete the test?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteTest/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Test has been deleted",
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
                <title>All Tests | Admin Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="All Tests" subheading="Manage All Tests"></SectionTitle>
                <div className="lg:mt-6">
                    {loading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
                        </div>
                    ) : tests && tests.length > 0 ? (
                        <div className="px-6 mx-auto">
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-1">Total Test Found {tests.length}</h4>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="bg-[#00AEEF] text-white text-base font-normal ">
                                            <th>Serial</th>
                                            <th>Test Image</th>
                                            <th>Test Name </th>
                                            <th>Available Date & Slots</th>
                                            <th>Delete Test</th>
                                            <th>Update Test</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map((test, index) => (
                                            <tr key={test._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask rounded w-32 h-32">
                                                            <img src={test?.image} />
                                                        </div>
                                                    </div></td>
                                                <td>
                                                    <div className="w-32">
                                                        <p className="text-base font-medium">{test?.title}</p>
                                                        <p className="text-sm font-normal opacity-50">{test.shortDescription} </p>
                                                    </div>

                                                </td>
                                                <td className="flex flex-col items-center justify-center gap-2">
                                                    {test?.availableDates.map((date) => (
                                                        <p className="text-sm p-1 border w-40 bg-lime-100 rounded" key={date.date}>
                                                            {moment(date.date).format("MMM Do YYYY")} Slots: {date.slots}
                                                        </p>
                                                    ))}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/dashboard/updateTest/${test._id}`}
                                                        className="bg-orange-600 hover:bg-[#00AEEF] p-2 rounded text-white font-medium flex gap-1"
                                                    ><MdOutlineRateReview className="text-xl text-white"></MdOutlineRateReview>
                                                        Update
                                                    </Link>
                                                </td>
                                                <td><button onClick={() => handleDeleteJob(test._id)} className="bg-[#e00000] hover:bg-[#00AEEF] p-2 rounded flex gap-1 text-white"> <MdOutlineDeleteOutline className="text-xl text-white"></MdOutlineDeleteOutline>Delete</button></td>

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

export default ManageAllTest;
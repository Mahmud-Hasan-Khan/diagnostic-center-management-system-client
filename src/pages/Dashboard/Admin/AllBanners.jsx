import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";

const AllBanners = () => {

    const axiosSecure = useAxiosSecure();

    //data Load Using TanStack Query
    const { data: banners = [], refetch, isPending: loading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/AllBanners');
            return res.data;
        }
    })
    console.log(banners);

    const handleDeleteBanner = (id) => {
        Swal.fire({
            title: "Are you sure to delete the Banner?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteBanner/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Banner has been deleted",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const handleSetActive = (id) => {
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
                <title>All Banners | Dashboard</title>
            </Helmet>
            <div >
                <SectionTitle heading="All Banners" subheading="You Can Delete & Set Banner for Home Page"></SectionTitle>
                <div>
                    {loading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg text-[#00AEEF]"></span>
                        </div>
                    ) : banners && banners.length > 0 ? (
                        <div className="px-6">
                            <h4 className="text-center text-lg text-[#ac52b4] font-medium pb-1">Total Banner Found {banners.length}</h4>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="bg-[#00AEEF] text-white text-base font-normal">
                                            <th>Serial</th>
                                            <th>Banner Name</th>
                                            <th>Banner Title</th>
                                            <th>Delete Banner</th>
                                            <th>Active Banner</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {banners.map((banner, index) => (
                                            <tr key={banner._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className="font-medium">{banner?.name}</p>
                                                </td>
                                                <td>
                                                    <p>{banner?.title}</p>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleteBanner(banner._id)} className="bg-[#e00000] hover:bg-[#00AEEF] p-2 rounded flex gap-1 text-white"> <MdOutlineDeleteOutline className="text-xl text-white"></MdOutlineDeleteOutline>Delete</button>
                                                </td>
                                                <td>
                                                    {
                                                        banner?.isActive === true ? <>
                                                            <p className="font-medium bg-green-300 px-4 py-2 rounded text-center flex items-center gap-1"><IoCheckmarkDoneSharp className="text-lg"></IoCheckmarkDoneSharp>Activated</p>
                                                        </> : <>
                                                            <button onClick={() => handleSetActive(banner._id)} className="font-medium bg-[#00AEEF] text-white  px-4 py-2 rounded text-center flex items-center gap- hover:bg-orange-600 "><CiSettings className="text-lg"></CiSettings>Set Active</button>
                                                        </>
                                                    }

                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-lg text-[#ac52b4] font-medium">No Banner found.</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllBanners;
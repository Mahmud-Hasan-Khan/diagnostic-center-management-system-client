import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    //data Load Using TanStack Query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
        const modal = document.getElementById('my_modal_3');
        modal.showModal();
    };

    const closeModal = () => {
        setSelectedUser(null);
        const modal = document.getElementById('my_modal_3');
        modal.close();
    };

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure to change the user Role?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateUserRole/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "User Role has been changed as Admin.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    const handleBlockUser = (id) => {
        Swal.fire({
            title: "Are you sure to block the user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateUserStatus/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "User has been Blocked!.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div>
            <>
                <Helmet>
                    <title>All Users | Dashboard</title>
                </Helmet>

                <div className="bg-white rounded-lg">
                    <div className="flex justify-between items-center text-3xl p-4 ">
                        <h2 >All Users</h2>
                        <h2 >Total Users : {users.length} </h2>
                    </div>
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="table w-full mx-auto">
                                {/* head */}
                                <thead className="bg-info text-white">
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>USER ROLE</th>
                                        <th>USER STATUS</th>
                                        <th>SEE INFO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => <tr key={user._id}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td>
                                                {
                                                    user?.role === 'admin' ? <p className="bg-info text-white flex items-center justify-center rounded p-1 gap-1"> <FaUsers className="text-white"></FaUsers>Admin</p> : <button onClick={() => handleMakeAdmin(user._id)}
                                                        className="bg-orange-600 flex items-center p-1 gap-1 text-white rounded"> <FaUsers className="text-white"></FaUsers> Make Admin </button>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    user?.status === 'active' ? <button onClick={() => handleBlockUser(user._id)}
                                                        className="bg-[#e00000] flex items-center p-1 gap-1 text-white rounded"> <FaUser className="text-white"></FaUser> Block The User </button> : <p className="bg-black text-white flex items-center justify-center rounded p-1 gap-1"> <FaUser className="text-white"></FaUser>Blocked</p>
                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => openModal(user)} className="bg-warning p-1 rounded">
                                                    See Info
                                                </button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box flex flex-col justify-center items-center">
                            <form method="dialog">
                                <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg bg-warning text-black p-1 rounded">User Name: {selectedUser?.name}</h3>
                            {selectedUser && (
                                <div className="text-center grid grid-cols-2 gap-2 pt-2">

                                    <p className="font-semibold text-base bg-lime-300 rounded p-1">Email: {selectedUser?.email}</p>
                                    <p className="font-semibold text-base bg-[#e00000] p-1 rounded text-white">Blood Group: {selectedUser?.bloodGroup}</p>
                                    <p className="font-semibold text-base bg-info text-white p-1 rounded">District: {selectedUser?.district}</p>
                                    <p className="font-semibold text-base bg-info text-white p-1 rounded">Upazila: {selectedUser?.upazila}</p>
                                    <p className="font-semibold text-base bg-gray-200 p-1 rounded">User Role: {selectedUser?.role}</p>
                                    <p className="font-semibold text-base bg-gray-200 p-1 rounded">User Status: {selectedUser?.status}</p>
                                    {/* Add more user information fields as needed */}

                                </div>
                            )}
                        </div>
                    </dialog>
                </div>
            </>
        </div>
    );
};

export default AllUsers;
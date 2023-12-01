import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Container from "../../../components/shared/Container/Container";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    //data Load Using TanStack Query
    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProfile?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(userProfile);

    return (
        <div className="rounded-lg">
            <Helmet>
                <title>MediCare | Profile</title>
            </Helmet>
            <Container>
                {
                    userProfile?.map(profile => <div key={profile._id}>
                        <div className="w-full min-h-screen">
                            <div className="max-w-screen-md px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1">
                                <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                                    <div className="flex mx-auto sm:mr-10 sm:m-0">
                                        <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                                            <img alt="profil"
                                                src={user?.photoURL}
                                                className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0 space-y-2">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h5 className="bg-green-100 rounded p-1">District: <span className="mr-1 font-semibold"> {profile?.district}</span></h5>
                                            <h5 className="bg-green-100 rounded p-1">Upazila: <span className="mr-1 font-semibold"> {profile?.upazila}</span></h5>
                                        </div>
                                        <div className="flex items-center justify-between space-x-2">
                                            <h5 className="bg-green-400 rounded p-1">Account Status: <span className="mr-1 font-semibold uppercase text-white"> {profile.status}</span></h5>
                                            <h5 className="bg-[#e00000] rounded p-1 text-white">Blood Group: <span className="mr-1 font-semibold"> {profile.bloodGroup}</span></h5>
                                        </div>
                                        <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 items-center justify-end">
                                            <div className="flex">
                                                <Link to={`/dashboard/editProfile/${profile._id}`} className="bg-orange-500 text-white p-1 rounded">Edit Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full pt-5">
                                    <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">{user?.displayName}</h1>
                                    <p className="text-sm text-gray-500 md:text-base">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </Container >
        </div >
    );
};

export default UserProfile;
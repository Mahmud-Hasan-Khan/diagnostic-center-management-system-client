import { Helmet } from "react-helmet-async";
import Container from "../../../components/shared/Container/Container";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditUserProfile = () => {
    // const userProfile = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { loading, updateUserProfile } = useAuth();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [upazila1, setUpazila1] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [upazilaName, setUpazilaName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // data Load Using TanStack Query
    const { data: userProfile = {}, refetch } = useQuery({
        queryKey: ['userProfile', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${id}`);
            return res.data;
        }
    })
    console.log(userProfile);


    useEffect(() => {
        // Load districts and upazilas data from JSON files when the component mounts
        const fetchDistricts = async () => {
            try {
                const response = await fetch("https://diagnostic-center-management-system-server-with-mongoose.vercel.app/districts");
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error("Error loading districts:", error);
            }
        };

        const fetchUpazilas = async () => {
            try {
                const response = await fetch("https://diagnostic-center-management-system-server-with-mongoose.vercel.app/upazilas");
                const data = await response.json();
                setUpazilas(data);
                setUpazila1(data);
            } catch (error) {
                console.error("Error loading upazilas:", error);
            }
        };

        fetchDistricts();
        fetchUpazilas();
    }, []);
    // console.log(districts);
    // console.log(upazilas);

    const handleDistrictChange = (selectedDistrict) => {
        // Update the state when the user selects a district
        setSelectedDistrict(selectedDistrict);
        console.log(selectedDistrict);


        // Find the district object based on the selected district
        const districtObject = districts.find((district) => district.id === selectedDistrict);

        // console.log('Selected District:', districtObject.name);
        setDistrictName(districtObject.name)

        // Filter upazilas based on the selected district
        const filteredUpazilas = upazila1.filter((upazila) => upazila.district_id === selectedDistrict);

        // Set the filtered upazilas to the state
        setUpazilas(filteredUpazilas);

    }

    const handleUpazilaChange = (selectedUpazila) => {
        // Find the upazila object based on the selected upazila
        const upazilaObject = upazilas.find((upazila) => upazila.id === selectedUpazila);

        // console.log('Selected Upazila:', upazilaObject.name);
        setUpazilaName(upazilaObject.name)
        // Update the state when the user selects an upazila
        setSelectedUpazila(selectedUpazila);
    }

    const onSubmit = data => {
        const { name, email, image } = data;
        // console.log(data);
        // Image Upload
        const formData = new FormData()
        formData.append('image', image[0])

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                const imageUrl = imageData.data.display_url;
                const toastId = toast.loading('Registration Process Ongoing...');
                updateUserProfile(name, imageUrl)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: user.displayName,
                            email: user.email,
                            bloodGroup: data?.bloodGroup,
                            district: districtName,
                            upazila: upazilaName,
                        }
                        console.log(userInfo);
                        axiosSecure.patch(`/editUserProfile/${userProfile._id}`, userInfo)
                            .then(res => {

                                if (res.data.modifiedCount > 0) {
                                    // console.log('user profile info updated')
                                    reset();
                                    //toast
                                    toast.success('Registration Successful', { id: toastId });
                                    refetch();
                                    navigate(from, { replace: true });
                                }
                            })
                    })
                    .catch(error => toast.error(error.message, { id: toastId }))
            })

    };

    return (
        <div>
            <div className="rounded-lg">
                <Helmet>
                    <title>MediCare | Profile</title>
                </Helmet>
                <Container>
                    <div className="bg-white">
                        <div className='flex justify-center items-center' >
                            <div className='flex flex-col max-w-md px-6 rounded sm:p-10 border text-gray-900 relative gap-2'>
                                <h1 className='text-xl font-bold bg-[rgb(202,219,226)] absolute top-[2%] left-0 px-2 rounded-e-xl text-[#00AEEF]'>Update Your <span className="text-[#e00000] ">MEDICARE</span> Profile</h1>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate=''
                                    action=''
                                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                                >
                                    <div className='space-y-4'>
                                        <div>
                                            <label htmlFor='name' className='block mb-2 text-sm'>
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                {...register("name")} defaultValue={user?.displayName} readOnly
                                                id='name'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'

                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='email' className='block mb-2 text-sm'>
                                                Email address
                                            </label>
                                            <input
                                                type='email'
                                                {...register("email")}
                                                readOnly defaultValue={user?.email}
                                                id='email'
                                                placeholder='Enter Your Email Address'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                            />
                                        </div>

                                        {/* form Blood Group row */}
                                        <div className="md:flex gap-4 mb-8">
                                            <div className="form-control w-full">
                                                <label htmlFor='bloodGroup' className='block mb-2 text-sm'>
                                                    Blood Group
                                                </label>
                                                <label className="rounded">
                                                    <input
                                                        type='text'
                                                        {...register("bloodGroup")}
                                                        defaultValue={userProfile?.bloodGroup}
                                                        id='bloodGroup' readOnly
                                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* form District row */}
                                        <div className="md:flex gap-4 mb-8">
                                            <div className="form-control w-full">
                                                <label htmlFor='email' className='block mb-2 text-sm'>
                                                    District*
                                                </label>
                                                <label className="rounded">
                                                    <select {...register("district")}
                                                        className="px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900 w-full" required
                                                        onChange={(e) => handleDistrictChange(e.target.value)}
                                                    >
                                                        <option value="">Select Your District</option>
                                                        {districts.map((district) => (
                                                            <option key={district.id} value={district.id}>
                                                                {district.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>
                                        </div>

                                        {/* form Upazila row */}
                                        <div className="md:flex gap-4 mb-8">
                                            <div className="form-control w-full">
                                                <label htmlFor='email' className='block mb-2 text-sm'>
                                                    Upazila*
                                                </label>
                                                <label className="rounded">
                                                    <select {...register("upazila")}
                                                        className="px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900 w-full" required
                                                        onChange={(e) => handleUpazilaChange(e.target.value)}
                                                    >
                                                        <option value="">Select Your Upazila</option>
                                                        {upazilas.map((upazila) => (
                                                            <option key={upazila.id} value={upazila.id}>
                                                                {upazila.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                        {/* form Picture row */}
                                        <div>
                                            <label htmlFor='image' className='block mb-2 text-sm'>
                                                Select Your Profile Picture*
                                            </label>
                                            <input
                                                {...register("image", { required: true })}
                                                type='file'
                                                id='image'
                                                accept='image/*'
                                                className="file-input border rounded-md border-gray-300 focus:outline-[#00AEEF] file-input-warning w-full"
                                            />
                                            {errors.image && <span className='text-red-500 text-sm'>Image is required.</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type='submit'
                                            className='bg-[#00AEEF] w-full rounded-md py-2 text-white'
                                        >
                                            {loading ? (
                                                <ImSpinner3 className='m-auto animate-spin' size={24} />
                                            ) : (
                                                'Update Now'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default EditUserProfile;
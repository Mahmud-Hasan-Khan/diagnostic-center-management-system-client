import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Typewriter } from "react-simple-typewriter";
import registerImg from '../../assets/images/register.png';
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import Container from "../../components/shared/Container/Container";

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", " AB-", "O+", "O-"];

const Registration = () => {
    const { loading, createUser, updateUserProfile } = useAuth();
    const axiosOpen = useAxiosOpen();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [upazilaName, setUpazilaName] = useState("");

    useEffect(() => {
        // Load districts and upazilas data from JSON files when the component mounts
        const fetchDistricts = async () => {
            try {
                const response = await fetch("http://localhost:5000/districts");
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error("Error loading districts:", error);
            }
        };

        const fetchUpazilas = async () => {
            try {
                const response = await fetch("http://localhost:5000/upazilas");
                const data = await response.json();
                setUpazilas(data);
            } catch (error) {
                console.error("Error loading upazilas:", error);
            }
        };

        fetchDistricts();
        fetchUpazilas();
    }, []);


    const handleDistrictChange = (selectedDistrict) => {
        // Update the state when the user selects a district
        setSelectedDistrict(selectedDistrict);

        // Find the district object based on the selected district
        const districtObject = districts.find((district) => district.id === selectedDistrict);

        // console.log('Selected District:', districtObject.name);
        setDistrictName(districtObject.name)

        // Filter upazilas based on the selected district
        const filteredUpazilas = upazilas.filter((upazila) => upazila.district_id === selectedDistrict);

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

                createUser(data.email, data.password)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        const toastId = toast.loading('Registration Process Ongoing...');
                        updateUserProfile(name, imageUrl)
                            .then(() => {
                                // create user entry in the database
                                const userInfo = {
                                    name: name,
                                    email: email,
                                    bloodGroup: data.bloodGroup,
                                    district: districtName,
                                    upazila: upazilaName,
                                    role: 'user',
                                    status: 'active'
                                }
                                console.log(userInfo);
                                axiosOpen.post('/users', userInfo)
                                    .then(res => {

                                        if (res.data.insertedId) {
                                            // console.log('user profile info updated')
                                            reset();
                                            //toast
                                            toast.success('Registration Successful', { id: toastId });
                                            navigate(from, { replace: true });
                                        }
                                    })
                            })
                            .catch(error => toast.error(error.message, { id: toastId }))
                    })
            })
            .catch(err => {
                loading(false)
                // console.log(err.message)
                toast.error(err.message)
            });
    };

    // Handle password input change
    const handlePasswordChange = event => {
        const password = event.target.value;
        const pattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;

        if (!pattern.test(password)) {
            setPasswordError(
                "Password must contain at least one uppercase letter, one special character, and be at least 6 characters long."
            );
        } else {
            setPasswordError("");
        }
    };

    // Handle confirm password input change
    const handleConfirmPasswordChange = event => {
        const confirmPassword = event.target.value;
        const password = watch("password");

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
    };

    return (
        <div>
            <Helmet>
                <title>MediCare | Register</title>
            </Helmet>
            <Container>
                <div className='font-Poppins hero-content flex-col lg:flex-row py-4 gap-0 items-center justify-center'>
                    <div className='rounded-s-lg w-1/2 py-20 flex-1 hidden md:block' data-aos="fade-down" >
                        <img src={registerImg} alt="" />
                    </div>
                    <div className="flex-1">
                        <div className='flex justify-center items-center' >
                            <div className='flex flex-col max-w-md px-6 rounded sm:p-10 border bg-base-100 text-gray-900 relative gap-2' data-aos="fade-up">

                                <h1 className='text-xl font-bold bg-[rgb(202,219,226)] absolute top-[2%] left-0 px-2 rounded-e-xl text-[#00AEEF]'>Welcome To <span className="text-[#e00000] ">MEDICARE</span> </h1>

                                <h1 className='my-4 pt-10 md:pt-0 text-2xl lg:text-3xl font-semibold  text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Register Now To Explore{' '} <br />
                                    <span className="text-[#e00000] font-medium ">
                                        {/* Style will be inherited from the parent element */}
                                        <Typewriter
                                            words={['Diagnosis Services', 'Book Appointment', 'Test Results']}
                                            loop={false}
                                            cursor={true}
                                            cursorStyle='_'
                                            typeSpeed={100}
                                            deleteSpeed={50}
                                            delaySpeed={1000}
                                        />
                                    </span>
                                </h1>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate=''
                                    action=''
                                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                                >
                                    <div className='space-y-4'>
                                        <div>
                                            <label htmlFor='name' className='block mb-2 text-sm'>
                                                Name*
                                            </label>
                                            <input
                                                type='text'
                                                {...register("name", { required: true })}
                                                id='name'
                                                placeholder='Enter Your Name Here'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='email' className='block mb-2 text-sm'>
                                                Email address*
                                            </label>
                                            <input
                                                type='email'
                                                {...register("email", { required: true })}
                                                id='email'
                                                placeholder='Enter Your Email Address'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                            />
                                        </div>

                                        {/* form Blood Group row */}
                                        <div className="md:flex gap-4 mb-8">
                                            <div className="form-control w-full">
                                                <label htmlFor='email' className='block mb-2 text-sm'>
                                                    Blood Group*
                                                </label>
                                                <label className="rounded">
                                                    <select {...register("bloodGroup")}
                                                        className="px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900 w-full" required
                                                    >
                                                        <option value="">Select Your Blood Group</option>
                                                        {bloodGroup.map((category) => (
                                                            <option key={category} value={category}>
                                                                {category}
                                                            </option>
                                                        ))}
                                                    </select>
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

                                        <div>
                                            <div className='flex justify-between'>
                                                <label htmlFor='password' className='text-sm mb-2'>
                                                    Password*
                                                </label>
                                            </div>
                                            <input
                                                type='password'
                                                {...register("password", { required: true })}
                                                id='password'
                                                placeholder='*******'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                                onChange={handlePasswordChange}
                                            />
                                            {errors.password && <span className='text-red-500 text-sm'>Password is required.</span>}
                                            {passwordError && (
                                                <span className='text-red-500 text-sm'>{passwordError}</span>
                                            )}
                                        </div>
                                        {/*Confirm password  */}
                                        <div>
                                            <div className='flex justify-between'>
                                                <label htmlFor='confirmPassword' className='text-sm mb-2'>
                                                    Confirm Password*
                                                </label>
                                            </div>
                                            <input
                                                type='password'
                                                {...register("confirmPassword", { required: true })}
                                                id='confirmPassword'
                                                placeholder='*******'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00AEEF] bg-base-100 text-gray-900'
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            {errors.confirmPassword && <span className='text-red-500 text-sm'>Confirm Password is required.</span>}
                                            {confirmPasswordError && (
                                                <span className='text-red-500 text-sm'>{confirmPasswordError}</span>
                                            )}
                                        </div>
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
                                                'Continue'
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <p className='px-6 text-base text-center text-orange-600 '>
                                    Already have an account!
                                    <Link
                                        to='/login'
                                        className='hover:underline hover:text-[#00AEEF] text-gray-600 ml-1'
                                    >
                                        Log In Now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Registration;
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { FcGoogle } from 'react-icons/fc';
import { HiMiniEye, HiEyeSlash } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Typewriter } from "react-simple-typewriter";
import 'aos/dist/aos.css';
import Aos from "aos";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Login = () => {

    const { loading, googleSignIn, signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading('Logging in...');
        try {
            await googleSignIn(); // code wait here until success the work
            toast.success('Logged in successful', { id: toastId });
            // console.log('user login');
            navigate(location?.state ? location?.state : "/")
        }
        // if try fail to work then come this code
        catch (err) {
            toast.error(err.message, { id: toastId });
        }
    }

    const handleLoginWithEmailAndPassword = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        const toastId = toast.loading('Logging in...');
        try {
            await signIn(email, password)
            toast.success('Logged in successful', { id: toastId });
            // console.log('user login');
            navigate(location?.state ? location.state : "/")
        }
        catch (err) {
            toast.error(err.message, { id: toastId });
        }
    }

    // AOS setting
    Aos.init({
        duration: 3000,
    })

    return (
        <div>
            <Helmet>
                <title>MediCare | Login</title>
            </Helmet>
            <div className='flex justify-center items-center my-2 lg:my-10'>
                <div className='flex flex-col rounded-md sm:p-10 shadow px-4 border border-[#00d260]' data-aos="fade-up">
                    <h1 className='my-4 text-2xl lg:text-4xl font-semibold px-4 text-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Login Now To Explore{' '} <br />
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
                        onSubmit={handleLoginWithEmailAndPassword}
                        noValidate=''
                        action=''
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            <div>
                                <label className="label">
                                    <span className="inputLabel">Email address</span>
                                </label>
                                <input
                                    type='email'
                                    name="email"
                                    id='email'
                                    required
                                    placeholder='Enter Your Email Address'
                                    className='w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='inputLabel'>
                                    Password
                                </label>
                                <div className="relative input border rounded-md border-gray-300 flex justify-items-start bg-base-200 items-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='*******'
                                        name="password"
                                        id='password'
                                        required
                                        className='w-full px-0 py-2 focus:outline-[#00d260] bg-base-200'
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <HiEyeSlash className="text-2xl"></HiEyeSlash>
                                        ) : (
                                            <HiMiniEye className="text-2xl"></HiMiniEye>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='btn-dream btn-dream-hover'
                            >
                                {loading ? (
                                    <ImSpinner3 className='m-auto animate-spin' size={24} />
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <div onClick={handleGoogleLogin}
                            className='flex justify-center items-center space-x-2 border p-2 border-gray-300 border-rounded rounded-md cursor-pointer bg-[#4081ec] text-white'
                        >
                            <FcGoogle className='bg-white rounded-full' size={32} />
                            <p className='text-center'>Continue with Google</p>
                        </div>
                    </form>
                    <p className='px-6 mt-2 text-sm font-medium text-center'>
                        Do not have an account yet?
                        <Link
                            to='/registration'
                            className='text-[#00d260] hover:underline font-semibold ml-1'
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
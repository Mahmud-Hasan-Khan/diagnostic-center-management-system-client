import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container/Container"
import { FaSearch } from 'react-icons/fa';
import TestingCard from "./TestingCard";



const WorkingAllTests = () => {

    const axiosOpen = useAxiosOpen();
    const { user } = useAuth();

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    // load all tests data using TanStack Query
    const { data: WorkingTests, refetch } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosOpen.get('/workingAllTests');
            return res.data;
        }
    })

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setInView(rect.top < window.innerHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // console.log(tests);

    return (
        <section ref={sectionRef}>

            <div>
                <Helmet>
                    <title>MediCare | All Tests</title>
                </Helmet>
                <Container>
                    <div className="carousel-item relative w-full">
                        <img src="https://i.ibb.co/DfSm3dQ/mri-2813899-1280.jpg" className="w-full rounded" />
                        <div className="absolute -top-32 lg:top-16 flex flex-col h-screen items-center justify-center rounded gap-4">
                            <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-[#1515154d] to-[#1515154d] lg:py-16">
                                <div className="p-2 lg:p-5">
                                    <h1 className="text-xl lg:text-4xl font-semibold text-white w-full ">Empowering Health Through Insightful Diagnostics : Discover Your Path to Wellness Today with <span className="font-bold text-[#e00000] ">MediCare</span></h1>
                                    <p className="text-white text-sm lg:text-lg lg: py-2 capitalize">Book Your Tests Appointment Now!</p>
                                </div>
                                <div>
                                    <div className="container mx-auto py-2 lg:py-6">
                                        <h1 className='text-white lg:text-3xl lg:px-3 lg:py-2 font-medium'>Find Your Required Test</h1>
                                        <div className="w-full px-3 lg:mb-6 md:mb-0 relative flex items-center gap-2 justify-center">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search by Date"
                                                    className=" px-5 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900 pl-10"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <FaSearch className="text-gray-400" />
                                                </div>
                                            </div>
                                            <button
                                                className="md:ml-2 bg-[#e00000] hover:bg-[#ff9416] text-white font-medium py-3 px-4 rounded-lg w-full"
                                                onClick={() => {
                                                    refetch({ searchQuery });
                                                }}
                                            >
                                                Search
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center py-2 lg:py-6"
                        >
                            {WorkingTests?.map((test, index) => (
                                <motion.div
                                    key={test._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.2 }}
                                >
                                    {/* <WorkingTestCard test={test} /> */}
                                    <TestingCard test={test} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </Container>
            </div>
        </section>
    );
};

export default WorkingAllTests;
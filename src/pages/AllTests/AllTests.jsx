import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import { motion } from "framer-motion";
import TestsCard from "./TestsCard";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const AllTests = () => {

    const axiosOpen = useAxiosOpen();
    const { user } = useAuth();

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    // load all tests data using TanStack Query
    const { data: tests } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosOpen.get('/allTests');
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
                <div>
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center py-2 lg:py-6 lg:px-12 px-2"
                    >
                        {tests?.map((test, index) => (
                            <motion.div
                                key={test._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.2 }}
                            >
                                <TestsCard test={test} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AllTests;
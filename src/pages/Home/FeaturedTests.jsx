import { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosOpen from "../../hooks/useAxiosOpen";

const FeaturedTests = () => {

    const axiosOpen = useAxiosOpen();

    //data Load Using TanStack Query
    const { data: featuredTests = [] } = useQuery({
        queryKey: ['featuredTests'],
        queryFn: async () => {
            const res = await axiosOpen.get('/mostlyBookedTests');
            return res.data;
        }
    })
    // console.log(featuredTests);

    const [swiperRef, setSwiperRef] = useState(null);

    const onSwiperMouseEnter = () => {
        if (swiperRef) {
            swiperRef.autoplay?.stop();
        }
    };

    const onSwiperMouseLeave = () => {
        if (swiperRef) {
            swiperRef.autoplay?.start();
        }
    };


    return (
        <div className=' py-6 mb-6'>
            <SectionTitle heading="Featured Tests" subheading="Our All Featured Tests"></SectionTitle>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    400: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
                onSwiper={(swiper) => setSwiperRef(swiper)}
            >
                {featuredTests.map((test, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex items-center justify-center pt-1' onMouseEnter={onSwiperMouseEnter} onMouseLeave={onSwiperMouseLeave}>
                            <div className="card card-compact w-60 h-[300px] bg-base-100 shadow-xl border border-[#a0d3e7]">
                                <div className="object-cover">
                                    <figure>
                                        <img className="w-80 h-40 rounded-t-xl" src={test?.image} alt="test" />
                                    </figure>
                                </div>
                                <div className="card-body text-center relative">
                                    <h2 className="text-base text-green-600 py-1 text-center bg-green-100 rounded p-1">{test?.testTitle}</h2>
                                    <h5 className="bg-violet-100 text-violet-600 p-1 rounded">Booking Count : {test?.bookingCount}</h5>
                                    <div className="card-actions justify-center absolute bottom-0 left-[30%] pb-1">
                                        <Link to='/allTests' className="bg-[#00AEEF] hover-bg-[#0395ff] text-white px-3 py-2 rounded-md font-medium flex items-center">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedTests;
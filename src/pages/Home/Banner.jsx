import { Link } from "react-router-dom";
import { RiCoupon3Line } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {

    const axiosSecure = useAxiosSecure();

    //data Load Using TanStack Query
    const { data: banner } = useQuery({
        queryKey: ['banner'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/activeBanner`);
            return res.data;
        },
    });

    return (
        <>
            <div className="carousel-item relative w-full">
                <img src={banner?.image} className="w-full rounded" />
                <div className="absolute -top-28 lg:top-[18%] flex flex-col h-screen items-center justify-center rounded gap-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-[#1515154d] to-[#1515154d] lg:py-16">
                        <div className="p-2 lg:p-5 flex-1">
                            <h1 className="text-xl lg:text-5xl font-semibold text-white w-full ">{banner?.title} </h1>
                            <h3 className="text-warning font-medium lg:text-xl">{banner?.description} with <span className="font-bold text-[#e00000]">MediCare</span></h3>
                        </div>
                        <div className="flex w-full flex-1 justify-end p-1 lg:p-12">
                            <div>
                                <div>
                                    <p className="text-[#e00000] bg-red-100 rounded-badge flex items-center gap-1 lg:text-4xl p-2 w-fit"><RiCoupon3Line></RiCoupon3Line>Get {banner?.couponRate}% Discount</p>
                                </div>
                                <div>
                                    <p className="uppercase text-warning lg:text-xl lg:font-semibold text-center pt-2">Coupon Code <span className="text-[#e00000] bg-red-100 rounded-badge px-1 lg:text-2xl ">{banner?.couponCodeName}</span></p>
                                </div>
                                <div className="flex justify-center pt-2">
                                    <Link to='/allTests'
                                        className="bg-[#e00000] hover:bg-[#ff9416] text-white font-medium lg:py-3 px-4 rounded-lg">All Tests</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;

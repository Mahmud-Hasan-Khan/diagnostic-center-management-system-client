import { RiCoupon3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Promotions = () => {
    return (
        <div className="hero h-80 rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/5vfk6ch/promotion.jpg)' }}>
            <div className="hero-overlay rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-full">
                    <h2 className="mb-3 text-5xl font-bold text-warning flex text-center items-center justify-center"><RiCoupon3Line></RiCoupon3Line> Get Up To 10% Discount</h2>
                    <h4 className="mb-3 text-3xl font-bold text-warning flex text-center items-center justify-center">Only on Oline Booking!</h4>
                    <h6 className="mb-3 text-xl font-bold flex text-center items-center justify-center">Create Your Account Now!</h6>
                    <Link to='/registration' className="btn bg-[#e00000] text-white border-red-600 hover:bg-orange-600">Register Now!</Link>
                </div>
            </div>
        </div>
    );
};

export default Promotions;
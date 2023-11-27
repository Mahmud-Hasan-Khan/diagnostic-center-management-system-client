import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcViewDetails } from "react-icons/fc";
import moment from "moment/moment";
import PropTypes from 'prop-types';

const TestsCard = ({ test }) => {
    const { _id, image, title, shortDescription, slots, discountRate } = test;

    const { user } = useAuth();

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="card w-96 h-[450px] bg-base-100 border-y-2 border-[#05d6f7] shadow-xl relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <figure>
                <img
                    src={image}
                    alt="instructor"
                    className={`rounded-xl h-full object-fill w-full transition-transform duration-500 ${isHovered ? "scale-105" : ""
                        }`}
                />
            </figure>
            <div className="lg:pl-5 px-2 py-4 lg:py-2 w-96 my-auto space-y-1">
                <h2 className="card-title text-[#05d6f7]">{title}</h2>
                <p><span className="font-medium">Description:</span> {shortDescription}</p>
                <p className="bg-[#f97316] rounded p-1 w-fit text-white absolute top-[3%] right-[3%] ">Discount : {discountRate}%</p>
                <div className="bg-base-200 rounded py-1">
                    <p className="text-center">Available Dates & Slots</p>
                    <div className="grid grid-cols-3 gap-2 place-items-center text-center">
                        {Object.entries(slots).map(([date, value], index) => (
                            <div key={index}>
                                <p className="bg-[#fff8eb] text-sm rounded p-1">{moment(date).format("ll")} <br />Slots : {value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center py-1">
                    <Link
                        className="bg-[#05d6f7] hover:bg-[#ff9416] flex items-center text-white font-medium rounded p-2 w-fit"
                        to={`/testDetail/${_id}`}
                        onClick={() => {
                            if (!user) {
                                toast.error("You have to log in first to view details");
                                return
                            }
                        }}
                    >
                        View Details<FcViewDetails />
                    </Link>

                </div>
            </div>
        </div>
    );
};

TestsCard.propTypes = {
    test: PropTypes.object.isRequired
}

export default TestsCard;
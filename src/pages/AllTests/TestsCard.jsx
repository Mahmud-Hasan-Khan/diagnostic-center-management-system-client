import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcViewDetails } from "react-icons/fc";
import moment from "moment/moment";


const TestsCard = ({ test }) => {
    const { _id, image, title, shortDescription, availableDates } = test;

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
            className="card w-96 h-96 bg-base-100 border-y-2 border-[#05d6f7] shadow-xl"
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
                <p><span className="font-medium">Posted By :</span> {shortDescription}</p>
                <div className="bg-base-200 rounded py-1">
                    <p className="text-center">Available Dates</p>
                    <div className="flex justify-between">
                        {
                            availableDates.map((date) => (
                                <div key={date._id} >
                                    <p className="bg-[#05d6f7] text-white rounded p-1">{moment(date).format("Do MMM YYYY")} </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* <p><span className="font-medium">Posting Date :</span> {moment(jobPostingDate).format("Do MMM YYYY")}</p>
                <p><span className="font-medium">Deadline :</span> {moment(applicationDeadline).format("Do MMM YYYY")}</p>
                <p><span className="font-medium">Salary Range :</span> {salaryRange}</p>
                <p><span className="font-medium">Applicants Number :</span> {jobApplicants}</p> */}
                <div className="py-1">
                    <Link
                        className="bg-[#f97316] hover:bg-[#ff9416] flex items-center text-white font-medium rounded p-2 w-fit"
                        to={`/jobDetails/${_id}`}
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

export default TestsCard;
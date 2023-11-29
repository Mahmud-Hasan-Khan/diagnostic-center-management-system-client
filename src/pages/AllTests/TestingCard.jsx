import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";

const TestingCard = ({ test }) => {
    return (
        <div>
            <h2>{test.title}</h2>
            <img src={test.image} alt={test.title} style={{ maxWidth: '100%', height: 'auto' }} />
            <p>{test.description}</p>
            <h3>Available Dates and Slots:</h3>
            <ul>
                {test.availableDates.map((date) => (
                    <li key={date.date}>
                        Date: {new Date(date.date).toLocaleDateString()}, Slots: {date.slots}
                    </li>
                ))}
            </ul>
            <div className="flex justify-center py-1">
                <Link
                    className="bg-[#e00000d9] hover:bg-[#e00000] flex items-center text-white font-medium rounded p-2 w-fit"
                    to={`/workingAllTests/${test._id}`}
                // onClick={() => {
                //     if (!user) {
                //         toast.error("You have to log in first to view Test details");
                //         return
                //     }
                // }}
                >
                    View Details<FcViewDetails />
                </Link>

            </div>
        </div>
    );
};

export default TestingCard;
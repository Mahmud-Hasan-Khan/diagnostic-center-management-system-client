import { Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-orange-300">
                {/* <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink></li>

                            <li><NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Items</NavLink></li>

                            <li><NavLink to="/dashboard/manageItems"><FaList></FaList>Manage Items</NavLink></li>

                            <li><NavLink to="/dashboard/bookings"><MdOutlineRateReview></MdOutlineRateReview>Manage Bookings</NavLink></li>

                            <li><NavLink to="/dashboard/users"><FaUser></FaUser>All Users</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink></li>

                                <li><NavLink to="/dashboard/paymentHistory"><FaCalendar></FaCalendar>Payment History</NavLink></li>

                                <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>

                                <li><NavLink to="/dashboard/review"><MdOutlineRateReview></MdOutlineRateReview>Add Review</NavLink></li>

                                <li><NavLink to="/dashboard/review"><FaList></FaList>My Bookings</NavLink></li>
                            </>
                    }

                    <div className="divider"></div>

                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>

                    <li><NavLink to="/order/salad"><MdMenuBook></MdMenuBook>Menu</NavLink></li>
                </ul> */}

            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;
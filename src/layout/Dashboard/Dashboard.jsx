import { FaShoppingCart, FaHome, FaCalendar, FaList, FaUser } from "react-icons/fa";
import { MdMenuBook, MdOutlineRateReview } from "react-icons/md";
import { TbTestPipe } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className='relative min-h-screen md:flex bg-gray-100'>
            {/* Sidebar Component */}
            <ul className="menu p-4 bg-white space-y-4">
                {
                    isAdmin ? <>
                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink></li>

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/allUsers"><FaUser></FaUser>All Users</NavLink></li>

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/addTest"><TbTestPipe></TbTestPipe>Add A Test</NavLink></li>

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/manageAllTest"><FaList></FaList>All Test</NavLink></li>

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/bookings"><MdOutlineRateReview></MdOutlineRateReview>Manage Bookings</NavLink></li>


                    </>
                        :
                        <>
                            <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/userProfile"><CgProfile></CgProfile>User Profile</NavLink></li>

                            <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/appointments"><CgProfile></CgProfile>Appointments</NavLink></li>


                            <li><NavLink to="/dashboard/paymentHistory"><FaCalendar></FaCalendar>Payment History</NavLink></li>

                            <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>

                            <li><NavLink to="/dashboard/review"><MdOutlineRateReview></MdOutlineRateReview>Add Review</NavLink></li>

                        </>
                }

                <div className="divider"></div>

                <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>

                <li><NavLink to="/order/salad"><MdMenuBook></MdMenuBook>Menu</NavLink></li>
            </ul>
            <div className='flex-1'>
                <div className='p-2 lg:p-5 flex justify-center'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
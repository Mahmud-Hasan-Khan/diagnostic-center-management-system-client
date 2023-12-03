import useAdmin from "../../hooks/useAdmin";
import { NavLink, Outlet } from "react-router-dom";
// icon
import { FaHome, FaList, FaUser } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { TbTestPipe } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FcHome } from "react-icons/fc";
import { MdOutlineAddToQueue } from "react-icons/md";

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

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/reservation"><MdOutlineRateReview></MdOutlineRateReview>Reservation</NavLink></li>

                        <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/AddBanner"><MdOutlineAddToQueue></MdOutlineAddToQueue>Add Banner</NavLink></li>

                    </>
                        :
                        <>
                            <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/userProfile"><CgProfile></CgProfile>User Profile</NavLink></li>

                            <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/appointments"><SlNotebook></SlNotebook>Appointments</NavLink></li>

                            <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to="/dashboard/testResults"><TbTestPipe></TbTestPipe>Test Results</NavLink></li>
                        </>
                }

                <div className="divider"></div>

                <li><NavLink className={({ isActive }) => (isActive ? 'dashboard-nav-active' : 'dashboard-nav-inActive')} to='/'><FcHome></FcHome>Home</NavLink></li>


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
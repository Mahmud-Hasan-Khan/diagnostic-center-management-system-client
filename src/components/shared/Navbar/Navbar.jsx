import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import navLogo from '../../../../public/logo.png'
import useAuth from "../../../hooks/useAuth";
import { IoMoonOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FcHome } from "react-icons/fc";
import { MdOutlineLogin } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  // theme setting
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const handleChangeTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    const myTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", myTheme);
  }, [theme])

  const handleLogout = async () => {

    try {
      await logOut();
      toast.success('Logout successful');
      // console.log('user login');
      navigate(location?.state ? location?.state : "/")
    }
    catch (err) {
      toast.error(err.message);
    }
  }

  const navLinks = <div className='space-y-2'>
    <li>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><FcHome /> Home</NavLink>
    </li>
    <li>
      <NavLink to="/allJobs" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}>All Jobs</NavLink>
    </li>
  </div>

  return (
    <div className="navbar sticky top-0 z-10 bg-base-100 border-b-[1px] xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32">
            {navLinks}
          </ul>
        </div>
        <Link to="/"><img className='w-32 lg:w-56' src={navLogo} alt="logo" /> </Link>
      </div>
      <div className="navbar-center hidden lg:block">
        <ul className="menu menu-horizontal space-x-2 text-base font-medium">
          <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><FcHome /> Home</NavLink>
          </li>
          <li>
            <NavLink to="/test" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}>All Test</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-1 lg:space-x-2 mr-3 lg:mr-0">
        {
          user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
          user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        {
          user ?
            <>
              <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                <img
                  className='rounded-full'
                  src={user?.photoURL}
                  alt='profile'
                  height='38'
                  width='38'
                />
              </div>
              <Link onClick={handleLogout} className='btn-logout' to="/login"><MdOutlineLogout /> Logout</Link>
            </>
            :
            <>
              <Link className='btn-logout' to="/login"><MdOutlineLogin className="inline text-white" /> Login</Link>
            </>
        }
        <div>
          <label className="swap swap-rotate">

            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleChangeTheme} checked={theme === "light" ? false : true} />

            {/* sun icon */}
            <LuSun className="text-4xl swap-on text-yellow-400 fill-yellow-400" />

            {/* moon icon */}
            <IoMoonOutline className="text-4xl swap-off"></IoMoonOutline>

          </label>
        </div>
      </div>
    </div>


  );
};

export default Navbar;
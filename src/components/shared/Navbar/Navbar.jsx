import { Link, NavLink } from "react-router-dom";
import navLogo from '../../../assets/images/Logo.png';
import { FcHome } from "react-icons/fc";
import MenuDropdown from "./MenuDropdown";
import { TbTestPipe } from "react-icons/tb";
import { MdOutlineHealthAndSafety, MdOutlinePersonSearch, MdHomeRepairService } from "react-icons/md";
import DarkTheme from "./DarkTheme";

const Navbar = () => {

  const navLinks = <div className='space-y-2'>
    <li>
      <NavLink to='/' className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><FcHome /> Home</NavLink>
    </li>
    <li>
      <NavLink to="/allTests" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><TbTestPipe className="text-[#e00000] " /> All Tests</NavLink>
    </li>
    <li>
      <NavLink to="/healthWellness" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdOutlineHealthAndSafety className="text-[#e00000] " />Health Wellness</NavLink>
    </li>
    <li>
      <NavLink to="/findDoctors" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdOutlinePersonSearch className="text-[#e00000] " />Find Doctors</NavLink>
    </li>
    <li>
      <NavLink to="/departments" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdHomeRepairService className="text-[#e00000] " />Departments</NavLink>
    </li>
  </div>

  return (
    <div className="navbar sticky top-0 z-10 bg-base-100 border-b-[1px] xl:px-20 md:px-10 sm:px-2 px-0">
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
            <NavLink to="/allTests" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><TbTestPipe className="text-[#e00000] " /> All Tests</NavLink>
          </li>
          <li>
            <NavLink to="/healthWellness" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdOutlineHealthAndSafety className="text-[#e00000] " /> Health Wellness</NavLink>
          </li>
          <li>
            <NavLink to="/findDoctors" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdOutlinePersonSearch className="text-[#e00000] " />Find Doctors</NavLink>
          </li>
          <li>
            <NavLink to="/departments" className={({ isActive }) => (isActive ? 'navActive' : 'navInActive')}><MdHomeRepairService className="text-[#e00000] " />Departments</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-1 lg:space-x-2 mr-3 lg:mr-0">
        <MenuDropdown></MenuDropdown>
        <DarkTheme></DarkTheme>
      </div>
    </div>
  );
};

export default Navbar;
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';
import avatarImg from '../../../assets/images/placeholder.jpg'
import { toast } from 'react-hot-toast';

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

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

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>

        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu className='text-[#e00000] ' />
          <div className="hidden md:block tooltip tooltip-top" data-tip={user?.displayName}>
            {/* Avatar */}
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt='profile'
              height='38'
              width='38'
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md bg-white overflow-hidden right-0 top-14 lg:top-12 text-sm border'>
          <div className='flex flex-col cursor-pointer p-2 gap-2'>
            {
              user && isAdmin && <>
                <Link className='btn-login flex items-center text-center justify-center' to="/dashboard/adminHome">Dashboard</Link>
              </>
            }

            {
              user && !isAdmin && <>
                <Link className='btn-login' to="/dashboard/userHome">Dashboard</Link>
              </>
            }


            {user ? <>
              <Link onClick={handleLogout} className='btn-logout text-center' to="/">Logout
              </Link>
            </> : <>
              <Link className='btn-login flex items-center text-center justify-center' to="/login">Login
              </Link>
            </>}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown

import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../menu/MenuItem'
import AdminMenu from '../menu/AdminMenu'
import Logo from '../../logo/Logo'
import Swal from 'sweetalert2'


const Sidebar = () => {
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to Logout?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Logout",
      denyButtonText: `Don't Logout`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed){
        Swal.fire("Logout!", "", "success");
        localStorage.removeItem("folmondi_token");
        navigate('/');
      }
      else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
    });
  }

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-2 font-bold'>
            <Link to='/'>
              <Logo width={120} bg={false} />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex shadow-lg rounded-lg justify-center items-center mx-auto'>
              <Link to='/'>
                <Logo width={200} bg={false} />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              <AdminMenu handleToggle={handleToggle} />
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            {/* <MenuItem
              icon={FcSettings}
              label='Profile'
              address='/dashboard/profile'
            /> */}
            <MenuItem
              icon={FcSettings}
              label='Create Admin'
              address='/dashboard/create-admin'
            />
            <button onClick={handleLogout}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-(--orange-light)   hover:text-white transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />

              <span className='mx-4 font-medium '>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'

const AdminMenu = ({handleToggle}) => {
  return (
    <>
      {/* <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' /> */}
      <MenuItem
        onClick={handleToggle}
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem icon={MdHomeWork} label='All Products' address='all-products' />
      <MenuItem
        onClick={handleToggle}
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
      <MenuItem
        onClick={handleToggle}
        icon={BsFillHouseAddFill}
        label='Add Category'
        address='add-category'
      />
      <MenuItem
        onClick={handleToggle}
        icon={MdOutlineManageHistory}
        label='Manage Categories'
        address='manage-categories'
      />
      <MenuItem
        onClick={handleToggle}
        icon={BsFillHouseAddFill}
        label='Add Package'
        address='add-package'
      />
      <MenuItem
        onClick={handleToggle}
        icon={MdOutlineManageHistory}
        label='Manage Packages'
        address='manage-packages'
      />
    </>
  )
}

export default AdminMenu
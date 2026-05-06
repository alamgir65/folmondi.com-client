import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='all-products' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Category'
        address='add-category'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Categories'
        address='manage-categories'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Package'
        address='add-package'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Packages'
        address='manage-packages'
      />
    </>
  )
}

export default AdminMenu
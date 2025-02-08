import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src="https://res.cloudinary.com/duccim6pz/image/upload/v1738859676/Admin_d6m6a3.png" alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
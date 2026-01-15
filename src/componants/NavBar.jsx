import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const NavBar = () => {
  const user = useSelector(store => store.user)
  console.log(user)
  return (
    <div className="navbar  bg-gray-100 fixed top-0 left-0 w-full ">
      <div className="flex-1">
        <div>
          <Link to="/" className="btn btn-ghost text-xl"> MatchMyPet </Link>
        </div>
      </div>
      <div className=" md:flex">
        <ul className="menu menu-horizontal px-1 text-white font-medium">
          <li>
            <Link to="/adopt">Adopt Pet</Link>
          </li>
          <li>
            <Link to="/lost-and-found">Lost & Found</Link>
          </li>
          <li>
            <Link to="/grooming">Grooming Services</Link>
          </li>
          <li>
            <Link to="/stores">Food Store</Link>
          </li>
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <Link to="/cart" className="btn btn-ghost btn-circle relative">Cart</Link>
        {user && (

          <div className="dropdown dropdown-end flex ">
            <p className='px-4 '>Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li><a>Settings</a></li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>)}
      </div>
    </div>
  )
}

export default NavBar
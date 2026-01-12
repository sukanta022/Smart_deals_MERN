import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

import { MdLogout } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
    const {user, signOutUser} = use(AuthContext)
    const navList = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink>All Products</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/myProducts'}>My Products</NavLink></li>
                <li><NavLink to={'/myBids'}>My Bids</NavLink></li>
            </>
        }
    </>

    const handleSignOut = () => {
        signOutUser()
    }

    return (
        <div class="navbar bg-base-100 shadow-sm">
            <div class="navbar-start">
                <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabindex="-1"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {navList}
                </ul>
                </div>
                <a class="text-xl md:text-2xl font-bold">Smart<span className='text-[#4e34de]/80'>Deals</span></a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    {navList}
                </ul>
            </div>
            <div class="navbar-end gap-3">
            {
              user ? <p className='font-bold text-xl flex items-center border-2 border-[#0D9488] gap-1 rounded-lg p-1'><FaRegCircleUser />
 {user.displayName}</p> : <Link to={'/login'} class="btn rounded-4xl">Log in</Link>
            }

            {
              user ? <button onClick={handleSignOut} style={{ background: "linear-gradient(135deg, #4e34de 0%, #b46ff4 100%)" }} className='btn md:rounded-4xl rounded-full text-white'><span className='md:block hidden'>Log out</span> <MdLogout className='md:hidden block text-xl font-bold'/></button> : <Link to={'/register'} style={{ background: "linear-gradient(135deg, #4e34de 0%, #b46ff4 100%)" }} className="btn bg-[#0D9488]/90 rounded-4xl text-white">Sign Up</Link>
            }
            
            
          </div>

        </div>
    );
};

export default Navbar;
import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';
import Logo from '../logo/Logo';
import { FaCartPlus, FaSearch } from "react-icons/fa";

const lang = "en";

const Navbar = () => {
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink> </li>
        <li><NavLink to={'/shop'}>Shop</NavLink> </li>
        <li><NavLink to={'/reviews'}>Reviews</NavLink> </li>
        <li><NavLink to={'/tract-order'}>Track Order</NavLink> </li>
        <li><NavLink to={'/contact-us'}>Contact Us</NavLink> </li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm px-2 md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                <Logo/>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu font-semibold opacity-70 menu-horizontal hori-menu px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <button className="hover:bg-[#fb923c] p-2 right-btn rounded-[50%]">
                    <FaSearch className='text-lg'/>
                </button>
                {/* <Link className="hover:bg-blue-200 p-2 right-btn rounded-[50%]">
                    <FaCartPlus className='text-lg'/>
                </Link> */}
                {/* <button className="lang-btn" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
                {t.langToggle}
              </button> */}
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.875rem" }}>
                🛒 {lang === "en" ? "Cart" : "কার্ট"}
              </button>
            </div>
        </div> 
    );
};

export default Navbar;
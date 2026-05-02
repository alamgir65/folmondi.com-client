import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';
import Logo from '../logo/Logo';
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline } from 'react-icons/io5';

const lang = "en";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    // Prevent background scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    // Links as array 
    const links = [
        { to: "/", label: "Home" },
        { to: "/shop", label: "Shop" },
        { to: "/reviews", label: "Reviews" },
        { to: "/tract-order", label: "Track Order" },
        { to: "/contact-us", label: "Contact Us" }
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm px-2 md:px-10 sticky top-0 z-50">

            {/* LEFT */}
            <div className="navbar-start">

                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen(true)}
                    className="btn btn-ghost lg:hidden"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </button>

                {/* Logo */}
                <Logo width={130} />
            </div>

            {/* CENTER (Desktop Menu) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu font-semibold opacity-70 menu-horizontal hori-menu px-1">
                    {links.map((link, i) => (
                        <li key={i}>
                            <NavLink to={link.to}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-5">
                <button className="hover:bg-(--orange-light) p-2 right-btn rounded-full">
                    <FaSearch className='text-lg' />
                </button>

                <button
                    className="btn-primary"
                    style={{ padding: "10px 22px", fontSize: "0.875rem" }}
                >
                    🛒 Cart
                </button>
            </div>

            {/* 🔥 FULLSCREEN MOBILE MENU */}
            {open && (
                <div className="fixed inset-0 bg-base-100 z-50 flex flex-col p-4 w-52">

                    {/* Top bar */}
                    <div className="flex justify-between items-center mb-6">
                        <Logo width={120} />
                        <button onClick={() => setOpen(false)}>
                            <IoCloseOutline size={30} />
                        </button>
                    </div>

                    {/* Menu */}
                    <ul className="flex flex-col gap-5 text-lg font-medium">
                        {links.map((link, i) => (
                            <li key={i}>
                                <NavLink
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
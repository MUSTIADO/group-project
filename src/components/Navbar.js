import React from 'react';
import { Link } from 'react-router-dom';
import { RiHomeSmileFill } from 'react-icons/ri';
import { BsShopWindow } from 'react-icons/bs';
import { PiPhoneCallFill } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { FcAbout } from "react-icons/fc";
import './Navbar.css'; 

const Navbar = () => {
  const Menus = [
    { name: 'HOME', icon: RiHomeSmileFill, link: '/' },
    { name: 'PROPERTY', icon: BsShopWindow, link: '/property' },
    { name: 'ABOUT', icon: FcAbout, link: '/about' },
    { name: 'CONTACT', icon: PiPhoneCallFill, link: '/contact' },
    { name: 'LOGIN', icon: CgProfile, link: '/login' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          {Menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.link}
              className="text-black mr-4 hover:text-gray-300 flex items-center"
            >
              <menu.icon className="mr-2" /> {/* Display the icon */}
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

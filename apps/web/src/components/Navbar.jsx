import { useState, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from 'react-auth';

export const Navbar = () => {

  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
    
  const loggedInNavigation = [
    {
      name: 'Dashboard',
      to: '/dashboard'
    },
    {
      name: 'Profile',
      to: '/profile'
    },{
      name: 'FAQ',
      to: '/faq'
    },{
      name: 'About',
      to: '/about'
    }
  ];

  const loggedOutNavigation = [
    {
      name: 'Sign Up',
      to: '/signup'
    },
    {
      name: 'Log In',
      to: '/login'
    },{
      name: 'FAQ',
      to: '/faq'
    },{
      name: 'About',
      to: '/about'
    }
  ];

  return (
    <nav className='navbar'>
      <div className='navbar_header'>
        <div className='navbar_header-mobile'>
          <div>
            <Link
              to='/'
              onClick={() => isOpen && setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className='svg_logo'
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </Link>
          </div>
          <div onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={isOpen ? 'svg_x': 'hidden'}
              >
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={isOpen ? 'hidden' : 'svg_hamburger'}
              >
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
          </div>
        </div>
        <div className='navbar_header-desktop'>
          {/* links to all pages in a row */}
        </div>
      </div>
      <div
        className={isOpen ? 'navbar_dropdown' : 'hidden'}
        onClick={() => setIsOpen(false)}
      >
        {isLoggedIn ? (
          <>
            {loggedInNavigation.map(element => (
              <NavLink
                key={element.to}
                to={element.to}
                className={({ isActive }) => isActive ? 'navbar_dropdown-link active' : 'navbar_dropdown-link'}
                onClick={() => setIsOpen(false)}
              >
                {element.name}
              </NavLink>
            ))}
            <button
              className='navbar_dropdown-logout'
              onClick={logOutUser}
            >
              Log Out
            </button>
          </>
        ) : (
          loggedOutNavigation.map(element => (
            <NavLink
              key={element.to}
              to={element.to}
              className={({ isActive }) => isActive ? 'navbar_dropdown-link active' : 'navbar_dropdown-link'}
              onClick={() => setIsOpen(false)}
            >
              {element.name}
            </NavLink>
          ))
        )}
      </div>
    </nav>
  );

};
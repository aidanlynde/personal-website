// src/app/components/Layout.tsx

"use client"; // Client-side component

import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

// Define the props type for Layout
interface LayoutProps {
  children: ReactNode;
  currentPath: string; // Add currentPath as a prop
}

const Layout = ({ children, currentPath }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href: string) => currentPath === href; // Check if the link is active

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="nav-bar">
        {/* Left-aligned Avatar and Name (Home Link) */}
        <div className="nav-left">
          <Link href="/" legacyBehavior>
            <a className={`home-link ${isActive('/') ? 'active' : ''}`}>
              Aidan Lynde
            </a>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Full Navigation on Desktop */}
        <div className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/routes/about" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/about') ? 'active' : ''}`}>About</a>
          </Link>
          <Link href="/routes/projects" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/projects') ? 'active' : ''}`}>Projects</a>
          </Link>
          <Link href="/routes/travel" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/travel') ? 'active' : ''}`}>Travel</a>
          </Link>
          <Link href="/routes/hobbies" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/hobbies') ? 'active' : ''}`}>Hobbies</a>
          </Link>
          <Link href="/routes/blog" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/blog') ? 'active' : ''}`}>Blog</a>
          </Link>
          <Link href="/routes/tools" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/tools') ? 'active' : ''}`}>Tools</a>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {children}
      </div>

      <style jsx>{`
        /* General Styling */
        .nav-bar {
          background-color: #ededed;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        /* Avatar and Name (Home Link) Styling */
        .nav-left {
          display: flex;
          align-items: center;
          margin-left: 10px;
        }

        .home-link {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333333;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .home-link.active::after {
          width: 100%; /* Keep underline on active link */
        }

        .home-link:hover {
          color: #104827;
        }

        /* Nav Right Links */
        .nav-right {
          display: flex;
          gap: 20px;
          margin-right: 40px;
        }

        .nav-link {
          font-size: 1.1rem;
          color: #333333;
          text-decoration: none;
          position: relative;
          font-weight: normal;
          display: inline-block; /* Make the underline as long as the text */
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background-color: #104827;
          bottom: -2px;
          left: 0;
          transition: width 0.3s ease-in-out;
        }

        .nav-link.active::after {
          width: 100%; /* Keep underline on active link */
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #104827;
        }

        /* Hamburger Menu Icon */
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          margin-right: 40px;
        }

        .hamburger .bar {
          width: 25px;
          height: 3px;
          background-color: #333333;
          margin: 4px 0;
          border-radius: 10px;
          transition: 0.4s;
        }

        /* Hide the full nav-right on smaller screens */
        @media (max-width: 768px) {
          .nav-right {
            display: none;
            flex-direction: column;
            background-color: #ededed;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            width: 100%;  
            border-bottom: 1px solid #e0e0e0;
            border-top: 1px solid #e0e0e0;
          }

          .nav-right.open {
            display: flex;
          }

          .nav-link {
            margin: 10px 0;
            text-align: center;
            width: auto; /* Remove fixed width */
            margin-left: auto;
            margin-right: auto;
          }

          .hamburger {
            display: flex;
          }
        }

        /* Ensure there's enough space for the fixed nav-bar */
        .content {
          padding: 100px 20px;
        }
      `}</style>
    </div>
  );
};

export default Layout;

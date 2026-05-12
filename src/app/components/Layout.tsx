"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const CALENDLY_URL = "https://calendly.com/aidanlynde/lynde-engineering-free-consultation";

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const Layout = ({ children, currentPath }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href: string, includeChildren = true) =>
    currentPath === href || (includeChildren && currentPath.startsWith(`${href}/`));

  return (
    <div>
      <nav className="nav-bar">
        <div className="nav-left">
          <Link href="/" legacyBehavior>
            <a className={`home-link ${isActive('/') ? 'active' : ''}`}>Aidan Lynde</a>
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/routes/consulting" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/consulting', false) ? 'active' : ''}`}>Consulting</a>
          </Link>
          <Link href="/routes/about" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/about') ? 'active' : ''}`}>About</a>
          </Link>
          <Link href="/routes/projects" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/projects') ? 'active' : ''}`}>Projects</a>
          </Link>
          <Link href="/routes/travel" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/travel') ? 'active' : ''}`}>Travel</a>
          </Link>
          <Link href="/routes/tools" legacyBehavior>
            <a className={`nav-link ${isActive('/routes/tools') ? 'active' : ''}`}>Tools</a>
          </Link>
          <a href={CALENDLY_URL} className="nav-cta">Free Consultation</a>
        </div>
      </nav>

      <div className="content">{children}</div>

      <style jsx>{`
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
          box-sizing: border-box;
        }

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
          width: 100%;
        }

        .home-link:hover {
          color: #104827;
        }

        .nav-right {
          display: flex;
          gap: 18px;
          margin-right: 22px;
          align-items: center;
        }

        .nav-link {
          font-size: 1.1rem;
          color: #333333;
          text-decoration: none;
          position: relative;
          font-weight: normal;
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
          width: 100%;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #104827;
        }

        .nav-cta {
          background-color: #e0e0e0;
          border-radius: 8px;
          color: #333;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 10px 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .nav-cta:hover {
          background-color: #104827;
          color: #fff;
        }

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
            padding: 10px 0 18px;
          }

          .nav-right.open {
            display: flex;
          }

          .nav-link {
            margin: 10px 0;
            text-align: center;
            width: auto;
            margin-left: auto;
            margin-right: auto;
          }

          .nav-cta {
            margin: 8px auto 0;
            width: calc(100% - 40px);
            text-align: center;
            box-sizing: border-box;
          }

          .hamburger {
            display: flex;
          }
        }

        .content {
          padding: 100px 20px;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Layout;

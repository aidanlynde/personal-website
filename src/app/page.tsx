"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Left-aligned Profile Picture and Name */}
        <div className="profile-header">
          {/* Profile Picture */}
          <div className="profile-picture">
            <Image
              src="/images/profile.svg" // Add the correct path to your profile picture here
              alt="Profile Picture"
              width={150}
              height={150}
              className="profile-img"
            />
          </div>
          
          {/* Name and Icon Links */}
          <div className="name-icons">
            <h1 className="name">Aidan Lynde</h1>
            <div className="icon-links">
              <Link href="/pdfs/resume.pdf" className="icon">
                <Image src="/icons/resume.svg" alt="Resume" width={30} height={30} />
              </Link>
              <Link href="mailto:aidanlynde@gmail.com" className="icon">
                <Image src="/icons/email.svg" alt="Email" width={30} height={30} />
              </Link>
              <Link href="https://www.linkedin.com/in/aidan-lynde-1b97a31b4/" className="icon">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={30} height={30} />
              </Link>
              <Link href="https://github.com/aidanlynde" className="icon">
                <Image src="/icons/github.svg" alt="GitHub" width={30} height={30} />
              </Link>
              <Link href="https://www.strava.com/athletes/36497221" className="icon">
                <Image src="/icons/strava.svg" alt="Strava" width={30} height={30} />
              </Link>
            </div>
          </div>
        </div>

        {/* Centered description */}
        <p className="description">
          I am a Software Developer and Machine Learning Enthusiast. I specialize in full-stack development and AI-driven solutions, with a focus on creating innovative, user-friendly applications.
        </p>

        {/* Buttons Section */}
        <div className="buttons-section">
          <Link href="/routes/about" legacyBehavior>
            <a className="button">About</a>
          </Link>
          <Link href="/routes/projects" legacyBehavior>
            <a className="button">Projects</a>
          </Link>
          <Link href="/routes/travel" legacyBehavior>
            <a className="button">Travel</a>
          </Link>
          <Link href="/routes/blog" legacyBehavior>
            <a className="button">Newsletter</a>
          </Link>
          <Link href="/routes/tools" legacyBehavior>
            <a className="button">Tools</a>
          </Link>
        </div>

        <footer>
          © 2024 Aidan Lynde · Powered by Next.js & Vercel
        </footer>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 50px 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .profile-section {
          text-align: center;
        }

        /* Profile header for aligning image and name horizontally */
        .profile-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        /* Circular profile picture */
        .profile-picture {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
        }

        /* Adjust Image size to fit within circular container */
        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name-icons {
          text-align: left; /* Align text to the left next to profile picture */
        }

        .name {
          font-size: 2.2rem;
          font-weight: bold;
          margin: 20px 0 15px 0; /* Remove top margin, add margin below */
        }

        .icon-links {
          display: flex;
          gap: 15px;
        }

        .icon img {
          filter: grayscale(100%);
          transition: filter 0.2s;
        }

        .icon:hover img {
          filter: grayscale(0%);
        }

        .description {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .buttons-section {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 30px;
          margin-bottom: 30px;
        }

        a.button {
          background-color: #e0e0e0;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: inline-block;
        }

        a.button:hover {
          background-color: #104827;
          color: #fff;
        }

        footer {
          font-size: 0.8rem;
          color: #aaa;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
}

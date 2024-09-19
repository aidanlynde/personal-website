"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Left-Right Section */}
        <div className="left-right-container">
          {/* Left side (Name) */}
          <div className="left-side">
            <h1 className="name">Aidan Lynde</h1>
          </div>

          {/* Right side (Icon Links) */}
          <div className="right-side">
            <div className="icon-links">
              <Link href="mailto:your-email@gmail.com" className="icon">
                <Image src="/icons/email.svg" alt="Email" width={30} height={30} />
              </Link>
              <Link href="/resume.pdf" className="icon">
                <Image src="/icons/resume.svg" alt="Resume" width={30} height={30} />
              </Link>
              <Link href="https://linkedin.com/in/your-linkedin" className="icon">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={30} height={30} />
              </Link>
              <Link href="https://github.com/your-github" className="icon">
                <Image src="/icons/github.svg" alt="GitHub" width={30} height={30} />
              </Link>
              <Link href="https://www.strava.com/athletes/your-strava" className="icon">
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
          <Link href="/routes/hobbies" legacyBehavior>
            <a className="button">Hobbies</a>
          </Link>
          <Link href="/routes/blog" legacyBehavior>
            <a className="button">Blog</a>
          </Link>
          <Link href="/routes/tools" legacyBehavior>
            <a className="button">Tools</a>
          </Link>
        </div>

        <footer>
          © 2024 Aidan Lynde · Powered by Your Tech Stack
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

        .left-right-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          margin-bottom: 20px;
        }

        .left-side {
          text-align: left;
          flex: 1;
        }

        .right-side {
          text-align: right;
          flex: 1;
        }

        .name {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .description {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .icon-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .icon img {
          filter: grayscale(100%);
          transition: filter 0.2s;
        }

        .icon:hover img {
          filter: grayscale(0%);
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

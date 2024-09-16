"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <Image
          src="/profile-picture.jpg" // Replace with your actual image
          alt="Profile Picture"
          width={150}
          height={150}
          className="profile-img"
        />
        <h1 className="name">[Your Name]</h1>
        <p className="intro">
          Software Developer | Machine Learning Enthusiast | Adaptive Learner
        </p>

        {/* Skills Section (Compact inside Hero) */}
        <div className="skills">
          <p>Skills:</p>
          <ul className="skills-list">
            <li>JavaScript</li>
            <li>Python</li>
            <li>Machine Learning</li>
            <li>Flutter</li>
            <li>C++</li>
          </ul>
        </div>
      </section>

      {/* Icon-Based Links Section */}
      <section className="links">
        <div className="icon-grid">
          <a href="mailto:your-email@gmail.com" className="icon-link">
            <Image
              src="/icons/gmail.svg" // Replace with your actual icon files
              alt="Gmail"
              width={40}
              height={40}
            />
            <span>Email</span>
          </a>
          <a href="https://github.com/your-github" className="icon-link">
            <Image
              src="/icons/github.svg" // Replace with your actual icon files
              alt="GitHub"
              width={40}
              height={40}
            />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/your-linkedin" className="icon-link">
            <Image
              src="/icons/linkedin.svg" // Replace with your actual icon files
              alt="LinkedIn"
              width={40}
              height={40}
            />
            <span>LinkedIn</span>
          </a>
          <a href="/ventures" className="icon-link">
            <Image
              src="/icons/ventures.svg" // Replace with an icon representing ventures
              alt="Entrepreneurship"
              width={40}
              height={40}
            />
            <span>Ventures</span>
          </a>
          <a href="/hobbies" className="icon-link">
            <Image
              src="/icons/hobbies.svg" // Replace with an icon representing hobbies
              alt="Hobbies"
              width={40}
              height={40}
            />
            <span>Hobbies</span>
          </a>
        </div>
      </section>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        /* Hero Section */
        .hero {
          padding: 50px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .profile-img {
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .name {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .intro {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 20px;
        }

        /* Skills Section inside Hero */
        .skills {
          font-size: 1rem;
          color: #333;
        }

        .skills-list {
          list-style: none;
          padding: 0;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .skills-list li {
          background-color: #f4f4f4;
          padding: 8px 15px;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        /* Icon-Based Links Section */
        .links {
          margin-top: 50px;
        }

        .icon-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .icon-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        .icon-link span {
          margin-top: 8px;
          font-size: 0.9rem;
        }

        .icon-link:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }

        .icon-link img {
          transition: transform 0.3s ease;
        }

        .icon-link:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}



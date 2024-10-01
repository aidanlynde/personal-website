"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectOnePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-one">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>Ebay Reselling</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/ebay-reselling.png"
            alt="Ebay Reselling"
            width={800}
            height={400}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: June 4, 2020 - August 20, 2020</p>
          <p>Author: Your Name</p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Entrepreneurship",
              "E-commerce",
              "Marketing",
              "Customer Service",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            During the summer of 2020, I engaged in an eBay reselling venture where I purchased, refurbished, and flipped designer clothes/shoes, model cars, and stage equipment. This project honed my skills in entrepreneurship, market analysis, and customer relations. I navigated the challenges of sourcing quality items, negotiating prices, and ensuring customer satisfaction through timely communication and shipping.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://www.ebay.com/usr/your-ebay-username"
                target="_blank"
                rel="noopener noreferrer"
              >
                My eBay Store
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .project-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        /* Back Arrow */
        .back-arrow {
          font-size: 1rem;
          color: #104827;
          cursor: pointer;
          margin-bottom: 20px;
          display: inline-block;
        }

        .back-arrow:hover {
          text-decoration: underline;
        }

        /* Title */
        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        /* Image */
        .image-container {
          margin-bottom: 20px;
        }

        /* Meta Data */
        .meta p {
          margin: 5px 0;
          color: #555;
        }

        /* Skills Toggle */
        .skills-toggle {
          color: #555;
          font-size: 0.95rem;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 10px;
        }

        /* Tech Stack Section */
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          max-height: 500px;
          overflow: hidden;
          margin-top: 10px;
        }

        .tech-stack.collapsed {
          max-height: 0;
        }

        .bubble {
          background-color: #e0e0e0;
          color: #333;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        /* Description */
        .description {
          margin: 20px 0;
          color: #333;
          line-height: 1.6;
        }

        /* Links */
        .links h3 {
          margin-bottom: 10px;
        }

        .links ul {
          list-style-type: none;
          padding: 0;
        }

        .links li {
          margin-bottom: 5px;
        }

        .links a {
          color: #104827;
          text-decoration: none;
        }

        .links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
}

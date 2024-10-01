"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectNinePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-nine">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>Lincoln Park Housing Analysis</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/lincoln-park-analysis.png"
            alt="Lincoln Park Housing Analysis"
            width={800}
            height={400}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: June 20, 2024 - August 25, 2025</p>
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
              "Real Estate Investment",
              "Financial Analysis",
              "Market Research",
              "Data Visualization",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            This project involves creating an investment strategy for purchasing a duplex property in Lincoln Park, Chicago, by August 2025. I conducted a comprehensive market analysis, evaluated property values, rental rates, and projected returns on investment. The analysis helps in making informed decisions regarding property acquisition and management.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://yourwebsite.com/lincoln-park-analysis"
                target="_blank"
                rel="noopener noreferrer"
              >
                Detailed Analysis
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

        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        .image-container {
          margin-bottom: 20px;
        }

        .meta p {
          margin: 5px 0;
          color: #555;
        }

        .skills-toggle {
          color: #555;
          font-size: 0.95rem;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 10px;
        }

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

        .description {
          margin: 20px 0;
          color: #333;
          line-height: 1.6;
        }

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

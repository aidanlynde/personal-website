"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectFourPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-four">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>FastAPI Template</h1>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: June 20, 2024 - August 1, 2024</p>
          <p>By: Aidan Lynde</p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Python Programming",
              "FastAPI Framework",
              "REST API Development",
              "User Authentication with Firebase",
              "OAuth Integration",
              "Next.js Front-End Framework",
              "Cloud Deployment (Google Cloud Ready)",
              "Asynchronous Programming",
              "Security Best Practices (JWT, OAuth2, Password Hashing)",
              "Database Management with Firebase",
              "Full-Stack Application Development",

            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
              I developed a FastAPI template that incorporates a fully integrated user authentication system using Firebase for both authentication and database management. This template is built with scalability in mind and is Google Cloud deployable, making it ideal for projects requiring rapid deployment and reliable cloud infrastructure. The integration with Firebase’s authentication services supports features like email/password login, OAuth providers, and real-time database synchronization, while FastAPI ensures the backend is optimized for high performance and asynchronous operations. With Next.js handling the front-end, this template streamlines the development of secure, full-stack applications, and includes best practices for security, modularity, and cloud-readiness, providing a solid foundation for building APIs that are cloud-deployable on platforms like Google Cloud.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/Next-js-TEMPLATE"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js Front End Repository
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/Python-FastAPI-TEMPLATE"
                target="_blank"
                rel="noopener noreferrer"
              >
                FastAPI Backend Repository
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

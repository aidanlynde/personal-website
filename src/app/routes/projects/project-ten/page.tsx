"use client";

import Layout from '../../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FederatedLearningPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/federated-learning">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>🤝 Federated Learning Demo</h1>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: January 2024 - Present</p>
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
              "Python",
              "FastAPI",
              "React",
              "Machine Learning",
              "Federated Learning",
              "API Development",
              "Docker",
              "CI/CD"
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            This project demonstrates the implementation of federated learning in a web-based environment. 
            It features a full-stack application with a React frontend and FastAPI backend, showcasing how 
            machine learning models can be trained across distributed data sources while preserving data privacy. 
            The system includes a public API endpoint for model training and inference, with the entire solution 
            containerized using Docker for easy deployment and scaling.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://ppfl-demo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </li>
            <li>
              <a
                href="https://ppfl-demo-production.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Public API Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aidanlynde/ppfl-demo-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                Frontend GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aidanlynde/ppfl-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Backend GitHub Repository
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
          transition: max-height 0.3s ease-out;
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
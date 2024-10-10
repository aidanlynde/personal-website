"use client";

import Layout from '../../../components/Layout';
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
        <h1>🏘️ Lincoln Park Housing Analysis</h1>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: June 20, 2024 - August 25, 2025</p>
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
              "TensorFlow",
              "Scikit-learn",
              "Pandas",
              "NumPy",
              "Data Preprocessing",
              "Feature Engineering",
              "Model Training",
              "Model Evaluation",
              "Deep Learning",
              "Natural Language Processing (NLP)",
              "Time Series Forecasting",
              "Machine Learning Algorithms",
              "Data Visualization",
              "Docker",
              "Git & Version Control",
              "Agile Methodologies",
              "Project Management",
              "API Integration",
              "Continuous Integration/Continuous Deployment (CI/CD)"
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
              <strong>Investment Strategy Development for Duplex Acquisition in Lincoln Park, Chicago</strong> is an innovative project aimed at formulating a comprehensive investment strategy for purchasing a duplex property in the Lincoln Park neighborhood by August 2025. This initiative leverages advanced data processing techniques and machine learning models to forecast market trends and optimize investment decisions.
          </p>

          <p>
              The project employs Docker for containerization and Python for data analysis and model development, ensuring a scalable and efficient workflow. Currently, I am in the data processing phase, collaborating with a local real estate broker who has access to the Multiple Listing Service (MLS) database. This partnership is crucial for acquiring accurate and relevant data necessary for building robust forecasting models.
          </p>

          <p>
              At this stage, the focus is on extensive data cleaning, feature engineering, and exploratory data analysis (EDA) to prepare the dataset for machine learning applications. By utilizing Python libraries such as Pandas, NumPy, and Scikit-learn, I am transforming raw data into meaningful insights that will inform the construction of predictive models.
          </p>

          <p>
              Moving forward, the project will transition to developing and training complex machine learning models designed to predict market fluctuations, assess property value trends, and estimate rental income potential. These models will incorporate various algorithms, including regression analysis, time series forecasting, and ensemble methods, to ensure accurate and reliable predictions.
          </p>

          <p>
              The repository for this project is currently in its initial stages, containing only the README file. As the project progresses, I will be uploading data sets, code implementations, and comprehensive documentation to provide a transparent and collaborative development environment. The repository will serve as a centralized platform for tracking project milestones, sharing progress updates, and facilitating contributions from other developers and stakeholders.
          </p>

          <p>
              Although the project is still underway, it represents a significant learning experience in data science, machine learning, and real estate investment strategies. By integrating Docker and Python with real-world data from the MLS database, I am developing the technical skills and analytical expertise necessary to execute a successful investment strategy. This project not only aims to achieve the targeted property acquisition but also sets the foundation for future advancements in real estate investment analytics.
          </p>

        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/lincoln-park-housing-prediction"
                target="_blank"
                rel="noopener noreferrer"
              >
                ML Model Repository
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

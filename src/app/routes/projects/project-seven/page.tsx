"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectSevenPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-seven">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>Energy Consumption Analysis</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/heatmap.png"
            alt="Energy Consumption Analysis"
            width={600}
            height={400}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: September 22, 2023 - November 27, 2023</p>
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
              "Environmental Economics",
              "Data Visualization",
              "Python",
              "Pandas",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
              This project focused on analyzing global energy consumption trends with a deep dive into their environmental, economic, and geopolitical impacts. Using comprehensive datasets from sources such as the International Energy Agency (IEA) and World Bank, I conducted detailed statistical analyses to understand both historical trends and future projections for energy use across different regions and sectors. The core of the analysis involved breaking down energy consumption patterns by type (e.g., fossil fuels, renewables, nuclear) and evaluating the correlation between energy use and key economic indicators such as GDP growth, industrial output, and carbon emissions.
          </p>

          <p>
              One of the key aspects of the project was the use of advanced data preprocessing techniques to clean and normalize the datasets for accurate modeling. This included handling missing data points, applying time series forecasting models, and conducting regression analyses to evaluate the impact of specific energy sources on environmental degradation and economic performance. I also employed clustering techniques to group countries based on their energy consumption behaviors and policies, which helped identify patterns among developing versus developed nations and provided insights into how policy decisions influence energy efficiency and sustainability.
          </p>

          <p>
              Visualizations played a critical role in the project, allowing for a clear representation of complex energy data. I created heatmaps, time series plots, and multi-variable charts to highlight key findings, such as the rapid growth of renewable energy in specific regions and the ongoing reliance on coal and oil in others. These insights were then used to formulate evidence-based policy recommendations aimed at promoting sustainable energy use, reducing carbon footprints, and improving global energy efficiency. The project culminated in a detailed paper that discussed potential pathways to achieving a more sustainable global energy future, including transitioning to renewables, optimizing energy storage, and developing regulatory frameworks that incentivize green energy investments.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/energy-consumption-analysis"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aidanlynde/energy-consumption-analysis/blob/main/energy-consumption-analysis/ECO415_dataproject_Lynde_Aidan.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Academic Paper PDF
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

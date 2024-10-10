"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectSixPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-six">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>🧮 Applied Econometrics Problem Sets</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/output1.png"
            alt="Applied Econometrics Projects"
            width={500}
            height={400}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: August 24, 2023 - December 15, 2023</p>
          <p>By: Aidan L., Kareem B., & Luigi D.</p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Applied Econometrics",
              "R Programming",
              "Data Analysis",
              "Statistical Modeling",
              "Hypothesis Testing",
              "Regression Analysis",
              "Data Engineering",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            During my time at UIUC, I had the privilege of learning from Professor Joshua Shea, whose approach to teaching applied econometrics left a lasting impact on how I tackle data-driven problems. His emphasis on thinking like a data engineer completely transformed my approach to problem-solving in both statistics and economics. This mindset shift has guided my methodology for every data analysis project I&apos;ve worked on since.
          </p>
          
          <p>
            As part of the Econ 471 course, I completed several problem sets that introduced core econometric principles such as data cleaning, regression analysis, and hypothesis testing. While these projects were not extensive in scope, they laid a crucial foundation for understanding complex economic data structures and analytical processes. I applied techniques such as Ordinary Least Squares (OLS) regression, instrumental variables, and panel data analysis to interpret real-world datasets.
          </p>

          <p>
            These problem sets honed my skills in statistical modeling and R programming, where I frequently implemented functions for calculating conditional distributions and simulating data to test hypotheses. Through this work, I gained a deeper understanding of econometric models and their applications in both academic and professional settings. The practical experience I gained from Professor Shea&apos;s course has been pivotal in shaping my future projects, enabling me to approach data challenges with a strong technical and engineering-oriented mindset.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/applied-econometrics"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
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

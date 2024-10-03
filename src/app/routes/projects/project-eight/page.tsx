"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectEightPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-eight">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>Applied Machine Learning Projects</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/k-means-clust-5.png"
            alt="Applied Machine Learning Projects"
            width={500}
            height={400}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: August 24, 2023 - May 15, 2024</p>
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
              "Machine Learning",
              "Python Programming",
              "Neural Networks",
              "K-means Clustering",
              "Predictive Modeling",
              "TensorFlow",
              "Data Preprocessing",
              "Feature Engineering",
              "Model Optimization",
              "Unsupervised Learning",
              "Supervised Learning",
              "Regression Analysis",

            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            As part of the Econ 491 course at UIUC, I had the incredible opportunity to delve deep into the field of machine learning, tackling complex problems with real-world data. The course, taught by Professor Marcelo C. Medeiros, was unlike any traditional class I had taken. Professor Medeiros, a pioneer in neural network research breakthroughs in the 90s and early 2000s, brought a wealth of experience and knowledge to the course. His mentorship was instrumental in guiding my journey into machine learning, where he encouraged us to explore beyond the basics and tackle advanced algorithms and models.
          </p>
          
          <p>
            Throughout the semester, I worked on a series of machine learning projects that challenged me to build predictive models, experiment with neural networks, and implement algorithms like k-means clustering for unsupervised learning tasks. One of the key takeaways from the course was understanding how to apply neural networks to model complex, nonlinear relationships in the data, as well as using clustering methods to identify patterns and segment data. These projects not only deepened my technical understanding but also developed my ability to think creatively about data collection, feature engineering, and model optimization.
          </p>
          
          <p>
            What made this course especially transformative was Professor Medeiros' approach to teaching. The class felt like a semester of independent study, where he provided us with the foundational tools, but allowed the freedom to take our own direction with data collection and application. This autonomy fostered a deep engagement with the material, encouraging me to learn machine learning concepts beyond the classroom, and empowering me to apply these techniques to solve real-world problems. I credit a significant part of my interest in machine learning and my ability to quickly grasp new concepts to the flexibility and insight I gained from this class.
          </p>
        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/aidanlynde/Applied-Machine-Learning"
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

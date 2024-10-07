"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectThreePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-three">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>📱 Slush: Decentralized P2P Payment App</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/slushlogo.png"
            alt="Slush App"
            width={350}
            height={200}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: September 10, 2023 - February 4, 2024</p>
          <p>By: Aidan Lynde, Kareem Benaissa, David Ko, & Youngwon Kim</p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
            
              "python",
              "Firebase",
              "Swift",
              "FlutterFlow",
              "Figma",
              "Project Management",
              "Agile Methodologies",
              "Continuous Integration/Continuous Deployment (CI/CD)",
              "Real-Time Database Management",
              "Authentication Systems",
              "UI/UX Design",
              "Team Leadership",
              "Full-Stack Development",
              "API Integration",
              "Task Execution",
              "Code Framework Design"
          
              
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
              <strong>Slush</strong> is a sophisticated decentralized peer-to-peer (P2P) payment application engineered to streamline digital transactions by eliminating intermediaries. The project leverages Firebase for backend infrastructure and real-time database management, Swift for developing a robust and responsive iOS application, and FlutterFlow for hosting and deploying the Minimum Viable Product (MVP). The user interface was meticulously designed using Figma, ensuring an intuitive and seamless user experience. Slush emphasizes security, transparency, and user-friendly interfaces, providing a reliable platform for managing group financial interactions.
          </p>

          <p>
              In the initial development phase, I assumed the role of Project Manager, orchestrating a team of four developers through the comprehensive lifecycle of the project—from ideation and requirement analysis to system design, codebase structuring, and task execution. Utilizing Agile methodologies, we established a scalable code framework with modular components, facilitating efficient parallel development and continuous integration/continuous deployment (CI/CD) pipelines. Key technical implementations included the integration of Firebase’s authentication and real-time database features for secure user management and data synchronization, the use of Swift to develop a performant and responsive iOS application, and leveraging FlutterFlow to rapidly prototype and deploy the MVP. Additionally, we employed Figma for collaborative UI/UX design, enabling real-time feedback and iterative improvements.
          </p>

          <p>
              Despite the thorough planning and initial progress, the Open Slush project was ultimately placed on hold due to creative and visionary differences within the team. While the project was not fully realized, comprehensive design documentation was meticulously prepared and remains attached for reference. These documents encompass detailed architectural diagrams, API specifications, database schemas, and user flowcharts, providing a solid foundation for future development endeavors.
          </p>

          <p>
              The hiatus of Slush has not precluded its potential revival, as the foundational work and technical frameworks established lay the groundwork for possible future implementation. The project serves as a pivotal learning experience, enhancing my capabilities in project management, team leadership, and full-stack development. Leading the team through the intricate processes of concept development, system architecture design, and technical execution honed my skills in coordinating cross-functional teams, managing project timelines, and troubleshooting complex technical challenges. This experience has been instrumental in shaping my proficiency as a developer and a leader, preparing me to undertake and successfully deliver sophisticated projects in the future.
          </p>


        </div>

        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="/pdfs/slush-whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Slush Whitepaper
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="https://slush-towtew.flutterflow.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Flutterflow Demo (MVP)
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="https://github.com/Slush-Community/slushbrain"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slush Backend Repository (slushbrain)
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="https://github.com/Slush-Community/slushface"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slush Frontend Repository (slushface)
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="/pdfs/open-slush-concept-design.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Slush Concept PDF
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


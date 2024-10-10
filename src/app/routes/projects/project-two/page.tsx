"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectTwoPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-two">
      <div className="project-page">
        {/* Back Arrow */}
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>🪙 Cryptocurrency & DeFi Club</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/illinois.png"
            alt="Cryptocurrency & DeFi Club"
            width={550}
            height={350}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: December 2, 2021 - November 27, 2022</p>
          <p>Founded by: Aidan Lynde & <a
              href="https://www.linkedin.com/in/jakernewland/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jake Newland
            </a>
          </p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Leadership",
              "Public Speaking",
              "Networking",
              "Blockchain",
              "Tokenomics",
              "Investing Strategy",
              "Communication",
              "Teamwork"
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            As the co-founder and president of the Cryptocurrency & DeFi Club at the University of Illinois at Urbana-Champaign, I led initiatives to educate students about blockchain technology, decentralized finance, and their applications. I organized workshops, guest lectures, and networking events, fostering a community of like-minded individuals passionate about the future of finance and technology.
          </p>
          <p>
            Unfortunately, the organization took a significant hit during the massive crypto sell-off in 2021-2022. Initially, we gained considerable traction from students eager to become new investors, but much of that attention waned over time. Those who remained were seasoned investors, experienced in navigating both bull and bear markets, and not easily shaken by the events.
          </p>
          <p>
            As founders, we were definitely challenged when it came to setting a new direction for the club after this blow to morale. Eventually, the organization&apos;s activity on campus shifted to more private conversations among the remaining members. Over the next few years, this group of investors, engineers, and financiers became one of my closest circles for discussing stock and crypto investing, business ventures, and technology development. To this day, we still meet online weekly, and although the club didn&apos;t continue at Illinois, I consider it one of my most successful ventures, as the group and I have achieved remarkable success in the past few years.
          </p>
          <p>
            Below, I&apos;m attaching the Linktree, which contains the remnants of our online presence. As mentioned, we now operate more privately, but the group is always open to conversations with like-minded individuals!
          </p>
        </div>


        {/* Relevant Links */}
        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li>
              <a
                href="https://linktr.ee/CDF_uiuc?utm_source=linktree_profile_share&ltsid=f5389ea8-3297-440d-86ae-c239e9ee3d68"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link-tree
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
        
        .meta p {
          margin: 5px 0;
          color: #555;
        }

        .meta a {
          color: #104827; /* Use the same green color */
          text-decoration: none;
        }

        .meta a:hover {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
}

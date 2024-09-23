"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import Image from 'next/image';

export default function AboutPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Layout currentPath={currentPath}>
      <div className="about-page">
        {/* Banner Section */}
        <div className="banner">
          <Image src="/images/aboutbanner.png" alt="Banner Image" fill />
        </div>

        {/* Profile Info Section */}
        <div className="profile-info">
          <div className="profile-picture">
            <Image
              src="/images/profile.svg"
              alt="Profile Picture"
              width={150}
              height={150}
              className="profile-img"
            />
          </div>

          <div className="header-and-icons">
            {/* Name and Icons */}
            <div className="header-icons-row">
              <h1>Aidan Lynde</h1>

              {/* Icons Section */}
              <div className="icons">
                <a href="mailto:your-email@example.com">
                  <Image src="/icons/email.svg" alt="Email Icon" width={30} height={30} />
                </a>
                <a href="/resume.pdf">
                  <Image src="/icons/resume.svg" alt="Resume Icon" width={30} height={30} />
                </a>
                <a href="https://linkedin.com/in/your-linkedin">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn Icon" width={30} height={30} />
                </a>
                <a href="https://github.com/your-github">
                  <Image src="/icons/github.svg" alt="GitHub Icon" width={30} height={30} />
                </a>
                <a href="https://www.strava.com/athletes/your-strava">
                  <Image src="/icons/strava.svg" alt="Strava Icon" width={30} height={30} />
                </a>
              </div>
            </div>
            <p className="bio-info">Born: August 22, 2001</p>

            {/* Subtle Skills Dropdown */}
            <div className="skills-toggle" onClick={toggleCollapse}>
              {isCollapsed ? 'View Skills' : 'Hide Skills'}
            </div>

            {/* Collapsible Skills Section */}
            <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
              {[
                "Python", "Java", "C++", "JavaScript", "R", "Swift", "SQL", "Microsoft SQL Server",
                "Git", "Bash", "zsh", "Next.js", "Google Cloud", "Amazon Web Services", "Jira", 
                "Flutter", "Figma", "LaTeX", "Microsoft Excel", "MySQL", "PostgreSQL", "MongoDB", 
                "Firebase", "Docker", "CI/CD", "GitHub Actions", "Scikit-learn", "TensorFlow", 
                "Pandas", "NumPy", "Jest", "Mocha", "Cypress", "HTML5", "CSS3", "Tailwind CSS", 
                "Sass", "Node.js", "Express.js", "Django", "FastAPI", "REST APIs", "Adobe XD"
              ].map(skill => (
                <span className="bubble" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Feed-style Timeline */}
        <div className="timeline-section">
          <h2>Professional Timeline</h2>

          <div className="timeline-feed">
            {[
              { date: 'January 12, 2018', 
                content: `Started my first Shopify store selling custom t-shirts. 
                I designed the website using HTML/CSS and optimized the user experience for conversions. 
                Developed an understanding of e-commerce platforms, digital marketing strategies, 
                and customer analytics.` },
              
              { date: 'March 15, 2018', 
                content: `Launched a second Shopify store focused on fitness gear. Leveraged 
                Facebook Ads and Google Analytics to drive traffic and increase conversion rates. 
                Gained experience in targeted ads and A/B testing for better ad campaign performance.` },

              { date: 'June 5, 2020', 
                content: `Started reselling designer goods, model cars, and refurbished electronics. 
                Gained expertise in inventory management, sales, and pricing strategies. 
                Scaled operations by reinvesting profits into stocks and cryptocurrency for high returns.` },

              { date: 'October 18, 2020', 
                content: `Made my first cryptocurrency investments, including Bitcoin and Ethereum. 
                Focused on researching blockchain technology and decentralized finance, while developing 
                risk mitigation strategies for volatile markets.` },

              { date: 'January 2021', 
                content: `Founded the Cryptocurrency and DeFi Club at Illinois, leading workshops on blockchain, 
                decentralized applications, and investment strategies. Created technical content for members 
                on smart contracts, security, and decentralized finance applications.` },

              { date: 'July 2022', 
                content: `Interned at CBRE as a Software Developer. Focused on CI/CD pipeline creation, 
                optimizing deployment processes, and developing scalable applications. Applied distributed systems 
                concepts to enhance the performance and reliability of internal software products.` },

              { date: 'June 2024', 
                content: `Accepted a full-time role at CBRE as an Application Developer. Responsibilities include 
                working on distributed systems architecture, maintaining CI/CD pipelines, and implementing software 
                optimization strategies to ensure high performance and scalability.` },
            ].map((post, index) => (
              <div key={index} className="timeline-item">
                <div className="post-header">
                  <Image
                    src="/images/profile.svg"
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="post-profile-img"
                  />
                  <span className="post-username">@danos</span>
                  <span className="date">{post.date}</span>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .about-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Montserrat', sans-serif;
          }

          /* Banner Section */
          .banner {
            position: relative;
            width: 100%;
            height: 180px;
            background-color: #ededed;
            z-index: 0;
          }

          /* Profile Info Section */
          .profile-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: -75px;
            padding: 0 20px;
            z-index: 2;
            position: relative;
          }

          .profile-picture {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            z-index: 3;
            margin-right: 20px;
            margin-top: 20px;
          }

          .profile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
          }

          /* Name and Icons Row */
          .header-and-icons {
            flex: 1;
            margin-top: 80px;
          }

          .header-icons-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .icons {
            display: flex;
            gap: 10px;
          }

          h1 {
            margin: 0;
            font-size: 2.5rem;
            color: #333;
          }

          .bio-info {
            margin-top: 5px;
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
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          /* Timeline Section */
          .timeline-section {
            margin-top: 40px;
          }

          .timeline-feed {
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }

          .timeline-item {
            border-bottom: 1px solid #ddd;
            padding: 15px 0;
            margin-bottom: 20px;
          }

          .post-header {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .post-profile-img {
            border-radius: 50%; /* Makes it circular */
            width: 40px; /* Ensure a fixed width */
            height: 40px; /* Ensure a fixed height */
            object-fit: cover; /* Ensures the image scales correctly */
            object-position: center; /* Keeps the image centered */
          }

          .post-username {
            font-weight: bold;
            color: #104827;
          }

          .date {
            color: #999;
            font-size: 0.9rem;
          }

          p {
            margin: 0;
            color: #333;
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 1.8rem;
            }

            .profile-info {
              flex-direction: column;
              align-items: center;
            }

            .profile-picture {
              margin: 0 auto;
            }

            .header-and-icons {
              text-align: center;
              margin-top: 20px;
            }

            .header-icons-row {
              flex-direction: column;
              align-items: center;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}

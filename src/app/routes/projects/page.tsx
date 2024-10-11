"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import Image from 'next/image';

interface Project {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  brief: string;
}

export default function ProjectsPage() {
  // Project data remains the same
  const projectsData: Project[] = [
    {
      slug: 'project-one',
      title: '🔈 Ebay Reselling',
      startDate: '2020-06-04',
      endDate: '2020-08-20',
      brief:
        'Purchased, refurbished, and flipped designer clothes/shoes, model cars, & stage equipment.',
    },
    {
      slug: 'project-two',
      title: '🪙 Cryptocurrency & DeFi Club',
      startDate: '2021-12-02',
      endDate: '2022-11-27',
      brief:
        'Co-founded and led the club at the University of Illinois at Urbana-Champaign.',
    },
    {
      slug: 'project-three',
      title: '📱 Slush (Decentralized Peer-to-Peer Payment app)',
      startDate: '2023-09-10',
      endDate: '2024-02-04',
      brief:
        'Imagined application, designed database system, and built out MVP.',
    },
    {
      slug: 'project-four',
      title: '🖥️ Fast API Template',
      startDate: '2024-06-20',
      endDate: '2024-08-01',
      brief:
        'Built out Fast API template w/ user authentication system to use for future software projects',
    },
    {
      slug: 'project-five',
      title: '➗ BMI Calculator',
      startDate: '2022-06-05',
      endDate: '2022-08-10',
      brief: 'Built BMI calculator tool for my personal fitness use',
    },
    {
      slug: 'project-six',
      title: '🧮 Applied Econometrics Problem Sets',
      startDate: '2023-08-24',
      endDate: '2023-12-15',
      brief: 'Machine projects from Econ 471 at UIUC.',
    },
    {
      slug: 'project-seven',
      title: '🌱 Energy Consumption Analysis',
      startDate: '2023-09-22',
      endDate: '2023-11-27',
      brief:
        'Environmental economic analysis on global energy consumption trends.',
    },
    {
      slug: 'project-eight',
      title: '📈 Applied Machine Learning Projects',
      startDate: '2023-08-24',
      endDate: '2024-05-15',
      brief: 'Machine projects from Econ 491 at UIUC.',
    },
    {
      slug: 'project-nine',
      title: '🏘️ Lincoln Park Housing Analysis',
      startDate: '2024-06-20',
      endDate: '2025-08-25',
      brief:
        'Investment strategy for duplex property purchase August 2025 in Lincoln Park, Chicago.',
    },
  ];

  const [selectedYear, setSelectedYear] = useState(2024);
  const router = useRouter();

  // Function to format dates
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to filter and sort projects by year
  const filteredProjects = projectsData
    .filter((project) => {
      const projectStartYear = new Date(project.startDate).getFullYear();
      const projectEndYear = new Date(project.endDate).getFullYear();
      return projectStartYear <= selectedYear && projectEndYear >= selectedYear;
    })
    .sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    );

  // List of years for the dropdown filter (sorted in descending order)
  const years = Array.from(
    new Set([
      2024,
      ...projectsData.flatMap((project) => [
        new Date(project.startDate).getFullYear(),
        new Date(project.endDate).getFullYear(),
      ]),
    ])
  ).sort((a, b) => b - a);

  return (
    <Layout currentPath="/routes/projects">
      {/* Projects Page Container */}
      <div className="projects-page">
        {/* Banner Section */}
        <div className="banner">
          <Image src="/images/projectbanner.png" alt="Project Banner" fill priority />
        </div>

        {/* Title Section */}
        <div className="titleSection">
          
          <h1 className="pageTitle">Projects</h1>
        </div>

        {/* Year Filter Dropdown */}
        <div className="filter-section">
          <label htmlFor="yearFilter">Filter by year:</label>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Project Grid */}
        <div className="gridContainer">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="projectCard"
              onClick={() => router.push(`/routes/projects/${project.slug}`)}
            >
              <h2 className="projectTitle">{project.title}</h2>
              <p className="projectDate">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
              <p className="projectBrief">{project.brief}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .projects-page {
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

        /* Title Section */
        .titleSection {
          display: flex;
          align-items: center;
          margin-top: -40px;
          z-index: 2;
          position: relative;
          padding-left: 20px;
        }

        .emoji {
          font-size: 4.5rem;
          margin-right: 10px;
          position: relative;
          top: -5px;
        }

        .pageTitle {
          margin: 0;
          font-size: 2.5rem; /* Same size as your name on the About page */
          color: #333;
          margin-top: 45px;
          margin-left: 0px;
        }

        /* Filter Section */
        .filter-section {
          margin-bottom: 20px;
          font-size: 1rem;
          text-align: center;
        }

        #yearFilter {
          padding: 5px 10px;
          font-size: 1rem;
          margin-left: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        /* Grid Container */
        .gridContainer {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem 0;
        }

        @media (min-width: 768px) {
          .gridContainer {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .gridContainer {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Project Card Styles */
        .projectCard {
          background-color: #f7f7f7;
          padding: 1.5rem;
          border-radius: 8px;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .projectCard:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transform: translateY(-3px);
        }

        .projectTitle {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #222;
          text-decoration: none;
        }

        .projectDate {
          font-size: 0.9rem;
          color: #999; /* Faded color for dates */
          margin-bottom: 0.5rem;
        }

        .projectBrief {
          font-size: 0.9rem;
          color: #555;
        }

        /* Ensure all child elements inherit the correct styles */
        .projectCard * {
          color: inherit;
          text-decoration: none;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .titleSection {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 20px;
            margin-top: -30px;
          }

          .pageTitle {
            font-size: 2rem;
            margin-top: 40px;
            margin-left: 120px;
            margin-bottom: 25px;
          }

          .emoji {
            font-size: 3rem;
            top: -10px;
          }
        }
      `}</style>
    </Layout>
  );
}

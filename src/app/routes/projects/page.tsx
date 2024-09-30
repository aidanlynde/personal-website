// app/projects/page.tsx

"use client";

import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  slug: string;
  title: string;
  date: string;
  brief: string;
}

export default function ProjectsPage() {
  // Updated project data with projects four to nine
  const projectsData: Project[] = [
    {
      slug: 'project-one',
      title: 'Project One',
      date: '2023-09-01',
      brief: 'Brief description of Project One.'
    },
    {
      slug: 'project-two',
      title: 'Project Two',
      date: '2023-08-15',
      brief: 'Brief description of Project Two.'
    },
    {
      slug: 'project-three',
      title: 'Project Three',
      date: '2023-07-20',
      brief: 'Brief description of Project Three.'
    },
    {
      slug: 'project-four',
      title: 'Project Four',
      date: '2023-07-05',
      brief: 'Brief description of Project Four.'
    },
    {
      slug: 'project-five',
      title: 'Project Five',
      date: '2023-06-18',
      brief: 'Brief description of Project Five.'
    },
    {
      slug: 'project-six',
      title: 'Project Six',
      date: '2023-05-30',
      brief: 'Brief description of Project Six.'
    },
    {
      slug: 'project-seven',
      title: 'Project Seven',
      date: '2023-05-10',
      brief: 'Brief description of Project Seven.'
    },
    {
      slug: 'project-eight',
      title: 'Project Eight',
      date: '2023-04-22',
      brief: 'Brief description of Project Eight.'
    },
    {
      slug: 'project-nine',
      title: 'Project Nine',
      date: '2023-04-01',
      brief: 'Brief description of Project Nine.'
    }
  ];

  return (
    <Layout currentPath="/projects">
      {/* Banner Section */}
      <div className="banner">
        <Image src="/images/projectbanner.png" alt="Project Banner" fill />
      </div>

      <h1 className="pageTitle">Projects</h1>

      <div className="gridContainer">
        {projectsData.map((project) => (
          <Link key={project.slug} href={`/routes/projects/${project.slug}`}>
            <div className="projectCard">
              <h2 className="projectTitle">{project.title}</h2>
              <p className="projectDate">{project.date}</p>
              <p className="projectBrief">{project.brief}</p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          height: 180px;
          background-color: #ededed;
          z-index: 0;
        }

        .pageTitle {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }

        .gridContainer {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          padding: 2rem;
        }

        .projectCard {
          background-color: #f7f7f7;
          padding: 1rem;
          border-radius: 8px;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
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
        }

        .projectDate {
          font-size: 0.9rem;
          color: #666;
        }

        .projectBrief {
          font-size: 0.9rem;
          color: #555;
          margin-top: 0.5rem;
        }
      `}</style>
    </Layout>
  );
}

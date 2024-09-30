// app/projects/project-six/page.tsx
"use client";


import Layout from '../../../components/Layout';

export default function ProjectSixPage() {
  return (
    <Layout currentPath="/projects/project-six">
      <h1>Project Six</h1>
      <p>Date: 2023-05-30</p>
      <p>
        This is the detailed description for Project Six. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      <a href="https://github.com/yourusername/project-six" target="_blank" rel="noopener noreferrer">
        GitHub Repository
      </a>
    </Layout>
  );
}

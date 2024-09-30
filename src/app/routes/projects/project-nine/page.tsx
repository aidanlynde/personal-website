// app/projects/project-nine/page.tsx

"use client";

import Layout from '../../../components/Layout';

export default function ProjectNinePage() {
  return (
    <Layout currentPath="/projects/project-nine">
      <h1>Project Nine</h1>
      <p>Date: 2023-04-01</p>
      <p>
        This is the detailed description for Project Nine. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      <a href="https://github.com/yourusername/project-nine" target="_blank" rel="noopener noreferrer">
        GitHub Repository
      </a>
    </Layout>
  );
}

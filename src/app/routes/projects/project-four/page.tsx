// app/projects/project-four/page.tsx
"use client";

import Layout from '../../../components/Layout';

export default function ProjectFourPage() {
  return (
    <Layout currentPath="/projects/project-four">
      <h1>Project Four</h1>
      <p>Date: 2023-07-05</p>
      <p>
        This is the detailed description for Project Four. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      <a href="https://github.com/yourusername/project-four" target="_blank" rel="noopener noreferrer">
        GitHub Repository
      </a>
    </Layout>
  );
}

// app/projects/project-one/page.tsx
"use client";

import Layout from '../../../components/Layout';

export default function ProjectOnePage() {
  return (
    <Layout currentPath="/projects/project-one">
      <h1>Project One</h1>
      <p>Date: 2023-09-01</p>
      <p>This is the detailed description for Project One. You can include any content you like here, such as paragraphs, images, links, and more.</p>
      <a href="https://github.com/yourusername/project-one" target="_blank" rel="noopener noreferrer">
        GitHub Repository
      </a>
    </Layout>
  );
}

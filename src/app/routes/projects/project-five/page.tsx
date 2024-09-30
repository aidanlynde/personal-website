// app/projects/project-five/page.tsx

"use client";

import Layout from '../../../components/Layout';

export default function ProjectFivePage() {
  return (
    <Layout currentPath="/projects/project-five">
      <h1>Project Five</h1>
      <p>Date: 2023-06-18</p>
      <p>
        This is the detailed description for Project Five. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      <a href="https://project-five-demo.com" target="_blank" rel="noopener noreferrer">
        Live Demo
      </a>
    </Layout>
  );
}

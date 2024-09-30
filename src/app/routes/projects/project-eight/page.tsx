// app/projects/project-eight/page.tsx

"use client";

import Layout from '../../../components/Layout';

export default function ProjectEightPage() {
  return (
    <Layout currentPath="/projects/project-eight">
      <h1>Project Eight</h1>
      <p>Date: 2023-04-22</p>
      <p>
        This is the detailed description for Project Eight. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      <a href="https://project-eight-demo.com" target="_blank" rel="noopener noreferrer">
        Live Demo
      </a>
    </Layout>
  );
}

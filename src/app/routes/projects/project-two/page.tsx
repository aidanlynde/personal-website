// app/projects/project-two/page.tsx
"use client";


import Layout from '../../../components/Layout';

export default function ProjectTwoPage() {
  return (
    <Layout currentPath="/projects/project-two">
      <h1>Project Two</h1>
      <p>Date: 2023-08-15</p>
      <p>This is the detailed description for Project Two. You can include any content you like here, such as paragraphs, images, links, and more.</p>
      <a href="https://project-two-demo.com" target="_blank" rel="noopener noreferrer">
        Live Demo
      </a>
    </Layout>
  );
}

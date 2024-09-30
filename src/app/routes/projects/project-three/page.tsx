// app/projects/project-three/page.tsx
"use client";


import Layout from '../../../components/Layout';

export default function ProjectThreePage() {
  return (
    <Layout currentPath="/projects/project-three">
      <h1>Project Three</h1>
      <p>Date: 2023-07-20</p>
      <p>This is the detailed description for Project Three. You can include any content you like here, such as paragraphs, images, links, and more.</p>
      {/* No links for this project */}
    </Layout>
  );
}

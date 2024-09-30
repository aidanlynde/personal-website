// app/projects/project-seven/page.tsx

"use client";

import Layout from '../../../components/Layout';

export default function ProjectSevenPage() {
  return (
    <Layout currentPath="/projects/project-seven">
      <h1>Project Seven</h1>
      <p>Date: 2023-05-10</p>
      <p>
        This is the detailed description for Project Seven. You can include any content you like here,
        such as paragraphs, images, links, and more.
      </p>
      {/* No links for this project */}
    </Layout>
  );
}

"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function ProjectsPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Projects</h1>
      <p>This is the projects page.</p>
    </Layout>
  );
}

"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function ToolsPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Tools</h1>
      <p>This is the tools page.</p>
    </Layout>
  );
}

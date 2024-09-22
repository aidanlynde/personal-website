"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function AboutPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>About</h1>
      <p>This is the about page.</p>
    </Layout>
  );
}

"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function BlogPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Blog</h1>
      <p>This is the blog page.</p>
    </Layout>
  );
}

"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function HobbiesPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Hobbies</h1>
      <p>This is the hobbies page.</p>
    </Layout>
  );
}

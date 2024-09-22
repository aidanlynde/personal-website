"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function TravelPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Travel</h1>
      <p>This is the travel page.</p>
    </Layout>
  );
}

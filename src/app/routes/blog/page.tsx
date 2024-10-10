// src/app/routes/blog/page.tsx
"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';

export default function BlogPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  // Replace this URL with your actual Substack signup page URL
  const substackSignupUrl = "https://aidanlynde.substack.com/subscribe";

  return (
    <Layout currentPath={currentPath}>
      <h1>Blog</h1>
      <p>Welcome to the blog! Stay updated by subscribing to my newsletter.</p>

      {/* Add Substack Signup Button */}
      <a 
        href={substackSignupUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          margin: '20px 0',
          backgroundColor: '#f94d00', // Substack's brand color, adjust as needed
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Subscribe to my Newsletter
      </a>
    </Layout>
  );
}

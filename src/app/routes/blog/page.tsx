// src/app/routes/blog/page.tsx
"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function BlogPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  // Replace this URL with your actual Substack signup page URL
  const substackSignupUrl = "https://aidanlynde.substack.com/subscribe";

  return (
    <Layout currentPath={currentPath}>
      <div className="content">
        <h1>Check out my Newsletter!</h1>
        <p>As I navigate through my life&apos;s experiences, I figured there&apos;s no better way to keep people updated on what I&apos;m doing than a newsletter. If you want to consume meaningful content surrounding current events, data science, traveling, sports, and everything in between, take the time to subscribe. You won&apos;t be disappointed!</p>

        {/* Subscribe Button */}
        <div className="buttons-section">
          <Link href={substackSignupUrl} legacyBehavior>
            <a className="button" target="_blank" rel="noopener noreferrer">
              Subscribe here!
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 20px;
        }

        .buttons-section {
          margin-top: 20px;
        }

        a.button {
          background-color: #e0e0e0;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: inline-block;
        }

        a.button:hover {
          background-color: #104827;
          color: #fff;
        }
      `}</style>
    </Layout>
  );
}

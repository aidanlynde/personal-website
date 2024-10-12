// src/app/routes/tools/page.tsx
"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import React from 'react';

export default function ToolsPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  return (
    <Layout currentPath={currentPath}>
      <h1>Tools</h1>

      <div className="github-links">
        <a href="/routes/tools/heictopng" className="github-link">
          Heic to PNG Converter
        </a>
      </div>
      <style jsx>{`
        /* GitHub Repo Links Styles */
        .github-links {
          display: flex;
          flex-wrap: wrap;          /* Allows wrapping if links overflow */
          justify-content: center;  /* Centers the links horizontally */
          gap: 20px;                /* Adds spacing between the links */
          margin: 30px 0;           /* Adds vertical spacing above and below the links */
        }

        .github-link {
          margin-top: 10px;
          text-decoration: underline;    /* Removes underline from links */
          color: #104827;           /* Applies your green color */
          font-size: 1.0rem;        /* Adjusts font size */
        }

        .github-link:hover {
          text-decoration: underline; /* Adds underline on hover */
          color: #082c16;             /* Darkens the green color on hover */
        }

        a {
          color: #104827; /* Replace with your site's green color code */
          text-decoration: underline;
        }

        a:hover {
          text-decoration: underline;
          color: #008f4c; /* Optional: Darker shade on hover */
        }
      `}</style>
    </Layout>
  );
}

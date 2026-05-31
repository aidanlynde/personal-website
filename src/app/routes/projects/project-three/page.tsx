"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectThreePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-three">
      <div className="project-page">
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        <h1>📱 Slush: P2P Payment App</h1>

        <div className="image-container slush-logo-wrap">
          <Image
            src="/images/slush-logo.png"
            alt="Slush App"
            width={300}
            height={175}
          />
        </div>

        <div className="meta">
          <p>Date: September 2023 – February 2025</p>
          <p>By: Aidan Lynde, Kareem Benaissa, David Ko, &amp; Youngwon Kim</p>
        </div>

        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "TypeScript", "Next.js", "React Native", "Python", "FastAPI",
              "Firebase", "Stripe Connect", "PostgreSQL", "Figma",
              "Swift", "FlutterFlow", "Vercel", "CI/CD",
              "Full-Stack Development", "UI/UX Design", "Team Leadership",
              "Agile Methodologies", "API Integration",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="description">
          <p>
            <strong>Slush</strong> is a peer-to-peer payment platform built to simplify group financial interactions — splitting bills, settling IOUs, and managing shared expenses without the friction of traditional banking intermediaries. What started as an MVP in 2023 evolved over two-plus years into a polished full-stack product with a professional public landing page, Stripe Connect integration, real-time transaction flows, and a complete authentication system.
          </p>

          <p>
            I co-founded Slush alongside Kareem Benaissa, David Ko, and Youngwon Kim. In the early phase I served as project manager, steering the team through ideation, database architecture, and the initial FlutterFlow + Firebase MVP. We used Agile methodologies with CI/CD pipelines, modular code structure, and Figma for collaborative UI design — keeping iteration tight and product quality high from the start.
          </p>

          <p>
            As the project matured, the stack evolved significantly. The backend moved to FastAPI and PostgreSQL for a more robust foundation, and the frontend was rebuilt in Next.js and React Native for a native mobile experience. Stripe Connect was integrated to handle real money movement between users, and the authentication system was upgraded to support secure session management with refresh tokens. The product also received a full visual overhaul — culminating in a professional marketing site at <a href="https://www.slush-app.com/" target="_blank" rel="noopener noreferrer">slush-app.com</a>.
          </p>

          <p>
            Slush was placed on pause in early 2026 as the team shifted focus to other ventures. The codebase, design documentation, and architectural foundations remain intact — representing over two years of sustained engineering investment in a real financial product.
          </p>
        </div>

        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li><a href="https://www.slush-app.com/" target="_blank" rel="noopener noreferrer">Slush Landing Page</a></li>
            <li><a href="https://github.com/Slush-Community/slushbrain" target="_blank" rel="noopener noreferrer">Backend Repository (slushbrain)</a></li>
            <li><a href="https://github.com/Slush-Community/slushface" target="_blank" rel="noopener noreferrer">Frontend Repository (slushface)</a></li>
            <li><a href="/pdfs/slush-whitepaper.pdf" target="_blank" rel="noopener noreferrer">Official Slush Whitepaper</a></li>
            <li><a href="/pdfs/open-slush-concept-design.pdf" target="_blank" rel="noopener noreferrer">Open Slush Concept PDF</a></li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .project-page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Montserrat', sans-serif; }
        .back-arrow { font-size: 1rem; color: #104827; cursor: pointer; margin-bottom: 20px; display: inline-block; }
        .back-arrow:hover { text-decoration: underline; }
        h1 { font-size: 2.5rem; color: #333; margin-bottom: 20px; }
        .image-container { margin-bottom: 20px; }
        .slush-logo-wrap { display: inline-block; background: #1a1a1a; border-radius: 10px; padding: 12px 20px; }
        .meta p { margin: 5px 0; color: #555; }
        .skills-toggle { color: #555; font-size: 0.95rem; text-decoration: underline; cursor: pointer; margin-top: 10px; }
        .tech-stack { display: flex; flex-wrap: wrap; gap: 10px; max-height: 500px; overflow: hidden; margin-top: 10px; }
        .tech-stack.collapsed { max-height: 0; }
        .bubble { background-color: #e0e0e0; color: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; }
        .description { margin: 20px 0; color: #333; line-height: 1.6; }
        .description p { margin-bottom: 1rem; }
        .description a { color: #104827; text-decoration: underline; }
        .links h3 { margin-bottom: 10px; }
        .links ul { list-style-type: none; padding: 0; }
        .links li { margin-bottom: 8px; }
        .links a { color: #104827; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
      `}</style>
    </Layout>
  );
}

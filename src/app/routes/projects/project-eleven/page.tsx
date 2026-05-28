"use client";

import Layout from '../../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectElevenPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-eleven">
      <div className="project-page">
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        <h1>🎨 Palleto</h1>

        <div className="meta">
          <p>Date: June 2025 – Present</p>
          <p>By: Aidan Lynde · Palleto Labs</p>
        </div>

        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Expo", "React Native", "TypeScript", "FastAPI", "Python",
              "Firebase", "PostgreSQL", "App Store Connect", "EAS Build",
              "UI/UX Design", "Figma", "Product Management",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="description">
          <p>
            <strong>Palleto</strong> is a mobile app for creatives — built to solve the problem of real-world inspiration slipping away before it can be acted on. The core idea: when you see a color palette on a building, a texture in a fabric, or a composition in a street scene, you can capture it instantly and Palleto turns it into a structured inspiration card you can reference, organize, and build on.
          </p>

          <p>
            I built Palleto as a solo founder project under <a href="https://www.palleto-labs.com/" target="_blank" rel="noopener noreferrer">Palleto Labs</a>. The stack is a React Native + Expo mobile app backed by a FastAPI service, with Firebase handling social authentication (Google and Apple sign-in) and PostgreSQL for user and card storage. The app is built for both iOS and Android and is targeting an App Store launch.
          </p>

          <p>
            The current implementation covers the full core loop: onboarding, Firebase social auth, user sync to the backend, inspiration card creation and organization. The product is in final pre-launch polish — addressing the gap between &quot;I saw something great&quot; and &quot;I can actually find and use it later.&quot;
          </p>
        </div>

        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li><a href="https://www.palleto-labs.com/" target="_blank" rel="noopener noreferrer">Palleto Labs — palleto-labs.com</a></li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .project-page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Montserrat', sans-serif; }
        .back-arrow { font-size: 1rem; color: #104827; cursor: pointer; margin-bottom: 20px; display: inline-block; }
        .back-arrow:hover { text-decoration: underline; }
        h1 { font-size: 2.5rem; color: #333; margin-bottom: 20px; }
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

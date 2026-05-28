"use client";

import Layout from '../../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectTwelvePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  return (
    <Layout currentPath="/projects/project-twelve">
      <div className="project-page">
        <div className="back-arrow" onClick={() => router.push('/routes/projects')}>
          ← Back to Projects
        </div>

        <h1>⚖️ Peanuts · Litigation Intelligence Platform</h1>

        <div className="meta">
          <p>Date: January 2025 – Present</p>
          <p>By: Aidan Lynde</p>
        </div>

        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              "Python 3.11+", "FastAPI", "PostgreSQL", "asyncpg", "SQLAlchemy 2.x",
              "Next.js", "TypeScript", "Prefect", "Alembic",
              "Claude API (Haiku + Sonnet)", "PDF Parsing", "LLM Pipelines",
              "Docker", "Railway", "REST API Design", "Auth Systems",
            ].map(skill => (
              <span className="bubble" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="description">
          <p>
            <strong>Peanuts</strong> is a class action litigation screener and intelligence platform. The system ingests federal court case filings, screens complaints to determine class action viability using PDF parsing and LLM analysis, and enriches confirmed cases with structured legal facts, entity data, taxonomy, and analytics — surfacing actionable intelligence for legal teams and researchers.
          </p>

          <p>
            The core engineering challenge is a multi-stage gated data pipeline. At Stage 1, cases are discovered from federal court sources via three ingestion lanes. Stage 2 uses Claude Haiku to classify complaints — at high-confidence thresholds, cases auto-chain through to extraction; lower-confidence cases are held for human review. Stage 3 extracts structured legal facts from the complaint PDFs. Stage 4 normalizes those facts against a taxonomy system. Stage 5 runs deeper intelligence scoring using Claude Sonnet and Opus.
          </p>

          <p>
            The architecture follows an 8-silo data model — canonical cases, provenance, documents, extraction results, structured legal facts, entities, taxonomy assignments, and analytics — all connected via case ID and managed with SQLAlchemy 2.x async on PostgreSQL. Pipeline orchestration runs on Prefect with concurrency semaphores per stage to control LLM API costs.
          </p>

          <p>
            The frontend is a Next.js analytics dashboard with role-based access (admin, analyst, reviewer, viewer), a human review queue for borderline cases, taxonomy management, and an alert system for flagging new filings that match saved criteria. The full stack is containerized and deployed on Railway.
          </p>

          <p>
            Peanuts is an active build — the pipeline is functional and the core intelligence loop is running. This is a private project; the repository is not publicly available.
          </p>
        </div>

        <div className="links">
          <h3>Relevant Links:</h3>
          <ul>
            <li><em>Private project — no public links available.</em></li>
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
        .links h3 { margin-bottom: 10px; }
        .links ul { list-style-type: none; padding: 0; }
        .links li { margin-bottom: 8px; color: #555; font-style: normal; }
        .links a { color: #104827; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
      `}</style>
    </Layout>
  );
}

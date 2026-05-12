"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Layout from "../../../components/Layout";

const CALENDLY_URL = "https://calendly.com/aidanlynde/free-consultation";

type Stage = {
  id: string;
  title: string;
  startingAt: number;
  recommendation: string;
  modules: string[];
};

type Module = {
  id: string;
  title: string;
  price: number;
  kind?: "monthly" | "custom";
};

type Complexity = {
  id: string;
  title: string;
  multiplier: number | null;
  description: string;
};

const stages: Stage[] = [
  {
    id: "idea",
    title: "I have an idea but no product",
    startingAt: 500,
    recommendation: "Discovery Sprint",
    modules: ["discovery", "prototype-plan"],
  },
  {
    id: "prototype",
    title: "I have a prototype, but it is not ready for users",
    startingAt: 1500,
    recommendation: "Prototype to Production",
    modules: ["mini-audit", "deployment", "auth", "security"],
  },
  {
    id: "live",
    title: "I have a live product and need help improving it",
    startingAt: 900,
    recommendation: "Software Clarity Audit",
    modules: ["audit", "security", "payments", "retainer"],
  },
  {
    id: "automation",
    title: "I need an internal tool or automation",
    startingAt: 1800,
    recommendation: "AI Workflow Automation",
    modules: ["workflow", "ai", "dashboard", "database"],
  },
  {
    id: "website",
    title: "I just need a website, landing page, or store",
    startingAt: 500,
    recommendation: "Website / Launch Presence",
    modules: ["landing", "business-site", "brand", "analytics"],
  },
];

const modules: Module[] = [
  { id: "audit", title: "Product/Technical Audit", price: 900 },
  { id: "mini-audit", title: "Mini Audit", price: 300 },
  { id: "discovery", title: "Discovery Sprint", price: 500 },
  { id: "prototype-plan", title: "Clickable Prototype + Build Plan", price: 1500 },
  { id: "landing", title: "Landing Page", price: 500 },
  { id: "business-site", title: "Business Website", price: 900 },
  { id: "auth", title: "User Authentication System", price: 900 },
  { id: "database", title: "Database/API Setup", price: 1200 },
  { id: "deployment", title: "Production Deployment", price: 600 },
  { id: "app-store", title: "App Store / Google Play Launch", price: 900 },
  { id: "payments", title: "Payment Integration", price: 1500 },
  { id: "security", title: "Security Readiness Review", price: 1200 },
  { id: "ai", title: "AI Automation / Chatbot", price: 1800 },
  { id: "dashboard", title: "Admin Dashboard", price: 1500 },
  { id: "mobile-mvp", title: "Mobile App MVP", price: 7000 },
  { id: "web-mvp", title: "Web App MVP", price: 4500 },
  { id: "workflow", title: "Workflow Audit", price: 900 },
  { id: "facilities", title: "Facilities / Workplace Tech Automation", price: 3000 },
  { id: "brand", title: "Design / Brand / Product Experience", price: 500 },
  { id: "analytics", title: "Analytics / Launch Measurement", price: 500 },
  { id: "retainer", title: "Ongoing Technical Retainer", price: 600, kind: "monthly" },
  { id: "media", title: "Marketing / Media Partner Referral", price: 0, kind: "custom" },
];

const complexities: Complexity[] = [
  {
    id: "simple",
    title: "Simple",
    multiplier: 1,
    description: "Small website, landing page, store setup, basic deployment, or basic auth.",
  },
  {
    id: "moderate",
    title: "Moderate",
    multiplier: 1.75,
    description: "Web app, payment integration, user accounts, dashboard, database, or admin tools.",
  },
  {
    id: "complex",
    title: "Complex",
    multiplier: 2.5,
    description: "Mobile app, marketplace, payment splitting, AI features, sensitive data, or several integrations.",
  },
  {
    id: "regulated",
    title: "High-risk / regulated",
    multiplier: null,
    description: "Fintech, health data, legal data, compliance-sensitive work, or heavy security requirements.",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function OfferCalculatorPage() {
  const currentPath = usePathname() ?? "";
  const [stageId, setStageId] = useState(stages[1].id);
  const [complexityId, setComplexityId] = useState(complexities[1].id);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(stages[1].modules);
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [notes, setNotes] = useState("");

  const selectedStage = stages.find((stage) => stage.id === stageId) ?? stages[1];
  const selectedComplexity = complexities.find((complexity) => complexity.id === complexityId) ?? complexities[1];

  const selectedModules = useMemo(
    () => modules.filter((module) => selectedModuleIds.includes(module.id)),
    [selectedModuleIds]
  );

  const oneTimeBase = selectedModules
    .filter((module) => !module.kind)
    .reduce((sum, module) => sum + module.price, 0);
  const monthlyBase = selectedModules
    .filter((module) => module.kind === "monthly")
    .reduce((sum, module) => sum + module.price, 0);
  const hasCustom = selectedModules.some((module) => module.kind === "custom") || selectedComplexity.multiplier === null;
  const multiplier = selectedComplexity.multiplier ?? 1;
  const estimatedLow = Math.max(selectedStage.startingAt, Math.round(oneTimeBase * multiplier));
  const estimatedHigh = Math.round(estimatedLow * 1.45);

  const setStage = (nextStageId: string) => {
    const nextStage = stages.find((stage) => stage.id === nextStageId) ?? stages[1];
    setStageId(nextStage.id);
    setSelectedModuleIds(nextStage.modules);
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModuleIds((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId]
    );
  };

  const printProposal = () => {
    window.print();
  };

  return (
    <Layout currentPath={currentPath}>
      <main className="calculator-page">
        <section className="intro no-print">
          <p className="eyebrow">Offer calculator</p>
          <h1>Shape a consulting offer during discovery or sales calls.</h1>
          <p>
            Select the project stage, service modules, and complexity level to produce a planning estimate and printable proposal summary.
          </p>
        </section>

        <div className="workspace">
          <section className="controls no-print" aria-label="Offer calculator controls">
            <div className="panel">
              <h2>1. Project stage</h2>
              <div className="option-list">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={stage.id === stageId ? "option active" : "option"}
                    onClick={() => setStage(stage.id)}
                  >
                    <strong>{stage.title}</strong>
                    <span>Starting at {formatCurrency(stage.startingAt)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <h2>2. Project modules</h2>
              <div className="module-grid">
                {modules.map((module) => (
                  <label key={module.id} className={selectedModuleIds.includes(module.id) ? "module checked" : "module"}>
                    <input
                      type="checkbox"
                      checked={selectedModuleIds.includes(module.id)}
                      onChange={() => toggleModule(module.id)}
                    />
                    <span>{module.title}</span>
                    <strong>
                      {module.kind === "custom"
                        ? "Custom"
                        : `${formatCurrency(module.price)}${module.kind === "monthly" ? "/mo" : ""}`}
                    </strong>
                  </label>
                ))}
              </div>
            </div>

            <div className="panel">
              <h2>3. Complexity</h2>
              <div className="complexity-grid">
                {complexities.map((complexity) => (
                  <button
                    key={complexity.id}
                    type="button"
                    className={complexity.id === complexityId ? "complexity active" : "complexity"}
                    onClick={() => setComplexityId(complexity.id)}
                  >
                    <strong>{complexity.title}</strong>
                    <span>{complexity.multiplier ? `${complexity.multiplier}x` : "Custom quote"}</span>
                    <p>{complexity.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <h2>4. Proposal details</h2>
              <div className="field-grid">
                <label>
                  Client name
                  <input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Client or company" />
                </label>
                <label>
                  Project name
                  <input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project or product" />
                </label>
              </div>
              <label className="notes-field">
                Notes
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Call notes, scope assumptions, timeline, or next steps" />
              </label>
            </div>
          </section>

          <aside className="summary">
            <div className="summary-card">
              <p className="eyebrow">Estimated offer</p>
              <h2>{selectedStage.recommendation}</h2>
              {hasCustom ? (
                <p className="price">Custom quote</p>
              ) : (
                <p className="price">{formatCurrency(estimatedLow)} - {formatCurrency(estimatedHigh)}</p>
              )}
              {monthlyBase > 0 && <p className="monthly">Plus retainer from {formatCurrency(monthlyBase)}/month</p>}
              <p className="summary-note">
                Planning estimate only. Final pricing depends on scope, timeline, technical risk, and access to the existing product or systems.
              </p>
              <div className="summary-actions no-print">
                <button type="button" onClick={printProposal}>Print / Save PDF</button>
                <a href={CALENDLY_URL} className="summary-cta">Book a Free Consultation →</a>
              </div>
            </div>
          </aside>
        </div>

        <section className="proposal">
          <div className="proposal-header">
            <div>
              <p className="eyebrow">Lynde Engineering</p>
              <h2>Consulting Offer Summary</h2>
            </div>
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <div className="proposal-grid">
            <div>
              <span>Client</span>
              <strong>{clientName || "Client / company name"}</strong>
            </div>
            <div>
              <span>Project</span>
              <strong>{projectName || "Project / product name"}</strong>
            </div>
            <div>
              <span>Recommended package</span>
              <strong>{selectedStage.recommendation}</strong>
            </div>
            <div>
              <span>Estimated range</span>
              <strong>{hasCustom ? "Custom quote" : `${formatCurrency(estimatedLow)} - ${formatCurrency(estimatedHigh)}`}</strong>
            </div>
          </div>

          <div className="proposal-section">
            <h3>Selected modules</h3>
            <ul>
              {selectedModules.map((module) => (
                <li key={module.id}>
                  <span>{module.title}</span>
                  <strong>
                    {module.kind === "custom"
                      ? "Custom"
                      : `${formatCurrency(module.price)}${module.kind === "monthly" ? "/month" : ""}`}
                  </strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="proposal-section">
            <h3>Scope assumptions</h3>
            <p>
              This estimate assumes a {selectedComplexity.title.toLowerCase()} project: {selectedComplexity.description}
            </p>
            <p>
              Security work is scoped as a practical security readiness and technical risk review, not certified penetration testing or formal compliance attestation.
            </p>
            {monthlyBase > 0 && <p>Ongoing support is estimated separately starting at {formatCurrency(monthlyBase)}/month.</p>}
            {notes && <p>{notes}</p>}
          </div>

          <div className="proposal-footer">
            <p>Next step: schedule a free consultation to confirm scope, timeline, risks, and implementation path.</p>
            <p>calendly.com/aidanlynde/free-consultation</p>
          </div>
        </section>

        <div className="back-link no-print">
          <a href="/routes/consulting" style={{color:'#888', textDecoration:'none', fontSize:'0.87rem', fontWeight:500}}>← Back to Consulting</a>
        </div>
      </main>

      <style jsx>{`
        .calculator-page {
          max-width: 1180px;
          margin: 0 auto;
          font-family: 'Montserrat', sans-serif;
          color: #333;
        }

        h1, h2, h3, p { margin-top: 0; }

        /* ── Intro ── */
        .intro {
          padding: 34px 0 28px;
          border-bottom: 1px solid #e4e4e4;
        }

        .eyebrow {
          margin: 0 0 8px;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #104827;
          font-weight: 700;
        }

        h1 {
          max-width: 860px;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          color: #1a1a1a;
        }

        .intro p {
          max-width: 680px;
          color: #666;
          font-size: 1rem;
          line-height: 1.65;
          margin: 0;
        }

        /* ── Workspace layout ── */
        .workspace {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 20px;
          align-items: start;
          padding: 24px 0;
        }

        .controls {
          display: grid;
          gap: 14px;
        }

        /* ── Panels ── */
        .panel {
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 22px;
        }

        .panel h2 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #888;
          margin-bottom: 14px;
        }

        /* ── Stage options ── */
        .option-list {
          display: grid;
          gap: 8px;
        }

        .option {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          text-align: left;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
          color: #333;
          padding: 13px 16px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Montserrat', sans-serif;
        }

        .option strong {
          font-size: 0.93rem;
          font-weight: 600;
        }

        .option span {
          color: #104827;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .option.active {
          border-color: #104827;
          box-shadow: 0 0 0 1px #104827;
          background: #f0f7f3;
        }

        .option:hover:not(.active) {
          border-color: #bbb;
        }

        /* ── Module checkboxes ── */
        .module-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .module {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 10px;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
          padding: 11px 13px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Montserrat', sans-serif;
        }

        .module span {
          font-size: 0.85rem;
          color: #333;
          font-weight: 500;
        }

        .module strong {
          color: #104827;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .module.checked {
          border-color: #104827;
          box-shadow: 0 0 0 1px #104827;
          background: #f0f7f3;
        }

        .module input[type="checkbox"] {
          accent-color: #104827;
          width: 15px;
          height: 15px;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ── Complexity ── */
        .complexity-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .complexity {
          width: 100%;
          text-align: left;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
          color: #333;
          padding: 14px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Montserrat', sans-serif;
        }

        .complexity strong {
          display: block;
          font-size: 0.93rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .complexity span {
          display: block;
          color: #104827;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .complexity p {
          margin: 0;
          color: #666;
          font-size: 0.82rem;
          line-height: 1.45;
        }

        .complexity.active {
          border-color: #104827;
          box-shadow: 0 0 0 1px #104827;
          background: #f0f7f3;
        }

        .complexity:hover:not(.active) {
          border-color: #bbb;
        }

        /* ── Form fields ── */
        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #555;
          letter-spacing: 0.03em;
        }

        input,
        textarea {
          width: 100%;
          margin-top: 6px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 10px 12px;
          color: #333;
          background: #fff;
          font-size: 0.93rem;
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus,
        textarea:focus {
          border-color: #104827;
        }

        textarea {
          min-height: 100px;
          resize: vertical;
        }

        .notes-field {
          display: block;
          margin-top: 12px;
        }

        /* ── Summary sidebar ── */
        .summary {
          position: sticky;
          top: 96px;
        }

        .summary-card {
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 24px;
        }

        .summary-card .eyebrow {
          margin-bottom: 6px;
        }

        .summary-card h2 {
          color: #1a1a1a;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .price {
          color: #104827;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .monthly {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .summary-note {
          color: #888;
          font-size: 0.82rem;
          line-height: 1.55;
          margin-bottom: 0;
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 18px;
        }

        .summary-actions button,
        .summary-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 11px 14px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
          width: 100%;
        }

        .summary-actions button {
          border: none;
          background: #e0e0e0;
          color: #333;
        }

        .summary-actions button:hover {
          background: #104827;
          color: #fff;
        }

        .summary-cta {
          background: #e0e0e0;
          color: #333 !important;
          border: none;
        }

        .summary-cta:hover {
          background: #104827;
          color: #fff !important;
        }

        /* ── Proposal (print view) ── */
        .proposal {
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 28px;
          margin: 8px 0 26px;
        }

        .proposal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          border-bottom: 2px solid #104827;
          padding-bottom: 18px;
          margin-bottom: 18px;
        }

        .proposal-header h2 {
          color: #1a1a1a;
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0;
        }

        .proposal-header p {
          color: #888;
          font-size: 0.9rem;
          margin: 0;
        }

        .proposal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 22px;
        }

        .proposal-grid div {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 14px;
          background: #fff;
        }

        .proposal-grid span {
          display: block;
          color: #999;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        .proposal-grid strong {
          color: #222;
          font-size: 0.93rem;
          font-weight: 700;
        }

        .proposal-section {
          margin-top: 22px;
        }

        .proposal-section h3 {
          color: #1a1a1a;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 12px;
        }

        .proposal-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0;
        }

        .proposal-section li {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 10px 0;
          border-bottom: 1px solid #e8e8e8;
          font-size: 0.93rem;
        }

        .proposal-section li span { color: #444; }
        .proposal-section li strong { color: #104827; font-weight: 700; white-space: nowrap; }

        .proposal-section p {
          color: #666;
          line-height: 1.6;
          font-size: 0.93rem;
        }

        .proposal-footer {
          margin-top: 22px;
          border-top: 1px solid #e0e0e0;
          padding-top: 14px;
        }

        .proposal-footer p {
          color: #888;
          font-size: 0.88rem;
          margin-bottom: 4px;
        }

        .back-link {
          padding-bottom: 26px;
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .workspace {
            grid-template-columns: 1fr;
          }

          .summary {
            position: static;
          }

          .proposal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .module-grid,
          .complexity-grid,
          .field-grid {
            grid-template-columns: 1fr;
          }

          .proposal-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .option {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .proposal-header {
            flex-direction: column;
          }
        }

        /* ── Print ── */
        @media print {
          .no-print,
          .back-link {
            display: none !important;
          }

          .calculator-page { max-width: none; }
          .workspace { display: block; padding: 0; }
          .summary { display: none; }

          .proposal {
            border: 0;
            border-radius: 0;
            margin: 0;
            padding: 0;
            background: #fff;
          }

          .proposal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}

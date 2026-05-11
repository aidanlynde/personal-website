"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
    startingAt: 750,
    recommendation: "Discovery Sprint",
    modules: ["discovery", "prototype-plan"],
  },
  {
    id: "prototype",
    title: "I have a prototype, but it is not ready for users",
    startingAt: 2500,
    recommendation: "Prototype to Production",
    modules: ["mini-audit", "deployment", "auth", "security"],
  },
  {
    id: "live",
    title: "I have a live product and need help improving it",
    startingAt: 1500,
    recommendation: "Software Clarity Audit",
    modules: ["audit", "security", "payments", "retainer"],
  },
  {
    id: "automation",
    title: "I need an internal tool or automation",
    startingAt: 3000,
    recommendation: "AI Workflow Automation",
    modules: ["workflow", "ai", "dashboard", "database"],
  },
  {
    id: "website",
    title: "I just need a website, landing page, or store",
    startingAt: 750,
    recommendation: "Website / Launch Presence",
    modules: ["landing", "business-site", "brand", "analytics"],
  },
];

const modules: Module[] = [
  { id: "audit", title: "Product/Technical Audit", price: 1500 },
  { id: "mini-audit", title: "Mini Audit", price: 500 },
  { id: "discovery", title: "Discovery Sprint", price: 750 },
  { id: "prototype-plan", title: "Clickable Prototype + Build Plan", price: 2500 },
  { id: "landing", title: "Landing Page", price: 750 },
  { id: "business-site", title: "Business Website", price: 1500 },
  { id: "auth", title: "User Authentication System", price: 1500 },
  { id: "database", title: "Database/API Setup", price: 2000 },
  { id: "deployment", title: "Production Deployment", price: 1000 },
  { id: "app-store", title: "App Store / Google Play Launch", price: 1500 },
  { id: "payments", title: "Payment Integration", price: 2500 },
  { id: "security", title: "Security Readiness Review", price: 2000 },
  { id: "ai", title: "AI Automation / Chatbot", price: 3000 },
  { id: "dashboard", title: "Admin Dashboard", price: 2500 },
  { id: "mobile-mvp", title: "Mobile App MVP", price: 12000 },
  { id: "web-mvp", title: "Web App MVP", price: 7500 },
  { id: "workflow", title: "Workflow Audit", price: 1500 },
  { id: "facilities", title: "Facilities / Workplace Tech Automation", price: 5000 },
  { id: "brand", title: "Design / Brand / Product Experience", price: 750 },
  { id: "analytics", title: "Analytics / Launch Measurement", price: 750 },
  { id: "retainer", title: "Ongoing Technical Retainer", price: 1000, kind: "monthly" },
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
                <a href={CALENDLY_URL}>Schedule Free Consultation</a>
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
          <Link href="/routes/consulting">Back to Consulting</Link>
        </div>
      </main>

      <style jsx>{`
        .calculator-page {
          max-width: 1180px;
          margin: 0 auto;
          color: #1f2933;
        }

        .intro {
          padding: 34px 0 28px;
          border-bottom: 1px solid #d5ddd7;
        }

        .eyebrow {
          margin: 0 0 10px;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #37624b;
          font-weight: 800;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 860px;
          font-size: clamp(2.2rem, 5vw, 4.6rem);
          line-height: 1;
          margin-bottom: 18px;
          color: #17231d;
        }

        .intro p {
          max-width: 760px;
          color: #53605a;
          font-size: 1.12rem;
          line-height: 1.65;
        }

        .workspace {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 24px;
          align-items: start;
          padding: 28px 0;
        }

        .controls {
          display: grid;
          gap: 18px;
        }

        .panel,
        .summary-card,
        .proposal {
          background: #f7f7f3;
          border: 1px solid #d7ddd8;
          border-radius: 8px;
          padding: 22px;
        }

        .panel h2 {
          margin-bottom: 16px;
          color: #17231d;
        }

        .option-list,
        .module-grid,
        .complexity-grid {
          display: grid;
          gap: 10px;
        }

        .option,
        .complexity {
          width: 100%;
          text-align: left;
          border: 1px solid #cbd6ce;
          border-radius: 8px;
          background: #ffffff;
          color: #1f2933;
          padding: 14px;
          cursor: pointer;
        }

        .option {
          display: flex;
          justify-content: space-between;
          gap: 14px;
        }

        .option span,
        .complexity span {
          color: #37624b;
          font-weight: 800;
          white-space: nowrap;
        }

        .option.active,
        .complexity.active,
        .module.checked {
          border-color: #104827;
          box-shadow: inset 0 0 0 1px #104827;
        }

        .module-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .module {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 10px;
          align-items: center;
          border: 1px solid #cbd6ce;
          border-radius: 8px;
          background: #ffffff;
          padding: 12px;
          cursor: pointer;
        }

        .module strong {
          color: #37624b;
          font-size: 0.9rem;
        }

        .complexity-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .complexity p {
          margin: 10px 0 0;
          color: #53605a;
          line-height: 1.45;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        label {
          color: #35423b;
          font-weight: 700;
        }

        input,
        textarea {
          width: 100%;
          margin-top: 8px;
          border: 1px solid #cbd6ce;
          border-radius: 8px;
          padding: 12px;
          color: #1f2933;
          background: #ffffff;
        }

        textarea {
          min-height: 110px;
          resize: vertical;
        }

        .notes-field {
          display: block;
          margin-top: 14px;
        }

        .summary {
          position: sticky;
          top: 96px;
        }

        .summary-card h2 {
          color: #17231d;
          margin-bottom: 10px;
        }

        .price {
          color: #104827;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .monthly,
        .summary-note {
          color: #53605a;
          line-height: 1.55;
        }

        .summary-actions {
          display: grid;
          gap: 10px;
          margin-top: 18px;
        }

        .summary-actions button,
        .summary-actions a {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 11px 14px;
          text-decoration: none;
          font-weight: 800;
          cursor: pointer;
        }

        .summary-actions button {
          border: 0;
          background: #104827;
          color: #fff;
        }

        .summary-actions a {
          border: 1px solid #b8c6bd;
          color: #1f3b2c;
          background: #ffffff;
        }

        .proposal {
          margin: 8px 0 26px;
        }

        .proposal-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 2px solid #104827;
          padding-bottom: 18px;
          margin-bottom: 18px;
        }

        .proposal-header h2 {
          color: #17231d;
          margin-bottom: 0;
        }

        .proposal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .proposal-grid div {
          border: 1px solid #d7ddd8;
          border-radius: 8px;
          padding: 14px;
          background: #ffffff;
        }

        .proposal-grid span {
          display: block;
          color: #6b766f;
          font-size: 0.78rem;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .proposal-section {
          margin-top: 20px;
        }

        .proposal-section h3 {
          color: #17231d;
          margin-bottom: 10px;
        }

        .proposal-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }

        .proposal-section li {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #d7ddd8;
          padding-bottom: 8px;
        }

        .proposal-section p {
          color: #53605a;
          line-height: 1.6;
        }

        .proposal-footer {
          margin-top: 24px;
          border-top: 1px solid #d7ddd8;
          padding-top: 14px;
          color: #53605a;
        }

        .proposal-footer p {
          margin-bottom: 6px;
        }

        .back-link {
          padding-bottom: 26px;
        }

        .back-link a {
          color: #104827;
          font-weight: 800;
        }

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
          .field-grid,
          .proposal-grid {
            grid-template-columns: 1fr;
          }

          .option,
          .proposal-header,
          .proposal-section li {
            flex-direction: column;
          }
        }

        @media print {
          .no-print,
          .back-link {
            display: none !important;
          }

          .calculator-page {
            max-width: none;
          }

          .workspace {
            display: block;
            padding: 0;
          }

          .summary {
            display: none;
          }

          .proposal {
            border: 0;
            border-radius: 0;
            margin: 0;
            padding: 0;
            background: #ffffff;
          }

          .proposal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}

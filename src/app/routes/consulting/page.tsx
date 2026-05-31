"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";

const CALENDLY_URL = "https://calendly.com/aidanlynde/lynde-engineering-free-consultation";

/* ─── Data ─────────────────────────────────────────────────── */

const PHASES = [
  {
    num: "01 · AUDIT",
    title: "Find what's broken before it breaks you.",
    desc: "Security gaps, broken flows, deploy bottlenecks — mapped in one document with a clear plan to fix each one.",
    bullets: ["Code & infra review", "Security audit", "Auth & data flows", "Performance & cost"],
  },
  {
    num: "02 · BUILD",
    title: "Prototype to production, properly.",
    desc: "Auth, databases, payments, dashboards, deploys. Real software with the parts that demos always skip.",
    bullets: ["Auth + user systems", "Stripe & payments", "Backend / API", "AI workflows"],
  },
  {
    num: "03 · LAUNCH",
    title: "Get it in front of real users.",
    desc: "App Store, TestFlight, marketing site, analytics, contact funnels, and the launch-day checklist that actually works.",
    bullets: ["TestFlight / Play Store", "Marketing site", "Analytics + funnels", "Launch-day support"],
  },
];

const PROCESS = [
  {
    n: 1, when: "DAY 0", title: "Discovery call",
    desc: "A free 30-minute conversation to understand the product, the current state, and what ‘done’ looks like.",
    deliverable: "free · 30 min",
  },
  {
    n: 2, when: "WEEK 1", title: "Scope & proposal",
    desc: "A written scope with clear milestones, fixed fee or weekly retainer, and a no-jargon roadmap to launch.",
    deliverable: "scope.pdf",
  },
  {
    n: 3, when: "WEEK 2–6", title: "Build & demo weekly",
    desc: "Heads-down build with weekly Loom demos and a shared Linear/Notion. You always know exactly where we are.",
    deliverable: "weekly demos",
  },
  {
    n: 4, when: "LAUNCH", title: "Ship & hand off",
    desc: "Deploy, submit, monitor. Full handoff doc plus 30 days of post-launch support included on every engagement.",
    deliverable: "+30 days support",
  },
];

type Package = {
  name: string;
  price: string;
  desc: string;
  meta: string[];
  featured?: boolean;
  incl: string[];
};

const PACKAGES: Package[] = [
  {
    name: "Software Clarity Audit",
    price: "$750 – $2,000",
    desc: "Understand exactly what is broken, risky, or holding your product back.",
    meta: ["1 week", "Fixed fee", "Async"],
    incl: [
      "Full code & infra walkthrough",
      "Security & auth gap analysis",
      "Prioritized fix list with effort estimates",
      "60-min readout call",
    ],
  },
  {
    name: "Prototype to Production",
    price: "$3,000 – $8,000+",
    desc: "The flagship path — turn a prototype, no-code app, or messy codebase into a reliable product.",
    meta: ["3–6 weeks", "Fixed fee", "Weekly demos"],
    featured: true,
    incl: [
      "Auth, payments, database, deploy",
      "Production hardening & monitoring",
      "Weekly Loom demos & shared Linear",
      "30 days of post-launch support",
    ],
  },
  {
    name: "MVP Build Sprint",
    price: "$6,000 – $18,000+",
    desc: "Full discovery, scope, UI direction, buildout, deployment, and launch support — from idea to live product.",
    meta: ["6–10 weeks", "Milestone billing", "Weekly demos"],
    incl: [
      "Discovery + scope + UI direction",
      "Full-stack build (web or mobile)",
      "App Store / TestFlight prep",
      "Launch site, analytics, and funnel",
    ],
  },
  {
    name: "AI Workflow Automation",
    price: "$2,000 – $8,000+",
    desc: "Practical AI tools, dashboards, and workflow automation that cut real manual work out of your business.",
    meta: ["2–4 weeks", "Fixed fee", "Async"],
    incl: [
      "Process mapping & quick wins",
      "Integrations (Slack, email, Sheets)",
      "Custom dashboards & assistants",
      "Hand-off documentation",
    ],
  },
];

const TRUST = [
  { key: "RESPONSE", val: "Under 24h", accent: true },
  { key: "COMMS", val: "Weekly Loom demos" },
  { key: "BILLING", val: "Fixed or weekly" },
  { key: "NDA", val: "Always available" },
];

const FAQS = [
  {
    q: "What if my code or product is in really rough shape?",
    a: "That’s exactly the situation I work in. Most engagements start with a half-built prototype, a no-code app outgrown by its own success, or a codebase passed between contractors. The audit step is built to handle this — I’ll tell you exactly what’s salvageable, what needs to be rebuilt, and what to do next.",
  },
  {
    q: "How fast can we move?",
    a: "Discovery calls usually happen within the same week. Most audits take 5–7 business days. A typical Prototype-to-Production engagement kicks off within 1–2 weeks of signing scope and ships in 3–6 weeks. If you have a real deadline, tell me on the call — I’ll be honest about whether it’s possible.",
  },
  {
    q: "What stack do you work in?",
    a: "Web: TypeScript, Next.js, React, FastAPI, Node, PostgreSQL, Firebase, Stripe, Vercel. Mobile: React Native / Expo with EAS for deployment. AI: OpenAI, Claude, vector databases, and the usual orchestration tooling. If you already have a stack, I’ll meet you there.",
  },
  {
    q: "Do you take equity instead of cash?",
    a: "Not as a primary payment model. For unusual situations I’m open to a small equity component on top of a cash floor, but I default to fixed-fee or weekly retainer so incentives stay clear on both sides.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes — happy to sign yours, or I can send a simple mutual NDA. Either way, I never work on directly competing products in parallel.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes 30 days of post-launch support — bug fixes, monitoring tweaks, and small adjustments. After that I offer a part-time retainer if you want me to keep an eye on the product as it grows, or a clean handoff if you have an internal team ready to take it over.",
  },
];

/* ─── Page ─────────────────────────────────────────────────── */

export default function ConsultingPage() {
  const currentPath = usePathname() ?? "";
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <Layout currentPath={currentPath}>
      <main className="consulting-page">

        {/* ── Header (unchanged) ── */}
        <div className="banner">
          <Image src="/images/consultingbanner.png" alt="Lynde Engineering Banner" fill priority />
        </div>

        <section className="consulting-header">
          <div className="header-row">
            <div>
              <p className="eyebrow">Software Consulting</p>
              <h1>Lynde Engineering</h1>
            </div>
            <div className="header-actions">
              <a href={CALENDLY_URL} className="btn btn-soft">Book a Free Call</a>
            </div>
          </div>
          <p className="lead">
            I help founders, small businesses, and internal teams audit, build, secure, deploy, and launch production-ready software — across web, mobile, payments, AI workflows, and infrastructure.
          </p>
        </section>

        {/* ── Availability pill ── */}
        <div className="avail-pill">
          <span className="status-dot inline" />
          <span>AVAILABLE — Q3 2026 · 2 SLOTS</span>
        </div>

        {/* ── Flagship band ── */}
        <section className="flagship">
          <p className="eyebrow flagship-eyebrow"><span className="status-dot inline" /> FLAGSHIP OFFER</p>
          <h2>Prototype → Production.</h2>
          <div className="flagship-row">
            <div className="flag-card before">
              <span className="flag-label">YOU HAVE</span>
              <span className="flag-title">A prototype that almost works</span>
              <ul className="flag-list">
                <li>Hard-coded auth — or no auth</li>
                <li>Payments hacked in or missing</li>
                <li>No deploys, just localhost</li>
                <li>One developer, no documentation</li>
                <li>App Store rejection emails</li>
              </ul>
            </div>
            <div className="flag-arrow" aria-hidden="true">→</div>
            <div className="flag-card after">
              <span className="flag-label">YOU GET</span>
              <span className="flag-title">A product real users can use</span>
              <ul className="flag-list">
                <li>Real auth: email, OAuth, OTP fallback</li>
                <li>Stripe payments, webhooks, refunds</li>
                <li>One-click deploy with rollback</li>
                <li>Docs your next hire can pick up</li>
                <li>Live in the App Store</li>
              </ul>
            </div>
          </div>
          <div className="flagship-foot">
            <p>
              You bring the idea, prototype, no-code app, or messy codebase. <strong>I handle the missing pieces</strong> — authentication, databases, deployment, security, payments, and launch systems — and turn it into a product that actually works for real users.
            </p>
            <a href={CALENDLY_URL} className="btn btn-light">
              Start with a free call <span className="arrow">→</span>
            </a>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT I CAN HELP WITH</p>
              <h2>Three phases — one engineer end-to-end.</h2>
            </div>
            <p className="side">Most consultants hand you off after the audit. I scope, build, and launch — and stick around long enough for it to actually land.</p>
          </div>
          <div className="phase-grid">
            {PHASES.map((p) => (
              <div key={p.num} className="phase-card">
                <span className="phase-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p className="phase-desc">{p.desc}</p>
                <ul className="phase-bullets">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Process timeline ── */}
        <section className="process">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>From first call to live product, on a schedule you can trust.</h2>
            </div>
            <p className="side">Same shape every time. No surprises in week three.</p>
          </div>
          <div className="timeline">
            {PROCESS.map((s, i) => (
              <div key={s.n} className={`step ${i < 1 ? "filled" : ""}`}>
                <div className="step-dot">{String(s.n).padStart(2, "0")}</div>
                <div className="step-day">{s.when}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="deliverable">{s.deliverable}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="packages">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMMON ENTRY POINTS</p>
              <h2>Start with the right level of commitment.</h2>
            </div>
            <p className="side">All engagements are fixed-fee or weekly retainer. Not sure where you fit? Start with the audit.</p>
          </div>
          <div className="pkg-grid">
            {PACKAGES.map((p) => (
              <div key={p.name} className={`pkg-card ${p.featured ? "featured" : ""}`}>
                <div className="pkg-head">
                  <div className="pkg-name">{p.name}</div>
                  <div className="pkg-price">{p.price}</div>
                </div>
                <p className="pkg-desc">{p.desc}</p>
                <div className="pkg-meta">
                  {p.meta.map((m) => <span key={m} className="pkg-tag">{m}</span>)}
                </div>
                <ul className="pkg-incl">
                  {p.incl.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="pkg-cta">
                  <a href={CALENDLY_URL} className="btn btn-ghost pkg-cta-btn">
                    Discuss this engagement <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="pkg-help">
            <span className="pkg-help-text">
              Not sure which one fits? <strong>Start with a free 30-min call</strong> — I&apos;ll point you to the right starting point.
            </span>
            <Link href="/routes/consulting/calculator" className="cta-tertiary">
              or estimate cost first
            </Link>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="trust">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW I WORK</p>
              <h2>Predictable, async-friendly, and easy to plug into your team.</h2>
            </div>
          </div>
          <div className="trust-grid">
            {TRUST.map((t) => (
              <div key={t.key} className="trust-item">
                <span className="trust-key">{t.key}</span>
                <span className="trust-val">
                  {t.accent ? <span className="accent">{t.val}</span> : t.val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Proof band ── */}
        <section className="proof">
          <div>
            <p className="eyebrow proof-eyebrow">RELEVANT EXPERIENCE</p>
            <h2 className="proof-title">Built around practical launch work.</h2>
            <p className="proof-copy">
              3–4 years of enterprise consulting on the <strong><a href="https://eptura.com/our-platform/archibus/" target="_blank" rel="noopener noreferrer" style={{color:"inherit"}}>Archibus IWMS platform</a></strong> — supporting Fortune 500 pharma, tech, and logistics companies with facilities management and workflow automation. Mobile apps shipped to the App Store. Full-stack builds for founders and early-stage teams.
            </p>
          </div>
          <div className="proof-stats">
            <div className="proof-stat">
              <div className="proof-stat-num">10+</div>
              <div className="proof-stat-label">Projects shipped</div>
            </div>
            <div className="proof-stat">
              <div className="proof-stat-num">F500</div>
              <div className="proof-stat-label">Enterprise clients via Archibus</div>
            </div>
            <div className="proof-stat">
              <div className="proof-stat-num">3</div>
              <div className="proof-stat-label">Apps in stores</div>
            </div>
            <div className="proof-stat">
              <div className="proof-stat-num">≤ 14d</div>
              <div className="proof-stat-label">To first ship</div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMMON QUESTIONS</p>
              <h2>Before we get on a call.</h2>
            </div>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="final-cta">
          <p className="eyebrow final-cta-eyebrow"><span className="status-dot inline" /> READY WHEN YOU ARE</p>
          <h2>Let&apos;s figure out the cleanest path<br />from <em>prototype</em> to <em>production</em>.</h2>
          <p className="cta-lead">
            A free 30-minute call is enough to understand what you&apos;re working with and outline a clear next step. No commitment, no pitch deck — just a straightforward conversation.
          </p>
          <div className="cta-actions">
            <a href={CALENDLY_URL} className="btn btn-primary btn-large">
              Book a Free Consultation <span className="arrow">→</span>
            </a>
            <Link href="/routes/consulting/calculator" className="cta-tertiary">
              or estimate cost first
            </Link>
          </div>
        </section>

      </main>

      <style jsx>{`
        /* ── Design tokens ──────────────────────────────────────── */
        .consulting-page {
          --bg:           #EDEDED;
          --bg-2:         #f4f4f4;
          --surface:      #ffffff;
          --border:       #e4e4e4;
          --border-soft:  rgba(0,0,0,0.07);
          --ink:          #1a1a1a;
          --ink-2:        #333333;
          --muted:        #666666;
          --muted-2:      #888888;
          --green:        #104827;
          --green-pale:   #6fce8f;
          --green-soft:   rgba(16,72,39,0.08);

          --radius-sm:    8px;
          --radius:       12px;
          --radius-lg:    16px;
          --radius-xl:    20px;

          --shadow-soft:  0 2px 14px rgba(0,0,0,0.06);

          --font-display: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-body:    'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-mono:    var(--font-geist-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 20px;
          font-family: var(--font-body);
          color: var(--ink-2);
        }

        .consulting-page :global(*) { box-sizing: border-box; }
        .consulting-page h1, .consulting-page h2, .consulting-page h3 {
          font-family: var(--font-display);
          color: var(--ink);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin: 0;
        }
        .consulting-page p { margin: 0; line-height: 1.6; }

        .eyebrow {
          margin: 0 0 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--green);
          font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px;
        }

        .status-dot {
          position: relative; width: 8px; height: 8px;
          flex: 0 0 auto; display: inline-block;
        }
        .status-dot::before {
          content: ''; position: absolute; inset: 0;
          border-radius: 50%; background: var(--green);
        }
        .status-dot::after {
          content: ''; position: absolute; inset: -4px;
          border-radius: 50%; border: 1.5px solid var(--green);
          animation: pulse-ring 2s ease-out infinite;
        }
        .status-dot.inline { width: 6px; height: 6px; }
        @keyframes pulse-ring {
          0%   { transform: scale(0.85); opacity: 0.7; }
          70%  { transform: scale(1.9);  opacity: 0; }
          100% { transform: scale(1.9);  opacity: 0; }
        }

        /* ── Buttons ────────────────────────────────────────────── */
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px 20px;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.93rem; font-weight: 500;
          cursor: pointer; border: 1px solid transparent;
          transition: background .2s ease, color .2s ease, transform .15s ease, border-color .2s ease;
          white-space: nowrap; text-decoration: none;
        }
        .btn :global(.arrow) { transition: transform .25s ease; display: inline-block; }
        .btn:hover :global(.arrow) { transform: translateX(4px); }
        .btn-primary { background: var(--ink); color: #fff; }
        .btn-primary:hover { background: var(--green); transform: translateY(-2px); }
        .btn-ghost {
          background: transparent; color: var(--ink-2);
          border-color: rgba(0,0,0,0.12);
        }
        .btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }
        .btn-light { background: #fff; color: var(--ink); }
        .btn-light:hover { background: var(--green); color: #fff; transform: translateY(-2px); }
        .btn-soft { background: #e0e0e0; color: var(--ink-2); }
        .btn-soft:hover { background: var(--green); color: #fff; }
        .btn-large { padding: 14px 28px; font-size: 1rem; font-weight: 600; }

        /* ── Banner + Header ────────────────────────────────────── */
        .banner {
          position: relative; width: 100%; height: 180px;
          background: #e4e4e4;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
        }
        .consulting-header {
          padding: 20px 0 28px;
          border-bottom: 1px solid var(--border);
        }
        .header-row {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 20px; margin-bottom: 14px;
        }
        .consulting-header h1 {
          font-size: 2.4rem; font-weight: 800;
          color: var(--ink); letter-spacing: -0.02em; line-height: 1.1;
        }
        .lead {
          font-size: 1rem; line-height: 1.65;
          color: var(--muted); max-width: 700px;
        }
        .header-actions {
          display: flex; align-items: center; gap: 18px;
          flex-shrink: 0; padding-bottom: 4px;
        }

        /* ── Availability pill ──────────────────────────────────── */
        .avail-pill {
          display: inline-flex; align-items: center; gap: 10px;
          margin: 20px 0 0;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-2);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px 6px 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
        }

        /* ── Flagship band ──────────────────────────────────────── */
        .flagship {
          margin: 36px 0 8px;
          background: var(--ink);
          color: #f4f4f4;
          border-radius: var(--radius-xl);
          padding: 40px 36px 36px;
          position: relative;
          overflow: hidden;
        }
        .flagship::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(60% 90% at 100% 100%, rgba(16,72,39,0.55), transparent 60%),
            radial-gradient(50% 70% at 0% 0%, rgba(16,72,39,0.20), transparent 60%);
          pointer-events: none;
        }
        .flagship > :global(*) { position: relative; }
        .flagship-eyebrow { color: var(--green-pale) !important; }
        .flagship h2 {
          margin-top: 14px;
          font-size: clamp(1.9rem, 4.2vw, 2.8rem);
          color: #fff;
          letter-spacing: -0.03em;
        }
        .flagship-row {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 36px 1fr;
          gap: 16px; align-items: stretch;
        }
        .flag-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: var(--radius);
          padding: 18px 18px 14px;
          display: flex; flex-direction: column; gap: 10px;
          min-height: 200px;
        }
        .flag-card.after {
          background: rgba(16,72,39,0.30);
          border-color: rgba(111,206,143,0.30);
        }
        .flag-label {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .flag-card.after .flag-label { color: var(--green-pale); }
        .flag-title {
          font-family: var(--font-display);
          font-weight: 700; color: #fff;
          font-size: 1rem; letter-spacing: -0.01em;
        }
        .flag-list {
          list-style: none; margin: 6px 0 0; padding: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .flag-list li {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
          position: relative; padding-left: 16px;
        }
        .flag-list li::before {
          content: '×';
          position: absolute; left: 0;
          color: rgba(255,255,255,0.5);
        }
        .flag-card.after .flag-list li::before {
          content: '✓'; color: var(--green-pale);
        }
        .flag-card.after .flag-list li { color: rgba(255,255,255,0.85); }
        .flag-arrow {
          display: flex; align-items: center; justify-content: center;
          color: var(--green-pale);
          font-size: 1.4rem;
          font-family: var(--font-mono);
        }
        .flagship-foot {
          margin-top: 24px;
          display: flex; justify-content: space-between; align-items: end;
          gap: 24px; flex-wrap: wrap;
        }
        .flagship-foot p {
          color: rgba(255,255,255,0.7);
          max-width: 460px;
          font-size: 0.95rem;
        }
        .flagship-foot p :global(strong) { color: #fff; font-weight: 600; }

        /* ── Services ───────────────────────────────────────────── */
        .services { padding: 56px 0; border-bottom: 1px solid var(--border); }
        .section-heading {
          margin-bottom: 28px;
          display: flex; align-items: end; justify-content: space-between; gap: 24px;
        }
        .section-heading h2 {
          font-size: clamp(1.6rem, 3.2vw, 2.2rem);
          margin-top: 14px; max-width: 580px;
        }
        .section-heading .side {
          color: var(--muted); font-size: 0.92rem; max-width: 280px;
        }
        .phase-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
        }
        .phase-card {
          background: var(--bg-2);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius);
          padding: 22px 20px;
          display: flex; flex-direction: column; gap: 12px;
          min-height: 280px;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }
        .phase-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-soft);
          background: var(--surface);
        }
        .phase-num {
          font-family: var(--font-mono);
          font-size: 0.72rem; color: var(--green);
          letter-spacing: 0.14em; font-weight: 600;
        }
        .phase-card h3 {
          font-size: 1.15rem; font-weight: 700;
          letter-spacing: -0.01em; line-height: 1.2;
        }
        .phase-desc { font-size: 0.86rem; color: var(--muted); line-height: 1.5; }
        .phase-bullets {
          list-style: none; margin: 4px 0 0; padding: 0;
          display: flex; flex-direction: column; gap: 6px;
          border-top: 1px solid var(--border);
          padding-top: 14px; margin-top: auto;
        }
        .phase-bullets li {
          font-family: var(--font-mono);
          font-size: 0.75rem; color: var(--ink-2);
          letter-spacing: 0.02em;
          position: relative; padding-left: 14px;
        }
        .phase-bullets li::before {
          content: '›';
          position: absolute; left: 0; top: 0;
          color: var(--green); font-weight: 600;
        }

        /* ── Process timeline ───────────────────────────────────── */
        .process { padding: 56px 0; border-bottom: 1px solid var(--border); }
        .timeline {
          position: relative;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 14px; margin-top: 8px;
        }
        .timeline::before {
          content: '';
          position: absolute; top: 18px; left: 6%; right: 6%;
          height: 2px;
          background: linear-gradient(90deg,
            var(--green) 0%, var(--green) 50%,
            rgba(16,72,39,0.25) 50%, rgba(16,72,39,0.25) 100%);
          z-index: 0;
        }
        .step { position: relative; z-index: 1; padding: 0 4px; }
        .step-dot {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--green);
          color: var(--green);
          display: grid; place-items: center;
          font-family: var(--font-mono);
          font-weight: 600; font-size: 0.78rem;
          margin-bottom: 16px;
        }
        .step.filled .step-dot { background: var(--green); color: #fff; }
        .step-day {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--muted-2); margin-bottom: 6px;
        }
        .step h3 {
          font-size: 1.05rem; font-weight: 700;
          margin-bottom: 8px; letter-spacing: -0.01em;
        }
        .step p {
          font-size: 0.85rem; color: var(--muted);
          line-height: 1.55; margin-bottom: 10px;
        }
        .deliverable {
          font-family: var(--font-mono);
          font-size: 0.72rem; color: var(--ink-2);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 9px;
          display: inline-block;
        }

        /* ── Packages ───────────────────────────────────────────── */
        .packages { padding: 56px 0; border-bottom: 1px solid var(--border); }
        .pkg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .pkg-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px 24px 22px;
          display: flex; flex-direction: column; gap: 14px;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .pkg-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-soft);
          border-color: var(--ink);
        }
        .pkg-card.featured {
          background: linear-gradient(180deg, var(--bg-2), var(--surface));
          border-color: var(--green);
          box-shadow: 0 0 0 1px var(--green) inset, var(--shadow-soft);
        }
        .pkg-card.featured::before {
          content: 'MOST COMMON';
          position: absolute; top: -10px; left: 24px;
          background: var(--green); color: #fff;
          font-family: var(--font-mono);
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.12em;
          padding: 4px 10px; border-radius: 4px;
        }
        .pkg-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 16px;
        }
        .pkg-name {
          font-family: var(--font-display);
          font-weight: 700; font-size: 1.15rem;
          color: var(--ink); letter-spacing: -0.01em; line-height: 1.2;
        }
        .pkg-price {
          font-family: var(--font-display);
          font-weight: 700; font-size: 1.05rem;
          color: var(--green); letter-spacing: -0.01em; white-space: nowrap;
        }
        .pkg-desc { color: var(--muted); font-size: 0.88rem; line-height: 1.55; }
        .pkg-meta {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;
        }
        .pkg-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          background: var(--bg-2);
          border: 1px solid var(--border);
          color: var(--ink-2);
          border-radius: 6px;
          padding: 4px 8px;
          letter-spacing: 0.02em;
        }
        .pkg-incl {
          list-style: none; margin: 0; padding: 12px 0 0;
          display: flex; flex-direction: column; gap: 8px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .pkg-incl li {
          font-size: 0.82rem; color: var(--ink-2);
          line-height: 1.45;
          position: relative; padding-left: 20px;
        }
        .pkg-incl li::before {
          content: '✓';
          position: absolute; left: 0; top: 0;
          color: var(--green); font-weight: 700; font-size: 0.85rem;
        }
        .pkg-cta-btn { width: 100%; }
        .pkg-help {
          margin-top: 18px;
          display: flex; align-items: center; justify-content: space-between;
          background: var(--bg-2);
          border: 1px dashed var(--border);
          border-radius: var(--radius);
          padding: 14px 18px; gap: 16px; flex-wrap: wrap;
        }
        .pkg-help-text {
          font-family: var(--font-mono);
          font-size: 0.8rem; color: var(--ink-2);
        }
        .pkg-help-text :global(strong) { color: var(--green); font-weight: 600; }

        /* ── Trust strip ────────────────────────────────────────── */
        .trust { padding: 28px 0 56px; border-bottom: 1px solid var(--border); }
        .trust-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--bg-2);
          overflow: hidden;
        }
        .trust-item {
          padding: 18px 20px;
          display: flex; flex-direction: column; gap: 4px;
          border-right: 1px solid var(--border);
        }
        .trust-item:last-child { border-right: 0; }
        .trust-key {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted-2);
        }
        .trust-val {
          font-family: var(--font-display);
          font-weight: 700; font-size: 0.95rem;
          color: var(--ink); letter-spacing: -0.01em;
        }
        .trust-val :global(.accent) { color: var(--green); }

        /* ── Proof band ─────────────────────────────────────────── */
        .proof {
          margin: 56px 0;
          background: var(--ink);
          color: #f4f4f4;
          border-radius: var(--radius-xl);
          padding: 44px 36px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 36px; align-items: center;
          position: relative; overflow: hidden;
        }
        .proof::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(50% 80% at 100% 100%, rgba(16,72,39,0.55), transparent 60%),
            radial-gradient(40% 60% at 0% 0%, rgba(16,72,39,0.20), transparent 60%);
          pointer-events: none;
        }
        .proof > :global(*) { position: relative; }
        .proof-eyebrow { color: var(--green-pale) !important; }
        .proof-title { color: #fff; font-size: clamp(1.5rem, 3vw, 2rem); margin-top: 14px; }
        .proof-copy { color: rgba(255,255,255,0.7); margin-top: 16px; font-size: 0.95rem; line-height: 1.6; }
        .proof-copy :global(strong) { color: #fff; font-weight: 600; }
        .proof-copy :global(a) { text-decoration: underline; text-underline-offset: 3px; }
        .proof-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .proof-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius);
          padding: 18px;
        }
        .proof-stat-num {
          font-family: var(--font-display);
          font-weight: 700; font-size: 1.7rem;
          letter-spacing: -0.03em; color: #fff;
        }
        .proof-stat-label {
          font-family: var(--font-mono);
          font-size: 0.7rem; color: rgba(255,255,255,0.55);
          letter-spacing: 0.08em; text-transform: uppercase; margin-top: 6px;
        }

        /* ── FAQ ────────────────────────────────────────────────── */
        .faq { padding: 0 0 56px; }
        .faq-list { margin-top: 24px; border-top: 1px solid var(--border); }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-q {
          width: 100%; background: transparent; border: 0;
          text-align: left; padding: 22px 4px; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          gap: 20px;
          font-family: var(--font-display);
          font-weight: 700; font-size: 1.05rem;
          color: var(--ink); letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color .2s;
        }
        .faq-q:hover { color: var(--green); }
        .faq-toggle {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          display: grid; place-items: center;
          flex: 0 0 auto;
          font-family: var(--font-mono);
          font-size: 1rem; color: var(--ink-2);
          transition: transform .3s ease, background .2s, color .2s;
        }
        .faq-item.open .faq-toggle {
          transform: rotate(45deg);
          background: var(--green); color: #fff;
          border-color: var(--green);
        }
        .faq-a { overflow: hidden; max-height: 0; transition: max-height .35s ease; }
        .faq-item.open .faq-a { max-height: 400px; }
        .faq-a-inner {
          padding: 0 4px 22px;
          color: var(--muted);
          font-size: 0.95rem; line-height: 1.65;
          max-width: 700px;
        }

        /* ── Final CTA ──────────────────────────────────────────── */
        .final-cta {
          margin: 24px 0 32px;
          padding: 72px 40px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          text-align: center;
          position: relative; overflow: hidden;
        }
        .final-cta::before, .final-cta::after {
          content: ''; position: absolute;
          border-radius: 50%; pointer-events: none;
          filter: blur(60px); opacity: 0.4;
        }
        .final-cta::before {
          width: 280px; height: 280px;
          background: var(--green);
          top: -120px; right: -100px;
          opacity: 0.18;
        }
        .final-cta::after {
          width: 220px; height: 220px;
          background: var(--green-pale);
          bottom: -100px; left: -80px;
          opacity: 0.18;
        }
        .final-cta > :global(*) { position: relative; }
        .final-cta-eyebrow { justify-content: center; }
        .final-cta h2 {
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          margin: 18px auto 0;
          max-width: 680px;
          letter-spacing: -0.035em;
          line-height: 1.05;
        }
        .final-cta h2 :global(em) { font-style: normal; color: var(--green); }
        .cta-lead {
          color: var(--muted);
          font-size: 1.02rem; max-width: 540px; line-height: 1.65;
          display: block;
          margin: 22px auto 32px !important;
          text-align: center;
        }
        .cta-actions {
          display: inline-flex; gap: 16px; align-items: center;
          flex-wrap: wrap; justify-content: center;
        }
        .cta-tertiary {
          color: #888888;
          font-size: 0.9rem;
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(0,0,0,0.18);
        }
        .cta-tertiary:visited { color: #888888; }
        .cta-tertiary:hover { color: #444444; text-decoration-color: rgba(0,0,0,0.35); }
        .cta-foot {
          margin-top: 32px;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.72rem; color: var(--muted-2);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .cta-foot .status-dot { width: 6px; height: 6px; }

        /* ── Responsive ─────────────────────────────────────────── */
        @media (max-width: 860px) {
          .flagship-row { grid-template-columns: 1fr; }
          .flag-arrow { transform: rotate(90deg); height: 24px; }
          .phase-grid { grid-template-columns: 1fr; }
          .timeline { grid-template-columns: 1fr 1fr; row-gap: 32px; }
          .timeline::before { display: none; }
          .pkg-grid { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr 1fr; }
          .trust-item { border-right: 0; border-bottom: 1px solid var(--border); }
          .trust-item:nth-child(2n) { border-right: 0; }
          .trust-item:nth-last-child(-n+2) { border-bottom: 0; }
          .proof { grid-template-columns: 1fr; padding: 36px 28px; gap: 28px; }
          .section-heading { flex-direction: column; align-items: flex-start; gap: 14px; }
          .header-row { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 560px) {
          .banner { height: 140px; }
          .flagship { padding: 32px 24px; }
          .timeline { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
          .trust-item { border-bottom: 1px solid var(--border) !important; }
          .trust-item:last-child { border-bottom: 0 !important; }
          .final-cta { padding: 52px 24px; }
        }
      `}</style>
    </Layout>
  );
}

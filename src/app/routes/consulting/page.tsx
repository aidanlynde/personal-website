"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Layout from "../../components/Layout";

const CALENDLY_URL = "https://calendly.com/aidanlynde/free-consultation";

const services = [
  { title: "Product & Technical Audits", description: "Find security risks, broken flows, and bottlenecks before they become expensive problems." },
  { title: "Prototype to Production", description: "Turn hacked-together MVPs into real products with auth, databases, deployment, payments, and launch systems." },
  { title: "MVP Builds", description: "Take an idea from concept to scoped, designed, and deployed software with a practical launch plan." },
  { title: "Payment & User Systems", description: "Design and implement secure checkout flows, subscriptions, admin visibility, and transaction logic." },
  { title: "AI & Workflow Automation", description: "Build internal tools, dashboards, chatbots, and automations that cut manual work." },
  { title: "App Store & Launch Support", description: "Prepare mobile apps for TestFlight, Google Play, store submission, metadata, and rejection debugging." },
  { title: "Websites & Launch Funnels", description: "Clean landing pages, business sites, waitlists, analytics, and contact forms." },
  { title: "Facilities & Workplace Tech", description: "Modernize operations with dashboards, data cleanup, AI integrations, and internal tools." },
];

const packages = [
  ["Software Clarity Audit", "$1,500–$3,500", "Understand exactly what is broken, risky, or holding your product back."],
  ["Prototype to Production", "$5,000–$15,000+", "The flagship path — turn a prototype or messy codebase into a reliable product."],
  ["MVP Build Sprint", "$10,000–$30,000+", "Full discovery, scope, UI direction, buildout, deployment, and launch support."],
  ["AI Workflow Automation", "$3,000–$15,000+", "Practical AI tools, dashboards, and workflow automation for your business."],
];

export default function ConsultingPage() {
  const currentPath = usePathname() ?? "";

  return (
    <Layout currentPath={currentPath}>
      <main className="consulting-page">

        {/* ── LinkedIn-style header ── */}
        <div className="banner">
          <Image src="/images/projectbanner.png" alt="Lynde Engineering Banner" fill priority />
        </div>

        <section className="consulting-header">
          <div className="header-row">
            <div>
              <p className="eyebrow">Software Consulting</p>
              <h1>Lynde Engineering</h1>
            </div>
            <div className="header-actions">
              <a href={CALENDLY_URL} className="btn-primary">Book a Free Call</a>
              <a href="/routes/consulting/calculator" style={{color:'#888', textDecoration:'none', fontSize:'0.9rem', fontWeight:500, whiteSpace:'nowrap'}}>
                Offer Calculator
              </a>
            </div>
          </div>
          <p className="lead">
            I help founders, small businesses, and internal teams audit, build, secure, deploy, and launch production-ready software — across web, mobile, payments, AI workflows, and infrastructure.
          </p>
        </section>

        {/* ── What I do ── */}
        <section className="flagship">
          <div className="flagship-label">
            <p className="eyebrow">Flagship offer</p>
            <h2>Prototype to Production</h2>
          </div>
          <p>
            You bring the idea, prototype, no-code app, or messy codebase. I handle the missing pieces — authentication, databases, deployment, security, payments, and launch systems — and turn it into a product that actually works for real users.
          </p>
        </section>

        {/* ── Services ── */}
        <section className="services" aria-label="Consulting services">
          <div className="section-heading">
            <p className="eyebrow">What I can help with</p>
            <h2>Every engagement is scoped to what you actually need.</h2>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <article key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="packages">
          <div className="section-heading">
            <p className="eyebrow">Common entry points</p>
            <h2>Start with the right level of commitment.</h2>
          </div>
          <div className="package-list">
            {packages.map(([title, price, description]) => (
              <article key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <strong>{price}</strong>
              </article>
            ))}
          </div>
        </section>

        {/* ── Credibility ── */}
        <section className="credibility">
          <div>
            <p className="eyebrow">Relevant experience</p>
            <h2>Built around practical launch work.</h2>
          </div>
          <ul>
            <li>Mobile deployment, app stores, Expo/EAS, Firebase, and production launch workflows.</li>
            <li>User auth, payments, QR/payment flows, databases, analytics, and backend/API setup.</li>
            <li>AI-assisted workflows, internal automation, dashboards, and workplace tech systems.</li>
          </ul>
        </section>

        {/* ── Final CTA ── */}
        <section className="final-cta">
          <p className="eyebrow">Ready to move forward?</p>
          <h2>Let's figure out the cleanest path for your project.</h2>
          <p className="cta-lead">
            A free 30-minute call is enough to understand what you're working with and outline a clear next step. No commitment, no pitch deck — just a straightforward conversation.
          </p>
          <div className="cta-actions">
            <a href={CALENDLY_URL} className="btn-primary btn-large">Book a Free Consultation →</a>
            <a href="/routes/consulting/calculator" style={{color:'#888', textDecoration:'none', fontSize:'0.9rem', fontWeight:500}}>
              Estimate cost first
            </a>
          </div>
        </section>

      </main>

      <style jsx>{`
        .consulting-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 20px;
          font-family: 'Montserrat', sans-serif;
          color: #333;
        }

        h1, h2, h3, p { margin-top: 0; }

        .eyebrow {
          margin: 0 0 8px;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #104827;
          font-weight: 700;
        }

        /* ── Banner ── */
        .banner {
          position: relative;
          width: 100%;
          height: 180px;
          background: #e4e4e4;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .consulting-header {
          padding: 20px 0 28px;
          border-bottom: 1px solid #e4e4e4;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 14px;
        }

        h1 {
          margin: 0;
          font-size: 2.4rem;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .lead {
          font-size: 1rem;
          line-height: 1.65;
          color: #666;
          margin: 0;
          max-width: 700px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 20px;
          border-radius: 8px;
          background: #e0e0e0;
          color: #333;
          font-size: 0.93rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .btn-primary:hover {
          background: #104827;
          color: #fff;
        }

        .btn-large {
          padding: 14px 28px;
          font-size: 1rem;
          font-weight: 600;
        }

        /* ── Flagship ── */
        .flagship {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          align-items: start;
          padding: 44px 0;
          border-bottom: 1px solid #e4e4e4;
        }

        .flagship h2 {
          font-size: clamp(1.7rem, 3.5vw, 2.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 0;
          color: #1a1a1a;
        }

        .flagship p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Services ── */
        .services {
          padding: 44px 0;
          border-bottom: 1px solid #e4e4e4;
        }

        .section-heading {
          margin-bottom: 24px;
        }

        .section-heading h2 {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .services-grid article {
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 18px;
        }

        .services-grid h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 7px;
          color: #222;
          line-height: 1.3;
        }

        .services-grid p {
          color: #666;
          font-size: 0.84rem;
          line-height: 1.55;
          margin: 0;
        }

        /* ── Packages ── */
        .packages {
          padding: 44px 0;
          border-bottom: 1px solid #e4e4e4;
        }

        .package-list {
          display: grid;
          gap: 10px;
        }

        .package-list article {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 20px 22px;
        }

        .package-list h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 4px;
        }

        .package-list p {
          color: #666;
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0;
        }

        .package-list strong {
          color: #104827;
          font-size: 1.05rem;
          font-weight: 800;
          white-space: nowrap;
        }

        /* ── Credibility ── */
        .credibility {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          align-items: start;
          padding: 44px 0;
          border-bottom: 1px solid #e4e4e4;
        }

        .credibility h2 {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0;
        }

        .credibility ul {
          margin: 0;
          padding-left: 18px;
        }

        .credibility li {
          color: #666;
          line-height: 1.65;
          font-size: 1rem;
        }

        .credibility li + li { margin-top: 14px; }

        /* ── Final CTA ── */
        .final-cta {
          padding: 52px 0 32px;
          text-align: center;
        }

        .final-cta h2 {
          font-size: clamp(1.7rem, 3.5vw, 2.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 16px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-lead {
          color: #666;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 30px;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 760px) {
          .header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            flex-direction: row;
            align-items: center;
          }

          .flagship,
          .credibility {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .package-list article {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .final-cta { text-align: left; }
          .final-cta h2 { margin-left: 0; margin-right: 0; }
          .cta-lead { margin-left: 0; margin-right: 0; }
          .cta-actions { justify-content: flex-start; }
        }

        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
}

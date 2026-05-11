"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";

const CALENDLY_URL = "https://calendly.com/aidanlynde/free-consultation";

const services = [
  {
    title: "Product & Technical Audits",
    description: "Find security risks, broken flows, infrastructure issues, and product bottlenecks before they become expensive problems.",
  },
  {
    title: "Prototype to Production",
    description: "Turn hacked-together MVPs into real products with authentication, databases, deployment, analytics, payments, and launch systems.",
  },
  {
    title: "MVP Builds",
    description: "Take an idea from concept to scoped, designed, and deployed software with a practical launch plan.",
  },
  {
    title: "Payment & User Systems",
    description: "Design and implement secure user accounts, checkout flows, subscriptions, admin visibility, and transaction logic.",
  },
  {
    title: "AI & Workflow Automation",
    description: "Build internal tools, dashboards, chatbots, document workflows, and automations that reduce manual work.",
  },
  {
    title: "App Store & Launch Support",
    description: "Prepare mobile apps for TestFlight, Google Play testing, store submission, metadata, and rejection debugging.",
  },
  {
    title: "Websites & Launch Funnels",
    description: "Create clean landing pages, business websites, waitlists, analytics, contact forms, and launch-ready digital presence.",
  },
  {
    title: "Facilities & Workplace Tech",
    description: "Modernize operations workflows with dashboards, data cleanup, AI concepts, integrations, and internal tools.",
  },
];

const packages = [
  ["Software Clarity Audit", "$1,500-$3,500", "For teams who need to understand what is broken, risky, or holding their product back."],
  ["Prototype to Production", "$5,000-$15,000+", "The flagship path for founders with a prototype or messy codebase that needs to become a reliable product."],
  ["MVP Build Sprint", "$10,000-$30,000+", "For serious founders who need discovery, scope, UI direction, buildout, deployment, and launch support."],
  ["AI Workflow Automation", "$3,000-$15,000+", "For businesses that want practical AI tools, dashboards, and workflow automation."],
];

export default function ConsultingPage() {
  const currentPath = usePathname() ?? "";

  return (
    <Layout currentPath={currentPath}>
      <main className="consulting-page">
        <div className="banner">
          <Image src="/images/projectbanner.png" alt="Lynde Engineering Banner" fill priority />
        </div>

        <section className="consulting-header">
          <div className="header-content">
            <div className="header-row">
              <div>
                <p className="eyebrow">Software Consulting</p>
                <h1>Lynde Engineering</h1>
              </div>
              <div className="actions">
                <a href={CALENDLY_URL} className="primary-action">Free Consultation</a>
                <Link href="/routes/consulting/calculator" className="secondary-action">Offer Calculator</Link>
              </div>
            </div>
            <p className="lead">
              I help founders, small businesses, and internal teams audit, build, secure, deploy, and launch production-ready software systems across web, mobile, payments, AI workflows, and infrastructure.
            </p>
          </div>
        </section>

        <section className="flagship">
          <div>
            <p className="eyebrow">Flagship offer</p>
            <h2>Prototype to Production</h2>
          </div>
          <p>
            You bring the idea, prototype, no-code app, or messy codebase. I turn it into a real system with the missing product, technical, security, deployment, and launch pieces handled clearly.
          </p>
        </section>

        <section className="services" aria-label="Consulting services">
          {services.map((service) => (
            <article key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </section>

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

        <section className="credibility">
          <div>
            <p className="eyebrow">Relevant experience</p>
            <h2>Built around practical launch work.</h2>
          </div>
          <ul>
            <li>Mobile deployment, app stores, Expo/EAS, Firebase, and production launch workflows.</li>
            <li>User auth, payments, QR/payment flows, databases, analytics, and backend/API setup.</li>
            <li>AI-assisted software workflows, internal automation, dashboards, and workplace tech systems.</li>
          </ul>
        </section>

        <section className="final-cta">
          <h2>Have something half-built, risky, or unclear?</h2>
          <p>Use the calculator to shape an initial offer, or book a free consultation and I will help map the cleanest path forward.</p>
          <div className="actions">
            <Link href="/routes/consulting/calculator" className="primary-action">Open Offer Calculator</Link>
            <a href={CALENDLY_URL} className="secondary-action">Schedule Free Consultation</a>
          </div>
        </section>
      </main>

      <style jsx>{`
        .consulting-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          color: #1f2933;
          font-family: 'Montserrat', sans-serif;
        }

        .banner {
          position: relative;
          width: 100%;
          height: 180px;
          background-color: #ededed;
          z-index: 0;
        }

        .consulting-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-top: -40px;
          padding: 0 20px 28px;
          z-index: 2;
          position: relative;
          border-bottom: 1px solid #d5ddd7;
        }

        .header-content {
          flex: 1;
          margin-top: 40px;
          min-width: 280px;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
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
          margin: 0;
          font-size: 2.5rem;
          color: #333;
        }

        .lead {
          max-width: 720px;
          font-size: 1.05rem;
          line-height: 1.6;
          color: #555;
          margin: 8px 0 0;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 4px;
        }

        .primary-action,
        .secondary-action {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 10px 15px;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .primary-action {
          background-color: #104827;
          color: #fff;
        }

        .secondary-action {
          background-color: #e0e0e0;
          color: #333;
        }

        .secondary-action:hover {
          background-color: #104827;
          color: #fff;
        }

        .flagship,
        .credibility,
        .final-cta {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 34px;
          align-items: start;
          padding: 42px 0;
          border-bottom: 1px solid #d5ddd7;
        }

        .flagship h2,
        .section-heading h2,
        .credibility h2,
        .final-cta h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          line-height: 1.05;
          margin-bottom: 0;
          color: #17231d;
        }

        .flagship p,
        .final-cta p {
          color: #53605a;
          font-size: 1.08rem;
          line-height: 1.7;
          margin-bottom: 0;
        }

        .services {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 42px 0;
          border-bottom: 1px solid #d5ddd7;
        }

        .services article,
        .package-list article {
          background: #f7f7f3;
          border: 1px solid #d7ddd8;
          border-radius: 8px;
          padding: 20px;
        }

        .services h2 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: #17231d;
        }

        .services p,
        .package-list p,
        .credibility li {
          color: #53605a;
          line-height: 1.55;
        }

        .services p,
        .package-list p {
          margin-bottom: 0;
        }

        .packages {
          padding: 42px 0;
          border-bottom: 1px solid #d5ddd7;
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 22px;
        }

        .package-list {
          display: grid;
          gap: 12px;
        }

        .package-list article {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
        }

        .package-list h3 {
          margin-bottom: 8px;
          color: #17231d;
        }

        .package-list strong {
          color: #104827;
          font-size: 1.2rem;
          white-space: nowrap;
        }

        .credibility ul {
          margin: 0;
          padding-left: 20px;
        }

        .credibility li + li {
          margin-top: 12px;
        }

        .final-cta {
          border-bottom: 0;
          padding-bottom: 18px;
        }

        @media (max-width: 980px) {
          .services {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .consulting-header {
            flex-direction: column;
            align-items: center;
            padding-left: 0;
            padding-right: 0;
            text-align: center;
          }

          .header-content {
            margin-top: 40px;
          }

          .header-row {
            flex-direction: column;
            align-items: center;
          }

          .actions {
            justify-content: center;
            width: 100%;
          }

          .flagship,
          .credibility,
          .final-cta {
            grid-template-columns: 1fr;
          }

          .services {
            grid-template-columns: 1fr;
          }

          .package-list article {
            align-items: flex-start;
            flex-direction: column;
          }

          .actions a {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}

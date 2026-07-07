"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";

type Milestone = {
  year: string;
  cat: "Building" | "Ventures" | "Career" | "Education" | "Life";
  title: string;
  desc: string;
  key?: boolean;
  images?: string[];
  link?: { label: string; href: string };
};

const MILESTONES: Milestone[] = [
  { year: "2013", cat: "Building", title: "Wrote my first line of code",
    desc: "Completed Hour of Code at age 11, after some encouragement from my elementary-school computer science teacher. The start of everything that followed.",
    images: ["/images/hourofcode-1.png"] },

  { year: "2013–15", cat: "Life", title: "Video games, websites & early side hustles",
    desc: "Before I could code properly I was already obsessed with how the internet worked — building little things, reverse-engineering games, and always running some small operation on the side. Elementary school me had a trading-card hustle, sold snacks, and was constantly trying to figure out how to make something from nothing." },

  { year: "2016", cat: "Education", title: "Intro to computer science, Lincoln Park High School",
    desc: "First formal CS classes, alongside the advanced math and economics track that shaped where I'd go next." },

  { year: "2017", cat: "Building", title: "Built a shoe for my sophomore personal project",
    desc: "Designed and constructed a custom shoe by hand for my sophomore-year personal project. Not a lot of documentation survived, but it happened." },

  { year: "2017", cat: "Career", title: "Floor manager, The Field Museum",
    desc: "Managed daily operations for incoming school camps, tours, and demonstrations at one of Chicago's flagship institutions. A paid internship that ran like a real job — coordinating staff, guests, and programming across the floor." },

  { year: "2018", cat: "Career", title: "Writer, shooter & editor at CTVN",
    desc: "Worked at a Chicago community TV station writing, shooting, and editing short films and news segments in Premiere and DaVinci Resolve. Got comfortable in front of and behind the camera, and discovered a real talent for writing and telling stories — the kind of communication skills that still show up in how I pitch and document work today." },

  { year: "2019", cat: "Ventures", key: true, title: "Founded Beak, my first company",
    desc: "An all-natural laundry detergent brand. I sourced suppliers, designed the labels, built the Shopify + custom React storefront, and ran the marketing myself. It took off, then quality issues cooled it down — my first full cycle of building a business end to end.",
    images: ["/images/beak1.png", "/images/beak2.png"] },

  { year: "2019", cat: "Ventures", title: "Ran a portfolio of e-commerce stores",
    desc: "Pivoted through several Shopify stores — merch, a bar-cart brand, tech gear, and a nasal-breathing device line — learning firsthand that brand recognition, not ads, is what actually lasts.",
    images: ["/images/barcart.png", "/images/hushpic.png"] },

  { year: "2020", cat: "Ventures", key: true, title: "Future Founders accelerator — 2nd place",
    desc: "A three-week venture sprint with a non-profit in Chicago. My team built and pitched a sustainable food sourcing network application — designed to help fight food insecurity in growing cities with lower-income regions — to a mock-investor panel. We placed second." },

  { year: "2020", cat: "Ventures", title: "Flipped products on eBay",
    desc: "Sourced designer clothes, model cars, refurbished electronics, and AV equipment from garage sales and marketplaces to resell — and reinvested the profits into what came next.",
    images: ["/images/modelcar.png", "/images/stage.png"] },

  { year: "2020", cat: "Education", title: "Started at the University of Illinois",
    desc: "Moved to Champaign to begin undergrad.",
    images: ["/images/illinois.png"] },

  { year: "2021", cat: "Life", title: "Went deep on crypto markets",
    desc: "Rode a strong run and sold before a major drop — made real money and started developing a genuine understanding of how crypto markets move. Began studying the interplay between large and retail investor sentiment, macro finance, and current events, and how all of it ripples through price action.",
    images: ["/images/coindrop.png"] },

  { year: "2021", cat: "Education", title: "Transferred into Economics at Illinois",
    desc: "Refocused on econometrics and machine learning — the intersection I still work in today." },

  { year: "2022", cat: "Ventures", title: "Co-founded the Crypto & DeFi club (CDF)",
    desc: "Built a student organization from scratch — hosting investing workshops, teaching peers how to get started, and fostering a real community around markets and building. The club eventually wound down, but the core group stayed together and grew into a network of active investors and builders — stocks, commodities, crypto, real estate, startups. It became the foundation of my investing and startup network today.",
    images: ["/images/cdffirst.png", "/images/cdfMoney.png"] },

  { year: "2022", cat: "Career", title: "Data analytics intern, Segalo Media",
    desc: "Implemented an automated Python web scraping tool to collect, process, and structure marketing data for analysis. Built data pipelines and dashboards to deliver actionable insights for campaign and business decision-making. Collaborated on projects requiring rapid development, data quality control, and reliable reporting." },

  { year: "2022", cat: "Education", title: "Added a Computer Science minor",
    desc: "Doubled down on programming — advanced C++, distributed systems, applied ML — and set a hard goal: land a software engineering internship the next summer." },

  { year: "2023", cat: "Career", key: true, title: "Software engineering intern, CBRE",
    desc: "Hit the goal — joined the Fortune 500 commercial real-estate firm as a SWE intern, did well enough to earn a return offer, and kept working part-time through my last year of school.",
    images: ["/images/cbre.png"] },

  { year: "2023–25", cat: "Building", key: true, title: "Co-founded & built Slush",
    desc: "A peer-to-peer payments app built from the ground up. I designed and built the entire UI, backend, payment infrastructure (Stripe Connect), and brand identity solo — while my co-founders handled restaurant partnerships and social media. Took it from a whiteboard idea to a polished product with a real marketing site.",
    images: ["/images/slush-logo.png"], link: { label: "View project", href: "/routes/projects/project-three" } },

  { year: "2024", cat: "Education", title: "Graduated — B.A. Economics, UIUC",
    desc: "Finished undergrad with a CS minor and a machine-learning focus in the Economics department.",
    images: ["/images/graduated1.png"] },

  { year: "2024", cat: "Career", key: true, title: "Joined CBRE full-time",
    desc: "Turned the return offer into a full-time role as a Full-Stack Engineer & Workplace Strategy Analyst — building internal tools, dashboards, and workflow automation for enterprise clients." },

  { year: "2024", cat: "Building", title: "Built a reusable FastAPI auth template",
    desc: "A production-ready authentication and database scaffold I now reuse across client and personal projects.",
    link: { label: "View project", href: "/routes/projects/project-four" } },

  { year: "2024", cat: "Building", key: true, title: "Shipped my first client product",
    desc: "Designed, built, and deployed a full marketing site for an up-and-coming Chicago real-estate broker — the first project under Lynde Engineering.",
    link: { label: "View project", href: "/routes/projects/project-nine" } },

  { year: "2025", cat: "Building", title: "Federated Learning interactive demo",
    desc: "An explainer built to make privacy-preserving federated learning legible to non-technical investors.",
    link: { label: "View project", href: "/routes/projects/project-ten" } },

  { year: "2026", cat: "Building", title: "Built Peanuts — litigation intelligence platform",
    desc: "A class-action litigation screener that ingests federal court filings, screens complaints through an LLM pipeline, and surfaces structured case intelligence for legal and investment teams.",
    link: { label: "View project", href: "/routes/projects/project-twelve" } },

  { year: "2026", cat: "Building", key: true, title: "Launched Palleto on the App Store",
    desc: "A mobile app that uses AI to turn real-world inspiration — photos, scenes, textures — into structured, shareable mood boards with extracted color palettes and metadata. Now live on the App Store.",
    link: { label: "View project", href: "/routes/projects/project-eleven" } },
];

const FILTERS = ["All", "Building", "Ventures", "Career", "Education", "Life"];

const CAPABILITIES = [
  { title: "System & software architecture",
    desc: "How the pieces fit — data models, services, auth, the boundaries between them — so a product can grow without falling over." },
  { title: "Full-stack product development",
    desc: "Web and mobile, front to back. The unglamorous parts — deploys, payments, monitoring — actually done." },
  { title: "AI & data systems",
    desc: "Applied ML, automation, and data pipelines. LLM-powered workflows that remove real manual work." },
];

export default function AboutPage() {
  const currentPath = usePathname() ?? "";
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = MILESTONES.filter((m) => filter === "All" || m.cat === filter);
  const groups: { year: string; items: Milestone[] }[] = [];
  items.forEach((m) => {
    const last = groups[groups.length - 1];
    if (last && last.year === m.year) last.items.push(m);
    else groups.push({ year: m.year, items: [m] });
  });

  const socials = [
    { href: "/pdfs/resume.pdf", icon: "/icons/resume.svg", alt: "Resume" },
    { href: "mailto:aidanlynde@gmail.com", icon: "/icons/email.svg", alt: "Email" },
    { href: "https://www.linkedin.com/in/aidan-lynde-1b97a31b4/", icon: "/icons/linkedin.svg", alt: "LinkedIn" },
    { href: "https://github.com/aidanlynde", icon: "/icons/github.svg", alt: "GitHub" },
    { href: "https://www.strava.com/athletes/36497221", icon: "/icons/strava.svg", alt: "Strava" },
  ];

  return (
    <Layout currentPath={currentPath}>
      <main className="about-page">
        <div className="banner">
          <Image src="/images/aboutbanner.png" alt="About banner" fill priority />
        </div>

        <section className="about-header">
          <div className="header-top">
            <div className="avatar">
              <Image src="/images/profile.svg" alt="Aidan Lynde" width={96} height={96} />
            </div>
            <div className="header-id">
              <div className="header-row">
                <div>
                  <p className="eyebrow">About</p>
                  <h1>Aidan Lynde</h1>
                </div>
                <div className="socials">
                  {socials.map((s) => (
                    <a key={s.alt} className="social" href={s.href} aria-label={s.alt}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.icon} alt={s.alt} />
                    </a>
                  ))}
                </div>
              </div>
              <p className="header-role">{"// FULL-STACK ENGINEER · WORKPLACE STRATEGY ANALYST @ CBRE"}</p>
            </div>
          </div>

          <div className="bio">
            <p className="bio-lead">
              I&apos;ve been building and shipping products since I was eleven &mdash; and I never really stopped.
            </p>
            <p className="bio-body">
              I&apos;m a full-stack engineer and workplace strategy analyst at <strong>CBRE</strong>, a Fortune 500 firm, and I run <strong>Lynde Engineering</strong> on the side — helping founders and small teams turn prototypes, no-code apps, and rough ideas into production products. Before all that I was a teenage e-commerce founder, a product flipper, and a serial starter of things. I still am.
            </p>
            <div className="bio-meta">
              <span><em>Based in</em> Chicago, IL</span>
              <span><em>At</em> CBRE</span>
              <span><em>Studied</em> Economics + CS, UIUC</span>
              <span className="palleto-meta"><em>Building</em> Palleto <Link href="/routes/consulting" className="bio-meta-cta">Available for consulting →</Link></span>
            </div>
          </div>
        </section>

        <section className="capabilities">
          <p className="eyebrow muted">WHAT I DO</p>
          <div className="cap-list">
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} className="cap-row">
                <span className="cap-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cap-title">{c.title}</h3>
                <p className="cap-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline-section">
          <div className="tl-head">
            <div>
              <p className="eyebrow"><span className="status-dot inline" /> THE PATH</p>
              <h2>Thirteen years of building things.</h2>
            </div>
            <p className="side">
              From a first line of code at eleven to shipping products for clients — the ventures, the detours, and the projects along the way.
            </p>
          </div>

          <div className="tl-filters">
            {FILTERS.map((f) => (
              <button key={f} className={`tl-filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="timeline">
            {groups.map((g) => (
              <div key={g.year} className="tl-group">
                <div className="tl-year-marker">{g.year}</div>
                <div className="tl-entries">
                  {g.items.map((m, i) => (
                    <div key={i} className={`tl-item ${m.key ? "key" : ""}`}>
                      <span className="tl-cat">{m.cat}</span>
                      <div className="tl-title">{m.title}</div>
                      <p className="tl-desc">{m.desc}</p>
                      {m.images && (
                        <div className="tl-photos">
                          {m.images.map((src) => (
                            <button key={src} className="tl-photo" onClick={() => setLightbox(src)} aria-label="View photo">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={src} alt="" loading="lazy" />
                            </button>
                          ))}
                        </div>
                      )}
                      {m.link && (
                        <a className="tl-link" href={m.link.href}>
                          {m.link.label} <span className="arrow">→</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" aria-label="Close">×</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </main>

      <style jsx>{`
        .about-page {
          --bg:#EDEDED; --bg-2:#f4f4f4; --surface:#fff; --border:#e4e4e4;
          --border-soft:rgba(0,0,0,0.07); --ink:#1a1a1a; --ink-2:#333;
          --muted:#666; --muted-2:#888; --green:#104827; --green-pale:#6fce8f;
          --green-dark:#082c16; --green-soft:rgba(16,72,39,0.08);
          --radius-sm:8px; --radius:12px; --radius-lg:16px;
          --shadow-soft:0 2px 14px rgba(0,0,0,0.06); --shadow-lift:0 8px 28px rgba(0,0,0,0.10);
          --font-display: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-body:'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-mono: var(--font-geist-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          max-width:900px; margin:0 auto; padding:0 20px 40px;
          font-family:var(--font-body); color:var(--ink-2);
        }
        .about-page :global(*){ box-sizing:border-box; }
        .about-page h1,.about-page h2,.about-page h3{ font-family:var(--font-display); color:var(--ink); font-weight:800; letter-spacing:-0.025em; line-height:1.05; margin:0; }
        .about-page p{ margin:0; line-height:1.6; }

        .eyebrow{ margin:0 0 8px; font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--green); font-weight:600; display:inline-flex; align-items:center; gap:8px; }
        .eyebrow.muted{ color:var(--muted-2); }

        .status-dot{ position:relative; width:8px; height:8px; flex:0 0 auto; display:inline-block; }
        .status-dot::before{ content:''; position:absolute; inset:0; border-radius:50%; background:var(--green); }
        .status-dot::after{ content:''; position:absolute; inset:-4px; border-radius:50%; border:1.5px solid var(--green); animation:pulse-ring 2s ease-out infinite; }
        .status-dot.inline{ width:6px; height:6px; }
        @keyframes pulse-ring{ 0%{transform:scale(0.85);opacity:0.7;} 70%{transform:scale(1.9);opacity:0;} 100%{transform:scale(1.9);opacity:0;} }

        .banner{ position:relative; width:100%; height:180px; border-radius:10px 10px 0 0; overflow:hidden; background:#e4e4e4; }

        .about-header{ padding:20px 0 8px; border-bottom:1px solid var(--border); margin-bottom:8px; }
        .header-top{ display:flex; align-items:flex-start; gap:22px; }
        .avatar{ width:96px; height:96px; flex:0 0 auto; border-radius:20px; overflow:hidden; background:var(--ink); border:1px solid var(--border); box-shadow:var(--shadow-soft); display:grid; place-items:center; position:relative; }
        .avatar::before{ content:'AL'; position:absolute; inset:0; display:grid; place-items:center; font-family:var(--font-display); font-weight:700; font-size:1.9rem; letter-spacing:-0.03em; color:#fff; }
        .avatar :global(img){ position:relative; z-index:1; width:100%; height:100%; object-fit:cover; }
        .header-id{ flex:1; min-width:0; }
        .header-row{ display:flex; justify-content:space-between; align-items:flex-start; gap:20px; }
        .about-header h1{ font-size:2.4rem; letter-spacing:-0.02em; color:var(--ink); line-height:1.1; margin-top:2px; }
        .header-role{ font-family:var(--font-mono); font-size:0.76rem; color:var(--muted); letter-spacing:0.03em; margin-top:12px; }
        .socials{ display:flex; gap:10px; align-items:center; flex-shrink:0; padding-top:4px; }
        .social{ width:36px; height:36px; border-radius:var(--radius-sm); background:var(--surface); border:1px solid var(--border); display:inline-grid; place-items:center; transition:transform .15s ease, background .2s ease, border-color .2s ease; }
        .social :global(img){ width:16px; height:16px; filter:grayscale(100%) opacity(0.7); transition:filter .2s; }
        .social:hover{ transform:translateY(-2px); background:var(--ink); border-color:var(--ink); }
        .social:hover :global(img){ filter:brightness(0) invert(1); }

        .bio{ margin-top:30px; max-width:760px; }
        .bio-lead{ font-family:var(--font-display); font-size:clamp(1.5rem,3.2vw,2.05rem); font-weight:700; letter-spacing:-0.03em; line-height:1.12; color:var(--ink); }
        .bio-body{ margin-top:18px; font-size:1.05rem; line-height:1.7; color:var(--muted); max-width:620px; }
        .bio-body :global(strong){ color:var(--ink-2); font-weight:600; }
        .bio-meta{ margin-top:26px; display:flex; flex-wrap:wrap; align-items:center; gap:10px 22px; padding-top:20px; border-top:1px solid var(--border); font-size:0.9rem; color:var(--ink-2); }
        .bio-meta span{ display:inline-flex; gap:7px; align-items:center; }
        .bio-meta em{ font-style:normal; font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted-2); }
        .palleto-meta{ gap:12px !important; }
        .bio-meta-cta{ font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.02em; color:var(--green); border:1px solid rgba(16,72,39,0.25); border-radius:999px; padding:6px 14px; transition:background .2s ease, color .2s ease; white-space:nowrap; }
        .bio-meta-cta:hover{ background:var(--green); color:#fff; border-color:var(--green); }

        .capabilities{ margin-top:56px; }
        .cap-list{ margin-top:18px; border-top:1px solid var(--border); }
        .cap-row{ display:grid; grid-template-columns:40px minmax(200px,260px) 1fr; gap:8px 28px; align-items:baseline; padding:22px 4px; border-bottom:1px solid var(--border); transition:padding-left .25s ease; }
        .cap-row:hover{ padding-left:12px; }
        .cap-num{ font-family:var(--font-mono); font-size:0.74rem; color:var(--green); letter-spacing:0.08em; font-weight:600; }
        .cap-title{ font-family:var(--font-display); font-weight:700; font-size:1.15rem; color:var(--ink); letter-spacing:-0.02em; line-height:1.2; margin:0; }
        .cap-desc{ color:var(--muted); font-size:0.94rem; line-height:1.6; }

        .timeline-section{ margin-top:64px; }
        .tl-head{ display:flex; align-items:end; justify-content:space-between; gap:24px; margin-bottom:12px; }
        .tl-head h2{ font-size:clamp(1.6rem,3.4vw,2.4rem); margin-top:14px; }
        .tl-head .side{ color:var(--muted); font-size:0.92rem; max-width:300px; }
        .tl-filters{ display:flex; gap:8px; margin:22px 0 30px; flex-wrap:wrap; }
        .tl-filter{ font-family:var(--font-mono); font-size:0.74rem; letter-spacing:0.04em; background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:999px; padding:7px 15px; cursor:pointer; transition:all .18s ease; }
        .tl-filter:hover{ border-color:var(--ink); color:var(--ink); }
        .tl-filter.active{ background:var(--ink); border-color:var(--ink); color:#fff; }

        .timeline{ position:relative; }
        .tl-group{ display:grid; grid-template-columns:72px 1fr; gap:0 28px; position:relative; }
        .tl-year-marker{ font-family:var(--font-display); font-weight:800; font-size:1.05rem; color:var(--ink); letter-spacing:-0.02em; padding-top:2px; }
        .tl-entries{ position:relative; padding-left:26px; padding-bottom:8px; border-left:2px solid var(--border); }
        .tl-group:first-child .tl-entries{ padding-top:2px; }
        .tl-item{ position:relative; padding:0 0 26px; }
        .tl-group:last-child .tl-item:last-child{ padding-bottom:0; }
        .tl-item::before{ content:''; position:absolute; left:-33px; top:4px; width:13px; height:13px; border-radius:50%; background:var(--bg); border:2px solid var(--green-pale); box-shadow:0 0 0 4px var(--bg); }
        .tl-item.key::before{ background:var(--green); border-color:var(--green); }
        .tl-cat{ display:inline-block; margin-bottom:8px; font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; padding:3px 8px; border-radius:4px; background:var(--bg-2); border:1px solid var(--border); color:var(--muted); }
        .tl-item.key .tl-cat{ background:var(--green-soft); border-color:rgba(16,72,39,0.2); color:var(--green); }
        .tl-title{ font-family:var(--font-display); font-weight:700; font-size:1.12rem; color:var(--ink); letter-spacing:-0.015em; line-height:1.25; margin-bottom:6px; }
        .tl-desc{ color:var(--muted); font-size:0.92rem; line-height:1.6; max-width:600px; }
        .tl-photos{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
        .tl-photo{ padding:0; border:1px solid var(--border); background:var(--bg-2); border-radius:var(--radius-sm); overflow:hidden; cursor:pointer; width:116px; height:78px; transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
        .tl-photo :global(img){ width:100%; height:100%; object-fit:cover; display:block; }
        .tl-photo:hover{ transform:translateY(-2px) scale(1.01); box-shadow:var(--shadow-soft); border-color:var(--ink); }
        .tl-link{ display:inline-flex; align-items:center; gap:6px; margin-top:12px; font-family:var(--font-mono); font-size:0.74rem; color:var(--green); letter-spacing:0.02em; border:1px solid rgba(16,72,39,0.25); border-radius:999px; padding:5px 13px; transition:background .2s ease, color .2s ease; }
        .tl-link:hover{ background:var(--green); color:#fff; border-color:var(--green); }
        .tl-link .arrow{ transition:transform .2s ease; }
        .tl-link:hover .arrow{ transform:translateX(3px); }

        .lightbox{ position:fixed; inset:0; z-index:1000; background:rgba(14,20,16,0.86); display:grid; place-items:center; padding:40px; animation:lb-in .2s ease; }
        @keyframes lb-in{ from{opacity:0;} to{opacity:1;} }
        .lightbox :global(img){ max-width:min(900px,92vw); max-height:86vh; border-radius:var(--radius); box-shadow:0 20px 60px rgba(0,0,0,0.5); object-fit:contain; }
        .lightbox-close{ position:absolute; top:22px; right:26px; width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:1.4rem; cursor:pointer; line-height:1; transition:background .2s ease; }
        .lightbox-close:hover{ background:rgba(255,255,255,0.2); }

        /* ── mobile ── */
        @media (max-width:720px){
          .about-page{ padding:0 16px 40px; }
          .banner{ height:140px; }
          .header-top{ gap:14px; }
          .avatar{ width:80px; height:80px; border-radius:16px; }
          .about-header h1{ font-size:2rem; }
          .header-role{ font-size:0.68rem; }
          .header-row{ flex-direction:column; align-items:flex-start; gap:10px; }
          .socials{ gap:8px; }
          .social{ width:32px; height:32px; }
          .bio-lead{ font-size:clamp(1.25rem,5vw,1.6rem); }
          .bio-body{ font-size:0.97rem; }
          .bio-meta{ gap:8px 16px; }
          .palleto-meta{ flex-wrap:wrap; gap:8px !important; }
          .bio-meta-cta{ font-size:0.74rem; padding:5px 12px; }
          .cap-row{ grid-template-columns:32px 1fr; gap:6px 16px; padding:16px 4px; }
          .cap-row .cap-desc{ grid-column:2; }
          .cap-title{ font-size:1rem; }
          .tl-head{ flex-direction:column; align-items:flex-start; gap:10px; }
          .tl-head h2{ font-size:clamp(1.35rem,5vw,1.8rem); margin-top:8px; }
          .tl-head .side{ max-width:100%; font-size:0.88rem; }
          .tl-group{ grid-template-columns:50px 1fr; gap:0 14px; }
          .tl-year-marker{ font-size:0.88rem; }
          .tl-entries{ padding-left:18px; }
          .tl-item::before{ left:-28px; width:11px; height:11px; }
          .tl-title{ font-size:1rem; }
          .tl-desc{ font-size:0.88rem; }
          .tl-photo{ width:96px; height:66px; }
          .tl-filters{ gap:6px; margin:16px 0 22px; }
          .tl-filter{ font-size:0.68rem; padding:6px 12px; }
        }
        @media (max-width:400px){
          .header-top{ flex-direction:column; }
          .avatar{ width:64px; height:64px; }
          .about-header h1{ font-size:1.7rem; }
          .tl-group{ grid-template-columns:44px 1fr; gap:0 10px; }
          .tl-year-marker{ font-size:0.78rem; }
          .tl-photo{ width:80px; height:56px; }
        }
      `}</style>
    </Layout>
  );
}

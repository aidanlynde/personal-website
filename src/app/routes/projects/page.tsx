// src/app/routes/projects/page.tsx
// Lynde Engineering — Projects page revamp
// Drop-in replacement. Wraps the existing <Layout>. Keeps the banner.
// Card grid with project covers + category filter pills (matches the
// home page's Selected Work section).

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Layout from "../../components/Layout";

type Project = {
  slug: string;
  title: string;
  cat: "Product" | "AI" | "Client" | "Build" | "Research" | "Ventures";
  year: string;
  role: string;
  label: string;
  brief: string;
  cover:
    | "palleto" | "peanuts" | "davidko" | "federated" | "slush"
    | "code" | "data" | "scatter" | "calc"
    | "photo-heatmap" | "photo-cdf" | "photo-ebay";
};

const PROJECTS: Project[] = [
  { slug: "project-eleven", title: "Palleto", cat: "Product", year: "2025", role: "Founder", label: "MOBILE · iOS",
    brief: "A mobile app for creatives to capture real-world inspiration and turn it into structured mood boards. App Store launch imminent.", cover: "palleto" },
  { slug: "project-twelve", title: "Peanuts · Litigation Intel", cat: "AI", year: "2025", role: "Build", label: "LEGAL · LLM",
    brief: "Class-action litigation screener — ingests federal court filings, screens complaints via an LLM pipeline, and surfaces case intelligence.", cover: "peanuts" },
  { slug: "project-nine", title: "David Ko Real Estate", cat: "Client", year: "2025", role: "Build & Deploy", label: "REAL ESTATE",
    brief: "Marketing site, email capture, and automated listing-signal logic for a Chicago real-estate client.", cover: "davidko" },
  { slug: "project-ten", title: "Federated Learning Demo", cat: "AI", year: "2025", role: "Build & Deploy", label: "ML · FEDERATED",
    brief: "A privacy-preserving, web-based demo built to make federated learning legible to non-technical investors.", cover: "federated" },
  { slug: "project-three", title: "Slush · P2P Payments", cat: "Product", year: "2023–25", role: "Co-Founder", label: "P2P PAYMENTS",
    brief: "Co-founded and built a full-stack peer-to-peer payment platform from MVP to a polished product with Stripe Connect.", cover: "slush" },
  { slug: "project-four", title: "FastAPI Auth Template", cat: "Build", year: "2024", role: "Open source", label: "BACKEND",
    brief: "A reusable FastAPI template with a full user-authentication system, built to accelerate every project after it.", cover: "code" },
  { slug: "project-eight", title: "Applied Machine Learning", cat: "Research", year: "2023–24", role: "Research", label: "ECON 491 · UIUC",
    brief: "A series of end-to-end machine learning projects from Econ 491 at UIUC — regression through gradient boosting.", cover: "data" },
  { slug: "project-six", title: "Applied Econometrics", cat: "Research", year: "2023", role: "Research", label: "ECON 471 · UIUC",
    brief: "Econometric modeling problem sets from Econ 471 at UIUC — regression analysis and causal inference.", cover: "scatter" },
  { slug: "project-seven", title: "Energy Consumption Analysis", cat: "Research", year: "2023", role: "Analysis", label: "ENVIRO ECON",
    brief: "An environmental-economics analysis of global energy consumption trends and their drivers.", cover: "photo-heatmap" },
  { slug: "project-two", title: "Crypto & DeFi Club", cat: "Ventures", year: "2021–22", role: "Co-Founder", label: "STUDENT ORG",
    brief: "Co-founded and led the Crypto & DeFi club at UIUC — hosting investing workshops and teaching peers to get started.", cover: "photo-cdf" },
  { slug: "project-one", title: "eBay Reselling", cat: "Ventures", year: "2020", role: "Solo", label: "RESALE",
    brief: "Purchased, refurbished, and flipped designer clothes, model cars, and stage equipment for profit.", cover: "photo-ebay" },
  { slug: "project-five", title: "BMI Calculator", cat: "Build", year: "2022", role: "Solo", label: "TOOL",
    brief: "A simple BMI calculator tool built for my own fitness tracking.", cover: "calc" },
];

const FILTERS = ["All", "Product", "AI", "Client", "Build", "Research", "Ventures"];

const PHOTO_SRC: Record<string, string> = {
  "photo-heatmap": "/images/heatmap.png",
  "photo-cdf": "/images/cdffirst.png",
  "photo-ebay": "/images/modelcar.png",
};

function Cover({ project }: { project: Project }) {
  const { cover, label } = project;

  if (cover === "palleto") {
    return (
      <div className="thumb palleto">
        <span className="thumb-label">{label}</span>
        <div className="pcard-stage">
          <div className="pcard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="pcard-photo"><img src="/images/palleto-koi.png" alt="" /></div>
            <div className="pcard-pal">
              {["#D14B2D", "#1F1B19", "#C9B591", "#5A6E64", "#EFE7D7"].map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
            <div className="pcard-title">Wet Pavement, Bright Fish</div>
          </div>
        </div>
      </div>
    );
  }
  if (cover === "peanuts") {
    return (
      <div className="thumb peanuts">
        <span className="thumb-label">{label}</span>
        <div className="pn-grid" />
        <div className="pn-doc back" />
        <div className="pn-doc front">
          <span className="pn-line lg" /><span className="pn-line" /><span className="pn-line sm" />
          <span className="pn-verdict">CLASS ACTION ✓</span>
        </div>
      </div>
    );
  }
  if (cover === "davidko") {
    return (
      <div className="thumb davidko">
        <span className="thumb-label">{label}</span>
        <div className="dko">
          <svg className="dko-trend" viewBox="0 0 120 60" preserveAspectRatio="none">
            <polyline points="2,52 26,40 48,44 72,24 96,28 118,8" /><circle cx="118" cy="8" r="3.5" />
          </svg>
          <div className="dko-sky">
            <span className="dko-b b1"><i /><i /><i /><i /></span>
            <span className="dko-b b2"><i /><i /><i /><i /><i /><i /></span>
            <span className="dko-b b3"><i /><i /></span>
          </div>
        </div>
      </div>
    );
  }
  if (cover === "federated") {
    return (
      <div className="thumb federated">
        <span className="thumb-label">{label}</span>
        <svg className="fed" viewBox="0 0 200 120">
          <line x1="100" y1="34" x2="40" y2="88" /><line x1="100" y1="34" x2="80" y2="94" />
          <line x1="100" y1="34" x2="120" y2="94" /><line x1="100" y1="34" x2="160" y2="88" />
          <circle className="edge" cx="40" cy="88" r="8" /><circle className="edge" cx="80" cy="94" r="8" />
          <circle className="edge" cx="120" cy="94" r="8" /><circle className="edge" cx="160" cy="88" r="8" />
          <circle className="core" cx="100" cy="34" r="14" /><circle className="dot" cx="100" cy="34" r="4" />
        </svg>
      </div>
    );
  }
  if (cover === "slush") {
    return (
      <div className="thumb slush contain">
        <span className="thumb-label">{label}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/slush-logo.png" alt="Slush" />
      </div>
    );
  }
  if (cover === "code") {
    return (
      <div className="thumb code">
        <span className="thumb-label">{label}</span>
        <div className="motif">
          <div><span className="c-key">from</span> fastapi <span className="c-key">import</span> FastAPI</div>
          <div><span className="c-key">async def</span> login(<span className="c-dim">creds</span>):</div>
          <div>&nbsp;&nbsp;token = <span className="c-str">create_jwt</span>(user)</div>
          <div>&nbsp;&nbsp;<span className="c-key">return</span> {"{"} <span className="c-str">&quot;ok&quot;</span>: True {"}"}</div>
        </div>
        <div className="thumb-glyph">/auth</div>
      </div>
    );
  }
  if (cover === "data") {
    return (
      <div className="thumb data">
        <span className="thumb-label">{label}</span>
        <div className="bars">
          {[40, 65, 52, 78, 60, 88, 72, 95].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
        </div>
        <div className="thumb-glyph">ML</div>
      </div>
    );
  }
  if (cover === "scatter") {
    const pts = [[20,80],[35,66],[45,72],[58,54],[66,60],[78,40],[88,46],[30,74],[52,58],[72,50]];
    return (
      <div className="thumb scatter">
        <span className="thumb-label">{label}</span>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line className="reg" x1="12" y1="86" x2="92" y2="34" />
          {pts.map((p, i) => <circle key={i} className="pt" cx={p[0]} cy={p[1]} r="2.4" />)}
        </svg>
        <div className="thumb-glyph">β</div>
      </div>
    );
  }
  if (cover === "calc") {
    return (
      <div className="thumb calc">
        <span className="thumb-label">{label}</span>
        <div className="pad">
          <span /><span /><span className="accent" />
          <span /><span /><span />
          <span className="accent" /><span /><span />
        </div>
      </div>
    );
  }
  // photo covers
  return (
    <div className="thumb photo">
      <span className="thumb-label">{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO_SRC[cover]} alt="" loading="lazy" />
    </div>
  );
}

export default function ProjectsPage() {
  const currentPath = usePathname() ?? "";
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const counts: Record<string, number> = {};
  PROJECTS.forEach((p) => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
  const items = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <Layout currentPath={currentPath}>
      <main className="projects-page">
        <div className="banner">
          <Image src="/images/projectbanner.png" alt="Project banner" fill priority />
        </div>

        <section className="projects-header">
          <p className="eyebrow">Work</p>
          <h1>Projects</h1>
          <p className="lead">
            Everything I&apos;ve built, shipped, or explored — from client products and mobile apps to research, tooling, and early ventures.
          </p>
        </section>

        <div className="filters">
          {FILTERS.map((f) => (
            <button key={f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}{f !== "All" && <span className="count">{counts[f] || 0}</span>}
            </button>
          ))}
        </div>

        <div className="grid">
          {items.map((p) => (
            <div key={p.slug} className="card" onClick={() => router.push(`/routes/projects/${p.slug}`)}>
              <Cover project={p} />
              <div className="card-body">
                <div className="card-meta">
                  <span>{p.year}</span><span className="sep">·</span><span>{p.role}</span>
                </div>
                <div className="card-title">{p.title}</div>
                <p className="card-brief">{p.brief}</p>
                <span className="card-cta">View project <span className="arrow">→</span></span>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="empty">No projects in this category yet.</div>}
        </div>
      </main>

      <style jsx>{`
        .projects-page {
          --bg:#EDEDED; --bg-2:#f4f4f4; --surface:#fff; --border:#e4e4e4;
          --border-soft:rgba(0,0,0,0.07); --ink:#1a1a1a; --ink-2:#333;
          --muted:#666; --muted-2:#888; --green:#104827; --green-pale:#6fce8f; --green-dark:#082c16;
          --green-soft:rgba(16,72,39,0.08);
          --radius-sm:8px; --radius:12px; --radius-lg:16px;
          --shadow-soft:0 2px 14px rgba(0,0,0,0.06);
          --font-display: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-body:'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          --font-mono: var(--font-geist-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          max-width:900px; margin:0 auto; padding:0 20px 60px;
          font-family:var(--font-body); color:var(--ink-2);
        }
        .projects-page :global(*){ box-sizing:border-box; }
        .projects-page h1,.projects-page h2,.projects-page h3{ font-family:var(--font-display); color:var(--ink); font-weight:800; letter-spacing:-0.025em; line-height:1.05; margin:0; }
        .projects-page p{ margin:0; line-height:1.6; }
        .eyebrow{ margin:0 0 8px; font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--green); font-weight:600; display:inline-flex; align-items:center; gap:8px; }

        .banner{ position:relative; width:100%; height:180px; border-radius:10px 10px 0 0; overflow:hidden; background:#e4e4e4; }

        .projects-header{ padding:20px 0 24px; border-bottom:1px solid var(--border); }
        .projects-header h1{ font-size:2.4rem; letter-spacing:-0.02em; color:var(--ink); line-height:1.1; margin-top:2px; }
        .lead{ margin-top:12px; font-size:1rem; color:var(--muted); max-width:620px; line-height:1.6; }

        .filters{ display:flex; align-items:center; gap:8px; margin:26px 0 4px; flex-wrap:wrap; }
        .filter{ font-family:var(--font-mono); font-size:0.74rem; letter-spacing:0.04em; background:transparent; border:1px solid var(--border); color:var(--muted); border-radius:999px; padding:7px 15px; cursor:pointer; transition:all .18s ease; }
        .filter:hover{ border-color:var(--ink); color:var(--ink); }
        .filter.active{ background:var(--ink); border-color:var(--ink); color:#fff; }
        .filter .count{ opacity:0.5; margin-left:6px; }

        .grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:24px; }
        .card{ border-radius:var(--radius); background:var(--bg-2); border:1px solid var(--border-soft); overflow:hidden; display:flex; flex-direction:column; cursor:pointer; transition:transform .25s ease, box-shadow .25s ease; }
        .card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-soft); }

        .thumb{ height:168px; position:relative; overflow:hidden; background:linear-gradient(135deg,#d8dcd5,#c9d4ce); }
        .thumb-label{ position:absolute; top:13px; left:13px; z-index:4; font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-2); opacity:0.8; }
        .thumb.slush .thumb-label,.thumb.photo .thumb-label{ color:#fff; opacity:0.9; text-shadow:0 1px 4px rgba(0,0,0,0.5); }
        .thumb.palleto .thumb-label{ color:#8B847A; opacity:1; }
        .thumb.peanuts .thumb-label,.thumb.federated .thumb-label,.thumb.code .thumb-label{ color:#fff; opacity:0.85; text-shadow:0 1px 4px rgba(0,0,0,0.4); }

        .card-body{ padding:15px 16px 17px; display:flex; flex-direction:column; gap:6px; flex:1; }
        .card-meta{ display:flex; align-items:center; gap:9px; font-family:var(--font-mono); font-size:0.68rem; color:var(--muted-2); letter-spacing:0.05em; text-transform:uppercase; }
        .card-meta .sep{ opacity:0.4; }
        .card-title{ font-family:var(--font-display); font-weight:700; font-size:1.05rem; color:var(--ink); letter-spacing:-0.01em; line-height:1.25; }
        .card-brief{ color:var(--muted); font-size:0.85rem; line-height:1.5; }
        .card-cta{ margin-top:auto; padding-top:10px; font-family:var(--font-mono); font-size:0.72rem; color:var(--green); letter-spacing:0.03em; display:inline-flex; align-items:center; gap:6px; }
        .card-cta .arrow{ transition:transform .2s ease; }
        .card:hover .card-cta .arrow{ transform:translateX(3px); }

        .thumb.photo :global(img){ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .thumb.photo::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,transparent 40%,rgba(0,0,0,0.35) 100%); }
        .thumb.contain{ display:grid; place-items:center; }
        .thumb.contain :global(img){ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; padding:22px 28px; }

        .thumb.palleto{ background:#F2EEE4; }
        .thumb.palleto::after{ content:''; position:absolute; inset:0; z-index:1; pointer-events:none; background:radial-gradient(70% 60% at 18% 8%,rgba(255,255,255,0.6),transparent 55%),radial-gradient(80% 70% at 95% 100%,rgba(214,202,180,0.35),transparent 60%); }
        .pcard-stage{ position:absolute; inset:0; z-index:2; display:flex; align-items:center; justify-content:center; }
        .pcard{ position:relative; z-index:2; width:210px; background:#fff; border-radius:14px; box-shadow:0 2px 6px rgba(28,22,10,0.06),0 16px 34px rgba(28,22,10,0.18); padding:9px; transform:rotate(-3deg); }
        .pcard-photo{ width:100%; aspect-ratio:2/1; border-radius:8px; overflow:hidden; background:#F7F4ED; }
        .pcard-photo :global(img){ width:100%; height:100%; object-fit:cover; }
        .pcard-pal{ display:flex; gap:4px; padding:7px 1px 0; }
        .pcard-pal span{ flex:1; height:13px; border-radius:4px; box-shadow:inset 0 0 0 1px rgba(0,0,0,0.05); }
        .pcard-title{ font-family:'Instrument Serif',Georgia,serif; font-size:16px; color:#1C1A17; padding:6px 2px 1px; line-height:1; }

        .thumb.peanuts{ background:linear-gradient(150deg,#1c2620,#0e1410); }
        .pn-grid{ position:absolute; inset:0; z-index:1; background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px); background-size:26px 26px; }
        .pn-doc{ position:absolute; z-index:2; border-radius:5px; }
        .pn-doc.back{ width:92px; height:108px; right:34px; top:24px; background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.14); transform:rotate(7deg); }
        .pn-doc.front{ width:100px; height:116px; right:46px; top:20px; background:#f2efe9; border:1px solid rgba(0,0,0,0.1); box-shadow:0 8px 20px rgba(0,0,0,0.35); transform:rotate(-3deg); padding:13px 11px; display:flex; flex-direction:column; gap:6px; }
        .pn-line{ height:4px; border-radius:2px; background:#c7c1b6; width:80%; }
        .pn-line.lg{ width:60%; height:7px; background:#1b1714; }
        .pn-line.sm{ width:45%; }
        .pn-verdict{ margin-top:auto; align-self:flex-start; font-family:var(--font-mono); font-size:0.5rem; font-weight:600; letter-spacing:0.05em; color:#fff; background:var(--green); border-radius:3px; padding:3px 6px; }

        .thumb.davidko{ background:linear-gradient(150deg,#dde6ec,#c2d1dc); }
        .dko{ position:absolute; inset:0; z-index:2; }
        .dko-trend{ position:absolute; left:0; right:0; top:20px; width:100%; height:54px; }
        .dko-trend polyline{ fill:none; stroke:var(--green); stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; vector-effect:non-scaling-stroke; opacity:0.55; }
        .dko-trend circle{ fill:var(--green); }
        .dko-sky{ position:absolute; left:16px; right:16px; bottom:0; height:66px; display:flex; align-items:flex-end; gap:7px; }
        .dko-b{ background:var(--green); border-radius:4px 4px 0 0; display:grid; grid-template-columns:1fr 1fr; gap:3px; padding:6px 5px; align-content:start; opacity:0.92; }
        .dko-b i{ width:6px; height:6px; border-radius:1px; background:rgba(255,255,255,0.55); }
        .dko-b.b1{ width:40px; height:44px; }
        .dko-b.b2{ width:46px; height:62px; background:var(--green-dark); }
        .dko-b.b3{ width:34px; height:32px; }

        .thumb.federated{ background:linear-gradient(150deg,#1c2620,#0e1410); }
        .fed{ position:absolute; inset:0; z-index:2; width:100%; height:100%; }
        .fed line{ stroke:rgba(111,206,143,0.45); stroke-width:1.4; vector-effect:non-scaling-stroke; }
        .fed .edge{ fill:#14110d; stroke:rgba(111,206,143,0.7); stroke-width:1.4; vector-effect:non-scaling-stroke; }
        .fed .core{ fill:var(--green); stroke:#6fce8f; stroke-width:1.6; vector-effect:non-scaling-stroke; }
        .fed .dot{ fill:#fff; }

        .thumb.slush{ background:#1a1a1a; }

        .thumb.code{ background:linear-gradient(150deg,#16221b,#0e1410); }
        .thumb.code .motif{ position:absolute; inset:20px 20px 18px; z-index:2; font-family:var(--font-mono); font-size:0.72rem; line-height:1.75; color:rgba(215,228,217,0.85); }
        .thumb.code .motif .c-key{ color:#6fce8f; }
        .thumb.code .motif .c-str{ color:#f7c873; }
        .thumb.code .motif .c-dim{ color:rgba(215,228,217,0.4); }

        .thumb.data{ background:linear-gradient(150deg,#e8ede4,#d3ddcb); }
        .thumb.data .bars{ position:absolute; inset:22px 22px 20px; z-index:2; display:flex; align-items:flex-end; gap:8px; }
        .thumb.data .bars span{ flex:1; background:var(--green); border-radius:3px 3px 0 0; opacity:0.85; }
        .thumb.data .bars span:nth-child(even){ background:var(--green-pale); opacity:0.7; }

        .thumb.scatter{ background:linear-gradient(150deg,#dfe7ec,#c6d3dd); }
        .thumb.scatter svg{ position:absolute; inset:0; z-index:2; width:100%; height:100%; }
        .thumb.scatter .reg{ stroke:var(--green); stroke-width:2; stroke-dasharray:5 4; vector-effect:non-scaling-stroke; }
        .thumb.scatter .pt{ fill:var(--green-dark); opacity:0.6; }

        .thumb.calc{ background:linear-gradient(150deg,#eceee9,#dadfd6); display:grid; place-items:center; }
        .thumb.calc .pad{ position:relative; z-index:2; display:grid; grid-template-columns:repeat(3,26px); gap:6px; }
        .thumb.calc .pad span{ height:26px; border-radius:6px; background:var(--surface); border:1px solid var(--border); }
        .thumb.calc .pad span.accent{ background:var(--green); border-color:var(--green); }

        .thumb-glyph{ position:absolute; bottom:15px; left:15px; right:15px; z-index:3; font-family:var(--font-display); font-weight:800; font-size:1.4rem; letter-spacing:-0.02em; line-height:1; }
        .thumb.code .thumb-glyph{ color:#eaf2ec; }
        .thumb.data .thumb-glyph,.thumb.scatter .thumb-glyph{ color:var(--green-dark); }

        .empty{ grid-column:1 / -1; text-align:center; padding:40px; color:var(--muted); font-family:var(--font-mono); font-size:0.85rem; }

        @media (max-width:720px){ .grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:480px){ .grid{ grid-template-columns:1fr; } .projects-header h1{ font-size:1.9rem; } }
      `}</style>
    </Layout>
  );
}

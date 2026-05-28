// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./home.css";

const CALENDLY_URL =
  "https://calendly.com/aidanlynde/lynde-engineering-free-consultation";

const PHRASES = [
  { noun: "Systems",    rest: "founders trust" },
  { noun: "Software",   rest: "that ships" },
  { noun: "Products",   rest: "that real users rely on" },
  { noun: "Automation", rest: "that actually works" },
];

const STACK = [
  "TypeScript", "Python", "React", "Next.js", "FastAPI", "Node.js",
  "PostgreSQL", "Firebase", "Stripe", "OpenAI", "Expo / EAS",
  "Tailwind", "AWS", "GCP", "Docker", "GitHub Actions", "Vercel",
];

const TERM_LINES: Array<{
  t: "prompt" | "out" | "ok" | "tag" | "cmd" | "blank";
  c?: string;
  cmd?: string;
  link?: string;
}> = [
  { t: "prompt", c: "aidan@lynde-engineering" },
  { t: "out", c: "~/currently-shipping $ ", cmd: "status --live" },
  { t: "blank" },
  { t: "ok",  c: "✓ federated-learning-demo  · privacy-preserving inference deployed on Vercel" },
  { t: "ok",  c: "✓ fastapi-userauth-template · v1.4 — refresh tokens + Postgres" },
  { t: "tag", c: "▲ slush-p2p-payments        · auth + Stripe Connect in flight" },
  { t: "out", c: "  last commit · 2h ago  ·  main · feat(api): rate-limit middleware" },
  { t: "blank" },
  { t: "prompt", c: "lynde-engineering » " },
  { t: "cmd", c: "book --free-call", link: CALENDLY_URL },
];

const DO_CARDS = [
  {
    step: "01 · AUDIT",
    title: "Find what's broken before it breaks you.",
    desc: "Security gaps, broken flows, deploy bottlenecks — mapped in a single doc with a clear plan to fix each one.",
    tags: ["Security", "Code review", "Infra", "Auth"],
  },
  {
    step: "02 · BUILD",
    title: "Prototype to production, properly.",
    desc: "Auth, databases, payments, dashboards, deploys. Real software with the parts that demos always skip.",
    tags: ["Next.js", "FastAPI", "Stripe", "Postgres", "Firebase"],
  },
  {
    step: "03 · LAUNCH",
    title: "Get it in front of real users.",
    desc: "App Store / TestFlight, marketing site, analytics, contact funnels, and the launch-day checklist that actually works.",
    tags: ["TestFlight", "Google Play", "Analytics", "Funnels"],
  },
];

type WorkItem = {
  size: "lg" | "md" | "sm";
  slug: string;
  title: string;
  desc: string;
  year: string;
  role: string;
  thumb: "dark" | "green" | "warm" | "cool" | "paper";
  glyph: string;
  deco?: "bars";
};

const WORKS: WorkItem[] = [
  {
    size: "lg", slug: "project-ten",
    title: "Federated Learning Demo",
    desc: "Privacy-preserving web demo built to show federated training to investors — full client/server split, live aggregation.",
    year: "2025", role: "Build & deploy", thumb: "dark",
    glyph: "Federated\nlearning, in the\nbrowser.",
    deco: "bars",
  },
  {
    size: "sm", slug: "project-three",
    title: "Slush · P2P Payments",
    desc: "Decentralized peer-to-peer payment app — MVP built end to end.",
    year: "2024", role: "Founder", thumb: "green", glyph: "Slush.",
  },
  {
    size: "sm", slug: "project-four",
    title: "FastAPI Auth Template",
    desc: "Reusable user-auth scaffold for every project after.",
    year: "2024", role: "Open source", thumb: "warm", glyph: "/auth",
  },
  {
    size: "md", slug: "project-nine",
    title: "Lincoln Park Housing Analysis",
    desc: "Investment strategy + data analysis for a duplex purchase in Chicago.",
    year: "2025", role: "Analysis", thumb: "cool", glyph: "$ 1.4M\nLP duplex", deco: "bars",
  },
  {
    size: "md", slug: "project-eight",
    title: "Applied ML · ECON 491",
    desc: "Six end-to-end machine learning projects from UIUC, from regression to gradient boosting.",
    year: "2024", role: "Research", thumb: "paper", glyph: "ML\nfor econ.",
  },
];

function AnimatedHeadline() {
  const [displayIdx, setDisplayIdx] = useState(0);
  const [nounKey, setNounKey] = useState(0);
  const [restText, setRestText] = useState("");
  const [showCaret, setShowCaret] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const typePhrase = (idx: number) => {
      const { rest } = PHRASES[idx];
      let char = 0;
      setShowCaret(true);

      const typeNext = () => {
        if (cancelled) return;
        char++;
        setRestText(rest.slice(0, char));
        if (char < rest.length) {
          setTimeout(typeNext, 52);
        } else {
          // fully typed — hold then begin transition
          setTimeout(beginTransition, 2200);
        }
      };
      setTimeout(typeNext, 52);
    };

    let currentIdx = 0;

    const beginTransition = () => {
      if (cancelled) return;
      // snap-clear the typed text and hide caret
      setRestText("");
      setShowCaret(false);

      setTimeout(() => {
        if (cancelled) return;
        currentIdx = (currentIdx + 1) % PHRASES.length;
        setDisplayIdx(currentIdx);
        setNounKey(k => k + 1);

        // give the noun animation time to land before typing starts
        setTimeout(() => {
          if (!cancelled) typePhrase(currentIdx);
        }, 460);
      }, 80);
    };

    typePhrase(0);
    return () => { cancelled = true; };
  }, []); // runs once on mount — no state dependencies

  return (
    <h1 className="hero-headline" aria-live="polite">
      I build{" "}
      <span key={nounKey} className="noun-word">
        {PHRASES[displayIdx].noun}
      </span>
      <br />
      <span className="typed-rest">
        {restText}
        {showCaret && <span className="verb-caret" />}
      </span>
    </h1>
  );
}

/* ─── Live terminal widget ────────────────────────────────── */
function Terminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setVisible(i);
      if (i < TERM_LINES.length) {
        timer = setTimeout(tick, i === 1 ? 600 : 320);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal-wrap">
      <div className="terminal" role="region" aria-label="Live workshop terminal">
        <div className="terminal-head">
          <span className="term-dot r" />
          <span className="term-dot y" />
          <span className="term-dot g" />
          <span className="term-title">~/lynde-engineering — zsh</span>
        </div>
        <div className="terminal-body">
          {TERM_LINES.slice(0, visible).map((l, i) => {
            if (l.t === "blank") return <div key={i}>&nbsp;</div>;
            if (l.t === "prompt")
              return (
                <div key={i}>
                  <span className="term-prompt">{l.c}</span>
                  {l.cmd && <span className="term-out"> {l.cmd}</span>}
                </div>
              );
            if (l.t === "out")
              return (
                <div key={i}>
                  <span className="term-arrow">›</span>
                  <span className="term-out">{l.c}</span>
                  {l.cmd && <span className="term-cmd">{l.cmd}</span>}
                </div>
              );
            if (l.t === "ok") return <div key={i}><span className="term-ok">{l.c}</span></div>;
            if (l.t === "tag") return <div key={i}><span className="term-tag">{l.c}</span></div>;
            if (l.t === "cmd")
              return (
                <div key={i}>
                  <a className="term-link" href={l.link} target="_blank" rel="noopener noreferrer">{l.c}</a>
                  <span className="term-cursor" />
                </div>
              );
            return null;
          })}
          {visible < TERM_LINES.length && <span className="term-cursor" />}
        </div>
      </div>
    </div>
  );
}

/* ─── Work-card thumbnail (decorative) ────────────────────── */
function WorkThumb({ kind, glyph, deco }: { kind: WorkItem["thumb"]; glyph: string; deco?: "bars" }) {
  return (
    <div className={`work-thumb ${kind}`}>
      {(kind === "dark" || kind === "green") && <div className="thumb-grid" />}
      {kind === "dark" && (
        <>
          <div className="thumb-orb" style={{ width: 180, height: 180, background: "#6fce8f", top: -40, right: -40 }} />
          <div className="thumb-orb" style={{ width: 120, height: 120, background: "#104827", bottom: -30, left: 40 }} />
        </>
      )}
      {kind === "green" && (
        <div className="thumb-orb" style={{ width: 160, height: 160, background: "#6fce8f", top: 40, right: -50 }} />
      )}
      {kind === "warm" && (
        <div className="thumb-quilt">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={`q-tile ${i % 5 === 0 ? "accent" : ""}`} />
          ))}
        </div>
      )}
      {kind === "cool" && deco === "bars" && (
        <div className="thumb-bars" style={{ color: "#104827" }}>
          {[34, 62, 48, 80, 56, 92, 70].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      )}
      {kind === "paper" && (
        <div className="thumb-lines">
          {[100, 75, 90, 55, 80, 65].map((w, i) => (
            <div key={i} style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
      <span className="work-thumb-label">{deco === "bars" ? "FIG · 01" : "CASE STUDY"}</span>
      <div className="work-thumb-glyph">{glyph}</div>
    </div>
  );
}

/* ─── Live local time (footer) ────────────────────────────── */
function LocalTime() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const update = () => {
      try {
        const time = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", hour12: false,
        });
        setNow(time);
      } catch { /* noop */ }
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span>
      CHICAGO · <span style={{ color: "#104827" }}>●</span> {now || "—"} CT
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="home-revamp">
        {/* HERO */}
        <section className="hero">
          <div className="hero-top">
            <span className="hero-meta">
              <span className="dot-wrap"><span className="status-dot" /></span>
              <span>AVAILABLE — Q3 2026 · 2 SLOTS</span>
            </span>
            <div className="hero-socials">
              <a className="hero-social" href="/pdfs/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                <Image src="/icons/resume.svg" alt="" width={16} height={16} />
              </a>
              <a className="hero-social" href="mailto:aidanlynde@gmail.com" aria-label="Email">
                <Image src="/icons/email.svg" alt="" width={16} height={16} />
              </a>
              <a className="hero-social" href="https://www.linkedin.com/in/aidan-lynde-1b97a31b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Image src="/icons/linkedin.svg" alt="" width={16} height={16} />
              </a>
              <a className="hero-social" href="https://github.com/aidanlynde" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Image src="/icons/github.svg" alt="" width={16} height={16} />
              </a>
              <a className="hero-social" href="https://www.strava.com/athletes/36497221" target="_blank" rel="noopener noreferrer" aria-label="Strava">
                <Image src="/icons/strava.svg" alt="" width={16} height={16} />
              </a>
            </div>
          </div>

          <AnimatedHeadline />

          <div className="hero-foot">
            <div className="hero-identity">
              <div className="hero-avatar">
                <Image
                  src="/images/profile.svg"
                  alt="Aidan Lynde"
                  width={88}
                  height={88}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div className="hero-card-name">Aidan Lynde</div>
                <div className="hero-card-role">// FULL-STACK · AI · FOUNDER, LYNDE ENGINEERING</div>
              </div>
            </div>

            <p className="hero-sub">
              Helping founders and small teams turn prototypes, no-code apps, and messy codebases into production software — with real auth, payments, deployments and launch systems.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a free consultation <span className="arrow">→</span>
              </a>
              <Link href="/routes/consulting" className="btn btn-ghost">
                View services
              </Link>
            </div>

            <div className="hero-stats-inline">
              <div className="hsi-item"><span className="hsi-num">5+</span><span className="hsi-lab">YEARS BUILDING</span></div>
              <div className="hsi-sep" />
              <div className="hsi-item"><span className="hsi-num">10</span><span className="hsi-lab">PROJECTS SHIPPED</span></div>
              <div className="hsi-sep" />
              <div className="hsi-item"><span className="hsi-num">F500</span><span className="hsi-lab">ENTERPRISE CLIENT</span></div>
              <div className="hsi-sep" />
              <div className="hsi-item"><span className="hsi-num">3</span><span className="hsi-lab">APPS IN STORES</span></div>
            </div>
          </div>
        </section>

        {/* TERMINAL */}
        <Terminal />

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...STACK, ...STACK].map((s, i) => (
              <span key={i} className="marquee-item"><span className="dot" /> {s}</span>
            ))}
          </div>
        </div>

        {/* WHAT I DO */}
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span className="status-dot inline" /> LYNDE ENGINEERING</p>
              <h2>Three phases — one engineer end-to-end.</h2>
            </div>
            <p className="head-side">
              Most consultants hand you off after the audit. I scope, build, and launch — and stick around long enough for it to actually land.
            </p>
          </div>

          <div className="do-grid">
            {DO_CARDS.map((c) => (
              <Link key={c.step} className="do-card" href="/routes/consulting">
                <span className="do-card-arrow" aria-hidden="true">↗</span>
                <span className="do-step">{c.step}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="do-tags">
                  {c.tags.map((t) => <span key={t} className="do-tag">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SELECTED WORK */}
        <section className="section section-work">
          <div className="section-head">
            <div>
              <p className="eyebrow muted">SELECTED WORK</p>
              <h2>Things I&apos;ve shipped.</h2>
            </div>
            <Link className="head-side archive-link" href="/routes/projects">
              VIEW FULL ARCHIVE →
            </Link>
          </div>
          <div className="work-grid">
            {WORKS.map((w) => (
              <Link key={w.slug} className={`work-card ${w.size}`} href={`/routes/projects/${w.slug}`}>
                <WorkThumb kind={w.thumb} glyph={w.glyph} deco={w.deco} />
                <div className="work-body">
                  <div className="work-meta">
                    <span>{w.year}</span><span className="sep">·</span><span>{w.role}</span>
                  </div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-desc">{w.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROOF BAND */}
        <section className="section">
          <div className="proof">
            <div>
              <p className="eyebrow proof-eyebrow">RELEVANT EXPERIENCE</p>
              <h2 className="proof-title">Built around practical launch work.</h2>
              <p className="proof-copy">
                Consulted on internal tools, dashboards, and workflow automation for <strong>CBRE</strong> — a Fortune 500 commercial real estate firm. Shipped mobile apps to the App Store. Stood up auth, payments, and AI workflows for founders and small teams.
              </p>
              <div className="proof-actions">
                <Link href="/routes/consulting" className="btn btn-light">
                  See full services <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="proof-stats">
              <div className="proof-stat">
                <div className="proof-stat-num">10+</div>
                <div className="proof-stat-label">Projects shipped</div>
              </div>
              <div className="proof-stat">
                <div className="proof-stat-num">F500</div>
                <div className="proof-stat-label">Enterprise client (CBRE)</div>
              </div>
              <div className="proof-stat">
                <div className="proof-stat-num">3</div>
                <div className="proof-stat-label">Apps in production stores</div>
              </div>
              <div className="proof-stat">
                <div className="proof-stat-num">≤ 14d</div>
                <div className="proof-stat-label">From kickoff to first ship</div>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="cta" id="contact">
          <p className="eyebrow"><span className="status-dot inline" /> READY WHEN YOU ARE</p>
          <h2 className="cta-title">
            Let&apos;s get your idea<br />from <em>prototype</em> to <em>production</em>.
          </h2>
          <p className="cta-lead">
            A free 30-minute call is enough to scope what you&apos;re working with and outline the cleanest next step. No pitch deck — just a straightforward conversation.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a free consultation <span className="arrow">→</span>
            </a>
            <Link href="/routes/consulting" className="cta-tertiary">
              or explore services →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="home-footer">
          <div>© 2026 AIDAN LYNDE · POWERED BY NEXT.JS &amp; VERCEL</div>
          <LocalTime />
          <div className="foot-socials">
            <a href="https://github.com/aidanlynde" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Image src="/icons/github.svg" alt="" width={12} height={12} /></a>
            <a href="https://www.linkedin.com/in/aidan-lynde-1b97a31b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Image src="/icons/linkedin.svg" alt="" width={12} height={12} /></a>
            <a href="mailto:aidanlynde@gmail.com" aria-label="Email"><Image src="/icons/email.svg" alt="" width={12} height={12} /></a>
          </div>
        </footer>
      </div>
  );
}

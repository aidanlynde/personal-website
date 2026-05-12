// pages/index.js or src/app/routes/home/page.tsx (depending on file structure)
"use client";

import Image from "next/image";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/aidanlynde/lynde-engineering-free-consultation";

export default function Home() {
  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        {/* Left-aligned Profile Picture and Name */}
        <div className="profile-header">
          {/* Profile Picture */}
          <div className="profile-picture">
            <Image
              src="/images/profile.svg"
              alt="Profile Picture"
              width={150}
              height={150}
              className="profile-img"
            />
          </div>

          {/* Name and Icon Links */}
          <div className="name-icons">
            <h1 className="name">Aidan Lynde</h1>
            <div className="icon-links">
              <Link href="/pdfs/resume.pdf" className="icon">
                <Image src="/icons/resume.svg" alt="Resume" width={30} height={30} />
              </Link>
              <Link href="mailto:aidanlynde@gmail.com" className="icon">
                <Image src="/icons/email.svg" alt="Email" width={30} height={30} />
              </Link>
              <Link href="https://www.linkedin.com/in/aidan-lynde-1b97a31b4/" className="icon">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={30} height={30} />
              </Link>
              <Link href="https://github.com/aidanlynde" className="icon">
                <Image src="/icons/github.svg" alt="GitHub" width={30} height={30} />
              </Link>
              <Link href="https://www.strava.com/athletes/36497221" className="icon">
                <Image src="/icons/strava.svg" alt="Strava" width={30} height={30} />
              </Link>
            </div>
          </div>
        </div>

        {/* Centered description */}
        <p className="description">
          Software developer and AI enthusiast specializing in full-stack development, building software that actually ships, and turning complex ideas into real products.
        </p>

        {/* Buttons Section */}
        <div className="buttons-section">
          <Link href="/routes/consulting" legacyBehavior>
            <a className="button">Consulting</a>
          </Link>
          <Link href="/routes/about" legacyBehavior>
            <a className="button">About</a>
          </Link>
          <Link href="/routes/projects" legacyBehavior>
            <a className="button">Projects</a>
          </Link>
          <Link href="/routes/travel" legacyBehavior>
            <a className="button">Travel</a>
          </Link>
          <Link href="/routes/tools" legacyBehavior>
            <a className="button">Tools</a>
          </Link>
        </div>

        <section className="consulting-section" aria-labelledby="consulting-heading">
          <div className="consulting-inner">
            <div className="consulting-meta">
              <span className="status-dot"><span className="status-dot-ring" /></span>
              <span className="consulting-label">Lynde Engineering</span>
            </div>

            <h2 id="consulting-heading">
              I take software from<br />prototype to production.
            </h2>

            <p className="consulting-copy">
              Audits, full builds, and launch systems for founders and small teams who need real software — not just a demo.
            </p>

            <div className="consulting-chips">
              {["Audits", "MVP Builds", "Auth & Payments", "AI Automation", "Deployment", "App Store Launch"].map((tag) => (
                <span key={tag} className="consulting-chip">{tag}</span>
              ))}
            </div>

            <div className="consulting-footer">
              <a href="/routes/consulting" style={{color: '#888', textDecoration: 'none', fontSize: '0.87rem', fontWeight: 500, whiteSpace: 'nowrap'}}>
                View Services
              </a>
              <a href={CALENDLY_URL} className="consulting-primary">Book a Free Consultation →</a>
            </div>
          </div>
        </section>

        <footer>
          © 2026 Aidan Lynde · Powered by Next.js & Vercel
        </footer>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 50px 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .profile-section {
          text-align: center;
        }

        /* Profile header for aligning image and name horizontally */
        .profile-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        /* Circular profile picture */
        .profile-picture {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
        }

        /* Adjust Image size to fit within circular container */
        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name-icons {
          text-align: left; /* Align text to the left next to profile picture */
        }

        .name {
          font-size: 2.2rem;
          font-weight: bold;
          margin: 20px 0 15px 0; /* Remove top margin, add margin below */
        }

        .icon-links {
          display: flex;
          gap: 15px;
        }

        .icon img {
          filter: grayscale(100%);
          transition: filter 0.2s;
        }

        .icon:hover img {
          filter: grayscale(0%);
        }

        .description {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .buttons-section {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 30px;
          margin-bottom: 30px;
        }

        a.button {
          background-color: #e0e0e0;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: inline-block;
        }

        a.button:hover {
          background-color: #104827;
          color: #fff;
        }

        /* ── Consulting / Lynde Engineering Section ── */
        .consulting-section {
          margin: 16px auto 44px;
          max-width: 760px;
          border-radius: 12px;
          background: #f4f4f4;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 14px rgba(0,0,0,0.06);
          text-align: left;
        }

        .consulting-inner {
          padding: 24px 28px 20px 24px;
          display: flex;
          flex-direction: column;
        }

        .consulting-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .status-dot {
          position: relative;
          width: 9px;
          height: 9px;
          flex: 0 0 auto;
        }

        .status-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #104827;
        }

        .status-dot-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid #104827;
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes pulse-ring {
          0%   { transform: scale(0.85); opacity: 0.7; }
          70%  { transform: scale(1.7);  opacity: 0; }
          100% { transform: scale(1.7);  opacity: 0; }
        }

        .consulting-label {
          color: #104827;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .consulting-section h2 {
          color: #1a1a1a;
          font-size: 1.55rem;
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }

        .consulting-copy {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 520px;
        }

        .consulting-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 18px;
        }

        .consulting-chip {
          padding: 5px 12px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #ddd;
          color: #444;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .consulting-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          padding-top: 16px;
          border-top: 1px solid #e4e4e4;
        }

        .consulting-primary {
          padding: 10px 20px;
          border-radius: 8px;
          background: #e0e0e0;
          color: #333;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .consulting-primary:hover {
          background-color: #104827;
          color: #fff;
        }

        footer {
          font-size: 0.8rem;
          color: #aaa;
          margin-top: 42px;
        }

        @media (max-width: 560px) {
          .profile-header {
            flex-direction: column;
            align-items: center;
          }

          .profile-picture {
            margin: 0 auto;
          }

          .name-icons {
            text-align: center;
            width: 100%;
          }

          .icon-links {
            justify-content: center;
          }

          .consulting-inner {
            padding: 26px 20px 24px;
          }

          .consulting-section h2 {
            font-size: 1.55rem;
          }

          .consulting-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
          }

          .consulting-primary {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

// pages/index.js or src/app/routes/home/page.tsx (depending on file structure)
"use client";

import Image from "next/image";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/aidanlynde/free-consultation";

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
          I am a Software Developer and Machine Learning Enthusiast. I specialize in full-stack development and AI-driven solutions, with a focus on creating innovative, user-friendly applications.
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
          <div className="consulting-copy-block">
            <div className="consulting-meta">
              <span className="status-dot"></span>
              <p className="consulting-label">Lynde Engineering</p>
            </div>
            <h2 id="consulting-heading">I take software from hacked-together to production-ready.</h2>
            <p className="consulting-copy">
              Consulting for founders, small businesses, and internal teams that need help auditing, cleaning up, securing, and launching real software systems.
            </p>
            <div className="consulting-proof">
              <span>Audits</span>
              <span>MVP launch</span>
              <span>Auth</span>
              <span>Payments</span>
              <span>Deployment</span>
            </div>
          </div>
          <div className="consulting-cta">
            <p>Free 30-minute fit call</p>
            <a href={CALENDLY_URL} className="consulting-primary">Book Free Consultation</a>
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

        .consulting-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 210px;
          gap: 26px;
          align-items: center;
          margin: 8px auto 36px;
          max-width: 760px;
          border: 1px solid #d2d2d2;
          border-left: 4px solid #104827;
          border-radius: 8px;
          background: #f7f7f7;
          padding: 26px 28px 26px 24px;
          text-align: left;
        }

        .consulting-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #104827;
          flex: 0 0 auto;
        }

        .consulting-label {
          color: #104827;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin: 0;
          text-transform: uppercase;
        }

        .consulting-section h2 {
          color: #2f2f2f;
          font-size: 1.46rem;
          line-height: 1.24;
          margin: 0 0 9px;
          max-width: 520px;
        }

        .consulting-copy {
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          max-width: 560px;
        }

        .consulting-proof {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 0;
          margin-top: 16px;
        }

        .consulting-proof span {
          color: #555;
          font-size: 0.86rem;
          font-weight: 500;
          line-height: 1;
        }

        .consulting-proof span + span::before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 13px;
          background: #c8c8c8;
          margin: 0 10px;
          vertical-align: -2px;
        }

        .consulting-cta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 9px;
          padding-left: 22px;
          border-left: 1px solid #d7d7d7;
        }

        .consulting-cta p {
          color: #777;
          font-size: 0.84rem;
          margin: 0;
          text-align: right;
        }

        .consulting-primary {
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          width: 100%;
          padding: 10px 16px;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 700;
          transition: background-color 0.3s ease, color 0.3s ease;
          text-align: center;
          background-color: #104827;
          color: #fff;
        }

        .consulting-primary:hover {
          background-color: #0b351c;
          color: #fff;
        }

        footer {
          font-size: 0.8rem;
          color: #aaa;
          margin-top: 42px;
        }

        @media (max-width: 560px) {
          .profile-header {
            align-items: flex-start;
            flex-direction: column;
            text-align: center;
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

          .consulting-section {
            grid-template-columns: 1fr;
            border-left-width: 1px;
            padding: 22px 18px;
            text-align: center;
          }

          .consulting-meta {
            justify-content: center;
          }

          .consulting-section h2 {
            font-size: 1.32rem;
          }

          .consulting-proof {
            justify-content: center;
          }

          .consulting-cta {
            align-items: stretch;
            border-left: 0;
            border-top: 1px solid #d7d7d7;
            padding-left: 0;
            padding-top: 18px;
          }

          .consulting-cta p {
            text-align: center;
          }

        }
      `}</style>
    </div>
  );
}

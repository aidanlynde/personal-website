"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from "next/link";

type Post = {
  date: string | Date;
  content: string;
  image?: string;
  image1?: string; 
};

// Function to parse date strings like "October 17th, 2013"
function parseDateString(dateString: string): Date {
  // Remove the ordinal suffix (e.g., "st", "nd", "rd", "th")
  const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
  
  // Parse the cleaned date string
  const parsedDate = new Date(cleanedDateString);

  // If the date is invalid, return the current date for debugging purposes
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}

export default function AboutPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null
  const [isCollapsed, setIsCollapsed] = useState(true); // Skills collapsed state
  const [isHobbiesCollapsed, setIsHobbiesCollapsed] = useState(true); // Hobbies collapsed state
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Default year set to 2024
  const [years, setYears] = useState<number[]>([]); // Store unique years here
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  // Fetch posts from JSON file
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts.json');
        const data: Post[] = await response.json();

        // Parse dates using the custom parseDateString function
        const parsedPosts = data.map(post => ({
          ...post,
          date: typeof post.date === 'string' ? parseDateString(post.date) : post.date,
        }));

        console.log('Parsed posts with dates:', parsedPosts); // Log the parsed data

        // Sort posts in descending order (most recent first)
        parsedPosts.sort((a, b) => {
          const dateA = a.date instanceof Date ? a.date : new Date(a.date);
          const dateB = b.date instanceof Date ? b.date : new Date(b.date);
          return dateB.getTime() - dateA.getTime(); // Sort in descending order
        });

        setPosts(parsedPosts);

        // Extract unique years from posts
        const uniqueYears = Array.from(
          new Set(parsedPosts.map(post => post.date instanceof Date ? post.date.getFullYear() : new Date(post.date).getFullYear()))
        )
          .filter(year => !isNaN(year))
          .sort((a, b) => b - a); // Sort in descending order to show most recent year first

        console.log('Unique years:', uniqueYears); // Log the unique years

        setYears(uniqueYears);

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching posts:', err); // Log error if any
        setError('Failed to fetch posts.'); // Set an error message if fetching fails
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPosts();
  }, []);

  // Toggle functions modified to close the other section when one is opened
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsHobbiesCollapsed(true); // Close Hobbies when Skills is toggled
  };

  const toggleHobbiesCollapse = () => {
    setIsHobbiesCollapsed(!isHobbiesCollapsed);
    setIsCollapsed(true); // Close Skills when Hobbies is toggled
  };

  // If there was an error fetching the posts, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If posts are still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout currentPath={currentPath}>
      <div className="about-page">
        {/* Banner Section */}
        <div className="banner">
          <Image src="/images/aboutbanner.png" alt="Banner Image" fill />
        </div>

        {/* Profile Info Section */}
        <div className="profile-info">
          <div className="profile-picture">
            <Image
              src="/images/profile.svg"
              alt="Profile Picture"
              width={150}
              height={150}
              className="profile-img"
            />
          </div>

          <div className="header-and-icons">
            <div className="header-icons-row">
              <h1>Aidan Lynde</h1>

              {/* Icons Section */}
              <div className="icons">
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

            {/* Age and Toggles */}
            <div className="info-and-toggles">
              <p className="bio-info">Age: 22</p>

              <div className="toggles">
                <div className="toggle-link" onClick={toggleCollapse}>
                  {isCollapsed ? 'View Skills' : 'Hide Skills'}
                </div>
                <div className="toggle-link" onClick={toggleHobbiesCollapse}>
                  {isHobbiesCollapsed ? 'View Hobbies' : 'Hide Hobbies'}
                </div>
              </div>
            </div>

            {/* Collapsible Skills Section */}
            <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
              {[
                {
                  category: 'Programming Languages',
                  skills: ['Python', 'Java', 'C++', 'JavaScript', 'Swift', 'R'],
                },
                {
                  category: 'Frameworks & Libraries',
                  skills: [
                    'React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'FastAPI', 'Flutter', 'Tailwind CSS', 'Sass',
                  ],
                },
                {
                  category: 'Databases',
                  skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Microsoft SQL Server'],
                },
                {
                  category: 'Tools & Platforms',
                  skills: [
                    'Git', 'Docker', 'CI/CD', 'GitHub Actions', 'Jira', 'Figma', 'Adobe XD', 'LaTeX', 'Microsoft Excel',
                  ],
                },
                {
                  category: 'Cloud Services',
                  skills: ['AWS', 'Google Cloud Platform'],
                },
                {
                  category: 'Data Science & Machine Learning',
                  skills: ['Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'R'],
                },
                {
                  category: 'Testing & QA',
                  skills: ['Jest', 'Mocha', 'Cypress'],
                },
                {
                  category: 'Other Skills',
                  skills: ['REST APIs', 'Bash', 'zsh', 'HTML5', 'CSS3'],
                },
              ].map((group) => (
                <div key={group.category} className="skill-category">
                  <p className="category-title">{group.category}</p>
                  <div className="skills-list">
                    {group.skills.map((skill) => (
                      <span className="bubble" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Collapsible Hobbies Section */}
            <div className={`hobbies-stack ${isHobbiesCollapsed ? 'collapsed' : ''}`}>
              <div className="hobbies-bubbles">
                <span className="bubble">✈️ Traveling</span>
                <span className="bubble">🎸 Guitar</span>
                <span className="bubble">⚽ Soccer</span>
                <span className="bubble">🧗 Climbing</span>
                <span className="bubble">🥾 Hiking</span>
              </div>
            </div>

          </div>
        </div>

        {/* GitHub Repo Links */}
        <div className="github-links">
          <a href="/routes/projects/project-eight" className="github-link">
            📈 Applied-Machine-Learning
          </a>
          <a href="/routes/projects/project-six" className="github-link">
            🧮 Applied-Econometrics
          </a>
          <a href="/routes/projects/project-four" className="github-link">
            🖥️ FastAPI-UserAuth-Template
          </a>
          <a href="/routes/projects/project-three" className="github-link">
            📱 Slush-Decentralized-p2p
          </a>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h2>Posts:</h2>

          {/* Single Year Filter */}
          <div className="filter-section">
            <label htmlFor="yearFilter">Select Year:</label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="timeline-feed">
            {posts
              .filter((post) => {
                const postYear = post.date instanceof Date
                  ? post.date.getFullYear()
                  : new Date(post.date).getFullYear();
                return postYear === selectedYear;
              })
              .map((post, index) => (
                <div key={index} className="timeline-item">
                  <div className="post-header">
                    <Image
                      src="/images/profile.svg"
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span className="post-username">@danos</span>
                    <span className="date">
                      {post.date instanceof Date
                        ? post.date.toDateString()
                        : new Date(post.date).toDateString()}
                    </span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />

                  <div className="images-container">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt="Image 1"
                        width={375}
                        height={210}
                        className="post-image"
                      />
                    )}
                    {post.image1 && (
                      <Image
                        src={post.image1}
                        alt="Image 2"
                        width={375}
                        height={210}
                        className="post-image"
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <style jsx>{`
          .about-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Montserrat', sans-serif;
          }

          /* Banner Section */
          .banner {
            position: relative;
            width: 100%;
            height: 180px;
            background-color: #ededed;
            z-index: 0;
          }

          /* Profile Info Section */
          .profile-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: -75px;
            padding: 0 20px;
            z-index: 2;
            position: relative;
          }

          .profile-picture {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            z-index: 3;
            margin-right: 20px;
            margin-top: 20px;
          }

          .profile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
          }

          /* Name and Icons Row */
          .header-and-icons {
            flex: 1;
            margin-top: 80px;
            margin-bottom: -10px;
          }

          .header-icons-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: -5px;
          }

          .icons {
            display: flex;
            gap: 10px;
          }

          h1 {
            margin: 0;
            font-size: 2.5rem;
            color: #333;
          }

          .bio-info {
            margin: 0;
            color: #555;
          }

          /* Info and Toggles */
          .info-and-toggles {
            margin-top: 10px;
          }

          .toggles {
            display: flex;
            gap: 10px;
            margin-top: 10px;
          }

          /* Toggle Links */
          .toggle-link {
            color: #555;
            font-size: 0.95rem;
            text-decoration: underline;
            cursor: pointer;
          }

          /* Tech Stack Section */
          .tech-stack {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            /* New styles for scrolling */
            overflow-y: auto;
            direction: rtl; /* Flip scrollbar to the left */
          }

          .tech-stack:not(.collapsed) {
            max-height: 180px; /* Adjust this value as needed */
          }

          /* Inner content back to normal direction */
          .tech-stack .skill-category {
            direction: ltr;
          }

          .skill-category {
            margin-bottom: 15px;
          }

          /* Updated category title styling */
          .category-title {
            margin-bottom: 5px;
            font-size: 0.95rem; /* Smaller font size */
            color: #333;
            font-weight: normal; /* Not bold */
          }

          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .bubble {
            background-color: #e0e0e0;
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
          }

          /* Hobbies Stack Section */
          .hobbies-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            max-height: 500px;
            overflow: hidden;
            margin-top: 10px;
          }

          .hobbies-stack.collapsed {
            max-height: 0;
          }

          .hobbies-bubbles {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          /* Timeline Section */
          .timeline-section {
            margin-top: 40px;
          }

          .timeline-feed {
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }

          .timeline-item {
            border-bottom: 1px solid #ddd;
            padding: 15px 0;
            margin-bottom: 20px;
          }

          .post-header {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .post-username {
            font-weight: bold;
            color: #104827;
          }

          .date {
            color: #999;
            font-size: 0.9rem;
          }

          p {
            margin: 0;
            color: #333;
            margin-top: 15px;
            margin-bottom: 15px;
          }

          /* Images in Posts */
          .images-container {
            display: flex;
            gap: 10px;
            margin-top: 10px;
          }

          .post-image {
            border-radius: 8px;
            object-fit: cover;
          }

          /* Filter Section */
          .filter-section {
            margin-bottom: 20px;
            font-size: 1rem;
          }

          #yearFilter {
            padding: 5px 10px;
            font-size: 1rem;
            margin-left: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
          }
          
          /* GitHub Repo Links Styles */
            .github-links {
              display: flex;
              flex-wrap: wrap;          /* Allows wrapping if links overflow */
              justify-content: center;  /* Centers the links horizontally */
              gap: 20px;                /* Adds spacing between the links */
              margin: 30px 0;           /* Adds vertical spacing above and below the links */
            }

            .github-link {
              margin-top: 20px;
              text-decoration: underline;    /* Removes underline from links */
              color: #104827;           /* Applies your green color */
              font-size: 1.0rem;        /* Adjusts font size */
            }

            .github-link:hover {
              text-decoration: underline; /* Adds underline on hover */
              color: #082c16;             /* Darkens the green color on hover */
            }

            a {
              color: #104827; /* Replace with your site's green color code */
              text-decoration: underline;
            }

            a:hover {
              text-decoration: underline;
              color: #008f4c; /* Optional: Darker shade on hover */
            }


          @media (max-width: 768px) {
            h1 {
              font-size: 1.8rem;
              margin-bottom: 10px;
            }

            .profile-info {
              flex-direction: column;
              align-items: center;
            }

            .profile-picture {
              margin: 0 auto;
            }

            .header-and-icons {
              text-align: center;
              margin-top: 10px;
            }

            .header-icons-row {
              flex-direction: column;
              align-items: center;
            }

            .info-and-toggles {
              text-align: center;
            }
            .toggles {
              display: flex;
              gap: 10px;
              margin-top: 5px;
              justify-content: center; /* Centers the toggles */
            }

            /* Adjust tech-stack height for mobile */
            .tech-stack:not(.collapsed) {
              max-height: 150px;
              text-align: left;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}

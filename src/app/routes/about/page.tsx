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
  const [isCollapsed, setIsCollapsed] = useState(true);
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

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
            <p className="bio-info">Born: July 5th, 2002</p>

            {/* Subtle Skills Dropdown */}
            <div className="skills-toggle" onClick={toggleCollapse}>
              {isCollapsed ? 'View Skills' : 'Hide Skills'}
            </div>

            {/* Collapsible Skills Section */}
            <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
              {[
                "Python", "Java", "C++", "JavaScript", "R", "Swift", "SQL", "Microsoft SQL Server",
                "Git", "Bash", "zsh", "Next.js", "Google Cloud", "Amazon Web Services", "Jira", 
                "Flutter", "Figma", "LaTeX", "Microsoft Excel", "MySQL", "PostgreSQL", "MongoDB", 
                "Firebase", "Docker", "CI/CD", "GitHub Actions", "Scikit-learn", "TensorFlow", 
                "Pandas", "NumPy", "Jest", "Mocha", "Cypress", "HTML5", "CSS3", "Tailwind CSS", 
                "Sass", "Node.js", "Express.js", "Django", "FastAPI", "REST APIs", "Adobe XD"
              ].map(skill => (
                <span className="bubble" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>

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
                    style={{ borderRadius: '50%', objectFit: 'cover' }} // Directly apply border-radius and object-fit
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
          }

          .header-icons-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            margin-top: 5px;
            color: #555;
          }

          /* Skills Toggle */
          .skills-toggle {
            color: #555;
            font-size: 0.95rem;
            text-decoration: underline;
            cursor: pointer;
            margin-top: 10px;
          }

          /* Tech Stack Section */
          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            max-height: 500px;
            overflow: hidden;
            margin-top: 10px;
          }

          .tech-stack.collapsed {
            max-height: 0;
          }

          .bubble {
            background-color: #e0e0e0;
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
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

          .post-profile-img {
            border-radius: 50%; /* Makes it circular */
            width: 40px; /* Ensure a fixed width */
            height: 40px; /* Ensure a fixed height */
            overflow: hidden;
          }
          
          .post-profile-img img {
            border-radius: 50%; /* Ensure the img inside the div is also circular */
            width: 100%;
            height: 100%;
            object-fit: cover;
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

          @media (max-width: 768px) {
            h1 {
              font-size: 1.8rem;
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
              margin-top: 20px;
            }

            .header-icons-row {
              flex-direction: column;
              align-items: center;
            }
          }
          
          
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

          .images-container {
            display: flex;
            gap: 10px; /* Adds spacing between the two images */
            margin-top: 10px;
          }

          .post-image {
            border-radius: 8px;
            object-fit: cover;
          }



        `}</style>
      </div>
    </Layout>
  );
}

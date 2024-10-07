"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Layout from "../../components/Layout";
import Image from "next/image";

interface Destination {
  name: string;
  emoji: string;
  images: string[];
}

export default function TravelPage() {
  const currentPath = usePathname() ?? ""; // Fallback to empty string if null

  // Define your destinations here
  const destinations: Destination[] = [
    {
      name: "Paris",
      emoji: "🇫🇷",
      images: [
        "/images/travel/paris/paris1.jpg",
        "/images/travel/paris/paris2.jpg",
        "/images/travel/paris/paris3.jpg",
        // Add more Paris image paths as needed
      ],
    },
    {
      name: "Tokyo",
      emoji: "🇯🇵",
      images: [
        "/images/travel/tokyo/tokyo1.jpg",
        "/images/travel/tokyo/tokyo2.jpg",
        "/images/travel/tokyo/tokyo3.jpg",
        // Add more Tokyo image paths as needed
      ],
    },
    {
      name: "New York",
      emoji: "🗽",
      images: [
        "/images/travel/newyork/ny1.jpg",
        "/images/travel/newyork/ny2.jpg",
        "/images/travel/newyork/ny3.jpg",
        // Add more New York image paths as needed
      ],
    },
    // Add more destinations as needed
  ];

  const [activeTab, setActiveTab] = useState<string>(destinations[0].name);

  return (
    <Layout currentPath={currentPath}>
      {/* Travel Page Container */}
      <div className="travel-page">
        {/* Banner Section */}
        <div className="banner">
          <Image
            src="/images/projectbanner.png" // Replace with your travel banner image
            alt="Travel Banner"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Title Section */}
        <div className="titleSection">
          <div className="emoji">✈️</div> {/* Choose an emoji that represents travel */}
          <h1 className="pageTitle">Travel</h1>
        </div>

        {/* Tabs Section */}
        <div className="tabs">
          {destinations.map((destination) => (
            <button
              key={destination.name}
              className={`tab-button ${
                activeTab === destination.name ? "active" : ""
              }`}
              onClick={() => setActiveTab(destination.name)}
            >
              <span className="tab-emoji">{destination.emoji}</span>
              <span className="tab-name">{destination.name}</span>
            </button>
          ))}
        </div>

        {/* Image Collage */}
        <div className="collage">
          {destinations
            .filter((dest) => dest.name === activeTab)
            .map((dest) => (
              <div key={dest.name} className="collage-container">
                {dest.images.map((imgSrc, index) => (
                  <div key={index} className="image-wrapper">
                    <Image
                      src={imgSrc}
                      alt={`${dest.name} Image ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                      priority={index < 3} // Prioritize first few images
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .travel-page {
          max-width: 900px; /* Same as Projects and About pages */
          margin: 0 auto; /* Center the container */
          padding: 20px; /* Consistent padding */
          font-family: "Montserrat", sans-serif;
        }

        /* Banner Section */
        .banner {
          position: relative;
          width: 100%;
          height: 180px; /* Match Projects page banner height */
          overflow: hidden;
          border-radius: 8px; /* Optional: Add border-radius for aesthetics */
        }

        /* Title Section */
        .titleSection {
          display: flex;
          align-items: center;
          margin-top: -40px; /* Match Projects page negative margin */
          z-index: 2;
          position: relative;
          padding-left: 20px;
        }

        .emoji {
          font-size: 4.5rem; /* Match Projects page emoji size */
          margin-right: 10px;
          position: relative;
          top: -5px; /* Match Projects page emoji vertical alignment */
        }

        .pageTitle {
          margin: 0;
          font-size: 2.5rem; /* Match Projects page title size */
          color: #333;
          margin-top: 40px; /* Align with Projects page title */
          margin-left: 10px;
        }

        /* Tabs Section */
        .tabs {
          display: flex;
          justify-content: center;
          margin: 30px 0;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tab-button {
          display: flex;
          align-items: center;
          background-color: #f0f0f0;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          font-size: 1rem;
        }

        .tab-button:hover {
          background-color: #e0e0e0;
          transform: translateY(-2px);
        }

        .tab-button.active {
          background-color: #104827; /* Your green color */
          color: #fff;
        }

        .tab-button.active:hover {
          background-color: #0d3a1f; /* Darker green on hover */
        }

        .tab-emoji {
          font-size: 1.5rem;
          margin-right: 8px;
        }

        /* Image Collage */
        .collage {
          display: flex;
          justify-content: center;
          padding: 0 20px;
        }

        .collage-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          width: 100%;
          max-width: 1200px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 75%; /* 4:3 Aspect Ratio */
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .titleSection {
            flex-direction: column;
            align-items: center;
            padding-left: 0;
            margin-top: -30px; /* Adjust to match Projects page responsiveness */
          }

          .pageTitle {
            font-size: 2rem;
            text-align: center;
            margin-top: -15px;
            margin-left: 20px;
            margin-bottom: 25px;
          }

          .emoji {
            font-size: 3rem;
            top: 0;
            margin-bottom: 10px;
          }

          .collage-container {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
          }

          .banner {
            height: 150px; /* Adjust banner height for smaller screens */
          }
        }
      `}</style>
    </Layout>
  );
}

"use client";

import Layout from '../../../components/Layout';
import Image from 'next/image';
import { useState, memo } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectOnePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const router = useRouter();

  // Slideshow States
  const carsImages = [
    '/images/ebay/car1.png',
    '/images/ebay/car2.png',
    '/images/ebay/car3.png',
    '/images/ebay/car4.png',
    '/images/ebay/car5.png',
    '/images/ebay/car6.png',
    '/images/ebay/car8.png',
    '/images/ebay/car9.png',
    '/images/ebay/car10.png',
    '/images/ebay/car11.png',
    '/images/ebay/car12.png',
    '/images/ebay/car13.png',
    '/images/ebay/car14.png',
    '/images/ebay/car15.png',
    '/images/ebay/car16.png',
    '/images/ebay/car17.png',
    '/images/ebay/car18.png',
    '/images/ebay/car19.png',
  ];

  const clothesImages = [
    '/images/ebay/supreme.JPG',
    '/images/ebay/supreme1.JPG',
    '/images/ebay/supreme2.JPG',
    '/images/ebay/offwhite.JPG',
  ];

  const equipmentImages = [
    '/images/ebay/stage1.png',
    '/images/ebay/stage2.png',
    '/images/ebay/stage3.png',
    '/images/ebay/stage4.png',
    '/images/ebay/car7.png',
    '/images/ebay/stage5.png',
    '/images/ebay/stage6.png',
    '/images/ebay/stage7.png',
  ];

  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentClothesIndex, setCurrentClothesIndex] = useState(0);
  const [currentEquipmentIndex, setCurrentEquipmentIndex] = useState(0);

  // Navigation Functions with End Checks
  const nextCarImage = () => {
    if (currentCarIndex < carsImages.length - 1) {
      setCurrentCarIndex(currentCarIndex + 1);
    }
  };

  const prevCarImage = () => {
    if (currentCarIndex > 0) {
      setCurrentCarIndex(currentCarIndex - 1);
    }
  };

  const nextClothesImage = () => {
    if (currentClothesIndex < clothesImages.length - 1) {
      setCurrentClothesIndex(currentClothesIndex + 1);
    }
  };

  const prevClothesImage = () => {
    if (currentClothesIndex > 0) {
      setCurrentClothesIndex(currentClothesIndex - 1);
    }
  };

  const nextEquipmentImage = () => {
    if (currentEquipmentIndex < equipmentImages.length - 1) {
      setCurrentEquipmentIndex(currentEquipmentIndex + 1);
    }
  };

  const prevEquipmentImage = () => {
    if (currentEquipmentIndex > 0) {
      setCurrentEquipmentIndex(currentEquipmentIndex - 1);
    }
  };

  // Memoized Image Component with Type Annotations
  interface MemoizedImageProps {
    src: string;
    alt: string;
  }

  const MemoizedImage = memo(({ src, alt }: MemoizedImageProps) => (
    <Image src={src} alt={alt} width={400} height={300} priority />
  ));

  return (
    <Layout currentPath="/projects/project-one">
      <div className="project-page">
        {/* Back Arrow */}
        <div
          className="back-arrow"
          onClick={() => router.push('/routes/projects')}
        >
          ← Back to Projects
        </div>

        {/* Title */}
        <h1>🔈 Ebay Reselling</h1>

        {/* Image */}
        <div className="image-container">
          <Image
            src="/images/soundboard.png"
            alt="Ebay Reselling"
            width={600}
            height={300}
          />
        </div>

        {/* Date and Author */}
        <div className="meta">
          <p>Date: June 4, 2020 - August 20, 2020</p>
        </div>

        {/* Skills Toggle */}
        <div className="skills-section">
          <div className="skills-toggle" onClick={toggleCollapse}>
            {isCollapsed ? 'View Skills' : 'Hide Skills'}
          </div>

          {/* Collapsible Skills Section */}
          <div className={`tech-stack ${isCollapsed ? 'collapsed' : ''}`}>
            {[
              'Entrepreneurship',
              'Negotiation',
              'Sales',
              'Customer Service',
              'Technology Refurbishing',
              'Market Research'
            ].map((skill) => (
              <span className="bubble" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>
            During the summer of 2020, I engaged in an eBay reselling venture
            where I purchased, refurbished, and flipped designer clothes/shoes,
            model cars, and stage equipment (along with other various things). I spent a lot of time at swapmeets, garage sales, and looking through alleys to find items to sell. Sometimes an item would be a risky buy where I&apos;d have to do quick research on the spot. Other times items were a clear money making opportunity. I Learned a lot in the process of this venture and I believe these skills will stay with me long past this projects&apos; time... Below I&apos;ve attatched all of the photos I could find of various products I was selling. There was definitely a lot more but those photos were lost to time.
          </p>
        </div>

        {/* Slideshows */}
        <div className="slideshows">
          {/* Cars Slideshow */}
          <div className="slideshow-section">
            <h3>Cars:</h3>
            <div className="slideshow">
              <button
                onClick={prevCarImage}
                className="nav-button"
                disabled={currentCarIndex === 0}
                aria-label="Previous Image"
              >
                <span className="arrow left"></span>
              </button>
              <MemoizedImage
                src={carsImages[currentCarIndex]}
                alt={`Car Image ${currentCarIndex + 1}`}
              />
              <button
                onClick={nextCarImage}
                className="nav-button"
                disabled={currentCarIndex === carsImages.length - 1}
                aria-label="Next Image"
              >
                <span className="arrow right"></span>
              </button>
            </div>
            <div className="indicator">
              {currentCarIndex + 1} / {carsImages.length}
            </div>
          </div>

          {/* Clothes Slideshow */}
          <div className="slideshow-section">
            <h3>Clothes:</h3>
            <div className="slideshow">
              <button
                onClick={prevClothesImage}
                className="nav-button"
                disabled={currentClothesIndex === 0}
                aria-label="Previous Image"
              >
                <span className="arrow left"></span>
              </button>
              <MemoizedImage
                src={clothesImages[currentClothesIndex]}
                alt={`Clothes Image ${currentClothesIndex + 1}`}
              />
              <button
                onClick={nextClothesImage}
                className="nav-button"
                disabled={currentClothesIndex === clothesImages.length - 1}
                aria-label="Next Image"
              >
                <span className="arrow right"></span>
              </button>
            </div>
            <div className="indicator">
              {currentClothesIndex + 1} / {clothesImages.length}
            </div>
          </div>

          {/* Stage Equipment Slideshow */}
          <div className="slideshow-section">
            <h3>Stage Equipment:</h3>
            <div className="slideshow">
              <button
                onClick={prevEquipmentImage}
                className="nav-button"
                disabled={currentEquipmentIndex === 0}
                aria-label="Previous Image"
              >
                <span className="arrow left"></span>
              </button>
              <MemoizedImage
                src={equipmentImages[currentEquipmentIndex]}
                alt={`Equipment Image ${currentEquipmentIndex + 1}`}
              />
              <button
                onClick={nextEquipmentImage}
                className="nav-button"
                disabled={
                  currentEquipmentIndex === equipmentImages.length - 1
                }
                aria-label="Next Image"
              >
                <span className="arrow right"></span>
              </button>
            </div>
            <div className="indicator">
              {currentEquipmentIndex + 1} / {equipmentImages.length}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .project-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        /* Back Arrow */
        .back-arrow {
          font-size: 1rem;
          color: #104827;
          cursor: pointer;
          margin-bottom: 20px;
          display: inline-block;
        }

        .back-arrow:hover {
          text-decoration: underline;
        }

        /* Title */
        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        /* Image */
        .image-container {
          margin-bottom: 20px;
        }

        /* Meta Data */
        .meta p {
          margin: 5px 0;
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
        }

        /* Description */
        .description {
          margin: 20px 0;
          color: #333;
          line-height: 1.6;
        }

        /* Slideshows */
        .slideshows {
          margin-top: 20px;
        }

        .slideshow-section {
          margin-bottom: 40px;
        }

        .slideshow-section h3 {
          margin-bottom: 10px;
        }

        .slideshow {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .nav-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          transition: transform 0.2s;
        }

        .nav-button:hover {
          transform: scale(1.1);
        }

        /* Disable nav-button when disabled */
        .nav-button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .arrow {
          display: inline-block;
          width: 20px; /* Adjust size */
          height: 20px; /* Adjust size */
          border-top: 3px solid #104827;
          border-right: 3px solid #104827;
          border-radius: 3px; /* Rounded ends */
          transform: rotate(45deg);
        }

        .arrow.left {
          transform: rotate(-135deg);
        }

        .arrow.right {
          transform: rotate(45deg);
        }

        .arrow.left,
        .arrow.right {
          transition: border-color 0.2s;
        }

        .nav-button:hover .arrow {
          border-color: #0d3a1f;
        }

        /* Indicator Styles */
        .indicator {
          text-align: center;
          margin-top: 10px;
          color: #555;
        }
      `}</style>
    </Layout>
  );
}
// pages/travel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const MapChart = dynamic(() => import('../../components/MapChart'), {
  ssr: false,
});

interface Destination {
  name: string;
  emoji: string;
  images: string[];
  description: string;
  coordinates: [number, number];
}

export default function TravelPage() {
  const currentPath = usePathname() ?? '';

  const destinations: Destination[] = [
    {
      name: 'Paris',
      emoji: '🇫🇷',
      images: [
        '/images/travel/paris/paris1.jpg',
        '/images/travel/paris/paris2.jpg',
        '/images/travel/paris/paris3.jpg',
      ],
      description: 'I visited Paris and loved the Eiffel Tower.',
      coordinates: [2.3522, 48.8566],
    },
    {
      name: 'Tokyo',
      emoji: '🇯🇵',
      images: [
        '/images/travel/tokyo/tokyo1.jpg',
        '/images/travel/tokyo/tokyo2.jpg',
        '/images/travel/tokyo/tokyo3.jpg',
      ],
      description: 'Exploring Tokyo was an amazing experience.',
      coordinates: [139.6917, 35.6895],
    },
    {
      name: 'New York',
      emoji: '🗽',
      images: [
        '/images/travel/newyork/ny1.jpg',
        '/images/travel/newyork/ny2.jpg',
        '/images/travel/newyork/ny3.jpg',
      ],
      description: 'The energy of New York City is unmatched.',
      coordinates: [-74.006, 40.7128],
    },
  ];

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const destinationsWithOnClick = destinations.map((dest) => ({
    ...dest,
    onClick: () => setSelectedDestination(dest),
  }));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Layout currentPath={currentPath}>
      <div className="travel-page">
        <div className="map-container">
          <MapChart destinations={destinationsWithOnClick} />
        </div>

        {selectedDestination && (
          <div className="modal-overlay" onClick={() => setSelectedDestination(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedDestination(null)}>
                &times;
              </button>
              <h2>{selectedDestination.name}</h2>
              <p>{selectedDestination.description}</p>
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
              >
                {selectedDestination.images.map((imgSrc, index) => (
                  <div key={index}>
                    <Image
                      src={imgSrc}
                      alt={`${selectedDestination.name} Image ${index + 1}`}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .travel-page {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .map-container {
          width: 90vw; /* Slight padding on left and right */
          height: 110vh; /* Adjust height for top/bottom padding */
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        @media (max-width: 600px) {
          .modal-content {
            width: 95%;
          }
        }
      `}</style>
    </Layout>
  );
}

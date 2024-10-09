// pages/travel.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

interface Destination {
  name: string;
  emoji: string;
  images: string[];
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export default function TravelPage() {
  const currentPath = usePathname() ?? '';

  // Define your destinations with coordinates, images, and descriptions
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
    // Add more destinations as needed
  ];

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <Layout currentPath={currentPath}>
      {/* Travel Page Container */}
      <div className="travel-page">
        {/* Map Container */}
        <div className="map-container">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography="/world-110m.json">
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                  />
                ))
              }
            </Geographies>

            {/* Markers */}
            {destinations.map((dest) => (
              <Marker
                key={dest.name}
                coordinates={dest.coordinates}
                onClick={() => setSelectedDestination(dest)}
              >
                <text
                  textAnchor="middle"
                  style={{ fontFamily: 'sans-serif', fontSize: 24 }}
                >
                  {dest.emoji}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Modal Popup */}
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

      {/* CSS Styles */}
      <style jsx>{`
        .travel-page {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 60px); /* Adjust based on your header/footer height */
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }
        .map-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
        /* Modal Popup */
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
        /* Responsive Adjustments */
        @media (max-width: 600px) {
          .modal-content {
            width: 95%;
          }
        }
      `}</style>
    </Layout>
  );
}

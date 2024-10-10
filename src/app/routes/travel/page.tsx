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
      name: 'Oahu, Hawaii',
      emoji: '🏝️',
      images: [
        '/images/travel/oahu/oahu1.png',
        '/images/travel/oahu/oahu2.png',
        '/images/travel/oahu/oahu3.png',
      ],
      description:
        'In 2017, I traveled with my family to the beautiful island of Oahu, Hawaii, to referee an AYSO soccer tournament. It was an incredible experience filled with exciting soccer matches and relaxing beach time amidst the stunning Hawaiian scenery.',
      coordinates: [-157.8489, 21.3069],
    },
    {
      name: 'San Francisco, California',
      emoji: '🌉',
      images: [
        '/images/travel/sanfrancisco/sanfrancisco1.png',
        '/images/travel/sanfrancisco/sanfrancisco2.png',
        '/images/travel/sanfrancisco/sanfrancisco3.JPG',
      ],
      description:
        'San Francisco, California, is my birthplace and a city that holds a special place in my heart. I frequently travel back to visit family and cherish the memories and vibrant culture this city offers.',
      coordinates: [-122.4194, 37.7749],
    },
    {
      name: 'Zermatt, Switzerland',
      emoji: '🏔️',
      images: [
        '/images/travel/zermatt/zermatt1.png',
        '/images/travel/zermatt/zermatt2.png',
        '/images/travel/zermatt/zermatt3.png',
      ],
      description:
        'Zermatt, Switzerland, is a cherished family destination spanning generations. Visiting during the summer, we enjoy hiking and the warm weather in the breathtaking Alps, creating unforgettable memories amidst majestic peaks.',
      coordinates: [7.7491, 46.0207],
    },
    {
      name: 'Orlando, Florida',
      emoji: '🏰',
      images: [
        '/images/travel/orlando/orlando1.JPG',
        '/images/travel/orlando/orlando2.JPG',
        '/images/travel/orlando/orlando3.JPG',
      ],
      description:
        'In 2019, my family and I visited Orlando, Florida, where we had a magical time exploring Disney World and the wonders of Epcot.',
      coordinates: [-81.3792, 28.5383],
    },
    {
      name: 'Vail, Colorado',
      emoji: '⛰️',
      images: [
        '/images/travel/vail/vail1.png',
        '/images/travel/vail/vail2.png',
        '/images/travel/vail/vail3.png',
      ],
      description:
        'In the summer of 2020, my family and I drove to Vail, Colorado, to hike and immerse ourselves in the beauty of the mountains. Sharing outdoor adventures in such breathtaking landscapes is a cherished family tradition.',
      coordinates: [-106.3742, 39.6403],
    },
    {
      name: 'Pentwater, Michigan',
      emoji: '🎣',
      images: [
        '/images/travel/pentwater/pentwater1.JPG',
        '/images/travel/pentwater/pentwater2.png',
        '/images/travel/pentwater/pentwater3.png',
      ],
      description:
        'Pentwater, Michigan, is a frequent getaway destination with friends for camping, fishing, and enjoying the outdoors, conveniently close to Chicago.',
      coordinates: [-86.4337, 43.7814],
    },
    {
      name: 'Lake Tahoe, California',
      emoji: '🏞️',
      images: [
        '/images/travel/laketahoe/laketahoe1.png',
        '/images/travel/laketahoe/laketahoe2.png',
        '/images/travel/laketahoe/laketahoe3.png',
      ],
      description:
        'In 2021, my family gathered at Lake Tahoe, California, for a memorable reunion amidst the stunning mountain scenery. It was a wonderful time reconnecting with relatives in such a beautiful setting, especially after covid.',
      coordinates: [-120.0435, 39.0968],
    },
    {
      name: 'Naples, Italy',
      emoji: '🍕',
      images: [
        '/images/travel/naples/naples1.png',
        '/images/travel/naples/naples2.png',
        '/images/travel/naples/naples3.png',
      ],
      description:
        'In 2022, I embarked on my first solo international trip to Naples, Italy. It was an exhilarating experience staying in hostels, savoring the delicious cuisine, and relaxing on the beautiful beaches.',
      coordinates: [14.2681, 40.8518],
    },
    {
      name: 'Corfu, Greece',
      emoji: '🏖️',
      images: [
        '/images/travel/corfu/corfu1.png',
        '/images/travel/corfu/corfu2.png',
        '/images/travel/corfu/corfu3.JPG',
      ],
      description:
        'Following my time in Italy in 2022, I spent a few days on the picturesque island of Corfu, Greece. Despite falling ill on the journey there, I managed to explore the city and enjoy the stunning beaches, albeit for a shorter time than planned.',
      coordinates: [19.9223, 39.6243],
    },
    {
      name: 'Ljubljana, Slovenia',
      emoji: '🏰',
      images: [
        '/images/travel/ljubljana/ljubljana1.png',
        '/images/travel/ljubljana/ljubljana2.png',
        '/images/travel/ljubljana/ljubljana3.png',
      ],
      description:
        'Meeting my family in Ljubljana, Slovenia, in 2022 was a deeply meaningful experience. As the homeland of my great-great-grandparents on my mother\'s side, exploring the city\'s beauty and connecting with my heritage was truly special.',
      coordinates: [14.5058, 46.0569],
    },
    {
      name: 'Chamonix, France',
      emoji: '🎿',
      images: [
        '/images/travel/chamonix/chamonix1.png',
        '/images/travel/chamonix/chamonix2.png',
        '/images/travel/chamonix/chamonix3.png',
      ],
      description:
        'In 2023, I met up with my college friends studying abroad in Chamonix, France, for a thrilling ski trip. Trading my snowboard for skis for the first time, we braved the wild weather and had an unforgettable adventure.',
      coordinates: [6.8694, 45.9237],
    },
    {
      name: 'Barcelona, Spain',
      emoji: '🕺',
      images: [
        '/images/travel/barcelona/barcelona1.png',
        '/images/travel/barcelona/barcelona2.png',
        '/images/travel/barcelona/barcelona3.png',
      ],
      description:
        'Continuing my 2023 journey, I visited Barcelona, Spain, to reunite with friends living there. The vibrant nightlife and charming streets provided the perfect backdrop for making new friends and unforgettable memories.',
      coordinates: [2.1734, 41.3851],
    },
    {
      name: 'Vienna, Austria',
      emoji: '🎻',
      images: [
        '/images/travel/vienna/vienna1.png',
        '/images/travel/vienna/vienna2.png',
        '/images/travel/vienna/vienna3.png',
      ],
      description:
        'Following my time in Spain in 2023, I traveled to Vienna, Austria, to meet more friends. Revisiting this beautiful city as an adult allowed me to appreciate its rich history and culture anew.',
      coordinates: [16.3738, 48.2082],
    },
    {
      name: 'Moab, Utah',
      emoji: '🏜️',
      images: [
        '/images/travel/moab/moab1.png',
        '/images/travel/moab/moab2.png',
        '/images/travel/moab/moab3.JPG',
      ],
      description:
        'In the summer of 2023, my two old friends and I embarked on a road trip from Chicago to Moab, Utah. Despite my car breaking down three times, the journey led us to one of the most breathtaking landscapes I\'ve ever seen.',
      coordinates: [-109.5498, 38.5733],
    },
    {
      name: 'Las Vegas, Nevada',
      emoji: '🎰',
      images: [
        '/images/travel/lasvegas/lasvegas1.png',
        '/images/travel/lasvegas/lasvegas2.png',
        '/images/travel/lasvegas/lasvegas3.jpeg',
      ],
      description:
        'In the fall of 2023, I joined my fraternity brothers on a cross-country drive to Las Vegas, Nevada. The road trip through mountains and desert was an adventure in itself, culminating in an exciting group trip in the vibrant city.',
      coordinates: [-115.1398, 36.1699],
    },
    {
      name: 'Puerto Vallarta, Mexico',
      emoji: '🌮',
      images: [
        '/images/travel/puertovallarta/puertovallarta1.png',
        '/images/travel/puertovallarta/puertovallarta2.png',
        '/images/travel/puertovallarta/puertovallarta3.JPG',
      ],
      description:
        'During the spring of my college graduating semester in 2024, I visited Puerto Vallarta, Mexico, with friends. We stayed in an Airbnb, immersing ourselves in the local culture and savoring the delicious cuisine.',
      coordinates: [-105.2345, 20.6534],
    },
    {
      name: 'Seoul, South Korea',
      emoji: '🍖',
      images: [
        '/images/travel/seoul/seoul1.JPG',
        '/images/travel/seoul/seoul2.png',
        '/images/travel/seoul/seoul3.png',
      ],
      description:
        'After graduating in May 2024, my friends and I embarked on a month-long trip to Asia, starting in Seoul, South Korea. As a lover of Korean BBQ, Seoul quickly became a favorite with its incredible food and vibrant culture.',
      coordinates: [126.9780, 37.5665],
    },
    {
      name: 'Ha Long Bay, Vietnam',
      emoji: '🚣',
      images: [
        '/images/travel/halongbay/halongbay1.png',
        '/images/travel/halongbay/halongbay2.png',
        '/images/travel/halongbay/halongbay3.png',
      ],
      description:
        'Following our time in Korea, we traveled to Ha Long Bay, Vietnam. The experience was a profound culture shock that left me grateful for the amazing people I met, the friendships formed, and the invaluable perspectives gained in this beautiful country.',
      coordinates: [107.0822, 20.9101],
    },
    {
      name: 'Tokyo, Japan',
      emoji: '🗼',
      images: [
        '/images/travel/tokyo/tokyo1.png',
        '/images/travel/tokyo/tokyo2.png',
        '/images/travel/tokyo/tokyo3.png',
      ],
      description:
        'We concluded our Asian adventure in Tokyo, Japan. The city\'s dynamic energy and captivating culture made it an incredible place that I look forward to visiting again soon.',
      coordinates: [139.6917, 35.6895],
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
                      width={600}
                      height={400}
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
          width: 90vw;
          height: 110vh;
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
          max-width: 600px;
          width: 80%;
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

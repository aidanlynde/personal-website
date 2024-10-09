// src/app/components/MapChart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

interface Destination {
  name: string;
  emoji: string;
  coordinates: [number, number]; // [longitude, latitude]
  onClick: () => void;
}

interface MapChartProps {
  destinations: Destination[];
}

const MapChart: React.FC<MapChartProps> = ({ destinations }) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('/world-110m.json')
      .then((response) => response.json())
      .then((worldData) => {
        const { feature } = require('topojson-client');
        const geoData = feature(
          worldData,
          worldData.objects.countries
        ).features;
        setGeoData(geoData);
      });
  }, []);

  if (!geoData) {
    return <div>Loading map...</div>;
  }

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      width={800}
      height={400}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={geoData}>
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
          onClick={dest.onClick}
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
  );
};

export default MapChart;

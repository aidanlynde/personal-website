// src/app/components/MapChart.tsx
'use client';

import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { NavigationControl } from 'react-map-gl';

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
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 1.5,
  });

  return (
    <Map
      initialViewState={{
        ...viewport,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      style={{ width: '100%', height: '400px' }}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {destinations.map((dest) => (
        <Marker
          key={dest.name}
          longitude={dest.coordinates[0]}
          latitude={dest.coordinates[1]}
          onClick={dest.onClick}
        >
          <div style={{ fontSize: '24px' }}>{dest.emoji}</div>
        </Marker>
      ))}
      <NavigationControl position="top-left" />
    </Map>
  );
};

export default MapChart;

// src/app/components/MapChart.tsx
'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useRef } from 'react';
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl';

interface Destination {
  name: string;
  emoji: string;
  coordinates: [number, number];
  onClick: () => void;
}

interface MapChartProps {
  destinations: Destination[];
}

const MapChart: React.FC<MapChartProps> = ({ destinations }) => {
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    zoom: 1,
  });
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const selectedDestination = destinations.find((dest) => dest.name === showPopup);

  // Create a ref to access the map instance
  const mapRef = useRef<MapRef>(null);

  // Function to handle map load event (currently unused)
  const handleMapLoad = () => {
    // Future use case for accessing the map instance after load
  };

  return (
    <div style={{ width: '85vw', height: '85vh', margin: '0 auto' }}>
      <Map
        ref={mapRef}
        initialViewState={{ ...viewport }}
        mapStyle="mapbox://styles/aidanlynde/cm23trh5i00do01p3fe7o6ocy"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        onMove={(evt) => setViewport(evt.viewState)}
        onLoad={handleMapLoad} // Map load handler
      >
        {destinations.map((dest) => (
          <Marker
            key={dest.name}
            longitude={dest.coordinates[0]}
            latitude={dest.coordinates[1]}
            onClick={() => {
              dest.onClick();
              setShowPopup(dest.name);
            }}
          >
            <button className="marker-button">{dest.emoji}</button>
          </Marker>
        ))}

        {selectedDestination && selectedDestination.coordinates && (
          <Popup
            longitude={selectedDestination.coordinates[0]}
            latitude={selectedDestination.coordinates[1]}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setShowPopup(null)}
          >
            <div>{selectedDestination.name}</div>
          </Popup>
        )}

        <NavigationControl position="top-left" style={{ padding: '10px', marginTop: '40px' }} />

        <style jsx>{`
          .marker-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            outline: none;
            transition: transform 0.2s ease;
          }

          .marker-button:hover {
            transform: scale(1.2);
          }
        `}</style>
      </Map>
    </div>
  );
};

export default MapChart;

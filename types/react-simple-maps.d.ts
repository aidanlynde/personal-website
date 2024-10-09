// types/react-simple-maps.d.ts

declare module 'react-simple-maps' {
    import React from 'react';
  
    interface ComposableMapProps {
      projection?: string;
      projectionConfig?: object;
      width?: number;
      height?: number;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    }
  
    export const ComposableMap: React.FC<ComposableMapProps>;
  
    interface GeographiesProps {
      geography: any;
      children: (props: { geographies: any[]; projection: any }) => React.ReactNode;
    }
  
    export const Geographies: React.FC<GeographiesProps>;
  
    interface GeographyProps {
      geography: any;
      fill?: string;
      stroke?: string;
      style?: React.CSSProperties;
    }
  
    export const Geography: React.FC<GeographyProps>;
  
    interface MarkerProps {
      coordinates: [number, number];
      style?: React.CSSProperties;
      children?: React.ReactNode;
      onClick?: () => void;
    }
  
    export const Marker: React.FC<MarkerProps>;
  
    // Add other exports if you use more components from the library
  }
  
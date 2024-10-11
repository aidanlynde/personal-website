// pages/_app.js

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css'; // Ensure your global CSS loads here
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  // Preload fonts and remove FOUC
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Head>
        <title>Aidan Lynde | Software Developer</title> {/* Set the default title */}
        <link rel="icon" href="/favicon.ico" /> {/* Set the favicon */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

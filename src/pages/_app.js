// pages/_app.js

import '../styles/globals.css'; // Ensure your global CSS loads here
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Preload fonts and remove FOUC
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

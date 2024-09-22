import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <style>{`
          /* Critical CSS */
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 50px 20px;
            font-family: 'Montserrat', sans-serif;
          }

          .profile-section {
            text-align: center;
          }

          .profile-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
          }

          .profile-picture {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
          }

          .profile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .name-icons {
            text-align: left;
          }

          .name {
            font-size: 2.2rem;
            font-weight: bold;
            margin: 0 0 20px 0;
          }

          .icon-links {
            display: flex;
            gap: 10px;
          }

          .icon img {
            filter: grayscale(100%);
            transition: filter 0.2s;
          }

          .icon:hover img {
            filter: grayscale(0%);
          }

          .description {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 30px;
            text-align: center;
          }

          .buttons-section {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 30px;
            margin-bottom: 30px;
          }

          a.button {
            background-color: #e0e0e0;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
            font-size: 1rem;
            font-weight: 500;
            transition: background-color 0.3s ease, color 0.3s ease;
            display: inline-block;
          }

          a.button:hover {
            background-color: #104827;
            color: #fff;
          }

          footer {
            font-size: 0.8rem;
            color: #aaa;
            margin-top: 50px;
          }
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


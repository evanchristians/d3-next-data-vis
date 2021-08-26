import Head from "next/head";
import "tailwindcss/tailwind.css";
import "rc-slider/assets/index.css";
import "../styles/main.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }) {
  return (
    <main className="text-gray-900">
      <Head>
        <link
          rel="shortcut icon"
          href="https://evanchristians.co.za/favicon.ico"
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="max-w-screen-2xl mx-auto">
        <Component {...pageProps} />
      </div>
      <footer className="bg-black py-4 text-center text-xs text-white">
        &copy; evanchristians {new Date().getFullYear()}
      </footer>
    </main>
  );
}

export default MyApp;

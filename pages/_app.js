import "@/styles/globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
     <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KSJ9FSNXWZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KSJ9FSNXWZ');
        `}
      </Script>
    <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>
  );
}

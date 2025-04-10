import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import { initErrorTracking, reportWebVitals } from "../lib/monitoring";
import { useEffect } from "react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bible Operating System (BOS)",
  description: "A comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible",
  keywords: ["Bible", "King James Version", "KJV", "Bible Study", "Christian", "Evangelical", "Scripture"],
  authors: [{ name: "BOS Team" }],
  creator: "BOS Team",
  publisher: "BOS",
  openGraph: {
    title: "Bible Operating System (BOS)",
    description: "A comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bible-os.com",
    siteName: "Bible Operating System",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bible Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Operating System (BOS)",
    description: "A comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bible-os.com"),
};

export function reportWebVitalsCallback(metric: any) {
  reportWebVitals(metric);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize error tracking
  useEffect(() => {
    initErrorTracking();
  }, []);

  return (
    <html lang="en">
      <GoogleAnalytics />
      <Script
        id="error-monitoring-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.onerror = function(message, source, lineno, colno, error) {
              console.error('Global error:', message, error);
              return false;
            };
          `,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

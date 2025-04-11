"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { initErrorTracking } from "../../lib/monitoring";
import GoogleAnalytics from "../analytics/GoogleAnalytics";
import { AuthProviders } from "../../context/AuthContext";

interface ClientLayoutProps {
  children: React.ReactNode;
  geistSansVariable: string;
  geistMonoVariable: string;
}

export default function ClientLayout({
  children,
  geistSansVariable,
  geistMonoVariable,
}: ClientLayoutProps) {
  // Initialize error tracking
  useEffect(() => {
    initErrorTracking();
  }, []);

  return (
    <html lang="en">
      <head>
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
        <Script
          id="puter-js"
          src="https://js.puter.com/v2/"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSansVariable} ${geistMonoVariable} antialiased`}
      >
        <AuthProviders>
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}

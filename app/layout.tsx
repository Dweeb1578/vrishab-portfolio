import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vrishab Nair | GTM Engineer & AI Builder",
    template: "%s | Vrishab Nair"
  },
  description: "Vrishab Nair is a GTM engineer who builds revenue systems as software. Founding GTM engineer at SpeechifyAI, where he shipped six production agents, an approval-first inbound service and two open-source TTS integrations. Navigate an interactive spatial portfolio and ask its AI anything.",
  keywords: ["Vrishab Nair", "GTM Engineer", "GTM engineering", "AI tooling", "RAG", "MCP server", "automation", "AI Builder", "Portfolio", "SpeechifyAI", "BITS Pilani"],
  authors: [{ name: "Vrishab Nair" }],
  creator: "Vrishab Nair",
  metadataBase: new URL("https://vrishab-portfolio.vercel.app"),
  openGraph: {
    title: "Vrishab Nair | GTM Engineer & AI Builder",
    description: "An interactive spatial portfolio you navigate by asking. Built around the AI tooling, RAG systems, and automation I ship.",
    url: "https://vrishab-portfolio.vercel.app",
    siteName: "Vrishab Nair Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrishab Nair | GTM Engineer & AI Builder",
    description: "An interactive spatial portfolio you navigate by asking. Built around the AI tooling, RAG systems, and automation I ship.",
    creator: "@vrishabnair",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vrishab Nair",
  url: "https://vrishab-portfolio.vercel.app",
  jobTitle: "GTM Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BITS Pilani, Hyderabad Campus"
  },
  sameAs: [
    "https://www.linkedin.com/in/vrishab-nair-212769290/",
    "https://github.com/Dweeb1578"
  ],
  description: "GTM engineer who builds revenue systems as software: agents, inbound services, and open-source integrations that automate go-to-market work."
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var s=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&s)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="TJsxKoosBc9gO5kT6fXTjcursYtQFtSWAD2Qfl9ZNgs" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} crt-scanlines antialiased bg-[#040a06] text-[#cdf6d6]`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E81HYB5075"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E81HYB5075');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

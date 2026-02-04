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
    default: "Vrishab Nair | Product Manager & Engineer",
    template: "%s | Vrishab Nair"
  },
  description: "Portfolio of Vrishab Nair, a Product Manager and Engineer specializing in AI, RAG pipelines, and Growth from BITS Pilani.",
  keywords: ["Vrishab Nair", "Product Manager", "AI Engineer", "RAG", "BITS Pilani", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Vrishab Nair" }],
  creator: "Vrishab Nair",
  metadataBase: new URL("https://vrishab-portfolio.vercel.app"),
  openGraph: {
    title: "Vrishab Nair | Product Manager & Engineer",
    description: "Building intelligent products at the intersection of AI, Design, and Growth.",
    url: "https://vrishab-portfolio.vercel.app",
    siteName: "Vrishab Nair Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrishab Nair | Product Manager & Engineer",
    description: "Building intelligent products at the intersection of AI, Design, and Growth.",
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
  jobTitle: "Product Manager & Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BITS Pilani, Hyderabad Campus"
  },
  sameAs: [
    "https://www.linkedin.com/in/vrishab-nair-212769290/",
    "https://github.com/Dweeb1578"
  ],
  worksFor: {
    "@type": "Organization",
    name: "Pinch"
  },
  description: "Product Manager and Engineer specializing in AI, RAG pipelines, and Growth metrics."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <meta name="google-site-verification" content="TJsxKoosBc9gO5kT6fXTjcursYtQFtSWAD2Qfl9ZNgs" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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

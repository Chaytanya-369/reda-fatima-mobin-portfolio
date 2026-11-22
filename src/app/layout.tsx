import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { site, contact, SITE_URL } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MotionDirector from "@/components/MotionDirector";
import Cursor from "@/components/Cursor";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono", display: "swap", preload: false });

const hasDomain = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: ["Reda Fatima Mobin", "filmmaker", "documentary", "screenwriter", "director", "photography", "social media strategy", "journalism", "ISB"],
  alternates: hasDomain ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Reda Fatima Mobin — Filmmaker, Screenwriter & Creative Strategist" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og-image.jpg"] },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#110f0e",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  email: `mailto:${contact.email}`,
  jobTitle: site.role,
  worksFor: { "@type": "CollegeOrUniversity", name: site.organisation },
  alumniOf: { "@type": "CollegeOrUniversity", name: "AJK Mass Communication Research Centre, Jamia Millia Islamia" },
  knowsAbout: ["Documentary filmmaking", "Screenwriting", "Film direction", "Photography", "Social media marketing", "Journalism"],
  sameAs: [contact.linkedin, contact.instagram],
};

/* Runs before paint: enables motion styles only when motion is allowed, with a
   fail-safe that reveals everything if the animation layer never initialises. */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},3500)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        <MotionDirector />
        <Cursor />
        <Nav />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}

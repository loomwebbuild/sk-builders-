import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import PageTransitionProvider from '@/components/PageTransitionProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import Preloader from '@/components/Preloader';
import { BUSINESS_INFO } from '@/lib/constants';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const baseUrl = process.env.APP_URL || 'https://skbuildershyderabad.com';

export const viewport: Viewport = {
  themeColor: '#141414',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Villas and Plots in Hyderabad | SK Builders',
    template: '%s | SK Builders',
  },
  description:
    'Creating Spaces for Better Life. Villas, residential developments, independent homes, and plotted developments in Hyderabad by SK Builders.',
  keywords: [
    'SK Builders',
    'Real Estate Developer Hyderabad',
    'Villas in Hyderabad',
    'Residential Hyderabad',
    'Independent Homes Hyderabad',
    'Plotted Developments Hyderabad',
    'Luxury Villas Hyderabad',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Villas and Plots in Hyderabad | SK Builders',
    description:
      'Creating Spaces for Better Life. Villas, residential developments, independent homes, and plotted developments in Hyderabad by SK Builders.',
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'SK Builders',
    images: [
      {
        url: '/images/hero_luxury_villa_1792826581975.jpg',
        width: 1200,
        height: 675,
        alt: 'SK Builders Luxury Villa Architecture in Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villas and Plots in Hyderabad | SK Builders',
    description:
      'Creating Spaces for Better Life. Villas, residential developments, independent homes, and plotted developments in Hyderabad by SK Builders.',
    images: ['/images/hero_luxury_villa_1792826581975.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org LocalBusiness + RealEstateAgent structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    name: BUSINESS_INFO.name,
    description:
      'Creating Spaces for Better Life. Villas, residential developments, independent homes, and plotted developments in Hyderabad by SK Builders.',
    telephone: '+917666643433',
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    sameAs: [
      BUSINESS_INFO.facebookUrl,
      BUSINESS_INFO.instagramUrl,
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#fbfbf9] text-[#141414] antialiased selection:bg-[#5b6748] selection:text-white" suppressHydrationWarning>
        <Preloader />
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileStickyBar />
            </div>
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

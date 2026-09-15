import type { Metadata } from "next";
import { Gabarito, Hanken_Grotesk } from "next/font/google";
import { site, siteUrl } from "@/site.config";
import { organizationSchema } from "@/lib/schema";
import { Analytics } from "@/components/analytics";
import "./globals.css";

// Gabarito nos títulos (sem serifa encorpada e simpática), Hanken Grotesk no texto.
const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const title = `${site.name} · ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${gabarito.variable} ${hanken.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

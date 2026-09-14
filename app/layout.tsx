import type { Metadata } from "next";
import { Gabarito, Hanken_Grotesk } from "next/font/google";
import { site, siteUrl } from "@/site.config";
import { organizationSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileContactBar } from "@/components/mobile-contact-bar";
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
      {/* pb no mobile pra barra fixa de contato não cobrir o fim da página */}
      <body className="font-sans pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <MobileContactBar />
      </body>
    </html>
  );
}

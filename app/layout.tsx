import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./scene.css";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";

const siteUrl = "https://matheusdevstudio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MatheusDevStudio | Matheus Eduardo, desenvolvedor fullstack",
  description: "Sites e sistemas sob medida, da infraestrutura à tela. Conheça os trabalhos de Matheus Eduardo.",
  authors: [{ name: "Matheus Eduardo Mendonça Gomes" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "MatheusDevStudio",
    description: "Sites e sistemas sob medida, da infraestrutura à tela. Conheça os trabalhos de Matheus Eduardo.",
    images: ["/img/Logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MatheusDevStudio",
    description: "Sites e sistemas sob medida, da infraestrutura à tela. Conheça os trabalhos de Matheus Eduardo.",
    images: ["/img/Logo.jpg"],
  },
  icons: { icon: "/img/Logo.ico" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheus Eduardo Mendonça Gomes",
  jobTitle: "Desenvolvedor Fullstack",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270",
    "https://github.com/NewMatheusED",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

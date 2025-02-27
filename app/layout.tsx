import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Sólida Seguros | Mediação de Seguros Personalizados",
  description: "Há mais de 20 anos a oferecer soluções de seguros personalizadas para particulares e empresas. A sua tranquilidade é a nossa prioridade.",
  keywords: "seguros, mediação de seguros, seguros de vida, seguros automóvel, seguros empresariais, seguros habitação, seguros de acidentes",
  authors: [{ name: "Sólida Seguros" }],
  creator: "Sólida Seguros",
  publisher: "Sólida Seguros",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://solidaseguros.pt"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sólida Seguros | Mediação de Seguros Personalizados",
    description: "Há mais de 20 anos a oferecer soluções de seguros personalizadas para particulares e empresas. A sua tranquilidade é a nossa prioridade.",
    url: "https://solidaseguros.pt",
    siteName: "Sólida Seguros",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sólida Seguros - Mediação de Seguros",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sólida Seguros | Mediação de Seguros Personalizados",
    description: "Há mais de 20 anos a oferecer soluções de seguros personalizadas para particulares e empresas.",
    images: ["/twitter-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={roboto.className}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

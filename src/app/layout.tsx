import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { AdminDataProvider } from "@/context/AdminDataContext";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TERRA FIRMA | JDA Approved Residential Plots in Jaipur, Rajasthan",
  description:
    "Exclusive collection of 100% JDA approved residential plots, society patta properties, and investment land across prime growth corridors in Jaipur, Rajasthan. Demarcated plots measured in Gaj.",
  keywords: [
    "JDA approved plots",
    "Jaipur residential plots",
    "society patta plots Jaipur",
    "Jagatpura plots",
    "Ajmer road plots Jaipur",
    "Ring road Jaipur plots",
    "land in Jaipur Rajasthan",
    "RERA Rajasthan plots",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#121815] selection:bg-[#C8A870] selection:text-[#0A1D16] font-sans antialiased">
        <AdminDataProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Suspense fallback={<div className="h-16 bg-[#0A1D16]" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </AdminDataProvider>
      </body>
    </html>
  );
}

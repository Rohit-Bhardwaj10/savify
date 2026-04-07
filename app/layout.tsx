import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savify AI | Intelligent Expense Tracking",
  description: "Track your expenses, manage your budget, and get AI-powered insights with Savify AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-zinc-800 selection:text-zinc-100 bg-[#09090b] text-zinc-400`}
        >
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(39,39,42,0.4),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(24,24,27,0.4),_transparent_50%)] pointer-events-none -z-10" />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}


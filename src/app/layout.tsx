import type { Metadata, Viewport } from "next"; // Viewport import kiya
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Mobile Scaling fix karne ke liye viewport export karein
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Faheem's AI Project", // Aapka naam
  description: "Next.js Mobile Friendly AI Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        min-h-screen w-full overflow-x-hidden bg-background text-foreground`}
      >
        {/* 2. Content ko center aur responsive rakhne ke liye main container */}
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
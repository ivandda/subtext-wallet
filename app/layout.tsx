import type { Metadata } from "next";
import localFont from "next/font/local";
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

const typeMachine = localFont({
  src: "../public/fonts/Type Machine.ttf",
  variable: "--font-type-machine",
});

export const metadata: Metadata = {
  title: "Subtext Wallet",
  description: "A simple, intuitive wallet for Substrate-based chains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${typeMachine.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

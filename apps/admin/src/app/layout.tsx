import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminLayout from "@/components/AdminLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin | NusantaraTrip",
  description: "Admin Portal for NusantaraTrip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
      <body className="h-full">
         <AdminLayout>
           {children}
         </AdminLayout>
      </body>
    </html>
  );
}

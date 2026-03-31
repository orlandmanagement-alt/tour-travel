import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AdminLayout from "@/components/AdminLayout";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin Panel | NusantaraTrip",
  description: "Enterprise SaaS Travel Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased h-full`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="h-full">
         <AdminLayout>
           {children}
         </AdminLayout>
      </body>
    </html>
  );
}

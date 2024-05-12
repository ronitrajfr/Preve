import type { Metadata } from "next";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Preve",
  description: "One stop solution for Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/x-icon"
        href="https://preve.onrender.com/_next/image?url=%2Fpreve.png&w=64&q=75"
      ></link>
      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}

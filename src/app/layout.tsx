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
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://preve.onrender.com/_next/image?url=%2Fpreve.png&w=64&q=75"
        ></link>
        <meta property="twitter:url" content="https://preve.onrender.com" />
        <meta property="twitter:title" content="Preve" />
        <meta
          property="twitter:image"
          content="https://preve.onrender.com/_next/image?url=%2Fpreve.png&w=64&q=75"
        />
        <meta
          property="twitter:description"
          content="An Unofficial remake of vscode's website"
        />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="595" />
        <meta property="og:title" content="Visual Studio Code • Unofficial" />
        <meta property="og:image" content="/og-image.png" />
        <meta
          property="og:description"
          content="An one stop solution for Students"
        />
        <meta property="og:url" content="https://preve.onrender.com/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="595" />
      </head>

      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}

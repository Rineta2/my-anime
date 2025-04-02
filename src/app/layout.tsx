import "@/base/style/globals.css";

import { Inter } from "next/font/google";

import { ThemeProvider } from "@/utils/context/ThemeContext";

import { metadata } from "@/base/meta/Metadata";

import Pathname from "@/base/route/Pathname";

import Providers from "@/base/route/Provider";

const inter = Inter({ subsets: ["latin"] });

metadata.manifest = "/manifest.json";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Providers>
            <Pathname>
              {children}
            </Pathname>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

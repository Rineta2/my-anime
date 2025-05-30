import "@/base/style/globals.css";

import { inter } from "@/base/fonts/Fonts";

import { ThemeProvider } from "@/utils/context/ThemeContext";

import { metadata } from "@/base/meta/Metadata";

import Pathname from "@/base/router/Pathname";

import Providers from "@/base/router/Provider";

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

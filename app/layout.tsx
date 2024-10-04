import { Roboto_Mono, Outfit } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wannabe URL Shortener",
  description: "create short URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_mono.className} ${outfit.className} antialiased transition-all scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}

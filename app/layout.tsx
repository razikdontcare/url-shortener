import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}

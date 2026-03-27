import type { Metadata } from "next";
import { Noto_Serif, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "block",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400"],
  display: "block",
});

export const metadata: Metadata = {
  title: "岡潔の世界",
  description: "岡潔の言葉に浸る",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${notoSerifJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Índice Amazônia — a cotação da floresta em pé",
  description:
    "Açaí, castanha-do-pará, tambaqui, guaraná e madeira certificada como experiência de dados: uma jornada visual pelos preços regionais da Amazônia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-void text-mist">
        <div aria-hidden className="grain" />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

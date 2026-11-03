import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trent Kelly — The Science Beneath 22 Yards | TK Turf Services",
  description:
    "First-Class fast bowling intuition meets elite sports turf agronomy. Tournament consulting, drop-in wicket advisory, and cricket pitch engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f4f4f5] text-[#121212] font-sans selection:bg-[#ffdc50] selection:text-[#121212]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ActivePassageProvider } from "@/components/ActivePassageProvider";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reading Drills — Speed Reading Exercises",
  description:
    "Free, science-backed exercises to improve your reading speed. No sign-up required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink">
        <ThemeProvider>
          <ActivePassageProvider>{children}</ActivePassageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

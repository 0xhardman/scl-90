import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TestProvider } from "./context/TestContext";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCL-90 心理健康自评量表",
  description: "SCL-90心理健康自评量表是一种广泛应用于心理健康评估的量表，包含90个问题，涵盖90个常见症状，分为9个维度进行评估。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <TestProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </TestProvider>
      </body>
    </html>
  );
}

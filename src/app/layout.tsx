import { Suspense } from "react";
import BottomNavigation from "./_components/bottomNavigation";
import type { Metadata } from "next";
import "./globals.css";
import Loading from "./loading";
import AppQueryClientProvider from "./queryClientProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Unmute",
  description: "빠른 영어 학습을 위한 Unmute",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="sm:w-96">
        <AppQueryClientProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <BottomNavigation /> {/* 모바일에만 존재 */}
          <Analytics />
        </AppQueryClientProvider>
      </body>
    </html>
  );
}

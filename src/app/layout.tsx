import { Suspense } from "react";
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
      <body>
        <main className="relative m-auto w-96 h-full pb-16 overflow-x-hidden hide-scrollbar">
          <AppQueryClientProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Analytics />
          </AppQueryClientProvider>
        </main>
      </body>
    </html>
  );
}

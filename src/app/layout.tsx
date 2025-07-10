import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}

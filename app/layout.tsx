import { Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "../context/AppContext";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <Toaster />
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

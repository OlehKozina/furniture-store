import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getHeader, getFooter } from "@/sanity/sanity-utils";

import "./globals.css";

const rowdies = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  description: "Website for a local bakery",
  title: "Furniture Store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()]);

  return (
    <html lang="en">
      <body className={rowdies.className}>
        <Header header={header} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bếp Huế - Ẩm thực cung đình Huế chính gốc",
  description: "Khám phá hương vị truyền thống của ẩm thực cung đình Huế tại nhà hàng Bếp Huế. Nguyên liệu tươi ngon, công thức cổ truyền, không gian sang trọng.",
  keywords: ["Bếp Huế", "ẩm thực Huế", "nhà hàng Huế", "món Huế", "cung đình Huế"],
  openGraph: {
    title: "Bếp Huế - Ẩm thực cung đình Huế chính gốc",
    description: "Khám phá hương vị truyền thống của ẩm thực cung đình Huế",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

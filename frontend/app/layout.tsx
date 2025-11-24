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
  title: {
    default: "BepHue - Ẩm Thực Cung Đình Huế Chính Gốc",
    template: "%s | BepHue Restaurant",
  },
  description:
    "Khám phá hương vị truyền thống của ẩm thực cung đình Huế tại nhà hàng BepHue. Nguyên liệu tươi ngon, công thức cổ truyền, không gian sang trọng tại TP.HCM.",
  keywords: [
    "BepHue",
    "Bếp Huế",
    "ẩm thực Huế",
    "nhà hàng Huế",
    "món Huế",
    "cung đình Huế",
    "bún bò Huế",
    "bánh bèo",
    "bánh khoái",
    "nhà hàng TPHCM",
    "Vietnamese restaurant",
    "Hue cuisine",
  ],
  authors: [{ name: "BepHue Restaurant" }],
  creator: "BepHue Restaurant",
  publisher: "BepHue Restaurant",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BepHue - Ẩm Thực Cung Đình Huế Chính Gốc",
    description:
      "Khám phá hương vị truyền thống của ẩm thực cung đình Huế tại nhà hàng BepHue. Nguyên liệu tươi ngon, công thức cổ truyền.",
    url: "https://bephue.vn",
    siteName: "BepHue Restaurant",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BepHue Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BepHue - Ẩm Thực Cung Đình Huế Chính Gốc",
    description: "Khám phá hương vị truyền thống của ẩm thực cung đình Huế",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
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

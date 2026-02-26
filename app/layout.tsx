import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Tên hiển thị trên tab trình duyệt
  title: "An Sportify - Đặt Sân Bóng Đá",

  // Mô tả hiển thị khi chia sẻ link hoặc tìm kiếm trên Google
  description: "Tìm kiếm và đặt lịch sân thể thao trực tuyến nhanh chóng. Hệ thống đặt sân uy tín, giá tốt và nhiều ưu đãi.",

  // (Nâng cao) Thêm icon nếu bạn muốn đổi logo tam giác mặc định
  icons: {
    icon: '/logo.png', // File ảnh trong thư mục public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text-primary`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên Hệ - Địa Chỉ & Thông Tin',
  description:
    'Liên hệ với nhà hàng BepHue qua số điện thoại +84 28 1234 5678 hoặc ghé thăm tại 123 Nguyen Hue Street, District 1, HCMC. Mở cửa từ 10:00 - 22:00 hàng ngày.',
  keywords: [
    'liên hệ BepHue',
    'địa chỉ nhà hàng Huế',
    'số điện thoại BepHue',
    'contact',
    'địa chỉ Quận 1',
  ],
  openGraph: {
    title: 'Liên Hệ - BepHue Restaurant',
    description: 'Liên hệ đặt bàn và thông tin nhà hàng BepHue',
    url: 'https://bephue.vn/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

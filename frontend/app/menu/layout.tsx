import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thực Đơn - Món Ăn Huế Đặc Sắc',
  description:
    'Khám phá thực đơn đa dạng với các món ăn Huế đặc sắc: bún bò Huế, bánh bèo, bánh khoái, nem lụi và nhiều món ngon khác. Giá cả hợp lý, chất lượng đảm bảo.',
  keywords: [
    'thực đơn BepHue',
    'món Huế',
    'bún bò Huế',
    'bánh bèo',
    'bánh khoái',
    'nem lụi',
    'cơm hến',
    'ẩm thực Huế',
    'menu',
  ],
  openGraph: {
    title: 'Thực Đơn - BepHue Restaurant',
    description: 'Khám phá thực đơn món Huế đặc sắc tại BepHue',
    url: 'https://bephue.vn/menu',
    type: 'website',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

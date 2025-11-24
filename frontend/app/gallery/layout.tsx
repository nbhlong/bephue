import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thư Viện Ảnh - Không Gian & Món Ăn',
  description:
    'Khám phá không gian nhà hàng BepHue và các món ăn Huế đặc sắc qua bộ sưu tập hình ảnh chất lượng cao. Trải nghiệm trực quan trước khi đến quán.',
  keywords: [
    'hình ảnh BepHue',
    'không gian nhà hàng',
    'ảnh món ăn Huế',
    'gallery',
    'interior',
    'food photography',
  ],
  openGraph: {
    title: 'Thư Viện Ảnh - BepHue Restaurant',
    description: 'Khám phá không gian và món ăn tại BepHue qua hình ảnh',
    url: 'https://bephue.vn/gallery',
    type: 'website',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

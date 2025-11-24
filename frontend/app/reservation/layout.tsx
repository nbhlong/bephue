import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt Bàn - Reservation Online',
  description:
    'Đặt bàn trực tuyến tại nhà hàng BepHue. Đặt trước để đảm bảo chỗ ngồi tốt nhất, đặc biệt vào cuối tuần và giờ cao điểm. Nhận ưu đãi đặc biệt khi đặt trước 18:00.',
  keywords: [
    'đặt bàn BepHue',
    'reservation',
    'booking nhà hàng Huế',
    'đặt bàn online',
    'đặt chỗ',
  ],
  openGraph: {
    title: 'Đặt Bàn - BepHue Restaurant',
    description: 'Đặt bàn trực tuyến tại BepHue để đảm bảo chỗ ngồi tốt nhất',
    url: 'https://bephue.vn/reservation',
    type: 'website',
  },
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

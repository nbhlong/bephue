import Link from 'next/link';

export default function ReservationCTA() {
  return (
    <section className="bh-section relative overflow-hidden bg-bep-brown text-bep-cream animate-fade-in">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-bamboo-pattern" />
      </div>

      <div className="bh-container relative z-10 text-center">
        <div className="mx-auto flex w-20 h-20 items-center justify-center rounded-full bg-white/20 mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="mb-6 text-3xl font-heading font-semibold md:text-4xl">
          Đặt bàn ngay hôm nay
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-bep-cream-light">
          Trải nghiệm hương vị Huế đậm đà trong không gian ấm cúng. Đặt bàn để giữ chỗ và nhận ưu đãi đặc biệt.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/reservation" className="btn-primary-red text-base md:text-lg">
            Đặt Bàn Ngay
          </Link>
          <Link href="/menu" className="btn-outline-gold text-base md:text-lg">
            Xem Thực Đơn
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 text-bep-cream font-body sm:flex-row sm:gap-10">
          <a href="tel:+842812345678" className="flex items-center gap-2 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+84 28 1234 5678</span>
          </a>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Mở cửa: 10:00 - 22:00 (hàng ngày)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

export default function ReservationCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-bep-red to-bep-red-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-bamboo-pattern"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
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

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Đặt Bàn Ngay Hôm Nay
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-bep-cream-light mb-10 max-w-2xl mx-auto leading-relaxed font-body">
            Trải nghiệm hương vị Huế đặc sắc trong không gian ấm cúng.
            Đặt bàn ngay để nhận ưu đãi đặc biệt!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/reservation"
              className="inline-block bg-bep-cream text-bep-red font-bold px-10 py-5 rounded-bep-lg text-lg hover:bg-bep-cream-light transition-all duration-300 shadow-bep-xl transform hover:scale-105 border-2 border-bep-bamboo"
            >
              Đặt Bàn Ngay
            </Link>
            <Link
              href="/menu"
              className="inline-block bg-transparent border-2 border-bep-cream text-white font-bold px-10 py-5 rounded-bep-lg text-lg hover:bg-bep-cream hover:text-bep-red transition-all duration-300"
            >
              Xem Thực Đơn
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-bep-cream-light font-body">
            <a
              href="tel:+842812345678"
              className="flex items-center space-x-2 hover:text-white transition-colors"
            >
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
            <div className="flex items-center space-x-2">
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
              <span>Mở cửa: 10:00 - 22:00 (Hàng ngày)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

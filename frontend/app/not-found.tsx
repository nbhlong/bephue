import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-red-600 opacity-20">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Không Tìm Thấy Trang
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
          </p>
          <p className="text-lg text-gray-500">
            Có thể trang đã bị xóa hoặc đường dẫn không chính xác.
          </p>
        </div>

        {/* Decorative Icon */}
        <div className="flex justify-center mb-8">
          <svg
            className="w-24 h-24 text-red-600 opacity-50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Về Trang Chủ
          </Link>
          <Link
            href="/menu"
            className="inline-block bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300 border-2 border-gray-300"
          >
            Xem Thực Đơn
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500 mb-4">Các trang hữu ích:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/menu"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Thực đơn
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/about"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Về chúng tôi
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/gallery"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Hình ảnh
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/reservation"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Đặt bàn
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contact"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

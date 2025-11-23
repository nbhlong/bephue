'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitReservation } from '@/lib/api/strapi';

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Validation schema
const reservationSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100, 'Tên quá dài'),
  email: z.string().email('Email không hợp lệ'),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .regex(/^[0-9+\s-()]*$/, 'Số điện thoại không hợp lệ'),
  datetime: z.string().min(1, 'Vui lòng chọn ngày và giờ'),
  guests: z
    .number()
    .min(1, 'Số lượng khách phải ít nhất 1 người')
    .max(20, 'Vui lòng liên hệ trực tiếp cho nhóm trên 20 người'),
  notes: z.string().max(500, 'Ghi chú quá dài (tối đa 500 ký tự)').optional().or(z.literal('')),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function ReservationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const selectedDatetime = watch('datetime');
  const selectedGuests = watch('guests');

  const onSubmit: SubmitHandler<ReservationFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await submitReservation(data);

      // Format datetime for success message
      const datetime = new Date(data.datetime);
      const formattedDate = datetime.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = datetime.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setSubmitStatus({
        type: 'success',
        message: `Đặt bàn thành công! Chúng tôi đã ghi nhận đặt bàn cho ${data.guests} người vào ${formattedTime}, ${formattedDate}. Chúng tôi sẽ liên hệ xác nhận sớm nhất.`,
      });
      reset();
    } catch (error) {
      console.error('Reservation submission error:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại sau hoặc gọi điện trực tiếp: +84 28 1234 5678',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Đặt Bàn</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto">
            Đảm bảo chỗ ngồi tốt nhất cho bữa ăn của bạn
          </p>
        </div>
      </section>

      {/* Reservation Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Lưu ý khi đặt bàn
                  </h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Vui lòng đặt bàn trước ít nhất 2 giờ</li>
                    <li>• Chúng tôi sẽ giữ bàn trong 15 phút sau giờ đặt</li>
                    <li>• Với nhóm trên 10 người, vui lòng gọi điện trực tiếp</li>
                    <li>
                      • Đặt bàn trước 18:00 sẽ được ưu tiên chọn vị trí đẹp
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Thông Tin Đặt Bàn
              </h2>

              {/* Success/Error Message */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <p className="flex items-start">
                    {submitStatus.type === 'success' ? (
                      <svg
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span>{submitStatus.message}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Họ và tên <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.name
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.email
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                      errors.phone
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="0901234567"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Datetime and Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Datetime Field */}
                  <div>
                    <label
                      htmlFor="datetime"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Ngày và Giờ <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register('datetime')}
                      type="datetime-local"
                      id="datetime"
                      min={new Date().toISOString().slice(0, 16)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.datetime
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.datetime && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.datetime.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      Giờ mở cửa: 10:00 - 22:00 (T2-CN)
                    </p>
                  </div>

                  {/* Guests Field */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Số khách <span className="text-red-600">*</span>
                    </label>
                    <select
                      {...register('guests', { valueAsNumber: true })}
                      id="guests"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.guests
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {GUEST_OPTIONS.map((num) => (
                        <option key={num} value={num}>
                          {num} người
                        </option>
                      ))}
                      <option value="10+">10+ người (gọi điện)</option>
                    </select>
                    {errors.guests && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.guests.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes Field */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Ghi chú (không bắt buộc)
                  </label>
                  <textarea
                    {...register('notes')}
                    id="notes"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none ${
                      errors.notes
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="Yêu cầu đặc biệt, vị trí ưa thích, dị ứng thực phẩm..."
                  />
                  {errors.notes && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* Booking Summary */}
                {selectedDatetime && selectedGuests && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Thông tin đặt bàn
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="flex justify-between">
                        <span>Ngày và giờ:</span>
                        <span className="font-medium">
                          {new Date(selectedDatetime).toLocaleString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Số lượng khách:</span>
                        <span className="font-medium">
                          {selectedGuests} người
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    'Xác nhận đặt bàn'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Bằng việc đặt bàn, bạn đồng ý với{' '}
                  <a href="#" className="text-red-600 hover:underline">
                    điều khoản dịch vụ
                  </a>{' '}
                  của chúng tôi
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Cần hỗ trợ?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Liên hệ với chúng tôi để được hỗ trợ đặt bàn
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="tel:+842812345678"
                    className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
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
                    <span className="font-semibold">+84 28 1234 5678</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Ưu Điểm Khi Đặt Bàn Trước
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Đảm Bảo Chỗ Ngồi
                </h3>
                <p className="text-gray-600">
                  Không lo hết chỗ, đặc biệt vào cuối tuần và giờ cao điểm
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Tiết Kiệm Thời Gian
                </h3>
                <p className="text-gray-600">
                  Không cần chờ đợi, được phục vụ ngay khi đến
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Vị Trí Ưu Tiên
                </h3>
                <p className="text-gray-600">
                  Chọn vị trí đẹp, thoải mái theo sở thích
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Khám Phá Thực Đơn</h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Xem trước các món ăn đặc sắc của chúng tôi
          </p>
          <a
            href="/menu"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Xem Thực Đơn
          </a>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/lib/api/strapi';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100, 'Tên quá dài'),
  email: z.string().email('Email không hợp lệ'),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .regex(/^[0-9+\s-()]*$/, 'Số điện thoại không hợp lệ'),
  message: z
    .string()
    .min(10, 'Tin nhắn phải có ít nhất 10 ký tự')
    .max(1000, 'Tin nhắn quá dài (tối đa 1000 ký tự)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await submitContactForm(data);
      setSubmitStatus({
        type: 'success',
        message:
          'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
      });
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau hoặc gọi điện trực tiếp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bep-cream pt-20">
      {/* Hero Section */}
      <section className="bg-bep-brown text-bep-cream py-16 md:py-20">
        <div className="bh-container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-4">Liên Hệ</h1>
          <p className="text-lg md:text-xl text-bep-cream-light max-w-2xl mx-auto font-body">
            Chúng tôi rất mong được phục vụ bạn
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bh-section animate-fade-in">
        <div className="bh-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-bep-cream-light rounded-bep-xl shadow-bep-lg border border-bep-bamboo/20 p-8 md:p-10">
              <h2 className="text-3xl font-heading font-semibold text-bep-brown mb-6">
                Gửi Tin Nhắn
              </h2>

              {/* Success/Error Message */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-bep font-body ${
                    submitStatus.type === 'success'
                      ? 'bg-bep-herb-light/20 border border-bep-herb text-bep-herb-dark'
                      : 'bg-bep-red-light/20 border border-bep-red text-bep-red-dark'
                  }`}
                >
                  <p className="flex items-center">
                    {submitStatus.type === 'success' ? (
                      <svg
                        className="w-5 h-5 mr-2"
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
                        className="w-5 h-5 mr-2"
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
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold font-body text-bep-brown mb-2"
                  >
                    Họ và tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 border rounded-bep font-body focus:ring-2 focus:ring-bep-bamboo focus:border-bep-bamboo transition-all ${
                      errors.name
                        ? 'border-bep-red bg-bep-red-light/10'
                        : 'border-bep-bamboo/30 bg-bep-cream'
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-bep-red font-body">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold font-body text-bep-brown mb-2"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-bep font-body focus:ring-2 focus:ring-bep-bamboo focus:border-bep-bamboo transition-all ${
                      errors.email
                        ? 'border-bep-red bg-bep-red-light/10'
                        : 'border-bep-bamboo/30 bg-bep-cream'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-bep-red font-body">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold font-body text-bep-brown mb-2"
                  >
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 border rounded-bep font-body focus:ring-2 focus:ring-bep-bamboo focus:border-bep-bamboo transition-all ${
                      errors.phone
                        ? 'border-bep-red bg-bep-red-light/10'
                        : 'border-bep-bamboo/30 bg-bep-cream'
                    }`}
                    placeholder="0901234567"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-bep-red font-body">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold font-body text-bep-brown mb-2"
                  >
                    Tin nhắn <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none ${
                      errors.message
                        ? 'border-bep-red bg-bep-red-light/10'
                        : 'border-bep-bamboo/30 bg-bep-cream'
                    }`}
                    placeholder="Nội dung tin nhắn của bạn..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-bep-red font-body">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-red w-full py-4 px-6 disabled:bg-bep-brown-light disabled:cursor-not-allowed flex items-center justify-center"
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
                      Đang gửi...
                    </>
                  ) : (
                    'Gửi tin nhắn'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Info Card */}
              <div className="bg-bep-cream-light rounded-bep-xl shadow-bep-lg border border-bep-bamboo/20 p-8">
                <h2 className="text-3xl font-heading font-semibold text-bep-brown mb-6">
                  Thông Tin Liên Hệ
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-bep-red"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-bep-brown mb-1">
                        Địa chỉ
                      </h3>
                      <p className="text-bep-brown-light font-body">
                        123 Nguyen Hue Street
                        <br />
                        District 1, Ho Chi Minh City
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-bep-red"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-bep-brown mb-1">
                        Điện thoại
                      </h3>
                      <p className="text-bep-brown-light font-body">+84 28 1234 5678</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Thứ 2 - Chủ nhật: 10:00 - 22:00
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-bep-red"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-bep-brown mb-1">
                        Email
                      </h3>
                      <p className="text-bep-brown-light font-body">contact@bephue.vn</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-bep-red"
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
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-bep-brown mb-1">
                        Giờ mở cửa
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Thứ 2 - Thứ 5: 10:00 - 22:00</p>
                        <p>Thứ 6 - Thứ 7: 10:00 - 22:30</p>
                        <p>Chủ nhật: 09:00 - 22:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-bep-cream-light rounded-bep-xl shadow-bep-lg border border-bep-bamboo/20 p-8">
                <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-4">
                  Vị trí
                </h3>
                <div className="w-full h-64 bg-bep-cream rounded-bep flex items-center justify-center border border-bep-bamboo/20">
                  <div className="text-center text-bep-brown-light">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">Bản đồ Google Maps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bh-section bg-bep-brown text-bep-cream">
        <div className="bh-container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">Đặt Bàn Ngay</h2>
          <p className="text-lg mb-8 text-bep-cream-light max-w-2xl mx-auto font-body">
            Không cần chờ đợi, đặt bàn trước để có trải nghiệm tốt nhất
          </p>
          <a
            href="/reservation"
            className="btn-outline-gold inline-block text-lg"
          >
            Đặt Bàn Ngay
          </a>
        </div>
      </section>
    </main>
  );
}

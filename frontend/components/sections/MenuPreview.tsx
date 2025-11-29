import Link from 'next/link';
import Image from 'next/image';
import { getMenuItems } from '@/lib/api/strapi';
import { strapiBlocksToText } from '@/lib/api/strapi';
import type { StrapiTextBlock } from '@/types';

export default async function MenuPreview() {
  const menuData = await getMenuItems();

  const featuredItems = menuData?.data
    ?.filter((item) => item.featured)
    .slice(0, 6) || [];

  const displayItems =
    featuredItems.length >= 4 ? featuredItems : menuData?.data?.slice(0, 6) || [];

  if (!displayItems || displayItems.length === 0) {
    return null;
  }

  const getDescriptionText = (description: string | StrapiTextBlock[]): string => {
    if (typeof description === 'string') {
      return description.replace(/<[^>]*>/g, '');
    }
    return strapiBlocksToText(description);
  };

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <section className="bh-section bg-bep-cream animate-fade-in">
      <div className="bh-container">
        <div className="mb-12 text-center">
          <h2 className="bh-section-title">
            Thực đơn đặc sắc
          </h2>
          <p className="bh-section-subtitle">
            Khám phá những món Huế được chế biến chuẩn vị, chọn lọc nguyên liệu tươi mới mỗi ngày.
          </p>
          <div className="bh-section-underline" />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => {
            const imageUrl = item.image?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}${item.image?.url}`
              : '/resources/mockups/bun-hen.jpg';

            const description = getDescriptionText(item.description);

            return (
              <div
                key={item.id}
                className="group overflow-hidden rounded-bep-xl border-2 border-bep-bamboo/30 bg-bep-cream shadow-bep-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-bep-xl"
              >
                <div className="relative h-56 overflow-hidden bg-bep-cream-dark">
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-bep-red px-3 py-1 text-sm font-semibold text-white shadow-bep">
                      Đặc biệt
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-heading font-bold text-bep-brown">{item.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm font-body text-bep-brown">{description}</p>
                  <div className="flex items-center justify-between border-t border-bep-bamboo/30 pt-2">
                    <span className="text-2xl font-bold text-bep-red">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/menu" className="btn-primary-red text-lg">
            Xem Thực Đơn Đầy Đủ
          </Link>
        </div>
      </div>
    </section>
  );
}

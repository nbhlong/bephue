import Link from 'next/link';
import Image from 'next/image';
import { getMenuItems } from '@/lib/api/strapi';
import { strapiBlocksToText } from '@/lib/api/strapi';
import type { StrapiTextBlock } from '@/types';

export default async function MenuPreview() {
  const menuData = await getMenuItems();

  // Get featured items, or fallback to first 6 items
  const featuredItems = menuData?.data
    ?.filter((item) => item.featured)
    .slice(0, 6) || [];

  const displayItems = featuredItems.length >= 4
    ? featuredItems
    : menuData?.data?.slice(0, 6) || [];

  if (!displayItems || displayItems.length === 0) {
    return null;
  }

  // Helper function to get description text
  const getDescriptionText = (description: string | StrapiTextBlock[]): string => {
    if (typeof description === 'string') {
      return description.replace(/<[^>]*>/g, '');
    }
    return strapiBlocksToText(description);
  };

  // Helper function to format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-bep-brown mb-4">
            Thực Đơn Đặc Sắc
          </h2>
          <p className="text-lg md:text-xl text-bep-charcoal max-w-2xl mx-auto font-body">
            Khám phá những món ăn truyền thống Huế được chế biến từ công thức gia truyền
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayItems.map((item) => {
            const imageUrl = item.image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}${item.image.data.attributes.url}`
              : '/images/placeholder-dish.jpg';

            const description = getDescriptionText(item.description);

            return (
              <div
                key={item.id}
                className="group bg-bep-cream rounded-bep-xl overflow-hidden shadow-bep-lg hover:shadow-bep-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-bep-bamboo/30"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-bep-cream-dark">
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.featured && (
                    <div className="absolute top-4 right-4 bg-bep-red text-white px-3 py-1 rounded-full text-sm font-semibold shadow-bep">
                      Đặc biệt
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-bep-brown mb-2">
                    {item.name}
                  </h3>
                  <p className="text-bep-charcoal text-sm mb-4 line-clamp-2 font-body">
                    {description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-bep-bamboo/30">
                    <span className="text-2xl font-bold text-bep-red">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-block bg-bep-red hover:bg-bep-red-dark text-white font-bold px-8 py-4 rounded-bep-lg text-lg transition-all duration-300 shadow-bep-lg hover:shadow-bep-glow hover:scale-105"
          >
            Xem Thực Đơn Đầy Đủ
          </Link>
        </div>
      </div>
    </section>
  );
}

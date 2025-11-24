'use client';

import Image from 'next/image';
import { getStrapiImageUrl, strapiBlocksToText } from '@/lib/api/strapi';
import { StrapiTextBlock } from '@/types';

interface MenuCardProps {
  name: string;
  description: string | StrapiTextBlock[];
  price: number;
  imageUrl: string;
  imageAlt?: string;
  featured?: boolean;
}

// Helper function to get text from description
function getDescriptionText(description: string | StrapiTextBlock[]): string {
  if (typeof description === 'string') {
    // If it's already a string, strip HTML tags
    if (typeof window === 'undefined') {
      return description.replace(/<[^>]*>/g, '');
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = description;
    return tmp.textContent || tmp.innerText || '';
  }
  // If it's block content, convert to text
  return strapiBlocksToText(description);
}

export default function MenuCard({
  name,
  description,
  price,
  imageUrl,
  imageAlt = '',
  featured = false,
}: MenuCardProps) {
  // Format price to Vietnamese Dong
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return (
    <div className="group relative bg-bep-cream rounded-bep-xl shadow-bep-lg overflow-hidden hover:shadow-bep-xl transition-all duration-300 hover:-translate-y-1 border-2 border-bep-bamboo/30">
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-bep-red text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-bep">
          Đặc biệt
        </div>
      )}

      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-bep-cream-dark">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={imageAlt || name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-bep-cream">
        <h3 className="text-2xl font-heading font-bold text-bep-brown mb-2">{name}</h3>

        {/* Description */}
        <p className="text-bep-charcoal mb-4 line-clamp-3 font-body leading-relaxed">
          {getDescriptionText(description)}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-bep-bamboo/30">
          <span className="text-3xl font-bold text-bep-red">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}

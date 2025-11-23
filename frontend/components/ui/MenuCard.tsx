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
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Đặc biệt
        </div>
      )}

      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={imageAlt || name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {getDescriptionText(description)}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-red-600">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}

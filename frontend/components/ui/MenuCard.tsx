"use client";

import Image from "next/image";
import { getStrapiImageUrl, strapiBlocksToText } from "@/lib/api/strapi";
import { StrapiTextBlock } from "@/types";

interface MenuCardProps {
  name: string;
  description?: string | StrapiTextBlock[];
  price: number;
  imageUrl: string;
  imageAlt?: string;
  featured?: boolean;
  /** Use mockup style (circular image, minimal text) - default for menu grid */
  variant?: "default" | "mockup" | "detailed";
}

// Helper function to get text from description
function getDescriptionText(description: string | StrapiTextBlock[]): string {
  if (typeof description === "string") {
    // If it's already a string, strip HTML tags
    if (typeof window === "undefined") {
      return description.replace(/<[^>]*>/g, "");
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = description;
    return tmp.textContent || tmp.innerText || "";
  }
  // If it's block content, convert to text
  return strapiBlocksToText(description);
}

// Format price to Vietnamese Dong (short format like "80.000đ")
function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function MenuCard({
  name,
  description,
  price,
  imageUrl,
  imageAlt = "",
  featured = false,
  variant = "mockup",
}: MenuCardProps) {
  const formattedPrice = formatPrice(price);

  // Mockup style - matches the menu-page.png design (circular image, centered text)
  if (variant === "mockup") {
    return (
      <div className="menu-card-mockup group">
        <div className="relative">
          {featured && (
            <div className="absolute -top-1 -right-1 z-10 bg-bep-red text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              Đặc biệt
            </div>
          )}
          <Image
            src={getStrapiImageUrl(imageUrl)}
            alt={imageAlt || name}
            width={160}
            height={160}
            className="menu-card-mockup-image"
          />
        </div>

        {/* Name */}
        <h3 className="menu-card-mockup-name">{name}</h3>

        {/* Price */}
        <p className="menu-card-mockup-price">{formattedPrice}</p>
      </div>
    );
  }

  // Detailed style - for featured section or full menu view
  return (
    <div className="group relative bg-bep-cream rounded-bep-xl shadow-bep-lg overflow-hidden hover-lift border border-bep-bamboo/20">
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-bep-red text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-bep">
          Đặc biệt
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-bep-cream-dark">
        <Image
          src={getStrapiImageUrl(imageUrl)}
          alt={imageAlt || name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 bg-bep-cream">
        <h3 className="text-xl font-heading font-semibold text-bep-brown mb-2">{name}</h3>

        {/* Description - only show if provided and variant is detailed */}
        {description && (
          <p className="text-bep-brown-light text-sm mb-3 line-clamp-2 leading-relaxed">{getDescriptionText(description)}</p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-bep-bamboo/20">
          <span className="text-xl font-bold text-bep-red">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}

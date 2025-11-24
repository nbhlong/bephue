import Link from 'next/link';
import Image from 'next/image';
import { getGalleryImages } from '@/lib/api/strapi';

export default async function GalleryPreview() {
  const galleryData = await getGalleryImages();

  // Get first 8 images for preview
  const previewImages = galleryData?.data?.slice(0, 8) || [];

  if (!previewImages || previewImages.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-bep-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-bep-brown mb-4">
            Thư Viện Ảnh
          </h2>
          <p className="text-lg md:text-xl text-bep-charcoal max-w-2xl mx-auto font-body">
            Khám phá không gian ấm cúng và những món ăn hấp dẫn tại BepHue
          </p>
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {previewImages.map((image, index) => {
            const imageUrl = image.image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}${image.image.data.attributes.url}`
              : '/images/placeholder-gallery.jpg';

            // Create varied heights for masonry effect
            const heightClass = index % 3 === 0 ? 'h-64' : index % 2 === 0 ? 'h-48' : 'h-56';

            return (
              <div
                key={image.id}
                className={`group relative ${heightClass} overflow-hidden rounded-bep-xl shadow-bep-lg hover:shadow-bep-xl transition-all duration-300 border-2 border-bep-bamboo/20`}
              >
                <Image
                  src={imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-bep-brown bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-bep-cream font-heading font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                    {image.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-bep-red hover:bg-bep-red-dark text-white font-bold px-8 py-4 rounded-bep-lg text-lg transition-all duration-300 shadow-bep-lg hover:shadow-bep-glow hover:scale-105"
          >
            Xem Thêm Hình Ảnh
          </Link>
        </div>
      </div>
    </section>
  );
}

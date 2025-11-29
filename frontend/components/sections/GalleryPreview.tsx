import Link from 'next/link';
import Image from 'next/image';
import { getGalleryImages } from '@/lib/api/strapi';

export default async function GalleryPreview() {
  const galleryData = await getGalleryImages();
  const previewImages = galleryData?.data?.slice(0, 8) || [];

  if (!previewImages || previewImages.length === 0) {
    return null;
  }

  return (
    <section className="bg-bep-cream py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-heading font-bold text-bep-brown md:text-5xl">
            Thư viện hình ảnh
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-bep-brown md:text-xl">
            Khám phá không gian ấm cúng và những món ăn đậm chất Huế tại Bếp Huế.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {previewImages.map((image, index) => {
            const imageUrl = image.image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}${image.image.data.attributes.url}`
              : '/images/placeholder-gallery.jpg';

            const heightClass = index % 3 === 0 ? 'h-64' : index % 2 === 0 ? 'h-48' : 'h-56';

            return (
              <div
                key={image.id}
                className={`group relative ${heightClass} overflow-hidden rounded-bep-xl border-2 border-bep-bamboo/20 shadow-bep-lg transition-all duration-300 hover:shadow-bep-xl`}
              >
                <Image
                  src={imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-bep-brown/0 transition-all duration-300 group-hover:bg-bep-brown/60">
                  <span className="px-4 text-center font-heading text-lg font-semibold text-bep-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn-primary-red text-lg">
            Xem thêm hình ảnh
          </Link>
        </div>
      </div>
    </section>
  );
}

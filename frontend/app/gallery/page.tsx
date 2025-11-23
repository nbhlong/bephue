'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { getGalleryImages, getStrapiImageUrl } from '@/lib/api/strapi';
import { GalleryImageResponse, GalleryImage } from '@/types';

type CategoryType = 'all' | 'food' | 'restaurant' | 'event';

const categories = [
  { id: 'all', label: 'Tất cả', englishLabel: 'All' },
  { id: 'food', label: 'Món ăn', englishLabel: 'Food' },
  { id: 'restaurant', label: 'Nhà hàng', englishLabel: 'Restaurant' },
  { id: 'event', label: 'Sự kiện', englishLabel: 'Events' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [galleryImages, setGalleryImages] = useState<GalleryImageResponse>({
    data: [],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
  });
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Fetch gallery images
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const category = selectedCategory === 'all' ? undefined : selectedCategory;
        const images = await getGalleryImages(category);
        setGalleryImages(images);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.data.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, galleryImages.data.length]);

  const selectedImage = selectedImageIndex !== null ? galleryImages.data[selectedImageIndex] : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Thư Viện Hình Ảnh</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto">
            Khám phá không gian và món ăn đặc sắc tại BepHue
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as CategoryType)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải hình ảnh...</p>
            </div>
          ) : galleryImages.data.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Không tìm thấy hình ảnh nào.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">{galleryImages.meta.pagination.total} hình ảnh</p>
              </div>

              {/* Masonry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryImages.data.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-200"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={getStrapiImageUrl(image.image?.data?.attributes?.url || '')}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                          <h3 className="text-lg font-bold">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal isOpen={selectedImageIndex !== null} onClose={closeLightbox}>
        {selectedImage && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Navigation Buttons */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {selectedImageIndex !== null &&
              selectedImageIndex < galleryImages.data.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

            {/* Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image
                src={getStrapiImageUrl(selectedImage.image?.data?.attributes?.url || '')}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-75 text-white px-6 py-3 rounded-full">
              <p className="text-center font-medium">{selectedImage.title}</p>
              <p className="text-sm text-gray-300 text-center">
                {selectedImageIndex !== null && selectedImageIndex + 1} /{' '}
                {galleryImages.data.length}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Trải nghiệm thực tế</h2>
          <p className="text-xl mb-8 text-red-100">
            Đến BepHue để thưởng thức không gian và món ăn tuyệt vời
          </p>
          <a
            href="/reservation"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Đặt Bàn Ngay
          </a>
        </div>
      </section>
    </main>
  );
}

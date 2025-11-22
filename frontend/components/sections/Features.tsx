'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

interface FeaturesProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: "Hương vị cung đình Huế",
    description: "Thưởng thức những món ăn truyền thống được chế biến theo công thức cổ truyền từ cung đình Huế. Mỗi món ăn đều mang trong mình câu chuyện lịch sử và văn hóa đặc sắc của xứ Huế mộng mơ.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    imageAlt: "Traditional Hue Cuisine",
  },
  {
    title: "Nguyên liệu tươi ngon",
    description: "Chúng tôi cam kết sử dụng 100% nguyên liệu tươi ngon, được tuyển chọn kỹ lưỡng từ các nguồn cung ứng uy tín. Đảm bảo chất lượng và hương vị tuyệt hảo trong từng món ăn.",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80",
    imageAlt: "Fresh Ingredients",
  },
  {
    title: "Không gian thư giãn",
    description: "Không gian nhà hàng được thiết kế tinh tế, kết hợp giữa nét truyền thống và hiện đại. Tạo nên một môi trường ấm cúng, sang trọng, phù hợp cho những bữa ăn gia đình hoặc tiệc tùng.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    imageAlt: "Relaxing Ambience",
  },
];

function FeatureItem({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:grid-flow-dense' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl ${
        isReversed ? 'lg:col-start-2' : ''
      }`}>
        <Image
          src={feature.imageUrl}
          alt={feature.imageAlt}
          fill
          className="object-cover hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          {feature.title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features({ features = defaultFeatures }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

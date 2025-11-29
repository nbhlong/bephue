'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
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
    description:
      "Thưởng thức món ăn truyền thống được chế biến theo công thức cung đình. Mỗi món đều mang câu chuyện lịch sử và văn hóa xứ Huế mộc mạc, tinh tế.",
    imageUrl: "/resources/real-images/bun-hen.jpg",
    imageAlt: "Traditional Hue Cuisine",
  },
  {
    title: "Nguyên liệu tươi ngon",
    description:
      "Chúng tôi sử dụng 100% nguyên liệu tươi, tuyển chọn kỹ từ nguồn cung uy tín để đảm bảo hương vị hoàn hảo trong từng món ăn.",
    imageUrl: "/resources/real-images/combo.JPG",
    imageAlt: "Fresh Ingredients",
  },
  {
    title: "Không gian ấm cúng",
    description:
      "Thiết kế hòa quyện truyền thống và hiện đại, tạo nên không gian ấm cúng, sang trọng, phù hợp cho gia đình hoặc tiếp khách.",
    imageUrl: "/resources/real-images/decor.JPG",
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
      <div className={`relative h-[400px] lg:h-[500px] rounded-bep-xl overflow-hidden shadow-bep-xl border-4 border-bep-bamboo/20 ${
        isReversed ? 'lg:col-start-2' : ''
      }`}>
        <Image
          src={feature.imageUrl}
          alt={feature.imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-bep-brown mb-6">
          {feature.title}
        </h2>
        <p className="text-lg text-bep-brown leading-relaxed font-body">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features({ features = defaultFeatures }: FeaturesProps) {
  return (
    <section className="py-20 bg-bep-cream">
      <div className="container mx-auto px-4 max-w-6xl space-y-24">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}

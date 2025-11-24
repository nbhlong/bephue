'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  showCTA?: boolean;
}

export default function Hero({
  title = "Bếp Huế",
  subtitle = "Hương vị truyền thống ẩm thực cung đình Huế",
  imageUrl = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80",
  showCTA = true,
}: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="BepHue Hero"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-body drop-shadow-md">
            {subtitle}
          </p>

          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="bg-bep-red hover:bg-bep-red-dark text-white px-8 py-4 rounded-bep text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-bep-lg hover:shadow-bep-glow"
              >
                Xem thực đơn
              </Link>
              <Link
                href="/reservation"
                className="bg-bep-cream hover:bg-bep-cream-light text-bep-brown px-8 py-4 rounded-bep text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-bep-lg border-2 border-bep-bamboo"
              >
                Đặt bàn ngay
              </Link>
            </div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

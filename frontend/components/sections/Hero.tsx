"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  showCTA?: boolean;
}

export default function Hero({
  title = "Bếp Huế",
  subtitle = "Hương vị cung đình – Đậm chất Huế xưa",
  imageUrl = "/resources/mockups/hero.png",
  showCTA = true,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bep-brown">
      {/* Background Image with warm vignette */}
      <div className="absolute inset-0 z-0">
        <Image src={imageUrl} alt="BepHue Hero" fill className="object-cover" priority quality={90} />
        <div className="absolute inset-0 bg-gradient-to-b from-bep-brown/35 via-bep-brown/25 to-bep-brown/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-bep-brown/85 via-bep-brown/45 to-transparent" />
      </div>

      {/* Corner ornaments */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {["tl", "tr", "bl", "br"].map((pos) => (
          <span
            key={pos}
            className="absolute h-12 w-12 border-[1.5px] border-[var(--color-gold)]"
            style={{
              top: pos.includes("t") ? "1.75rem" : "auto",
              bottom: pos.includes("b") ? "1.75rem" : "auto",
              left: pos.includes("l") ? "1.75rem" : "auto",
              right: pos.includes("r") ? "1.75rem" : "auto",
              borderTopWidth: pos.includes("t") ? "1.5px" : "0",
              borderLeftWidth: pos.includes("l") ? "1.5px" : "0",
              borderRightWidth: pos.includes("r") ? "1.5px" : "0",
              borderBottomWidth: pos.includes("b") ? "1.5px" : "0",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center md:gap-8 md:py-28"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo text */}
          <div className="flex flex-col text-bep-cream items-center gap-1 leading-none">
            <span className="text-3xl font-heading tracking-[0.08em] drop-shadow-md">BEP</span>
            <span className="text-3xl font-heading tracking-[0.08em] drop-shadow-md">HUE</span>
          </div>

          <h1 className="font-heading text-bep-cream text-5xl leading-tight drop-shadow-xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-xl text-bep-cream leading-relaxed drop-shadow-md md:text-2xl">{subtitle}</p>

          {showCTA && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu" className="btn-primary-red text-base md:text-lg">
                Xem Thực Đơn
              </Link>
              <Link href="/reservation" className="btn-outline-gold text-base md:text-lg">
                Đặt Bàn
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

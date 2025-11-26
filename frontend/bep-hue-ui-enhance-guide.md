# Bếp Huế – Homepage Implementation Guide

This document describes how to implement / refactor the **Home page (`app/page.tsx`)** so it matches the finalized **Bếp Huế brand style**:

- 60% rustic Huế (warm, wooden, handcrafted)
- 40% royal premium (gold accents, structured layout, serif headings)
- Clean beige website background (no “menu book” look)

Use this as a blueprint while updating Tailwind config, global styles, and the main sections.

---

# 🌸 Phase 1 — Brand Design Tokens

This section defines all **colors, layout constants, radii, shadows**, and global classes to ensure all pages follow the same Bếp Huế identity.

## 🎨 1.1 Color Palette (Tailwind Config Extension)

Add these to **`tailwind.config.ts` → theme.extend.colors`**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        "bh-red": "#B42921",
        "bh-red-soft": "#d74133",
        "bh-beige": "#F4E8D8",
        "bh-beige-soft": "#FBF8F3",
        "bh-brown": "#4B2E1A",
        "bh-gold": "#D3A86D",
        "bh-indigo": "#1C3C57",

        // Text
        "bh-text-main": "#4B2E1A",
        "bh-text-muted": "#7A5C48",
      },
      boxShadow: {
        "bh-soft": "0 12px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        "bh-card": "16px",
        "bh-xl": "24px",
      },
      maxWidth: {
        "bh-content": "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

# 🌾 Phase 2 — Global Styles (`app/globals.css`)

Add these utility classes + section frameworks:

```css
/* Section spacings */
:root {
  --bh-section-y: 4.5rem;
}

/* Layout Containers */
.bh-container {
  @apply max-w-bh-content mx-auto px-4;
}

.bh-section {
  padding-top: var(--bh-section-y);
  padding-bottom: var(--bh-section-y);
}

/* Section Typography */
.bh-section-title {
  @apply font-serif text-3xl md:text-4xl text-bh-brown text-center;
}

.bh-section-subtitle {
  @apply mt-3 text-center text-bh-text-muted max-w-xl mx-auto leading-relaxed;
}

.bh-section-underline {
  @apply w-16 h-0.5 bg-bh-gold mx-auto mt-3;
}
```

**Ensure fonts in `layout.tsx` use:**

- `Playfair Display` for serif headings
- Inter/system-ui for body

---

# 🏛️ Phase 3 — Homepage Structure (`app/page.tsx`)

```tsx
// app/page.tsx
import Hero from "@/components/sections/Hero";
import Specials from "@/components/sections/Specials";
import StoryTeaser from "@/components/sections/StoryTeaser";
import MenuPreview from "@/components/sections/MenuPreview";
import AmbienceBanner from "@/components/sections/AmbienceBanner";
import WhyChoose from "@/components/sections/WhyChoose";
import LocationSection from "@/components/sections/LocationSection";
import ReservationCTA from "@/components/sections/ReservationCTA";

export default function HomePage() {
  return (
    <main className="bg-bh-beige-soft text-bh-text-main">
      <Hero />
      <Specials />
      <StoryTeaser />
      <MenuPreview />
      <AmbienceBanner />
      <WhyChoose />
      <LocationSection />
      <ReservationCTA />
    </main>
  );
}
```

---

# 🍜 Phase 4 — Section Implementations

This section describes the **full code** and styling for each homepage block.

---

## 🥇 4.1 Hero Section (`components/sections/Hero.tsx`)

```tsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px]">
      {/* Background Image */}
      <img
        src="/images/hero-bunbo.jpg"
        alt="Bún bò Huế tại Bếp Huế"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/70" />

      {/* Content */}
      <div className="bh-container relative flex h-full items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-bh-gold">Hương vị Huế giữa Sài Gòn</p>

          <h1 className="font-serif text-5xl md:text-6xl text-bh-beige-soft drop-shadow">Bếp Huế</h1>

          <p className="mt-4 text-bh-beige-soft/90 leading-relaxed md:text-lg">
            Trải nghiệm hương vị cung đình và ẩm thực dân gian xứ Huế trong không gian ấm cúng, mộc mạc.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/menu"
              className="rounded-full bg-bh-red px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-bh-red-soft transition-colors"
            >
              Xem thực đơn
            </a>

            <a
              href="/reservation"
              className="rounded-full border border-bh-gold bg-transparent px-6 py-3 text-sm font-semibold text-bh-beige-soft hover:bg-bh-gold/10 transition-colors"
            >
              Đặt bàn ngay
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## ⭐ 4.2 Specials Section (`components/sections/Specials.tsx`)

```tsx
const specials = [
  { name: "Bún bò Huế", price: "80.000đ", image: "/images/mon-bunbo.jpg" },
  { name: "Cơm hến", price: "70.000đ", image: "/images/mon-comhen.jpg" },
  { name: "Nem lụi", price: "90.000đ", image: "/images/mon-nemlui.jpg" },
];

export default function Specials() {
  return (
    <section className="bh-section bg-bh-beige-soft">
      <div className="bh-container">
        <h2 className="bh-section-title">Món đặc biệt</h2>
        <p className="bh-section-subtitle">
          Những món ăn làm nên tên tuổi Bếp Huế – cay nồng, thơm nức mùi ruốc, sả và ớt Huế.
        </p>

        <div className="bh-section-underline" />

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {specials.map((dish) => (
            <article key={dish.name} className="flex flex-col overflow-hidden rounded-bh-card bg-white shadow-bh-soft">
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col px-5 py-4">
                <h3 className="font-serif text-lg text-bh-brown">{dish.name}</h3>
                <p className="mt-1 text-sm text-bh-text-muted">
                  Món Huế truyền thống, nấu theo công thức riêng của Bếp Huế.
                </p>
                <p className="mt-3 text-base font-semibold text-bh-red">{dish.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 🏺 4.3 Story Teaser (`components/sections/StoryTeaser.tsx`)

```tsx
"use client";
import { motion } from "framer-motion";

export default function StoryTeaser() {
  return (
    <section className="bh-section bg-bh-beige">
      <div className="bh-container grid gap-10 md:grid-cols-[1.15fr,1fr] items-center">
        {/* Text */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="bh-section-title text-left">Câu chuyện Bếp Huế</h2>
          <div className="bh-section-underline md:mx-0" />

          <p className="mt-5 leading-relaxed text-bh-text-muted">
            Bếp Huế sinh ra từ những bữa cơm gia đình xứ Huế – nơi mỗi món ăn là một phần ký ức. Chúng tôi muốn mang trọn vẹn
            hương vị ấy đến Sài Gòn: mộc mạc, tinh tế và đậm vị quê nhà.
          </p>

          <a
            href="/about"
            className="mt-6 inline-flex items-center text-sm font-semibold text-bh-red hover:text-bh-red-soft"
          >
            Đọc thêm →
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-bh-xl shadow-bh-soft"
        >
          <img src="/images/interior-lamps.jpg" alt="Không gian Bếp Huế" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🍽️ 4.4 Menu Preview Section

Use your existing `<MenuPreview />` implementation, but ensure:

- Background: `bg-bh-beige-soft`
- Use 2–3 column grid on desktop with `MenuCard`s
- Add CTA link: `"Xem toàn bộ thực đơn"` → `/menu`

_Example wrapper:_

```tsx
// components/sections/MenuPreview.tsx (wrapper structure idea)
export default function MenuPreviewSection() {
  return (
    <section className="bh-section bg-bh-beige-soft">
      <div className="bh-container">
        <h2 className="bh-section-title">Thực đơn Bếp Huế</h2>
        <p className="bh-section-subtitle">
          Từ bún bò Huế, cơm hến, đến các loại bánh Huế truyền thống – tất cả đều được chuẩn bị tươi mới mỗi ngày.
        </p>
        <div className="bh-section-underline" />

        {/* Your existing preview grid / carousel */}
        {/* <MenuPreview /> */}

        <div className="mt-8 text-center">
          <a
            href="/menu"
            className="inline-flex items-center rounded-full border border-bh-brown px-6 py-3 text-sm font-semibold text-bh-brown hover:bg-bh-brown hover:text-bh-beige-soft transition-colors"
          >
            Xem toàn bộ thực đơn
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 🌅 4.5 Ambience Banner (`components/sections/AmbienceBanner.tsx`)

```tsx
export default function AmbienceBanner() {
  return (
    <section className="relative h-64 md:h-80">
      <img
        src="/images/ambience.jpg"
        alt="Không gian bên trong Bếp Huế"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="bh-container relative flex h-full items-center">
        <p className="max-w-xl text-sm md:text-base text-bh-beige-soft leading-relaxed">
          “Tại Bếp Huế, mỗi bát bún bò và mỗi chiếc bánh Huế đều được chuẩn bị như cho chính gia đình mình – từ nồi nước lèo
          đậm đà đến lớp hành ngò cuối cùng.”
        </p>
      </div>
    </section>
  );
}
```

---

## 💛 4.6 Why Choose Us (`components/sections/WhyChoose.tsx`)

```tsx
const features = [
  {
    title: "Nguyên liệu tươi mỗi ngày",
    desc: "Rau xanh, thịt và gia vị được chọn lọc từ nhà cung cấp uy tín.",
  },
  {
    title: "Công thức chuẩn vị Huế",
    desc: "Nước lèo ninh xương nhiều giờ, sử dụng ruốc và gia vị truyền thống.",
  },
  {
    title: "Không gian ấm cúng",
    desc: "Mây tre, gỗ và ánh đèn vàng tạo cảm giác thân thuộc.",
  },
  {
    title: "Phục vụ tận tâm",
    desc: "Đội ngũ nhân viên luôn sẵn sàng lắng nghe và hỗ trợ.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bh-section bg-bh-beige-soft">
      <div className="bh-container">
        <h2 className="bh-section-title">Lý do chọn Bếp Huế</h2>
        <div className="bh-section-underline" />

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-bh-card bg-white p-6 shadow-bh-soft">
              <h3 className="font-serif text-lg text-bh-brown">{f.title}</h3>
              <p className="mt-2 text-bh-text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 📍 4.7 Location Section (`components/sections/LocationSection.tsx`)

```tsx
export default function LocationSection() {
  return (
    <section className="bh-section bg-bh-beige">
      <div className="bh-container grid gap-10 md:grid-cols-2 items-center">
        {/* Map preview or embed */}
        <div className="h-72 md:h-full overflow-hidden rounded-bh-xl shadow-bh-soft">
          <img src="/images/map-preview.jpg" alt="Bản đồ đến Bếp Huế" className="h-full w-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <h2 className="bh-section-title text-left">Địa chỉ & Giờ mở cửa</h2>
          <div className="bh-section-underline md:mx-0" />

          <p className="mt-5 text-bh-text-muted leading-relaxed">
            123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
            <br />
            Mở cửa: 8:00 – 22:00 (hàng ngày)
          </p>

          <a
            href="tel:0123456789"
            className="mt-6 inline-block rounded-full bg-bh-red px-6 py-3 text-sm font-semibold text-white shadow-bh-soft hover:bg-bh-red-soft transition-colors"
          >
            Gọi đặt bàn
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

# 🎯 Phase 5 — Footer & Final Touches

Update `Header` and `Footer` to match the brand:

- **Header**: `bg-bh-brown text-bh-beige-soft`, links hover `text-bh-gold`
- **Footer**: `bg-bh-brown text-bh-beige-soft border-t border-bh-gold/40`

---

# ✅ Final Checklist

- [ ] Homepage uses `bh-*` colors instead of default `gray-*` / `red-*`
- [ ] Hero shows bun bò Huế hero image with overlay + 2 CTAs
- [ ] Sections in order: `Hero → Specials → Story → Menu Preview → Ambience → Why Choose → Location → ReservationCTA`
- [ ] Typography: serif headings, clean sans-serif body
- [ ] Background: `bg-bh-beige-soft` (no heavy textures)
- [ ] Cards use `rounded-bh-card` + `shadow-bh-soft`
- [ ] Layout tested on mobile, tablet, desktop

_End of Bếp Huế – Homepage Implementation Guide_

# Bếp Huế – Menu Page Implementation Guide

_Design & implementation spec for `/menu` (Next.js 14+ / Tailwind CSS 4)_

This guide explains how to redesign the **Menu page** to match the new Bếp Huế brand:

- 60% rustic Huế (ấm, mộc, gần với quán thật)
- 40% premium Huế (gọn, sạch, có điểm nhấn vàng)
- Clean beige background, card-based layout, modern website UX
- Layout style: **A1 – Clean Modern Grid**

## MenuCard Styling Guidelines

You already have MenuCard. To keep consistency with homepage:

Use white background with shadow-bh-soft and rounded-bh-card.

Image on top, then text, then price.

Highlight featured items subtly (e.g., small red “Đặc biệt” badge, or slightly different border).

Example style direction inside MenuCard:

```tsx
<div className="flex h-full flex-col overflow-hidden rounded-bh-card bg-white shadow-bh-soft">
  <div className="h-48 w-full overflow-hidden">
    <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
  </div>
  <div className="flex flex-1 flex-col px-4 py-3">{/* title, description, price */}</div>
</div>
```

"use client";

import { useState, useEffect } from "react";
import MenuCard from "@/components/ui/MenuCard";
import { getMenuItems, getFeaturedMenuItems } from "@/lib/api/strapi";
import { MenuItemResponse } from "@/types";

type CategoryType = "all" | "appetizer" | "main" | "dessert" | "drink";

const categories = [
  { id: "all", label: "Tất cả", englishLabel: "All" },
  { id: "appetizer", label: "Khai vị", englishLabel: "Appetizers" },
  { id: "main", label: "Món chính", englishLabel: "Main Courses" },
  { id: "dessert", label: "Tráng miệng", englishLabel: "Desserts" },
  { id: "drink", label: "Đồ uống", englishLabel: "Drinks" },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [menuItems, setMenuItems] = useState<MenuItemResponse>({
    data: [],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
  });
  const [featuredItems, setFeaturedItems] = useState<MenuItemResponse>({
    data: [],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
  });
  const [loading, setLoading] = useState(true);

  // Fetch menu items
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch featured items once on initial "all" category
        if (selectedCategory === "all" && featuredItems.data.length === 0) {
          const featured = await getFeaturedMenuItems();
          setFeaturedItems(featured);
        }

        const category = selectedCategory === "all" ? undefined : selectedCategory;
        const items = await getMenuItems(category);
        setMenuItems(items);
      } catch (error) {
        console.error("Error loading menu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedCategory]);

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <main className="min-h-screen bg-bh-beige-soft text-bh-text-main">
      {/* Menu Hero */}
      <section className="bh-section bg-bh-beige">
        <div className="bh-container grid gap-8 md:grid-cols-[1.3fr,1fr] items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-bh-brown">Thực đơn Bếp Huế</h1>
            <p className="mt-4 text-bh-text-muted leading-relaxed md:text-lg">
              Từ bún bò Huế, cơm hến đến các loại bánh Huế truyền thống – mỗi món ăn đều được chuẩn bị tươi mới mỗi ngày, giữ
              trọn hương vị cung đình và dân gian xứ Huế.
            </p>
          </div>

          <div className="hidden md:block overflow-hidden rounded-bh-xl shadow-bh-soft">
            <img src="/resources/mockups/hero.png" alt="Món Huế tại Bếp Huế" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      {selectedCategory === "all" && featuredItems.data.length > 0 && (
        <section className="bh-section bg-bh-beige-soft pt-0">
          <div className="bh-container">
            <h2 className="bh-section-title">Món đặc biệt</h2>
            <p className="bh-section-subtitle">
              Những món ăn tiêu biểu nhất của Bếp Huế – gợi ý hoàn hảo cho lần đầu ghé quán.
            </p>
            <div className="bh-section-underline" />

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featuredItems.data.map((item) => (
                <MenuCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.image?.url || ""}
                  imageAlt={item.image?.alternativeText}
                  featured={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="bg-bh-beige sticky top-0 z-20 border-y border-bh-gold/20">
        <div className="bh-container py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 md:justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as CategoryType)}
                  className={[
                    "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-bh-red text-white shadow-bh-soft scale-[1.03]"
                      : "bg-white text-bh-text-main hover:bg-bh-beige-soft hover:text-bh-red",
                  ].join(" ")}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="bh-section bg-bh-beige-soft">
        <div className="bh-container">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-bh-red border-r-transparent" />
              <p className="mt-4 text-bh-text-muted">Đang tải thực đơn...</p>
            </div>
          ) : menuItems.data.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-bh-text-muted">Không tìm thấy món ăn nào.</p>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h2 className="font-serif text-3xl text-bh-brown">{activeCategory?.label}</h2>
                <p className="mt-2 text-sm text-bh-text-muted">{menuItems.meta.pagination.total} món ăn</p>
              </div>

              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {menuItems.data.map((item) => {
                  console.log(item.image);

                  return (
                    <MenuCard
                      key={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.image?.url || ""}
                      imageAlt={item.image?.alternativeText}
                      featured={item.featured}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bh-section bg-bh-brown">
        <div className="bh-container text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-bh-beige-soft">Sẵn sàng thưởng thức hương vị Huế?</h2>
          <p className="mt-4 text-bh-beige-soft/80 max-w-xl mx-auto">
            Đặt bàn ngay hôm nay để không bỏ lỡ bát bún bò nóng hổi, đĩa bánh Huế thơm lừng và không gian ấm cúng tại Bếp
            Huế.
          </p>
          <a
            href="/reservation"
            className="mt-8 inline-block rounded-full bg-bh-red px-8 py-3 text-sm font-semibold text-white shadow-bh-soft hover:bg-bh-red-soft transition-colors"
          >
            Đặt bàn ngay
          </a>
        </div>
      </section>
    </main>
  );
}

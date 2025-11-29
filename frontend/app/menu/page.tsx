"use client";

import { useState, useEffect } from "react";
import MenuCard from "@/components/ui/MenuCard";
import { getMenuItems, getFeaturedMenuItems } from "@/lib/api/strapi";
import { MenuItemResponse } from "@/types";

type CategoryType = "all" | "appetizer" | "main" | "noodle" | "banh" | "drink";

const categories = [
  { id: "all", label: "Tất cả", englishLabel: "All" },
  { id: "appetizer", label: "Khai vị", englishLabel: "Appetizers" },
  { id: "main", label: "Món chính", englishLabel: "Main Courses" },
  { id: "noodle", label: "Món bún", englishLabel: "Noodles" },
  { id: "banh", label: "Bánh Huế", englishLabel: "Hue Cakes" },
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

  return (
    <main className="min-h-screen bg-bep-cream pt-20">
      {/* Page Title with Ornament */}
      <section className="pt-12 pb-8 bg-bep-cream">
        <div className="bh-container text-center">
          <h1 className="menu-page-title">Bếp Huế Menu</h1>
          <div className="bh-section-underline mt-4" />
        </div>
      </section>

      {/* Category Tabs - top style like mockup */}
      <section className="bg-bep-cream">
        <div className="bh-container">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories
              .filter((c) => c.id !== "all")
              .map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as CategoryType)}
                    className={`menu-category-tab ${isActive ? "active" : ""}`}
                  >
                    {category.label.toUpperCase()}
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section - "MÓN ĐẶC BIỆT" */}
      {selectedCategory === "all" && (
        <section className="py-7 bg-bep-cream">
          <div className="bh-container">
            {/* Featured Badge Header */}
            <div className="text-center mb-10">
              <span className="menu-featured-badge">Món đặc biệt</span>
            </div>

            {/* Featured Items Grid - 3 columns on desktop */}
            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-bep-red border-r-transparent" />
              </div>
            ) : featuredItems.data.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {featuredItems.data.slice(0, 6).map((item) => (
                  <MenuCard
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.image?.url || ""}
                    imageAlt={item.image?.alternativeText}
                    featured={true}
                    variant="mockup"
                  />
                ))}
              </div>
            ) : (
              /* Placeholder featured items when no data */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { name: "Bún Bò Huế", price: 80000 },
                  { name: "Cơm Hến", price: 70000 },
                  { name: "Nem Lụi", price: 90000 },
                  { name: "Gỏi Tôm Thịt", price: 85000 },
                  { name: "Chả Ràm Huế", price: 70000 },
                  { name: "Cơm Chiên Hải Sản", price: 95000 },
                ].map((item, index) => (
                  <MenuCard
                    key={index}
                    name={item.name}
                    price={item.price}
                    imageUrl="/resources/real-images/bun-hen.jpg"
                    variant="mockup"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Divider line */}
      <div className="bh-container">
        <div className="h-px bg-bep-bamboo/30" />
      </div>

      {/* Menu Items by Category */}
      {selectedCategory !== "all" && (
        <section className="py-8 bg-bep-cream-light">
          <div className="bh-container">
            {loading ? (
              <div className="py-16 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-bep-red border-r-transparent" />
                <p className="mt-4 text-bep-brown-light">Đang tải thực đơn...</p>
              </div>
            ) : menuItems.data.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg text-bep-brown-light">Không tìm thấy món ăn nào.</p>
              </div>
            ) : (
              <>
                {/* Category Title */}
                <div className="text-center mb-10">
                  <h2 className="bh-section-title">{categories.find((c) => c.id === selectedCategory)?.label}</h2>
                  <p className="mt-2 text-sm text-bep-brown-light">{menuItems.meta.pagination.total} món ăn</p>
                  <div className="bh-section-underline" />
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {menuItems.data.map((item) => (
                    <MenuCard
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      imageUrl={item.image?.url || ""}
                      imageAlt={item.image?.alternativeText}
                      featured={item.featured}
                      variant="mockup"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Reservation CTA */}
      <section className="py-16 bg-bep-brown">
        <div className="bh-container text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-bep-cream font-semibold">
            Sẵn sàng thưởng thức hương vị Huế?
          </h2>
          <p className="mt-4 text-bep-cream/80 max-w-lg mx-auto leading-relaxed">
            Đặt bàn ngay hôm nay để không bỏ lỡ bát bún bò nóng hổi, đĩa bánh Huế thơm lừng và không gian ấm cúng tại Bếp
            Huế.
          </p>
          <a href="/reservation" className="btn-primary-red mt-8 inline-block">
            Đặt bàn ngay
          </a>
        </div>
      </section>
    </main>
  );
}

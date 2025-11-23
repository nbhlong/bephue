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
        // Fetch featured items (only on initial load)
        if (selectedCategory === "all" && featuredItems.data.length === 0) {
          const featured = await getFeaturedMenuItems();
          console.log("Fetched featured items:", featured.data.length);
          setFeaturedItems(featured);
        }

        // Fetch menu items by category
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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Thực Đơn</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto">
            Khám phá hương vị ẩm thực cung đình Huế đích thực
          </p>
        </div>
      </section>

      {/* Featured Dishes Section */}
      {selectedCategory === "all" && featuredItems.data.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Món Đặc Biệt</h2>
              <p className="text-lg text-gray-600">Những món ăn đặc trưng của BepHue</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.data.map((item) => (
                <MenuCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.image?.data?.attributes?.url || ""}
                  imageAlt={item.image?.data?.attributes?.alternativeText}
                  featured={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-100 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as CategoryType)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải thực đơn...</p>
            </div>
          ) : menuItems.data.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Không tìm thấy món ăn nào.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">{menuItems.meta.pagination.total} món ăn</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {menuItems.data.map((item) => (
                  <MenuCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.image?.data?.attributes?.url || ""}
                    imageAlt={item.image?.data?.attributes?.alternativeText}
                    featured={item.featured}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng trải nghiệm?</h2>
          <p className="text-xl mb-8 text-red-100">Đặt bàn ngay hôm nay để thưởng thức ẩm thực Huế đích thực</p>
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

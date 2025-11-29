import Image from "next/image";
import { Metadata } from "next";
import { getRestaurantInfo, strapiBlocksToText } from "@/lib/api/strapi";

export const metadata: Metadata = {
  title: "Về Chúng Tôi - Câu Chuyện BepHue",
  description:
    "Tìm hiểu về câu chuyện của BepHue, đội ngũ đầu bếp tài năng và giá trị cốt lõi trong việc mang ẩm thực cung đình Huế chính gốc đến với thực khách.",
  openGraph: {
    title: "Về Chúng Tôi - BepHue Restaurant",
    description: "Câu chuyện về BepHue và ẩm thực cung đình Huế chính gốc",
    url: "https://bephue.vn/about",
    type: "website",
  },
};

export default async function AboutPage() {
  const restaurantData = await getRestaurantInfo();
  const restaurant = restaurantData?.data;

  // Get description text from blocks or string
  const description = restaurant?.description
    ? strapiBlocksToText(restaurant.description)
    : "Khám phá hương vị truyền thống của ẩm thực cung đình Huế tại nhà hàng Bếp Huế.";

  return (
    <main className="min-h-screen bg-bep-cream pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-bep-brown">
        <div className="absolute inset-0 z-0">
          <Image src={"/images/bephue.jpg"} alt="BepHue About" fill className="object-cover" priority quality={90} />
        </div>
      </section>

      {/* <section className="pt-12 pb-8 bg-bep-cream">
        <div className="relative bh-container h-full flex items-center justify-center text-center">
          <div className="text-bep-cream">
            <p className="text-lg md:text-xl text-bep-brown max-w-3xl mx-auto leading-relaxed font-body">
              Nơi hội tụ tinh hoa ẩm thực cung đình Huế
            </p>
          </div>
        </div>
      </section> */}

      {/* Story Section */}
      <section className="bh-section bg-bep-cream">
        <div className="bh-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="bh-section-title mb-4">Câu Chuyện Của Chúng Tôi</h2>
              <div className="bh-section-underline"></div>
            </div>

            <div className="prose prose-lg max-w-none text-bep-brown-light leading-relaxed space-y-6 font-body">
              <p className="text-xl text-center text-bep-brown mb-8">{description}</p>

              <p>
                Bếp Huế được thành lập với sứ mệnh bảo tồn và phát huy những giá trị ẩm thực truyền thống của cố đô Huế.
                Chúng tôi tự hào mang đến thực khách những món ăn được chế biến theo công thức cổ truyền, với nguyên liệu
                tươi ngon được tuyển chọn kỹ lưỡng.
              </p>

              <p>
                Ẩm thực Huế không chỉ đơn thuần là món ăn, mà còn là nghệ thuật, là văn hóa, là tâm hồn của một vùng đất. Mỗi
                món ăn tại Bếp Huế đều được chuẩn bị tỉ mỉ, từ khâu lựa chọn nguyên liệu đến cách trình bày, nhằm mang đến
                trải nghiệm ẩm thực đích thực nhất.
              </p>

              <p>
                Với đội ngũ đầu bếp giàu kinh nghiệm, am hiểu sâu sắc về ẩm thực Huế, chúng tôi cam kết mang đến cho thực
                khách những hương vị tuyệt vời nhất, giữ gìn bản sắc văn hóa ẩm thực truyền thống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bh-section bg-bep-cream-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Giá Trị Cốt Lõi</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-bep-cream p-8 rounded-bep-xl shadow-bep-lg hover:shadow-bep-xl transition-shadow border border-bep-bamboo/20">
              <div className="w-16 h-16 bg-bep-bamboo/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-bep-red"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-4 text-center">Chất Lượng</h3>
              <p className="text-bep-brown-light text-center leading-relaxed font-body">
                Nguyên liệu tươi ngon, được tuyển chọn kỹ lưỡng mỗi ngày. Chúng tôi không bao giờ thỏa hiệp về chất lượng.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-bep-cream p-8 rounded-bep-xl shadow-bep-lg hover:shadow-bep-xl transition-shadow border border-bep-bamboo/20">
              <div className="w-16 h-16 bg-bep-bamboo/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-bep-red"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-4 text-center">Truyền Thống</h3>
              <p className="text-bep-brown-light text-center leading-relaxed font-body">
                Giữ gìn và phát huy công thức nấu ăn truyền thống của cố đô Huế, được truyền từ thế hệ này sang thế hệ khác.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-bep-cream p-8 rounded-bep-xl shadow-bep-lg hover:shadow-bep-xl transition-shadow border border-bep-bamboo/20">
              <div className="w-16 h-16 bg-bep-bamboo/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-bep-red"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-4 text-center">Tận Tâm</h3>
              <p className="text-bep-brown-light text-center leading-relaxed font-body">
                Phục vụ khách hàng bằng cả trái tim. Sự hài lòng của bạn là niềm tự hào của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bh-section bg-bep-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Đội Ngũ Của Chúng Tôi</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-bep-brown-light max-w-3xl mx-auto font-body">
              Những người đam mê ẩm thực, tận tâm mang đến cho bạn những trải nghiệm tuyệt vời nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bep-red-light to-bep-red-dark">
                  <span className="text-6xl text-white">👨‍🍳</span>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-2">Nguyễn Văn A</h3>
              <p className="text-bep-red font-semibold mb-3 font-body">Bếp Trưởng</p>
              <p className="text-bep-brown-light leading-relaxed font-body">
                Hơn 20 năm kinh nghiệm trong nghề, chuyên sâu về ẩm thực cung đình Huế
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bep-red-light to-bep-red-dark">
                  <span className="text-6xl text-white">👩‍🍳</span>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-2">Trần Thị B</h3>
              <p className="text-bep-red font-semibold mb-3 font-body">Phó Bếp Trưởng</p>
              <p className="text-bep-brown-light leading-relaxed font-body">
                Chuyên gia về bánh Huế và các món tráng miệng truyền thống
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bep-red-light to-bep-red-dark">
                  <span className="text-6xl text-white">🧑‍💼</span>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-bep-brown mb-2">Lê Văn C</h3>
              <p className="text-bep-red font-semibold mb-3 font-body">Quản Lý Nhà Hàng</p>
              <p className="text-bep-brown-light leading-relaxed font-body">
                Đảm bảo mọi trải nghiệm của khách hàng đều hoàn hảo nhất
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bh-section bg-bep-cream-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-bep-cream rounded-bep-xl shadow-bep-lg border border-bep-bamboo/20 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-bep-brown mb-4">Thông Tin Liên Hệ</h2>
              <div className="bh-section-underline"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-bep-red"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-bep-brown mb-2">Địa chỉ</h3>
                  <p className="text-bep-brown-light leading-relaxed font-body">
                    {restaurant?.address || "123 Nguyen Hue Street, District 1, HCMC"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-bep-red"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-bep-brown mb-2">Điện thoại</h3>
                  <p className="text-bep-brown-light leading-relaxed font-body">{restaurant?.phone || "+84 28 1234 5678"}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-bep-red"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-bep-brown mb-2">Email</h3>
                  <p className="text-bep-brown-light leading-relaxed font-body">
                    {restaurant?.email || "contact@bephue.vn"}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-bep-bamboo/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-bep-red"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-bep-brown mb-2">Giờ mở cửa</h3>
                  <p className="text-bep-brown-light leading-relaxed font-body">
                    Thứ 2 - Chủ nhật
                    <br />
                    10:00 - 22:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bh-section bg-bep-brown text-bep-cream">
        <div className="bh-container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">Đến Và Trải Nghiệm</h2>
          <p className="text-lg mb-8 text-bep-cream-light max-w-2xl mx-auto font-body">
            Hãy để chúng tôi phục vụ bạn những món ăn tuyệt vời nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/reservation" className="btn-primary-red inline-block text-lg">
              Đặt Bàn Ngay
            </a>
            <a href="/menu" className="btn-outline-gold inline-block text-lg">
              Xem Thực Đơn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

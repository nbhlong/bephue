import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thực Đơn - Món Huế Đậm Vị Quê Nhà",
  description:
    "Khám phá thực đơn món Huế tại Bếp Huế: bún bò Huế, cơm hến, nem lụi, các loại bánh Huế và nhiều món ngon khác.",
  keywords: [
    "thực đơn Bếp Huế",
    "món Huế",
    "bún bò Huế",
    "bánh bèo",
    "bánh khoái",
    "nem lụi",
    "cơm hến",
    "ẩm thực Huế",
    "menu",
  ],
  openGraph: {
    title: "Thực Đơn - Bếp Huế",
    description: "Khám phá thực đơn món Huế đậm vị quê nhà tại Bếp Huế",
    url: "https://bephue.vn/menu",
    type: "website",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}

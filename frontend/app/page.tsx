import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MenuPreview from "@/components/sections/MenuPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import ReservationCTA from "@/components/sections/ReservationCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <MenuPreview />
      <GalleryPreview />
      <ReservationCTA />
    </>
  );
}

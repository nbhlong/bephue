import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MenuPreview from "@/components/sections/MenuPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import ReservationCTA from "@/components/sections/ReservationCTA";

export default function Home() {
  return (
    <main className="bg-bep-cream text-bep-brown">
      <Hero />
      <Features />
      <MenuPreview />
      <GalleryPreview />
      <ReservationCTA />
    </main>
  );
}

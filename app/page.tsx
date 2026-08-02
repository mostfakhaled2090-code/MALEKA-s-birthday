import LoadingScreen from "@/components/layout/LoadingScreen";
import { EndingSection } from "@/components/sections/EndingSection";
import MusicPlayer from "@/components/MusicPlayer";
import { FinalLetterSection } from "@/components/sections/FinalLetterSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GiftSection } from "@/components/sections/GiftSection";
import HeroSection from "@/components/sections/HeroSection";
import { LettersSection } from "@/components/sections/LettersSection";
import { MemoriesSection } from "@/components/sections/MemoriesSection";
import { NightSkySection } from "@/components/sections/NightSkySection";
import { QuoteSection } from "@/components/sections/QuoteSection";

export default function Home() {
  return (
    <LoadingScreen>
      <main>
        <HeroSection />
        <QuoteSection />
        <NightSkySection />
        <MemoriesSection />
        <GallerySection />
        <LettersSection />
        <GiftSection />
        <FinalLetterSection />
        <EndingSection />
        <MusicPlayer />
      </main>
    </LoadingScreen>
  );
}
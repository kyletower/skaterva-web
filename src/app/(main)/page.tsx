import { GallerySection } from '@/components/home/gallery-section';
import { HeroSection } from '@/components/home/hero-section';
import { InfoBarSection } from '@/components/home/info-bar-section';
import { OfferingsSection } from '@/components/home/offerings-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoBarSection />
      <OfferingsSection />
      <TestimonialsSection />
      <GallerySection />
    </>
  );
}

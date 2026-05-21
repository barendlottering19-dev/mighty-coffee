import { Hero } from "@/components/home/Hero";
import { FeaturedDrinks } from "@/components/home/FeaturedDrinks";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { MapsSection } from "@/components/home/MapsSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDrinks />
      <TestimonialsSlider />
      <MapsSection />
      <Newsletter />
    </>
  );
}

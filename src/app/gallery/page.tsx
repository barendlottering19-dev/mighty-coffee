"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { GallerySkeleton } from "@/components/skeletons/GallerySkeleton";
import { fadeIn, staggerContainer } from "@/lib/animations";

const GALLERY_IMAGES = [
  { id: "1", url: "https://img05.restaurantguru.com/re65-Mighty-Coffee-interior-2025-07-1.jpg", alt: "Mighty Coffee cozy interior", caption: "Warm and inviting atmosphere at Mighty Coffee" },
  { id: "2", url: "https://img05.restaurantguru.com/rded-interior-Mighty-Coffee-2025-07-1.jpg", alt: "Interior seating area", caption: "Comfortable seating for relaxing with friends" },
  { id: "3", url: "https://img05.restaurantguru.com/r6f0-Mighty-Coffee-design-2025-07.jpg", alt: "Restaurant design", caption: "Modern and warm restaurant design" },
  { id: "4", url: "https://img05.restaurantguru.com/re95-design-Mighty-Coffee-2025-07.jpg", alt: "Dining area details", caption: "Beautifully decorated dining space" },
  { id: "5", url: "https://img05.restaurantguru.com/rdb7-Mighty-Coffee-beverage-2025-07.jpg", alt: "Coffee beverages", caption: "Handcrafted coffee beverages" },
  { id: "6", url: "https://img05.restaurantguru.com/ra04-beverage-Mighty-Coffee-2025-07.jpg", alt: "Refreshing drinks", caption: "Refreshing cold beverages" },
  { id: "7", url: "https://img05.restaurantguru.com/r8b7-burger-Mighty-Coffee-2022-09-2.jpg", alt: "Grilled burgers", caption: "Our famous grilled burgers" },
  { id: "8", url: "https://img05.restaurantguru.com/rc37-meals-Mighty-Coffee-2025-07.jpg", alt: "Full breakfast meals", caption: "Hearty breakfast meals served daily" },
  { id: "9", url: "https://img05.restaurantguru.com/r5f5-Mighty-Coffee-chocolate-mousse.jpg", alt: "Chocolate mousse", caption: "Decadent Belgian chocolate mousse" },
  { id: "10", url: "https://img05.restaurantguru.com/rf37-cheese-plate-Mighty-Coffee-2025-07.jpg", alt: "Cheese platter", caption: "Selection of fine cheeses" },
  { id: "11", url: "https://img05.restaurantguru.com/rdd6-Mighty-Coffee-french-fries-2025-07.jpg", alt: "Hand-cut fries", caption: "Crispy golden hand-cut fries" },
  { id: "12", url: "https://img05.restaurantguru.com/r0c2-Mighty-Coffee-exterior.jpg", alt: "Mighty Coffee exterior", caption: "Mighty Coffee on Ravel Street, Vanderbijlpark" },
];

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-espresso to-espresso-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Gallery
            </motion.h1>
            <motion.p variants={fadeIn} className="text-cream/70 text-lg max-w-xl mx-auto">
              A visual journey through Mighty Coffee
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <GallerySkeleton /> : <MasonryGrid images={GALLERY_IMAGES} />}
        </div>
      </section>
    </>
  );
}

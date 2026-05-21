"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MenuCard } from "@/components/menu/MenuCard";
import { MenuFilter } from "@/components/menu/MenuFilter";
import { MenuSkeleton } from "@/components/skeletons/MenuSkeleton";
import { fadeIn, staggerContainer } from "@/lib/animations";

const MENU_ITEMS = [
  { id: "1", name: "Espresso Mighty", description: "Double shot espresso with a velvety crema, locally roasted African beans", category: "coffee" as const, price: 28.00, image_url: "https://images.pexels.com/photos/5169124/pexels-photo-5169124.jpeg?auto=compress&cs=tinysrgb&w=400", featured: true },
  { id: "2", name: "Caramel Latte", description: "Smooth latte with house-made caramel drizzle and a touch of sea salt", category: "coffee" as const, price: 35.00, image_url: "https://images.pexels.com/photos/5567646/pexels-photo-5567646.jpeg?auto=compress&cs=tinysrgb&w=400", featured: true },
  { id: "3", name: "Cappuccino", description: "Classic Italian cappuccino with a perfect foam-to-espresso ratio", category: "coffee" as const, price: 30.00, image_url: "https://images.pexels.com/photos/9397490/pexels-photo-9397490.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "4", name: "House Blend Coffee", description: "Our signature slow-drip coffee blend, smooth and full-bodied", category: "coffee" as const, price: 22.00, image_url: "https://images.pexels.com/photos/37183538/pexels-photo-37183538.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "5", name: "Iced Coffee", description: "Chilled house-brewed coffee served over ice", category: "cold-drinks" as const, price: 26.00, image_url: "https://images.pexels.com/photos/34024785/pexels-photo-34024785.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "6", name: "Grilled Burger", description: "Juicy beef burger with cheddar, lettuce, tomato and hand-cut fries", category: "cold-drinks" as const, price: 38.00, image_url: "https://img05.restaurantguru.com/rd51-Mighty-Coffee-burger-2025-07.jpg", featured: true },
  { id: "7", name: "Milkshake", description: "Thick and creamy milkshake in vanilla, chocolate or strawberry", category: "cold-drinks" as const, price: 32.00, image_url: "https://images.pexels.com/photos/28525199/pexels-photo-28525199.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "8", name: "Fresh Juice", description: "Freshly squeezed orange or seasonal fruit juice", category: "cold-drinks" as const, price: 28.00, image_url: "https://images.pexels.com/photos/4958852/pexels-photo-4958852.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "9", name: "Smoothie", description: "Blended seasonal fruits with yogurt and honey", category: "cold-drinks" as const, price: 35.00, image_url: "https://images.pexels.com/photos/5337719/pexels-photo-5337719.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "10", name: "Full Breakfast", description: "Eggs, bacon, sausage, grilled tomato, toast, and baked beans", category: "breakfast" as const, price: 75.00, image_url: "https://img05.restaurantguru.com/rc37-meals-Mighty-Coffee-2025-07.jpg", featured: true },
  { id: "11", name: "Breakfast Burger", description: "Beef patty with egg, cheese and bacon on a toasted bun", category: "breakfast" as const, price: 45.00, image_url: "https://img05.restaurantguru.com/r24e-Mighty-Coffee-burger-2025-07-1.jpg", featured: false },
  { id: "12", name: "Eggs Benedict", description: "Poached eggs on toasted muffin with hollandaise sauce", category: "breakfast" as const, price: 55.00, image_url: "https://img05.restaurantguru.com/rd1e-food-Mighty-Coffee-2022-09.jpg", featured: false },
  { id: "13", name: "Chicken Burger", description: "Grilled chicken fillet burger with fresh salad and aioli", category: "breakfast" as const, price: 42.00, image_url: "https://images.pexels.com/photos/15076692/pexels-photo-15076692.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "14", name: "Chocolate Mousse", description: "Rich and creamy Belgian chocolate mousse", category: "desserts" as const, price: 35.00, image_url: "https://images.pexels.com/photos/7819053/pexels-photo-7819053.jpeg?auto=compress&cs=tinysrgb&w=400", featured: true },
  { id: "15", name: "Cheese Platter", description: "Selection of fine cheeses with crackers and chutney", category: "desserts" as const, price: 48.00, image_url: "https://images.pexels.com/photos/7175715/pexels-photo-7175715.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
  { id: "16", name: "French Fries", description: "Crispy golden hand-cut fries with dipping sauce", category: "desserts" as const, price: 22.00, image_url: "https://images.pexels.com/photos/29150162/pexels-photo-29150162.jpeg?auto=compress&cs=tinysrgb&w=400", featured: false },
];

export default function MenuPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-espresso to-espresso-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Menu
            </motion.h1>
            <motion.p variants={fadeIn} className="text-cream/70 text-lg max-w-xl mx-auto">
              Crafted with passion, served with love
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </section>

      <section className="pb-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <MenuSkeleton />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No items found matching your search.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

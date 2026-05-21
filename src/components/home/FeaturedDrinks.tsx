"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, CupSoda, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";
import { formatPrice } from "@/lib/utils";

const FEATURED_ITEMS = [
  {
    id: "1",
    name: "Espresso Mighty",
    description: "Double shot espresso with a velvety crema, locally roasted beans",
    price: 28.00,
    category: "coffee",
    image: "https://images.pexels.com/photos/5169124/pexels-photo-5169124.jpeg?auto=compress&cs=tinysrgb&w=400",
    featured: true,
  },
  {
    id: "2",
    name: "Caramel Latte",
    description: "Smooth latte with house-made caramel drizzle",
    price: 35.00,
    category: "coffee",
    image: "https://images.pexels.com/photos/5567646/pexels-photo-5567646.jpeg?auto=compress&cs=tinysrgb&w=400",
    featured: true,
  },
  {
    id: "3",
    name: "Grilled Burger",
    description: "Juicy grilled beef burger with cheddar and hand-cut fries",
    price: 38.00,
    category: "cold-drinks",
    image: "https://img05.restaurantguru.com/r8b7-burger-Mighty-Coffee-2022-09-2.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "Breakfast Plate",
    description: "Full breakfast with eggs, bacon, toast and fresh coffee",
    price: 45.00,
    category: "breakfast",
    image: "https://img05.restaurantguru.com/rc37-meals-Mighty-Coffee-2025-07.jpg",
    featured: true,
  },
];

export function FeaturedDrinks() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 skeleton rounded mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream dark:bg-matte-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso dark:text-cream mb-4">
            Our Signature Selection
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Handpicked favorites crafted by our baristas
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURED_ITEMS.map((item) => (
            <motion.div key={item.id} variants={fadeIn}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.featured && (
                    <Badge variant="gold" className="absolute top-3 left-3 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    {item.category === "coffee" ? (
                      <Coffee className="w-4 h-4 text-caramel" />
                    ) : (
                      <CupSoda className="w-4 h-4 text-caramel" />
                    )}
                    <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-espresso dark:text-cream mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-caramel font-bold text-lg">{formatPrice(item.price)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

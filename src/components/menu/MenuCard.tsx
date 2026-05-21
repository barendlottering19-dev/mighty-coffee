"use client";

import { motion } from "framer-motion";
import { Coffee, CupSoda, EggFried, CakeSlice, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { cardHover, fadeIn } from "@/lib/animations";

const categoryIcons = {
  coffee: Coffee,
  "cold-drinks": CupSoda,
  breakfast: EggFried,
  desserts: CakeSlice,
};

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    category: keyof typeof categoryIcons;
    price: number;
    image_url?: string;
    featured?: boolean;
  };
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  const Icon = categoryIcons[item.category];

  return (
    <motion.div
      variants={fadeIn}
      custom={index}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        className="h-full"
      >
        <Card className="group overflow-hidden h-full">
          {item.image_url && (
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {item.featured && (
                <Badge variant="gold" className="absolute top-3 left-3 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Popular
                </Badge>
              )}
            </div>
          )}
          <CardContent className={item.image_url ? "p-4" : "p-6"}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon className="w-4 h-4 text-caramel" />
              <span className="text-xs text-muted-foreground capitalize">
                {item.category.replace("-", " ")}
              </span>
            </div>
            <h3 className="font-semibold text-espresso dark:text-cream mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>
            <p className="text-caramel font-bold text-lg">{formatPrice(item.price)}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

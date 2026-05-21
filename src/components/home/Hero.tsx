"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) return <HeroSkeleton />;

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-espresso/80 z-10" />
        <img
          src="https://img05.restaurantguru.com/re65-Mighty-Coffee-interior-2025-07-1.jpg"
          alt="Coffee shop interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Coffee className="w-16 h-16 text-caramel mx-auto mb-4 animate-float" />
          <span className="inline-block px-4 py-1.5 bg-caramel/20 backdrop-blur-sm rounded-full text-caramel text-sm font-medium mb-6">
            Premium Coffee in Vanderbijlpark
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          Mighty
          <span className="text-caramel block sm:inline"> Coffee</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl"
        >
          Handcrafted with passion. Served with love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/menu">
            <Button size="lg" className="bg-caramel hover:bg-caramel-dark text-white w-full sm:w-auto">
              View Our Menu
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
              Visit Us
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Steam particles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full animate-steam"
          style={{
            left: `${30 + i * 20}%`,
            bottom: "40%",
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </section>
  );
}

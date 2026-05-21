"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, Users, Award } from "lucide-react";
import { fadeIn, fadeInLeft, fadeInRight, staggerContainer, counterAnimation } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { icon: Coffee, value: "500+", label: "Cups Served Daily" },
  { icon: Users, value: "5K+", label: "Happy Customers" },
  { icon: Heart, value: "7", label: "Years of Service" },
  { icon: Award, value: "2", label: "Local Awards" },
];

const team = [
  { name: "Anita Mokoena", role: "Head Barista & Owner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "David van Wyk", role: "Master Roaster", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Priya Singh", role: "Pastry Chef", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-espresso to-espresso-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Story
            </motion.h1>
            <motion.p variants={fadeIn} className="text-cream/70 text-lg max-w-2xl mx-auto">
              From a simple passion for great coffee to a beloved community hub in Vanderbijlpark.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
              <h2 className="text-3xl font-bold text-espresso dark:text-cream mb-6">
                More Than Just Coffee
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Mighty Coffee was born from a simple belief: that great coffee has the power to bring people together. 
                  Located on Ravel Street in Vanderbijlpark, we have been serving our community since 2019.
                </p>
                <p>
                  We source our beans from ethical farms across Africa, roast them locally to perfection, 
                  and craft each cup with care. Every drink tells a story of quality, passion, and community.
                </p>
                <p>
                  Whether you are here for your morning espresso, a working brunch, or an afternoon treat, 
                  you are family. Welcome to Mighty Coffee.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/menu">
                  <Button>View Our Menu</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Get in Touch</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://img05.restaurantguru.com/r6f0-Mighty-Coffee-design-2025-07.jpg"
                  alt="Mighty Coffee interior"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-espresso-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={counterAnimation} className="text-center">
                <stat.icon className="w-10 h-10 text-caramel mx-auto mb-3" />
                <p className="text-3xl sm:text-4xl font-bold text-espresso dark:text-cream mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-espresso dark:text-cream text-center mb-12">
              Meet the Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div key={member.name} variants={fadeIn} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg bg-caramel/20 flex items-center justify-center">
                    <Coffee className="w-12 h-12 text-caramel" />
                  </div>
                  <h3 className="text-lg font-semibold text-espresso dark:text-cream">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

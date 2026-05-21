"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TestimonialSkeleton } from "@/components/skeletons/TestimonialSkeleton";

const REVIEWS = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    text: "Best coffee in Vanderbijlpark! The caramel latte is absolutely divine. The atmosphere is warm and inviting, perfect for a morning meeting or catching up with friends.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "2",
    name: "James K.",
    rating: 5,
    text: "Discovered this gem recently. The breakfast croissant is phenomenal and the espresso is top-notch. The baristas really know their craft.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "3",
    name: "Linda R.",
    rating: 5,
    text: "A wonderful local coffee shop with genuine warmth. Their iced mocha is my go-to. Highly recommend the dessert selection too!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    id: "4",
    name: "Thabo N.",
    rating: 4,
    text: "Great ambience, excellent service, and consistently good coffee. The outdoor seating area is lovely on a sunny morning.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % REVIEWS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  if (loading) return (
    <section className="py-20 bg-cream dark:bg-matte-black">
      <div className="max-w-4xl mx-auto px-4">
        <TestimonialSkeleton />
      </div>
    </section>
  );

  return (
    <section className="py-20 bg-cream dark:bg-matte-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso dark:text-cream mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">Real reviews from real coffee lovers</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-espresso-light shadow-lg p-8 md:p-12">
            <Quote className="w-10 h-10 text-caramel/20 mb-4" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl text-espresso dark:text-cream leading-relaxed mb-6 italic">
                  &ldquo;{REVIEWS[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={REVIEWS[current].avatar} />
                    <AvatarFallback className="bg-caramel/10 text-caramel">
                      {REVIEWS[current].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-espresso dark:text-cream">{REVIEWS[current].name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < REVIEWS[current].rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" onClick={goPrev} className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-caramel w-6" : "bg-caramel/30"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={goNext} className="rounded-full">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

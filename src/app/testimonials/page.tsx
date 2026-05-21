"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { TestimonialSkeleton } from "@/components/skeletons/TestimonialSkeleton";
import { toast } from "sonner";

const REVIEWS = [
  { id: "1", name: "Sarah M.", rating: 5, text: "Best coffee in Vanderbijlpark! The caramel latte is absolutely divine. The atmosphere is warm and inviting, perfect for a morning meeting or catching up with friends.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", date: "2024-11-15" },
  { id: "2", name: "James K.", rating: 5, text: "Discovered this gem recently. The breakfast croissant is phenomenal and the espresso is top-notch. The baristas really know their craft.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", date: "2024-10-22" },
  { id: "3", name: "Linda R.", rating: 5, text: "A wonderful local coffee shop with genuine warmth. Their iced mocha is my go-to. Highly recommend the dessert selection too!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", date: "2024-09-10" },
  { id: "4", name: "Thabo N.", rating: 4, text: "Great ambience, excellent service, and consistently good coffee. The outdoor seating area is lovely on a sunny morning.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", date: "2024-08-05" },
  { id: "5", name: "Michelle P.", rating: 5, text: "The mocha here is my happy place. Friendly staff, cosy vibes, and the best pastries in town. Highly recommend the chocolate croissant!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", date: "2024-07-18" },
  { id: "6", name: "Chris D.", rating: 5, text: "Mighty Coffee is a true gem. The cold brew is smooth as silk and the team always greets you with a smile. A must-visit!", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80", date: "2024-06-30" },
];

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Thank you for your review!");
    setFormData({ name: "", rating: 5, text: "" });
    setSubmitting(false);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-espresso to-espresso-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              What Our Customers Say
            </motion.h1>
            <motion.p variants={fadeIn} className="text-cream/70 text-lg max-w-xl mx-auto">
              Real reviews from our wonderful community
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <TestimonialSkeleton />
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((review) => (
                <motion.div key={review.id} variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-caramel/20 mb-3" />
                      <p className="text-muted-foreground mb-4 line-clamp-4 leading-relaxed">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback className="bg-caramel/10 text-caramel">{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-espresso dark:text-cream text-sm">{review.name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-16 max-w-lg mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-espresso dark:text-cream mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="review-name">Name</Label>
                    <Input id="review-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" required />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="p-0.5">
                          <Star className={`w-6 h-6 transition-colors ${star <= formData.rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="review-text">Review</Label>
                    <Textarea id="review-text" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} placeholder="Share your experience..." required />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, X, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { fadeIn } from "@/lib/animations";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { toast } from "sonner";

const REVIEWS = [
  { id: "1", name: "Sarah M.", rating: 5, text: "Best coffee in Vanderbijlpark!", approved: true },
  { id: "2", name: "James K.", rating: 5, text: "Breakfast croissant is phenomenal.", approved: true },
  { id: "3", name: "Linda R.", rating: 5, text: "A wonderful local coffee shop.", approved: false },
  { id: "4", name: "Thabo N.", rating: 4, text: "Great ambience.", approved: true },
];

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth").then((r) => {
      if (!r.ok) { router.push("/admin/login"); return; }
      setAuth(true);
      setTimeout(() => setLoading(false), 600);
    });
  }, [router]);

  const handleApprove = (_id: string) => toast.success("Review approved (demo)");
  const handleReject = (_id: string) => toast.success("Review rejected (demo)");

  if (!auth) return null;

  return (
    <div className="flex min-h-screen bg-cream dark:bg-matte-black">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-3xl font-bold text-espresso dark:text-cream mb-8">Testimonials</h1>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-espresso dark:text-cream">Manage Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <TableSkeleton rows={4} />
              ) : (
                <div className="space-y-4">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="flex items-start justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-espresso dark:text-cream text-sm">{review.name}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`} />
                            ))}
                          </div>
                          <Badge variant={review.approved ? "default" : "outline"}>
                            {review.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!review.approved && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={() => handleApprove(review.id)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleReject(review.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

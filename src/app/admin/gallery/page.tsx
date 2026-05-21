"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GallerySkeleton } from "@/components/skeletons/GallerySkeleton";
import { fadeIn } from "@/lib/animations";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { toast } from "sonner";

const IMAGES = [
  { id: "1", url: "https://img05.restaurantguru.com/re65-Mighty-Coffee-interior-2025-07-1.jpg", alt: "Interior" },
  { id: "2", url: "https://img05.restaurantguru.com/rded-interior-Mighty-Coffee-2025-07-1.jpg", alt: "Seating area" },
  { id: "3", url: "https://img05.restaurantguru.com/r6f0-Mighty-Coffee-design-2025-07.jpg", alt: "Design" },
  { id: "4", url: "https://img05.restaurantguru.com/rdb7-Mighty-Coffee-beverage-2025-07.jpg", alt: "Beverages" },
  { id: "5", url: "https://img05.restaurantguru.com/rc37-meals-Mighty-Coffee-2025-07.jpg", alt: "Meals" },
  { id: "6", url: "https://img05.restaurantguru.com/r0c2-Mighty-Coffee-exterior.jpg", alt: "Exterior" },
];

export default function AdminGalleryPage() {
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

  const handleDelete = (_id: string) => {
    toast.success("Image deleted (demo)");
  };

  if (!auth) return null;

  return (
    <div className="flex min-h-screen bg-cream dark:bg-matte-black">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-espresso dark:text-cream">Gallery</h1>
            <Button className="bg-caramel hover:bg-caramel-dark">
              <Plus className="w-4 h-4 mr-2" /> Upload Images
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-espresso dark:text-cream">All Images</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <GallerySkeleton />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {IMAGES.map((img) => (
                    <div key={img.id} className="group relative rounded-xl overflow-hidden">
                      <img src={img.url} alt={img.alt} className="w-full h-48 object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(img.id)}>
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { fadeIn } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { toast } from "sonner";

const MENU_ITEMS = [
  { id: "1", name: "Espresso Mighty", category: "coffee", price: 28.00, featured: true, active: true },
  { id: "2", name: "Caramel Latte", category: "coffee", price: 35.00, featured: true, active: true },
  { id: "3", name: "Grilled Burger", category: "cold-drinks", price: 38.00, featured: true, active: true },
  { id: "4", name: "Full Breakfast", category: "breakfast", price: 75.00, featured: true, active: true },
  { id: "5", name: "Chocolate Mousse", category: "desserts", price: 35.00, featured: false, active: true },
];

export default function AdminMenuItemsPage() {
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
    toast.success("Item deleted (demo)");
    toast.success("Item deleted (demo)");
  };

  if (!auth) return null;

  return (
    <div className="flex min-h-screen bg-cream dark:bg-matte-black">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-espresso dark:text-cream">Menu Items</h1>
            <Button className="bg-caramel hover:bg-caramel-dark">
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-espresso dark:text-cream">All Items</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <TableSkeleton rows={5} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left text-sm text-muted-foreground">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MENU_ITEMS.map((item) => (
                        <tr key={item.id} className="border-b border-border last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <Coffee className="w-4 h-4 text-caramel" />
                              <span className="text-sm font-medium text-espresso dark:text-cream">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground capitalize">{item.category}</td>
                          <td className="py-4 text-sm font-medium text-espresso dark:text-cream">{formatPrice(item.price)}</td>
                          <td className="py-4">
                            <Badge variant={item.featured ? "gold" : "outline"}>{item.featured ? "Featured" : "Standard"}</Badge>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

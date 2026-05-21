"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coffee, Users, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const stats = [
  { icon: Coffee, label: "Menu Items", value: "16", color: "text-caramel bg-caramel/10" },
  { icon: Users, label: "Total Reviews", value: "24", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10" },
  { icon: Star, label: "Avg Rating", value: "4.8", color: "text-gold bg-gold/10" },
  { icon: MessageSquare, label: "Messages", value: "12", color: "text-green-500 bg-green-50 dark:bg-green-500/10" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth").then((r) => {
      if (!r.ok) { router.push("/admin/login"); return; }
      setAuth(true);
      setTimeout(() => setLoading(false), 800);
    });
  }, [router]);

  if (!auth) return null;

  return (
    <div className="flex min-h-screen bg-cream dark:bg-matte-black">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 variants={fadeIn} className="text-3xl font-bold text-espresso dark:text-cream mb-8">
            Dashboard
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 skeleton rounded-xl" />
              ))
            ) : (
              stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeIn}>
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-espresso dark:text-cream">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-espresso dark:text-cream">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <TableSkeleton rows={4} />
              ) : (
                <div className="space-y-4">
                  {[
                    { action: "Menu item updated", time: "2 hours ago" },
                    { action: "New testimonial submitted", time: "5 hours ago" },
                    { action: "Contact form inquiry received", time: "1 day ago" },
                    { action: "Gallery image uploaded", time: "2 days ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <p className="text-sm text-espresso dark:text-cream">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
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

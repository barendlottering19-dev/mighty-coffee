"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, MousePointerClick, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const analyticsData = [
  { icon: Eye, label: "Page Views", value: "2,847", change: "+12%", positive: true },
  { icon: MousePointerClick, label: "Click Rate", value: "64%", change: "+3%", positive: true },
  { icon: Calendar, label: "Avg. Session", value: "3m 42s", change: "-2%", positive: false },
  { icon: TrendingUp, label: "Conversion", value: "4.8%", change: "+0.6%", positive: true },
];

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then((r) => {
      if (!r.ok) { router.push("/admin/login"); return; }
      setAuth(true);
    });
  }, [router]);

  if (!auth) return null;

  return (
    <div className="flex min-h-screen bg-cream dark:bg-matte-black">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <h1 className="text-3xl font-bold text-espresso dark:text-cream mb-8">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsData.map((item) => (
              <motion.div key={item.label} variants={fadeIn}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <item.icon className="w-5 h-5 text-caramel" />
                      <span className={`text-sm font-medium ${item.positive ? "text-green-500" : "text-destructive"}`}>{item.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-espresso dark:text-cream mb-1">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-espresso dark:text-cream mb-4">Traffic Overview</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">Analytics chart will appear here when connected to a data source</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

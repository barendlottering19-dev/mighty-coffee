import Link from "next/link";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-matte-black px-4">
      <Coffee className="w-20 h-20 text-caramel mb-6" />
      <h1 className="text-6xl font-bold text-espresso dark:text-cream mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Oops! This page seems to have wandered off.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-caramel hover:bg-caramel-dark text-white">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

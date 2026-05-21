import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const menuItemSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  category: z.enum(["coffee", "cold-drinks", "breakfast", "desserts"]),
  price: z.number().positive(),
  image_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  rating: z.number().min(1).max(5),
  text: z.string().min(10).max(1000),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, WebP, and AVIF images are allowed" };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 5MB" };
  }
  return { valid: true };
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

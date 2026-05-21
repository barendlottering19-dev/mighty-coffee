export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: "coffee" | "cold-drinks" | "breakfast" | "desserts";
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  order_index: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar_url: string;
  approved: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  details: string;
  ip_address: string;
  created_at: string;
}

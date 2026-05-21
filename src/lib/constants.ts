export const BUSINESS = {
  name: "Mighty Coffee",
  tagline: "Brewing Excellence Every Morning",
  description: "Premium coffee shop in Vanderbijlpark, Gauteng. Serving handcrafted coffee, breakfast, and desserts in a warm, inviting atmosphere.",
  address: {
    street: "82 Ravel St",
    suburb: "Mantervrede AH",
    city: "Vanderbijlpark",
    province: "Gauteng",
    postcode: "1911",
    country: "South Africa",
    full: "82 Ravel St, Mantervrede AH, Vanderbijlpark, 1911, South Africa",
  },
  coordinates: {
    lat: -26.7406978,
    lng: 27.8116016,
  },
  phone: "082 701 5722",
  altPhone: "082 894 0136",
  email: "hello@mightycafe.co.za",
  hours: [
    { day: "Monday", open: "07:00", close: "17:00" },
    { day: "Tuesday", open: "07:00", close: "17:00" },
    { day: "Wednesday", open: "07:00", close: "17:00" },
    { day: "Thursday", open: "07:00", close: "17:00" },
    { day: "Friday", open: "07:00", close: "18:00" },
    { day: "Saturday", open: "08:00", close: "15:00" },
    { day: "Sunday", open: "08:00", close: "13:00" },
  ],
  social: {
    instagram: "https://www.instagram.com/p/DGz-16LKNwP/",
    facebook: "https://www.facebook.com/100063191080501",
    twitter: "https://twitter.com/mightycoffee",
    tiktok: "https://www.tiktok.com/@mighty.coffee",
  },
};

export const MENU_CATEGORIES = [
  { id: "coffee", label: "Coffee", icon: "Coffee" },
  { id: "cold-drinks", label: "Cold Drinks", icon: "CupSoda" },
  { id: "breakfast", label: "Breakfast", icon: "EggFried" },
  { id: "desserts", label: "Desserts", icon: "CakeSlice" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mighty Coffee | Premium Coffee in Vanderbijlpark",
    template: "%s | Mighty Coffee",
  },
  description: "Premium coffee shop in Vanderbijlpark, Gauteng. Serving handcrafted coffee, breakfast, and desserts in a warm, inviting atmosphere.",
  keywords: ["coffee", "cafe", "Vanderbijlpark", "Gauteng", "coffee shop", "breakfast", "desserts"],
  openGraph: {
    title: "Mighty Coffee | Premium Coffee in Vanderbijlpark",
    description: "Handcrafted coffee, breakfast & desserts in Vanderbijlpark.",
    type: "website",
    locale: "en_ZA",
    siteName: "Mighty Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mighty Coffee",
    description: "Handcrafted coffee, breakfast & desserts in Vanderbijlpark.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mightycafe.co.za"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: { borderRadius: "var(--radius)" },
          }}
        />
      </body>
    </html>
  );
}

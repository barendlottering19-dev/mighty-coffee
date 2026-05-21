import Link from "next/link";
import { Coffee, MapPin, Phone, Mail, Globe, Camera, MessageCircle } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Coffee className="w-7 h-7 text-caramel" />
              <span className="text-lg font-bold">Mighty Coffee</span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed">
              {BUSINESS.description}
            </p>
            <div className="flex gap-3">
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-caramel/20 transition-colors" aria-label="Instagram">
                <Camera className="w-4 h-4" />
              </a>
              <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-caramel/20 transition-colors" aria-label="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href={BUSINESS.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/10 hover:bg-caramel/20 transition-colors" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/70 hover:text-caramel transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm text-cream/70">
                  <span>{h.day}</span>
                  <span>{h.open} - {h.close}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 text-sm text-cream/70 hover:text-caramel transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{BUSINESS.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-sm text-cream/70 hover:text-caramel transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{BUSINESS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS.address.full}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/50">
          <p>&copy; {currentYear} Mighty Coffee. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-caramel transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-caramel transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

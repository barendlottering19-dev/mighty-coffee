"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function MapsSection() {
  const { lat, lng } = BUSINESS.coordinates;
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e945b1ba36f0a25%3A0xfd43be65027abd79!2sMighty+Coffee!5e0!3m2!1sen!2sza!4v1`;

  return (
    <section className="py-16 bg-white dark:bg-espresso-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-espresso dark:text-cream mb-6">
              Find Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-caramel mt-1 flex-shrink-0" />
                <div>
                  <p className="text-espresso dark:text-cream font-medium">Address</p>
                  <p className="text-muted-foreground text-sm">{BUSINESS.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-caramel mt-1 flex-shrink-0" />
                <div>
                  <p className="text-espresso dark:text-cream font-medium">Opening Hours</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {BUSINESS.hours.map((h) => (
                      <p key={h.day} className="flex justify-between max-w-[200px]">
                        <span>{h.day}</span>
                        <span>{h.open} - {h.close}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg h-[400px]"
          >
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mighty Coffee location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

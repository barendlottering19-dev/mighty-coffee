"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animations";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface MasonryGridProps {
  images: GalleryImage[];
}

export function MasonryGrid({ images }: MasonryGridProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const openModal = (index: number) => setSelected(index);
  const closeModal = () => setSelected(null);

  const goNext = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const goPrev = () => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            variants={fadeIn}
            className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden"
            onClick={() => openModal(index)}
          >
            <div className="skeleton absolute inset-0" />
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-105 relative z-10"
              loading="lazy"
              onLoad={(e) => {
                const target = e.currentTarget;
                target.previousElementSibling?.classList.add("opacity-0");
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-xl flex items-center justify-center">
              <div className="text-white text-center p-4">
                <p className="font-medium">{image.alt}</p>
                {image.caption && (
                  <p className="text-sm text-white/70 mt-1">{image.caption}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-5xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].url}
                alt={images[selected].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              <div className="text-white text-center mt-4">
                <p className="font-medium">{images[selected].alt}</p>
                {images[selected].caption && (
                  <p className="text-sm text-white/70 mt-1">{images[selected].caption}</p>
                )}
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { memo, useMemo } from "react";

// Memoize the image components to prevent unnecessary re-renders
const GalleryImage = memo(({ src, alt, sizes, priority = false }: { 
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes={sizes}
    className="object-cover will-change-transform" // Adding will-change for GPU acceleration
    loading={priority ? "eager" : "lazy"}
    priority={priority}
  />
));

GalleryImage.displayName = "GalleryImage";

export function PhotoGallery() {
  // Detect if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants to prevent recalculation on re-renders
  const animations = useMemo(() => {
    // Use simpler animation if reduced motion is preferred
    if (prefersReducedMotion) {
      return {
        container: {
          hidden: { opacity: 0 },
          show: { 
            opacity: 1,
            transition: {
              duration: 0.3,
              staggerChildren: 0.03,
            }
          }
        },
        item: {
          hidden: { opacity: 0 },
          show: { 
            opacity: 1,
            transition: {
              duration: 0.3,
            }
          }
        }
      };
    }
    
    // Regular animations
    return {
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            when: "beforeChildren",
            duration: 0.4,
          },
        }
      },
      item: {
        hidden: {
          opacity: 0,
          y: -10,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "tween", // Using tween instead of spring for more predictable animations
            duration: 0.4,
          },
        }
      }
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      variants={animations.container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 grid-rows-3 gap-4 h-full"
      style={{ willChange: "opacity" }}
    >
      <motion.div
        variants={animations.item}
        className="col-span-1 row-span-1 relative rounded-lg overflow-hidden"
        style={{ willChange: "opacity, transform" }}
      >
        <GalleryImage
          src="/customer-2.jpg"
          alt="Happy customer"
          sizes="(max-width: 768px) 33vw, 25vw"
          priority
        />
      </motion.div>
      <motion.div
        variants={animations.item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
        style={{ willChange: "opacity, transform" }}
      >
        <GalleryImage
          src="/customer-1.jpg"
          alt="Happy family"
          sizes="(max-width: 768px) 66vw, 50vw"
          priority
        />
      </motion.div>
      <motion.div
        variants={animations.item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
        style={{ willChange: "opacity, transform" }}
      >
        <GalleryImage
          src="/customer-3.jpg"
          alt="Business customer"
          sizes="(max-width: 768px) 66vw, 50vw"
          priority={false}
        />
      </motion.div>
      <motion.div
        variants={animations.item}
        className="col-span-1 row-span-2 relative rounded-lg overflow-hidden"
        style={{ willChange: "opacity, transform" }}
      >
        <GalleryImage
          src="/customer-4.jpg"
          alt="Happy couple"
          sizes="(max-width: 768px) 33vw, 25vw"
          priority={false}
        />
      </motion.div>
      <motion.div
        variants={animations.item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
        style={{ willChange: "opacity, transform" }}
      >
        <GalleryImage
          src="/customer-5.jpg"
          alt="Senior customer"
          sizes="(max-width: 768px) 66vw, 50vw"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}

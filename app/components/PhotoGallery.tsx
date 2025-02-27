"use client";

import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";

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

// Define the image sets for each grid position
const GRID_IMAGES = {
  leftColumn: [
    { src: "/customer-4.jpg", alt: "Happy couple", sizes: "(max-width: 768px) 33vw, 25vw" },
    { src: "/customer-2.jpg", alt: "Business meeting", sizes: "(max-width: 768px) 33vw, 25vw" },
    { src: "/customer-5.jpg", alt: "Family outdoors", sizes: "(max-width: 768px) 33vw, 25vw" },
  ],
  topRight: [
    { src: "/customer-1.jpg", alt: "Happy family", sizes: "(max-width: 768px) 66vw, 50vw" },
    { src: "/customer-6.jpg", alt: "Office worker", sizes: "(max-width: 768px) 66vw, 50vw" },
    { src: "/customer-7.jpg", alt: "Team collaboration", sizes: "(max-width: 768px) 66vw, 50vw" },
  ],
  bottomRight: [
    { src: "/customer-3.jpg", alt: "Business customer", sizes: "(max-width: 768px) 66vw, 50vw" },
    { src: "/customer-8.jpg", alt: "Customer service", sizes: "(max-width: 768px) 66vw, 50vw" },
    { src: "/customer-9.jpg", alt: "Product demo", sizes: "(max-width: 768px) 66vw, 50vw" },
  ],
};

// Slider configuration - slowed down
const SLIDE_CHANGE_INTERVAL = 7000; // 7 seconds between slides (was 4000)
const GRID_CHANGE_DELAY = 2500; // 2.5 seconds between grid position changes (was 1500)

export function PhotoGallery() {
  // Detect if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // State to track the current image index for each grid position
  const [leftColumnIndex, setLeftColumnIndex] = useState(0);
  const [topRightIndex, setTopRightIndex] = useState(0);
  const [bottomRightIndex, setBottomRightIndex] = useState(0);
  
  // Set up automatic image rotation for each grid position with staggered timing
  useEffect(() => {
    // Left column changes first
    const leftColumnInterval = setInterval(() => {
      setLeftColumnIndex((prevIndex) => 
        prevIndex === GRID_IMAGES.leftColumn.length - 1 ? 0 : prevIndex + 1
      );
      
      // Top right changes after a delay
      setTimeout(() => {
        setTopRightIndex((prevIndex) => 
          prevIndex === GRID_IMAGES.topRight.length - 1 ? 0 : prevIndex + 1
        );
        
        // Bottom right changes after another delay
        setTimeout(() => {
          setBottomRightIndex((prevIndex) => 
            prevIndex === GRID_IMAGES.bottomRight.length - 1 ? 0 : prevIndex + 1
          );
        }, GRID_CHANGE_DELAY);
      }, GRID_CHANGE_DELAY);
    }, SLIDE_CHANGE_INTERVAL);
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(leftColumnInterval);
    };
  }, []);
  
  // Memoize animation variants to prevent recalculation on re-renders
  const animations = useMemo(() => {
    // Use simpler animation if reduced motion is preferred
    if (prefersReducedMotion) {
      return {
        leftEnter: { opacity: 0 },
        leftCenter: { 
          opacity: 1,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        },
        leftExit: { 
          opacity: 0,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        },
        topRightEnter: { opacity: 0 },
        topRightCenter: { 
          opacity: 1,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        },
        topRightExit: { 
          opacity: 0,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        },
        bottomRightEnter: { opacity: 0 },
        bottomRightCenter: { 
          opacity: 1,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        },
        bottomRightExit: { 
          opacity: 0,
          transition: {
            duration: 0.8, // Increased from 0.5
          }
        }
      };
    }
    
    // Regular animations with sliding effects for each grid position - slowed down
    return {
      // Left column slides from bottom to top
      leftEnter: { 
        y: "100%",
        opacity: 1,
      },
      leftCenter: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300 for slower movement
          damping: 25, // Adjusted for smoother motion
          duration: 1.5, // Increased from 0.8
        },
      },
      leftExit: {
        y: "-100%",
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300
          damping: 25, // Adjusted
          duration: 1.5, // Increased from 0.8
        },
      },
      
      // Top right slides from right to left
      topRightEnter: { 
        x: "100%",
        opacity: 1,
      },
      topRightCenter: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300
          damping: 25, // Adjusted
          duration: 1.5, // Increased from 0.8
        },
      },
      topRightExit: {
        x: "-100%",
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300
          damping: 25, // Adjusted
          duration: 1.5, // Increased from 0.8
        },
      },
      
      // Bottom right slides from bottom to top
      bottomRightEnter: { 
        y: "100%",
        opacity: 1,
      },
      bottomRightCenter: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300
          damping: 25, // Adjusted
          duration: 1.5, // Increased from 0.8
        },
      },
      bottomRightExit: {
        y: "-100%",
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced from 300
          damping: 25, // Adjusted
          duration: 1.5, // Increased from 0.8
        },
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
      {/* Left column (spans 2 rows) */}
      <div className="col-span-1 row-span-2 relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`left-${leftColumnIndex}`}
            initial="leftEnter"
            animate="leftCenter"
            exit="leftExit"
            variants={animations}
            className="w-full h-full absolute inset-0"
            style={{ willChange: "transform" }}
          >
            <GalleryImage
              src={GRID_IMAGES.leftColumn[leftColumnIndex].src}
              alt={GRID_IMAGES.leftColumn[leftColumnIndex].alt}
              sizes={GRID_IMAGES.leftColumn[leftColumnIndex].sizes}
              priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Top right */}
      <div className="col-span-1 row-span-1 relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`topRight-${topRightIndex}`}
            initial="topRightEnter"
            animate="topRightCenter"
            exit="topRightExit"
            variants={animations}
            className="w-full h-full absolute inset-0"
            style={{ willChange: "transform" }}
          >
            <GalleryImage
              src={GRID_IMAGES.topRight[topRightIndex].src}
              alt={GRID_IMAGES.topRight[topRightIndex].alt}
              sizes={GRID_IMAGES.topRight[topRightIndex].sizes}
              priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Bottom right */}
      <div className="col-span-1 row-span-1 relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`bottomRight-${bottomRightIndex}`}
            initial="bottomRightEnter"
            animate="bottomRightCenter"
            exit="bottomRightExit"
            variants={animations}
            className="w-full h-full absolute inset-0"
            style={{ willChange: "transform" }}
          >
            <GalleryImage
              src={GRID_IMAGES.bottomRight[bottomRightIndex].src}
              alt={GRID_IMAGES.bottomRight[bottomRightIndex].alt}
              sizes={GRID_IMAGES.bottomRight[bottomRightIndex].sizes}
              priority={false}
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

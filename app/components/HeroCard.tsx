"use client";

import { Card } from "@/app/components/ui/card";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

interface HeroCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function HeroCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: HeroCardProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants to prevent recalculation on re-renders
  const hoverAnimation = useMemo(() => {
    if (prefersReducedMotion) {
      return {};
    }
    return { 
      whileHover: { translateY: -5 },
      transition: { duration: 0.3, type: "tween" }
    };
  }, [prefersReducedMotion]);
  
  return (
    <Link href="/cotacao">
      <motion.div
        {...hoverAnimation}
        className="h-full"
        style={{ willChange: "transform" }}
      >
        <Card className="overflow-hidden h-full flex flex-col group cursor-pointer border-t-0 border-r-0 border-b-0 border-l-4 border-l-primary shadow-sm hover:shadow-md">
          <div className="relative h-[250px] bg-gray-100 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          </div>
          <div className="p-8 flex flex-col flex-grow bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
              {description}
            </p>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-primary font-medium">Ver detalhes</span>
              <div className="w-8 h-8 flex items-center justify-center bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}

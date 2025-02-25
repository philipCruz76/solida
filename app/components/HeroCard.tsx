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
      whileHover: { scale: 1.02 },
      transition: { duration: 0.3, type: "tween" }
    };
  }, [prefersReducedMotion]);
  
  return (
    <Link href="/simulacao">
      <motion.div
        {...hoverAnimation}
        className="h-full"
        style={{ willChange: "transform" }}
      >
        <Card className="overflow-hidden h-[400px] flex flex-col group cursor-pointer">
          <div className="p-8 h-[35%] group-hover:bg-gray-50 transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div className="relative h-[65%] bg-gray-100 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}

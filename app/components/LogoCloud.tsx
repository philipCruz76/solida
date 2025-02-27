"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LogoItem = memo(({ index, shouldAnimate }: { index: number; shouldAnimate: boolean }) => (
  <div
    className={`col-span-1 flex justify-center items-center h-24 desktop:grayscale transition-all duration-200 hover:grayscale-0 border border-gray-100 bg-white ${
      shouldAnimate ? "opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" : "opacity-100"
    }`}
    style={{
      animationDelay: shouldAnimate ? `${0.1 + index * 0.05}s` : "0s",
      willChange: "opacity",
    }}
  >
    <Image
      src={`/logos/client-${index}.svg`}
      alt={`Client ${index}`}
      width={100}
      height={48}
      className="object-contain"
      sizes="100px"
    />
  </div>
));

LogoItem.displayName = "LogoItem";

export function LogoCloud() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Delay animation start to improve initial page load performance
  useEffect(() => {
    // Skip animation for users who prefer reduced motion
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }
    
    // Start animations after a small delay to prioritize main content rendering
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);
  
  return (
    <div className="py-16 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight text-center">
            Nossos Parceiros
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Trabalhamos com as melhores seguradoras do mercado para oferecer serviços de qualidade e condições exclusivas
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <LogoItem key={index} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    </div>
  );
}

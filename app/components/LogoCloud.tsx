"use client";

import Image from "next/image";

export function LogoCloud() {
  return (
    <div className="py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
        <p className="text-center text-xl font-bold text-black/80 animate-fade-in">
          Nossos parceiros
        </p>
        <div className="mt-8 grid grid-cols-2 gap-8 tablet:grid-cols-3 desktop:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`col-span-1 flex justify-center desktop:grayscale transition-all duration-200 hover:grayscale-0 animate-fade-in`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Image
                src={`/logos/client-${index}.svg`}
                alt={`Client ${index}`}
                width={100}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

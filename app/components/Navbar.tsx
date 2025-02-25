"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/solida-logo.png"
                alt="Sólida"
                width={150}
                height={150}
                className="p-4"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden desktop:flex desktop:items-center desktop:space-x-8">
            <Link
              href="/servicos"
              className="text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal"
            >
              Os Nossos Serviços
            </Link>
            <Link
              href="/sobre"
              className="text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal"
            >
              Quem Somos
            </Link>
            <Link
              href={"/blog"}
              className="text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal"
            >
              Blog
            </Link>
            <Link
              href="/contactos"
              className="text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal"
            >
              Contactos
            </Link>
            <Link href="/cliente">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-[15px]"
              >
                Área Cliente
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex desktop:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="desktop:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="space-y-2 px-4 py-4">
              <Link
                href="/servicos"
                className="block px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Os Nossos Serviços
              </Link>
              <Link
                href="/sobre"
                className="block px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Quem Somos
              </Link>
              <Link
                href="/contactos"
                className="block px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contactos
              </Link>
              <div className="px-4 py-2">
                <Link href="/cliente">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-[15px]"
                  >
                    Área Cliente
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

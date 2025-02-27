"use client";

import { useState, useRef, FC, useCallback, RefObject, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Menu, X, ChevronRight, User, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScrollDetection } from "@/app/hooks/useScrollDetection";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { MAIN_NAV_LINKS } from "@/app/constants/navigation";
import { ROUTES } from "@/app/constants/routes";

/**
 * Interface for Navbar component props
 */
interface NavbarProps {
  // Any future props would be defined here
}

/**
 * Primary navigation component for the application.
 * Handles responsive behavior and user navigation through the site.
 * Features a mobile menu that toggles visibility on smaller screens.
 * 
 * @returns A responsive navigation bar with desktop and mobile menu support
 */
export const Navbar: FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook for scroll detection
  const scrolled = useScrollDetection(20);
  
  // Use our custom hook for handling clicks outside the navbar
  useClickOutside(navRef as RefObject<HTMLElement>, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, isMenuOpen);
  
  // Lock body scroll when menu is open
  const lockScroll = useCallback(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);
  
  // Call lockScroll when isMenuOpen changes
  useEffect(() => {
    lockScroll();
    return () => {
      document.body.style.overflow = "";
    };
  }, [lockScroll]);

  // Handle menu toggle with memoized callback
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  
  // Handle menu item click with memoized callback
  const handleMenuItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Common link style for consistency
  const linkStyle =
    "text-white hover:text-white/80 transition-colors font-semibold text-[15px] tracking-normal relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  const mobileLinkStyle =
    "flex items-center justify-between w-full px-4 py-3.5 text-[15px] font-medium text-gray-700 hover:text-primary rounded-lg transition-all duration-200 hover:bg-gray-50 group";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Image
                src="/solida-logo.png"
                alt="Sólida"
                width={150}
                height={150}
                className="p-4"
                priority
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden desktop:flex desktop:items-center desktop:space-x-8">
            {MAIN_NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={scrolled ? 
                  "text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" 
                  : linkStyle}
              >
                {link.name}
              </Link>
            ))}
            <Link href={ROUTES.QUOTATION}>
              <Button
                className={`${
                  scrolled 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-white/90 text-primary hover:bg-white"
                } shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-[15px] px-5 rounded-md`}
              >
                Solicitar Proposta
              </Button>
            </Link>
            <Link href={ROUTES.CLIENT_AREA}>
              <Button
                variant="outline"
                className={`${
                  scrolled 
                    ? "border-primary text-primary hover:bg-primary hover:text-white" 
                    : "bg-transparent border-white text-white hover:bg-white/20"
                } transition-all duration-300 font-semibold text-[15px] rounded-md`}
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
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className={`${
                isMenuOpen 
                  ? "text-gray-700 hover:text-primary" 
                  : (scrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-white/80")
              } hover:bg-transparent transition-all duration-200 ${isMenuOpen ? "rotate-90" : ""}`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu - Using opacity and max-height for smoother transitions */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile Navigation"
          className={`desktop:hidden absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "opacity-100 max-h-[600px]"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">Menu Principal</h3>
            <div className="space-y-1">
              {MAIN_NAV_LINKS.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${mobileLinkStyle} transition-all duration-300 ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={handleMenuItemClick}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="px-4 py-4 mt-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2 py-2 mb-2">Acesso Rápido</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href={ROUTES.QUOTATION} onClick={handleMenuItemClick} className="group">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 shadow-sm transition-all duration-300 font-semibold text-[15px] rounded-md flex items-center justify-center py-5"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  <span>Solicitar Proposta</span>
                </Button>
              </Link>
              <Link href={ROUTES.CLIENT_AREA} onClick={handleMenuItemClick} className="group">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300 font-semibold text-[15px] rounded-md flex items-center justify-center py-5"
                >
                  <User className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  <span>Área Cliente</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="py-3 px-8 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Sólida Seguros. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </nav>
  );
};

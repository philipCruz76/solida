"use client";

import { useState, useRef, FC, useCallback, RefObject, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
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
    "text-gray-700 hover:text-primary transition-colors font-semibold text-[15px] tracking-normal";
  const mobileLinkStyle =
    "block px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={ROUTES.HOME} className="flex items-center">
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
            {MAIN_NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={linkStyle}
              >
                {link.name}
              </Link>
            ))}
            <Link href={ROUTES.CLIENT_AREA}>
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
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-gray-700 hover:text-primary transition-colors"
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
          className={`desktop:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "opacity-100 max-h-[500px]"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="space-y-2 px-4 py-4">
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={mobileLinkStyle}
                onClick={handleMenuItemClick}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-2">
              <Link href={ROUTES.CLIENT_AREA} onClick={handleMenuItemClick}>
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
      </div>
    </nav>
  );
};

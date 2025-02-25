"use client";

import { FC } from 'react';
import Link from "next/link";

/**
 * Interface for navigation link items
 */
interface NavLink {
  name: string;
  href: string;
}

/**
 * Props for the FooterNavSection component
 */
interface FooterNavSectionProps {
  /**
   * The title of the navigation section
   */
  title: string;
  
  /**
   * Array of navigation links to display
   */
  links: NavLink[];
}

/**
 * A reusable component for footer navigation sections.
 * Displays a section title and a list of navigation links.
 * 
 * @param title - The heading for the navigation section
 * @param links - Array of link objects with name and href properties
 * @returns A footer navigation section with title and links
 */
export const FooterNavSection: FC<FooterNavSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={`${title.toLowerCase()}-${item.name.toLowerCase()}`}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}; 
import { ROUTES } from './routes';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

/**
 * Interface for basic navigation links
 */
export interface NavLink {
  name: string;
  href: string;
}

/**
 * Interface for social media links that include an icon
 */
export interface SocialLink extends NavLink {
  icon: React.ElementType;
}

/**
 * Main navigation links used in the Navbar component
 */
export const MAIN_NAV_LINKS: NavLink[] = [
  { name: "Os Nossos Serviços", href: ROUTES.SERVICES },
  { name: "Quem Somos", href: ROUTES.ABOUT },
  { name: "Blog", href: ROUTES.BLOG },
  { name: "Contactos", href: ROUTES.CONTACT },
];

/**
 * Footer navigation sections
 */
export const FOOTER_NAV = {
  SERVICES: [
    { name: "Mediação de Seguros Pessoais", href: `${ROUTES.SERVICES}#pessoais` },
    { name: "Mediação de Seguros Empresariais", href: `${ROUTES.SERVICES}#empresariais` },
  ] as NavLink[],
  
  ABOUT: [
    { name: "Por Que Nós", href: ROUTES.ABOUT },
    { name: "Carreiras", href: ROUTES.CAREERS },
    { name: "Seja um Agente", href: `${ROUTES.CAREERS}#agente` },
  ] as NavLink[],
  
  RESOURCES: [
    { name: "Ferramentas & Dicas", href: ROUTES.RESOURCES },
    { name: "Blog", href: ROUTES.BLOG },
    { name: "FAQs", href: ROUTES.FAQ },
  ] as NavLink[],
  
  CONTACT: [
    { name: "Contacte-nos", href: ROUTES.CONTACT },
    { name: "Obter Cotação", href: ROUTES.SIMULATION },
  ] as NavLink[],
};

/**
 * Social media links for the footer
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/solidamediadoresdeseguros",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/solida.ao",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://ao.linkedin.com/company/sólida-mediação-de-seguros",
  },
]; 
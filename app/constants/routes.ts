/**
 * Application route constants
 * Contains all the main navigation paths used throughout the application
 */
export const ROUTES = {
  HOME: '/',
  SERVICES: '/servicos',
  ABOUT: '/sobre',
  BLOG: '/blog',
  CONTACT: '/contactos',
  CLIENT_AREA: '/cliente',
  PRIVACY: '/privacidade',
  TERMS: '/termos',
  SIMULATION: '/simulacao',
  CAREERS: '/carreiras',
  RESOURCES: '/recursos',
  FAQ: '/faq',
} as const;

/**
 * Type representing the keys of the ROUTES object
 */
export type RouteKey = keyof typeof ROUTES;

/**
 * Type representing the values of the ROUTES object
 */
export type RoutePath = typeof ROUTES[RouteKey]; 
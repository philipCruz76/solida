import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solidaseguros.pt';
  
  // Define main routes
  const routes = [
    '',
    '/sobre',
    '/cotacao',
    '/servicos',
    '/contacto',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add service pages
  const serviceRoutes = [
    '/servicos/vida',
    '/servicos/automovel',
    '/servicos/habitacao',
    '/servicos/saude',
    '/servicos/empresarial',
    '/servicos/acidentes',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
} 
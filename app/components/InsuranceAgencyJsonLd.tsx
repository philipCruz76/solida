import React from 'react';
import { JsonLd } from './JsonLd';

export const InsuranceAgencyJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'Sólida Seguros',
    description: 'Há mais de 20 anos a oferecer soluções de seguros personalizadas para empresas e particulares, com foco em proteção empresarial e gestão de riscos corporativos.',
    url: 'https://solidaseguros.pt',
    logo: 'https://solidaseguros.pt/solida-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Principal, 123',
      addressLocality: 'Lisboa',
      postalCode: '1000-000',
      addressCountry: 'PT'
    },
    telephone: '+351210000000',
    email: 'info@solidaseguros.pt',
    openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
    sameAs: [
      'https://www.facebook.com/solidaseguros',
      'https://www.instagram.com/solidaseguros',
      'https://www.linkedin.com/company/solidaseguros'
    ],
    priceRange: '€€',
    areaServed: {
      '@type': 'Country',
      name: 'Portugal'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Seguros',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguros Empresariais'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Responsabilidade Civil'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguros Patrimoniais'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguros de Vida e Saúde'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguros Automóvel'
          }
        }
      ]
    }
  };

  return <JsonLd data={data} />;
}; 
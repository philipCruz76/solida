import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const InsuranceAgencyJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'Sólida Seguros',
    description: 'Há mais de 20 anos a oferecer soluções de seguros personalizadas para particulares e empresas.',
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
            name: 'Seguros de Vida e Saúde'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguros Automóvel'
          }
        },
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
            name: 'Seguros Habitação'
          }
        }
      ]
    }
  };

  return <JsonLd data={data} />;
};

export const LocalBusinessJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sólida Seguros',
    image: 'https://solidaseguros.pt/solida-logo.png',
    '@id': 'https://solidaseguros.pt',
    url: 'https://solidaseguros.pt',
    telephone: '+351210000000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Principal, 123',
      addressLocality: 'Lisboa',
      postalCode: '1000-000',
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.7223,
      longitude: -9.1393
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  };

  return <JsonLd data={data} />;
};

export const BreadcrumbJsonLd: React.FC<{
  items: Array<{ name: string; item: string }>;
}> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return <JsonLd data={data} />;
};

export const FAQJsonLd: React.FC<{
  questions: Array<{ question: string; answer: string }>;
}> = ({ questions }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}; 
'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { FooterNavSection } from './layout/FooterNavSection';
import { FOOTER_NAV, SOCIAL_LINKS } from '@/app/constants/navigation';
import { ROUTES } from '@/app/constants/routes';

/**
 * Props for the Footer component
 */
interface FooterProps {
  // Any future props would be defined here
}

/**
 * Main footer component for the application.
 * Contains navigation sections, contact information, and social media links.
 *
 * @returns The application footer
 */
export const Footer: FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-10 px-4 tablet:px-6 desktop:px-8 relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-6">
          {/* Contact Info */}
          <div className="desktop:col-span-2">
            <div className="flex items-center mb-4">
              <Link href={ROUTES.HOME} className="block">
                <Image
                  src="/solida-logo.png"
                  alt="Sólida"
                  width={120}
                  height={120}
                  className="h-[100px] w-auto"
                />
              </Link>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+244923590525"
                  className="text-sm hover:text-primary transition-colors"
                  aria-label="Call us at +244 923 590 525"
                >
                  +244 923 590 525
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:geral@solida.co.ao"
                  className="text-sm hover:text-primary transition-colors"
                  aria-label="Email us at geral@solida.co.ao"
                >
                  geral@solida.co.ao
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={`social-${item.name.toLowerCase()}`}
                    href={item.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${item.name} page`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation - Using the reusable FooterNavSection component */}
          <FooterNavSection title="Seguros" links={FOOTER_NAV.SERVICES} />
          <FooterNavSection title="Empresa" links={FOOTER_NAV.ABOUT} />
          <FooterNavSection title="Recursos" links={FOOTER_NAV.RESOURCES} />
          <FooterNavSection title="Contacto" links={FOOTER_NAV.CONTACT} />
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-6 pb-6 border-t border-b border-gray-200">
          <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="mb-4 tablet:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Proteja o seu negócio hoje mesmo
              </h3>
              <p className="text-sm text-gray-600">
                Solicite uma proposta personalizada para a sua empresa
              </p>
            </div>
            <Link href={ROUTES.QUOTATION}>
              <button className="bg-primary hover:bg-primary/90 text-white py-2 px-5 rounded-md shadow-sm hover:shadow-md transition-all duration-300 font-medium text-sm">
                Solicitar Proposta
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4">
          <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="flex flex-col tablet:flex-row tablet:gap-6 text-xs text-gray-500">
              <p>© {currentYear} Sólida Seguros. Todos os direitos reservados.</p>
              <Link href={ROUTES.PRIVACY} className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href={ROUTES.TERMS} className="hover:text-primary transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

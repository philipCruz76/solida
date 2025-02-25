"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Facebook, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const navigation = {
  servicos: [
    { name: "Mediação de Seguros Pessoais", href: "/servicos#pessoais" },
    {
      name: "Mediação de Seguros Empresariais",
      href: "/servicos#empresariais",
    },
  ],
  empresa: [
    { name: "Por Que Nós", href: "/sobre" },
    { name: "Carreiras", href: "/carreiras" },
    { name: "Seja um Agente", href: "/carreiras#agente" },
  ],
  recursos: [
    { name: "Ferramentas & Dicas", href: "/recursos" },
    { name: "Blog", href: "/blog" },
    { name: "FAQs", href: "/faq" },
  ],
  contacto: [
    { name: "Contacte-nos", href: "/contactos" },
    { name: "Obter Cotação", href: "/simulacao" },
  ],
  social: [
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
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-16 px-4 tablet:px-6 desktop:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-6">
          {/* Contact Info */}
          <div className="desktop:col-span-2">
            <Link href="/" className="block mb-6">
              <Image
                src="/solida-logo.png"
                alt="Sólida"
                width={150}
                height={150}
                className="h-[150px] w-auto"
              />
            </Link>
            <p className="text-lg mb-4 text-gray-900 font-medium">
              Estamos aqui para ajudar!
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href="tel:+244923590525"
                  className="hover:text-primary transition-colors"
                >
                  +244 923 590 525
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:geral@solida.co.ao"
                  className="hover:text-primary transition-colors"
                >
                  geral@solida.co.ao
                </a>
              </div>
              <div className="flex items-center gap-4 pt-2">
                {navigation.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Serviços
            </h3>
            <ul className="space-y-2">
              {navigation.servicos.map((item) => (
                <li key={item.name}>
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

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Empresa
            </h3>
            <ul className="space-y-2">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
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

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Recursos
            </h3>
            <ul className="space-y-2">
              {navigation.recursos.map((item) => (
                <li key={item.name}>
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

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contacto
            </h3>
            <ul className="space-y-2">
              {navigation.contacto.map((item) => (
                <li key={item.name}>
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
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="flex flex-col tablet:flex-row tablet:gap-8 text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} Sólida Seguros. Todos os direitos
                reservados.
              </p>
              <Link
                href="/privacidade"
                className="hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="hover:text-primary transition-colors"
              >
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

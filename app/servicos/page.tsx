"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BrokerService {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const personalServices: BrokerService[] = [
  {
    title: "Mediação de Seguros de Vida",
    description:
      "Aconselhamento especializado na escolha do seguro de vida mais adequado às suas necessidades e objetivos.",
    icon: "/icons/life.svg",
    benefits: [
      "Análise comparativa entre seguradoras",
      "Avaliação personalizada de necessidades",
      "Negociação das melhores condições",
      "Acompanhamento na gestão da apólice",
    ],
  },
  {
    title: "Mediação de Seguros de Saúde",
    description:
      "Encontramos e comparamos os melhores planos de saúde disponíveis no mercado.",
    icon: "/icons/health.svg",
    benefits: [
      "Comparação de coberturas e redes",
      "Análise custo-benefício",
      "Aconselhamento personalizado",
      "Gestão de processos clínicos",
    ],
  },
  {
    title: "Mediação de Seguros Automóvel",
    description:
      "Mediamos as melhores soluções do mercado para a sua viatura, com preços competitivos.",
    icon: "/icons/car.svg",
    benefits: [
      "Comparação entre seguradoras",
      "Coberturas personalizadas",
      "Assistência na gestão de sinistros",
      "Melhores condições negociadas",
    ],
  },
  {
    title: "Mediação de Seguros Habitação",
    description:
      "Analisamos e comparamos diferentes soluções para proteger a sua casa e o seu património.",
    icon: "/icons/home.svg",
    benefits: [
      "Avaliação detalhada do imóvel",
      "Múltiplas opções de cobertura",
      "Soluções à medida",
      "Apoio na gestão de sinistros",
    ],
  },
];

const businessServices: BrokerService[] = [
  {
    title: "Mediação de Seguros Empresariais",
    description:
      "Gestão integral da carteira de seguros da sua empresa, otimizando custos e coberturas.",
    icon: "/icons/business.svg",
    benefits: [
      "Auditoria de riscos",
      "Negociação com seguradoras",
      "Gestão centralizada de apólices",
      "Consultoria permanente",
    ],
  },
  {
    title: "Mediação de Seguros de Frota",
    description:
      "Mediação especializada para gestão eficiente dos seguros da sua frota automóvel.",
    icon: "/icons/fleet.svg",
    benefits: [
      "Gestão centralizada de apólices",
      "Negociação com várias seguradoras",
      "Acompanhamento de sinistros",
      "Soluções à medida da sua frota",
    ],
  },
  {
    title: "Mediação de Seguros de Responsabilidade Civil",
    description:
      "Análise e mediação de seguros de responsabilidade civil adaptados ao seu setor de atividade.",
    icon: "/icons/liability.svg",
    benefits: [
      "Avaliação de riscos específicos",
      "Comparação de coberturas",
      "Aconselhamento especializado",
      "Soluções setoriais",
    ],
  },
  {
    title: "Mediação de Seguros de Grupo",
    description:
      "Mediação de soluções coletivas para os seus colaboradores com condições preferenciais.",
    icon: "/icons/group.svg",
    benefits: [
      "Negociação com seguradoras",
      "Gestão centralizada de benefícios",
      "Soluções personalizadas",
      "Otimização fiscal",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20 bg-white max-w-[100dvw]">
      {/* Hero Section */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 tablet:text-5xl desktop:text-6xl mb-6">
            Serviços de Mediação de Seguros
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Analisamos, comparamos e aconselhamos as melhores soluções de
            seguros para si e para o seu negócio, sempre com total independência
            e transparência.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-12">
            {[...personalServices, ...businessServices].map((product) => (
              <div key={product.title} className="text-left">
                <div className="h-16 w-16 mb-6">
                  <Image
                    src={product.icon}
                    alt={product.title}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <Link href="/simulacao" className="inline-block">
                  <Button variant="outline" className="rounded-full px-6">
                    Saiba mais
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Procura aconselhamento profissional para os seus seguros?
          </h2>
          <p className="text-gray-600 mb-8">
            A nossa equipa de mediadores especializados está disponível para
            analisar as suas necessidades e encontrar as melhores soluções do
            mercado.
          </p>
          <Link href="/contacto">
            <Button className="rounded-full px-8 py-6 text-lg">
              Solicite uma análise gratuita
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

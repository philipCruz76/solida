'use client';

import { motion } from 'framer-motion';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface BrokerService {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const teamMembersImg = ['/team/pedro.jpg', '/team/lucas.jpg', '/team/martim.jpg'];
const personalServices: BrokerService[] = [
  {
    title: 'Mediação de Seguros de Vida',
    description:
      'Aconselhamento especializado na escolha do seguro de vida mais adequado às suas necessidades e objetivos.',
    icon: '/icons/life.svg',
    benefits: [
      'Análise comparativa entre seguradoras',
      'Avaliação personalizada de necessidades',
      'Negociação das melhores condições',
      'Acompanhamento na gestão da apólice',
    ],
  },
  {
    title: 'Mediação de Seguros de Saúde',
    description: 'Encontramos e comparamos os melhores planos de saúde disponíveis no mercado.',
    icon: '/icons/health.svg',
    benefits: [
      'Comparação de coberturas e redes',
      'Análise custo-benefício',
      'Aconselhamento personalizado',
      'Gestão de processos clínicos',
    ],
  },
  {
    title: 'Mediação de Seguros Automóvel',
    description:
      'Mediamos as melhores soluções do mercado para a sua viatura, com preços competitivos.',
    icon: '/icons/car.svg',
    benefits: [
      'Comparação entre seguradoras',
      'Coberturas personalizadas',
      'Assistência na gestão de sinistros',
      'Melhores condições negociadas',
    ],
  },
  {
    title: 'Mediação de Seguros Habitação',
    description:
      'Analisamos e comparamos diferentes soluções para proteger a sua casa e o seu património.',
    icon: '/icons/home.svg',
    benefits: [
      'Avaliação detalhada do imóvel',
      'Múltiplas opções de cobertura',
      'Soluções à medida',
      'Apoio na gestão de sinistros',
    ],
  },
];

const businessServices: BrokerService[] = [
  {
    title: 'Mediação de Seguros Empresariais',
    description:
      'Gestão integral da carteira de seguros da sua empresa, otimizando custos e coberturas.',
    icon: '/icons/business.svg',
    benefits: [
      'Auditoria de riscos',
      'Negociação com seguradoras',
      'Gestão centralizada de apólices',
      'Consultoria permanente',
    ],
  },
  {
    title: 'Mediação de Seguros de Frota',
    description: 'Mediação especializada para gestão eficiente dos seguros da sua frota automóvel.',
    icon: '/icons/fleet.svg',
    benefits: [
      'Gestão centralizada de apólices',
      'Negociação com várias seguradoras',
      'Acompanhamento de sinistros',
      'Soluções à medida da sua frota',
    ],
  },
  {
    title: 'Mediação de Seguros de Responsabilidade Civil',
    description:
      'Análise e mediação de seguros de responsabilidade civil adaptados ao seu setor de atividade.',
    icon: '/icons/liability.svg',
    benefits: [
      'Avaliação de riscos específicos',
      'Comparação de coberturas',
      'Aconselhamento especializado',
      'Soluções setoriais',
    ],
  },
  {
    title: 'Mediação de Seguros de Grupo',
    description:
      'Mediação de soluções coletivas para os seus colaboradores com condições preferenciais.',
    icon: '/icons/group.svg',
    benefits: [
      'Negociação com seguradoras',
      'Gestão centralizada de benefícios',
      'Soluções personalizadas',
      'Otimização fiscal',
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('business');

  return (
    <main className="pt-20 bg-white max-w-[100dvw] overflow-x-hidden">
      {/* Hero Section - Enhanced with more corporate styling */}
      <section className="relative py-28 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-r from-primary to-blue-50 text-white overflow-hidden">
        {/* Grid background pattern similar to landing page */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/20 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/20 rounded-tr-full -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col tablet:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="tablet:w-3/5 text-left tablet:pr-12"
            >
              <span className="text-white font-medium uppercase tracking-wider text-sm bg-white/10 px-3 py-1 rounded-full">
                Soluções Corporativas e Pessoais
              </span>
              <h1 className="text-4xl font-bold text-white tablet:text-5xl desktop:text-6xl mt-2 mb-6">
                Serviços Especializados de Corretagem de Seguros
              </h1>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-lg text-white max-w-2xl">
                Oferecemos soluções abrangentes de seguros para empresas e particulares, com análise
                personalizada, comparação de mercado e aconselhamento especializado para proteger o
                seu negócio e património.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="tablet:w-2/5 mt-12 tablet:mt-0"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-primary rounded-t-lg"></div>
                <Image
                  src="/insurance-hero.jpg"
                  alt="Serviços de Seguros"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section - Enhanced with corporate styling */}
      <section id="servicos" className="py-20 px-4 tablet:px-6 desktop:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-primary font-medium uppercase tracking-wider text-sm"
            >
              Nossas Soluções
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              Serviços Especializados
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 bg-primary mx-auto mt-4 mb-12"
            ></motion.div>

            {/* Tabs - Enhanced with more corporate styling */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 bg-gray-100 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveTab('business')}
                  className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'business'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Seguros Empresariais
                </button>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'personal'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Seguros Pessoais
                </button>
              </div>
            </div>
          </div>

          {/* Business Services - Now shown first by default */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-8 ${
              activeTab === 'business' ? 'block' : 'hidden'
            }`}
          >
            {businessServices.map((service, index) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full overflow-hidden group border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-2 bg-primary w-full"></div>
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors duration-300">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={40}
                          height={40}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Benefícios:</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-600 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/cotacao" className="inline-block">
                          <Button className="bg-primary text-white hover:bg-primary/90 rounded-md px-4 py-2 text-sm transition-colors duration-300">
                            Solicitar proposta
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Personal Services */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-8 ${
              activeTab === 'personal' ? 'block' : 'hidden'
            }`}
          >
            {personalServices.map((service, index) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full overflow-hidden group border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-2 bg-primary w-full"></div>
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors duration-300">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={40}
                          height={40}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Benefícios:</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-600 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/cotacao" className="inline-block">
                          <Button className="bg-primary text-white hover:bg-primary/90 rounded-md px-4 py-2 text-sm transition-colors duration-300">
                            Solicitar proposta
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section - Enhanced with corporate styling */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-primary font-medium uppercase tracking-wider text-sm"
            >
              Como Trabalhamos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              Nosso Processo
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 bg-primary mx-auto mt-4"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Análise',
                description: 'Avaliamos as suas necessidades específicas e objetivos de negócio.',
                icon: '/icons/analysis.svg',
              },
              {
                step: '02',
                title: 'Pesquisa',
                description:
                  'Comparamos as melhores opções disponíveis no mercado para o seu setor.',
                icon: '/icons/search.svg',
              },
              {
                step: '03',
                title: 'Proposta',
                description:
                  'Apresentamos soluções personalizadas com total transparência e detalhe.',
                icon: '/icons/proposal.svg',
              },
              {
                step: '04',
                title: 'Acompanhamento',
                description:
                  'Prestamos assistência contínua na gestão das suas apólices e sinistros.',
                icon: '/icons/support.svg',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full p-6 text-center flex flex-col items-center border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-2 bg-primary w-16 rounded-full mb-4"></div>
                  <div className="text-4xl font-bold text-primary/20 absolute top-4 right-4">
                    {step.step}
                  </div>
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Image src={step.icon} alt={step.title} width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>

                  {index < 3 && (
                    <div className="hidden desktop:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg
                        className="h-8 w-8 text-primary/30"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Enhanced with corporate styling */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-8 tablet:p-12 relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -z-10 clip-path-diagonal"></div>

            <div className="flex flex-col tablet:flex-row items-center">
              <div className="tablet:w-1/3 mb-8 tablet:mb-0">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-full h-full border-2 border-primary/30 rounded-lg"></div>
                  <Image
                    src="/testimonials/joao.jpg"
                    alt="Cliente Satisfeito"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg relative z-10"
                  />
                </div>
              </div>
              <div className="tablet:w-2/3 tablet:pl-12">
                <svg
                  className="h-12 w-12 text-primary/50 mb-6"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl text-gray-100 italic mb-6">
                  "A Sólida transformou completamente a forma como gerimos os nossos seguros. A
                  equipa é extremamente profissional e conseguiu reduzir significativamente os
                  nossos custos, mantendo excelentes coberturas."
                </p>
                <div>
                  <h4 className="font-semibold text-white">Carlos Mendes</h4>
                  <p className="text-primary">Diretor Financeiro, Empresa XYZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col tablet:flex-row items-center justify-between">
            <div className="tablet:w-2/3 mb-8 tablet:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Procura aconselhamento profissional para os seus seguros empresariais?
              </h2>
              <p className="text-white/90 text-lg">
                A nossa equipa de mediadores especializados está disponível para analisar as
                necessidades do seu negócio e encontrar as melhores soluções do mercado, com
                condições exclusivas.
              </p>
              <div className="flex items-center mt-6 space-x-4">
                <div className="flex -space-x-2">
                  {teamMembersImg.map((i, index) => (
                    <div
                      key={index}
                      className="h-10 w-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <Image
                        src={`${i}`}
                        alt={`Agente ${index + 1}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/90">Nossa equipa está pronta para ajudar</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/contacto">
                <Button className="bg-white text-primary hover:bg-gray-100 rounded-md px-8 py-4 text-base font-medium shadow-lg">
                  Solicite uma análise gratuita
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

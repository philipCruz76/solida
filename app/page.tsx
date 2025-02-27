"use client";

import { Button } from "@/app/components/ui/button";
import { HeroCard } from "@/app/components/HeroCard";
import { PhotoGallery } from "@/app/components/PhotoGallery";
import { motion, useReducedMotion } from "framer-motion";
import { LogoCloud } from "@/app/components/LogoCloud";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { InsuranceAgencyJsonLd, FAQJsonLd } from "@/app/components/JsonLd";

export default function Home() {
  // Use reduced motion hook to respect user preferences
  const prefersReducedMotion = useReducedMotion();
  
  const keys = [
    "Segurança para o seu negócio",
    "Proteção para sua empresa",
    "Soluções para seu patrimônio",
  ];
  
  // Memoize animation variants to prevent recalculation on re-renders
  const animations = useMemo(() => {
    // Simplified animations for users who prefer reduced motion
    if (prefersReducedMotion) {
      return {
        fadeIn: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 }
        },
        fadeInUp: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 }
        }
      };
    }
    
    // Regular animations for other users
    return {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" }
      },
      fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };
  }, [prefersReducedMotion]);
  
  // Define the viewport configuration for all sections
  const viewportConfig = { once: true, amount: 0.3, margin: "0px 0px -100px 0px" };
  
  return (
    <>
      <InsuranceAgencyJsonLd />
      <FAQJsonLd 
        questions={[]}
      />
      <main className="bg-white">
        {/* Hero Section with dark background and overlay pattern */}
        <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20 relative overflow-hidden">
          {/* Subtle background pattern */}
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
          
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8 relative z-10">
            <div className="flex flex-col desktop:flex-row desktop:items-center desktop:gap-16">
              <div className="flex flex-col gap-6 desktop:gap-8 desktop:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-sm mb-4 backdrop-blur-sm">
                    MEDIAÇÃO DE SEGUROS EMPRESARIAIS E PARTICULARES
                  </span>
                  <h1 className="text-4xl tablet:text-5xl desktop:text-6xl font-bold uppercase tracking-tight">
                    SÓLIDA SEGUROS
                  </h1>
                  <div className="h-1 w-24 bg-white mt-4 mb-6"></div>
                  <div className="h-[40px] tablet:h-[48px] overflow-hidden font-sans text-lg tablet:text-[28px] font-medium uppercase leading-[40px] tablet:leading-[48px] tracking-wide text-white/90">
                    <span className="relative animate-rotating-text-mobile tablet:animate-rotating-text-desktop">
                      {keys.map((key) => (
                        <i key={key} className="block">
                          {key}
                        </i>
                      ))}
                    </span>
                  </div>
                </motion.div>
                <motion.p 
                  className="desktop:text-lg text-base text-white/90 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Há mais de 20 anos a oferecer soluções de seguros
                  personalizadas para empresas e particulares. Protegemos o seu negócio
                  e o seu patrimônio com expertise e dedicação.
                </motion.p>
                <motion.div 
                  className="flex flex-col gap-3 tablet:flex-row tablet:gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link href="/cotacao" className="w-full tablet:w-auto" aria-label="Pedir simulação de seguro">
                    <Button
                      size="lg"
                      className="w-full px-8 py-6 text-base font-medium bg-white text-primary hover:bg-white/95 
                      shadow-md hover:shadow-lg transition-all duration-300 border-2 border-white
                      relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Solicitar Proposta
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-white 
                      opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                  <Link href="/sobre" className="w-full tablet:w-auto" aria-label="Saber mais sobre a Sólida Seguros">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full px-8 py-6 text-base font-medium border-2 border-white text-white 
                      bg-primary/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg
                      relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Saber Mais
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="desktop:w-1/2 h-[400px] mt-12 desktop:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <PhotoGallery />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Key metrics section with improved visual design */}
        <section className="py-16 border-b border-gray-200 bg-white relative">
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8">
              {[
                { value: "20+", label: "Anos de experiência", delay: 0 },
                { value: "500+", label: "Empresas protegidas", delay: 0.1 },
                { value: "30+", label: "Seguradoras parceiras", delay: 0.2 },
                { value: "98%", label: "Taxa de renovação", delay: 0.3 }
              ].map((metric, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center p-8 border-l-4 border-l-primary bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: metric.delay }}
                >
                  <span className="text-5xl font-bold text-primary mb-2">{metric.value}</span>
                  <p className="text-gray-600 uppercase tracking-wide font-medium">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <LogoCloud />

        {/* Quote/mission section with improved layout */}
        <section className="bg-primary/5 py-20 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
            <div className="desktop:flex desktop:items-center desktop:gap-16">
              <motion.div 
                className="desktop:w-1/2 mb-8 desktop:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-4">
                  Nossa Missão
                </h2>
                <div className="h-1 w-16 bg-primary mb-6"></div>
                <blockquote className="text-xl tablet:text-2xl text-gray-700 italic font-light leading-relaxed mb-6 relative pl-6">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary/30"></div>
                  "Na Sólida Seguros, nossa missão é proporcionar segurança e tranquilidade para empresas e particulares através de soluções de seguros personalizadas, com atendimento dedicado e suporte contínuo."
                </blockquote>
                <p className="text-gray-600">
                  Diretoria Executiva<br/>
                  <strong>Sólida Seguros</strong>
                </p>
              </motion.div>
              <motion.div 
                className="desktop:w-1/2 bg-white p-8 border-l-4 border-l-primary shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Por que escolher a Sólida?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Consultoria especializada para empresas de todos os portes",
                    "Atendimento ágil e suporte integral durante sinistros",
                    "Melhores condições do mercado com negociações exclusivas",
                    "Análise gratuita de apólices empresariais existentes"
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="mr-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <p>{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solutions section with improved cards */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-sm mb-4">
                PARA SUA EMPRESA E PARA VOCÊ
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
                Soluções Personalizadas
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                Oferecemos soluções adaptadas às necessidades específicas do seu negócio e da sua vida pessoal
              </p>
            </motion.div>
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
              <HeroCard
                title="Para Empresas"
                description="Soluções corporativas completas para proteger seu negócio. Desde seguros de responsabilidade civil até proteção patrimonial, cuidamos do que é importante para sua empresa prosperar."
                imageSrc="/insurance-business.jpg"
                imageAlt="Mediação de Seguros Empresarial - Proteção para empresas e negócios"
              />
              <HeroCard
                title="Para Particulares"
                description="Proteja você e sua família com nossas soluções personalizadas. Oferecemos seguros de vida, saúde, automóvel e residencial adaptados às suas necessidades específicas."
                imageSrc="/insurance-hero.jpg"
                imageAlt="Mediação de Seguros Individual - Proteção para particulares e famílias"
              />
            </div>
          </div>
        </section>

        {/* Services section with improved cards and animations */}
        <section className="py-24 bg-gray-50 border-y border-gray-200">
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-sm mb-4">
                NOSSAS ESPECIALIDADES
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
                Seguros Empresariais e Particulares
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                Oferecemos uma gama completa de soluções em seguros, com foco especial em proteção empresarial
              </p>
            </motion.div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
              {[
                {
                  title: "Seguros Empresariais",
                  description:
                    "Soluções completas para proteger seu negócio, desde pequenas empresas até grandes corporações, com coberturas adaptadas ao seu setor.",
                  icon: "/icons/business.svg",
                },
                {
                  title: "Responsabilidade Civil",
                  description:
                    "Proteja sua empresa contra reclamações de terceiros, garantindo a continuidade dos negócios mesmo em situações adversas.",
                  icon: "/icons/liability.svg",
                },
                {
                  title: "Seguros Patrimoniais",
                  description:
                    "Proteção abrangente para instalações, equipamentos e estoques da sua empresa contra diversos riscos e imprevistos.",
                  icon: "/icons/home.svg",
                },
                {
                  title: "Seguros de Vida e Saúde",
                  description:
                    "Proteja o que mais importa: você, sua família e seus colaboradores. Oferecemos coberturas abrangentes para garantir bem-estar.",
                  icon: "/icons/health.svg",
                },
                {
                  title: "Seguros Automóvel",
                  description:
                    "Conduza com tranquilidade. Seguros personalizados para veículos particulares e frotas empresariais com as melhores condições.",
                  icon: "/icons/car.svg",
                },
                {
                  title: "Seguros Diversos",
                  description:
                    "Soluções específicas para necessidades únicas do seu negócio ou vida pessoal, sempre com o melhor atendimento.",
                  icon: "/icons/group.svg",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-none mr-4 border-l-2 border-l-primary">
                        <Image
                          src={service.icon}
                          alt={`Ícone de ${service.title}`}
                          width={24}
                          height={24}
                          className="text-primary"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href="/cotacao" className="text-primary font-medium hover:underline flex items-center group">
                        Solicitar proposta
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/cotacao" aria-label="Solicitar cotação gratuita de seguro">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg"
                >
                  Solicitar Proposta Empresarial
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section with background pattern */}
        <section className="py-24 bg-gradient-to-r from-primary to-blue-400 text-white relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-cta)" />
            </svg>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-sm mb-4 backdrop-blur-sm">
                PROTEÇÃO PARA SUA EMPRESA
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase mb-6">
                Seguros Corporativos
              </h2>
              <div className="w-24 h-1 bg-white mx-auto my-6"></div>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Proteja o futuro da sua empresa com nossas soluções personalizadas
                de seguros corporativos. Garantimos a continuidade do seu negócio.
              </p>
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href="/cotacao" aria-label="Pedir simulação gratuita de seguro de vida">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-primary font-medium shadow-md hover:shadow-lg 
                      transition-all duration-300
                      px-8 py-6 text-lg"
                  >
                    Agendar Consultoria Gratuita
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-24 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 tablet:px-6 desktop:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-sm mb-4">
                O QUE DIZEM NOSSOS CLIENTES
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
                Depoimentos
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                A confiança dos nossos clientes empresariais e particulares é o nosso maior patrimônio
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8">
              {[
                {
                  quote: "Como diretor financeiro, precisava de uma solução completa para nossa empresa. A equipe da Sólida entendeu perfeitamente nossas necessidades e ofereceu o melhor custo-benefício.",
                  author: "João Pereira",
                  role: "Diretor Financeiro",
                  delay: 0
                },
                {
                  quote: "A Sólida Seguros nos ajudou a encontrar a melhor proteção para nossa frota e instalações. O atendimento personalizado fez toda a diferença para nossa empresa.",
                  author: "Carlos Mendes",
                  role: "Empresário",
                  delay: 0.1
                },
                {
                  quote: "Quando precisei acionar o seguro para minha família, tive todo o suporte necessário. Recomendo a todos pela seriedade e compromisso.",
                  author: "Ana Costa",
                  role: "Cliente desde 2015",
                  delay: 0.2
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-8 border-l-4 border-l-primary shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                >
                  <svg className="text-primary h-8 w-8 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

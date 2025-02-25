"use client";

import { Button } from "@/app/components/ui/button";
import { HeroCard } from "@/app/components/HeroCard";
import { PhotoGallery } from "@/app/components/PhotoGallery";
import { motion, useReducedMotion } from "framer-motion";
import { LogoCloud } from "@/app/components/LogoCloud";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  // Use reduced motion hook to respect user preferences
  const prefersReducedMotion = useReducedMotion();
  
  const keys = [
    "Segurança para o óbvio",
    "Estratégia para o improvável",
    "Proteção para o impossível",
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
  
  return (
    <>
      <main className="py-4 bg-gradient-to-b from-blue-50 to-white">
        <motion.section
          initial={animations.fadeIn.initial}
          animate={animations.fadeIn.animate}
          transition={animations.fadeIn.transition}
          className="relative py-6 px-4 tablet:py-20 tablet:px-6 desktop:px-8"
          style={{ willChange: "opacity" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col desktop:flex-row desktop:items-center desktop:gap-16 text-center desktop:text-left">
              <div className="flex flex-col gap-6 desktop:gap-8">
                <motion.div
                  initial={animations.fadeInUp.initial}
                  animate={animations.fadeInUp.animate}
                  transition={animations.fadeInUp.transition}
                  style={{ willChange: "opacity, transform" }}
                >
                  <span className="text-2xl font-bold text-primary tablet:text-4xl desktop:pt-0 desktop:text-6xl">
                    <Image
                      src="/solida-logo.png"
                      alt="Sólida"
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] mx-auto object-contain"
                      priority
                    />
                    <div className="h-[40px] tablet:h-[48px] overflow-hidden font-sans text-lg tablet:text-[28px] font-medium uppercase leading-[40px] tablet:leading-[48px]">
                      <span className="relative animate-rotating-text-mobile tablet:animate-rotating-text-desktop text-gray-900">
                        {keys.map((key) => (
                          <i key={key} className="block">
                            {key}
                          </i>
                        ))}
                      </span>
                    </div>
                  </span>
                </motion.div>
                <motion.p
                  className="desktop:text-lg text-base text-gray-600 leading-relaxed"
                  initial={animations.fadeInUp.initial}
                  animate={animations.fadeInUp.animate}
                  transition={{ ...animations.fadeInUp.transition, delay: 0.3 }}
                  style={{ willChange: "opacity, transform" }}
                >
                  Há mais de 20 anos a oferecer soluções de seguros
                  personalizadas para particulares e empresas. A sua
                  tranquilidade é a nossa prioridade.
                </motion.p>
                <motion.div
                  className="flex flex-col gap-3 tablet:flex-row tablet:gap-4 desktop:justify-start justify-center"
                  initial={animations.fadeInUp.initial}
                  animate={animations.fadeInUp.animate}
                  transition={{ ...animations.fadeInUp.transition, delay: 0.6 }}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Link href="/simulacao" className="w-full tablet:w-auto">
                    <Button
                      size="lg"
                      className="w-full py-6 text-base font-medium bg-primary rounded-xl hover:bg-primary/90 text-white shadow-lg hover:scale-105 transition-all duration-300 shadow-primary/25"
                    >
                      Pedir Simulação
                    </Button>
                  </Link>
                  <Link href="/sobre" className="w-full tablet:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full py-6 text-base font-medium border-primary rounded-xl text-primary hover:scale-105 transition-all duration-300 hover:bg-primary/90 hover:text-white"
                    >
                      Saber Mais
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <div className="desktop:w-[45dvw] h-[500px] mt-12 desktop:mt-0">
                <PhotoGallery />
              </div>
            </div>
          </div>
        </motion.section>
        <div className="mt-12 h-[1px] bg-gray-200" />
        <LogoCloud />

        <motion.section
          initial={animations.fadeInUp.initial}
          whileInView={animations.fadeInUp.animate}
          viewport={{ once: true, amount: 0.1 }}
          transition={animations.fadeInUp.transition}
          className="py-24 px-4 tablet:px-6 desktop:px-8 bg-white"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Soluções Personalizadas
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Oferecemos soluções adaptadas às suas necessidades específicas
              </p>
            </div>
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
              <HeroCard
                title="Para Particulares"
                description="Proteja você e sua família com nossas soluções personalizadas. Oferecemos seguros de vida, saúde, automóvel e residencial adaptados às suas necessidades específicas."
                imageSrc="/insurance-hero.jpg"
                imageAlt="Mediação de Seguros Individual"
              />
              <HeroCard
                title="Para Empresas"
                description="Soluções corporativas completas para proteger seu negócio. Desde seguros de responsabilidade civil até proteção patrimonial, cuidamos do que é importante."
                imageSrc="/insurance-business.jpg"
                imageAlt="Mediação de Seguros Empresarial"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={animations.fadeInUp.initial}
          whileInView={animations.fadeInUp.animate}
          viewport={{ once: true, amount: 0.1 }}
          transition={animations.fadeInUp.transition}
          className="py-20 px-4 tablet:px-6 desktop:px-8"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nossos Serviços de Mediação
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Oferecemos uma gama completa de soluções em seguros, adaptadas
                às suas necessidades específicas
              </p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 tablet:gap-8">
              {[
                {
                  title: "Seguros de Vida e Saúde",
                  description:
                    "Proteja o que mais importa: você e sua família. Oferecemos coberturas abrangentes para garantir seu bem-estar.",
                  icon: "/icons/health.svg",
                },
                {
                  title: "Seguros Automóvel",
                  description:
                    "Conduza com tranquilidade. Seguros personalizados para seu veículo com as melhores condições do mercado.",
                  icon: "/icons/car.svg",
                },
                {
                  title: "Seguros Empresariais",
                  description:
                    "Soluções completas para proteger seu negócio, desde pequenas empresas até grandes corporações.",
                  icon: "/icons/business.svg",
                },
                {
                  title: "Seguros Habitação",
                  description:
                    "Proteja seu lar e patrimônio com coberturas adaptadas às suas necessidades específicas.",
                  icon: "/icons/home.svg",
                },
                {
                  title: "Seguros de Acidentes",
                  description:
                    "Prevenção e proteção para imprevistos, garantindo sua segurança em qualquer situação.",
                  icon: "/icons/liability.svg",
                },
                {
                  title: "Seguros Diversos",
                  description:
                    "Soluções específicas para necessidades únicas, sempre com o melhor atendimento.",
                  icon: "/icons/group.svg",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 tablet:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300
                    border border-gray-100 group
                    opacity-0 translate-y-4
                    animate-[fadeInUp_0.5s_ease-out_forwards]`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    willChange: "opacity, transform"
                  }}
                >
                  <div className="text-3xl tablet:text-4xl mb-4 tablet:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="text-primary"
                    />
                  </div>
                  <h3 className="text-lg tablet:text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm tablet:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/simulacao">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:scale-105 transition-all duration-300 shadow-primary/25"
                >
                  Solicitar Cotação Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={animations.fadeInUp.initial}
          whileInView={animations.fadeInUp.animate}
          viewport={{ once: true, amount: 0.1 }}
          transition={animations.fadeInUp.transition}
          className="py-24 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl mx-4 my-12"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                Seguros de Vida
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Proteja o seu futuro e o da sua família com as nossas soluções
                personalizadas de seguros de vida.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/simulacao">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg 
                      hover:scale-105 transition-all duration-300 shadow-primary/25 
                      px-8 py-6 text-lg rounded-xl"
                  >
                    Pedir Simulação Gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empresária",
    content:
      "A Sólida tem sido fundamental para a proteção do meu negócio. O atendimento personalizado e a rapidez nas resoluções fazem toda a diferença.",
    image: "/testimonials/maria.jpg",
  },
  {
    name: "João Santos",
    role: "Médico",
    content:
      "Excelente experiência com a equipe da Sólida. Profissionais competentes que realmente entendem as necessidades dos clientes.",
    image: "/testimonials/joao.jpg",
  },
  {
    name: "Ana Costa",
    role: "Arquiteta",
    content:
      "Recomendo fortemente os serviços da Sólida. A tranquilidade de ter um seguro bem estruturado não tem preço.",
    image: "/testimonials/ana.jpg",
  },
];

const team = [
  {
    name: "Luís Rodrigues",
    role: "CEO",
    image: "/team/pedro.jpg",
    description: "20+ anos de experiência no mercado de seguros",
  },
  {
    name: "Lucas Filipe",
    role: "Diretor Comercial",
    image: "/team/lucas.JPG",
    description: "Especialista em seguros empresariais",
  },
  {
    name: "Martim Davi",
    role: "Gestor de Sinistros",
    image: "/team/martim.JPG",
    description: "Dedicado a resolver suas necessidades",
  },
];

export default function SobrePage() {
  return (
    <main className="pt-20 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 tablet:px-6 desktop:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 tablet:text-5xl desktop:text-6xl">
              Quem Somos
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Há mais de duas décadas, a Sólida tem sido sinónimo de confiança e
              excelência no mercado de seguros em Angola. Nossa missão é
              proporcionar tranquilidade e segurança através de soluções
              personalizadas para cada cliente.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 tablet:px-6 desktop:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 auto-rows-fr">
            <Card className="p-6 text-center flex flex-col">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/icons/trust.svg"
                  alt="Confiança"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confiança</h3>
              <p className="text-gray-600 flex-grow">
                Construímos relacionamentos duradouros baseados em transparência
                e integridade.
              </p>
            </Card>
            <Card className="p-6 text-center flex flex-col">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/icons/excellence.svg"
                  alt="Excelência"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelência</h3>
              <p className="text-gray-600 flex-grow">
                Buscamos constantemente a excelência em todos os nossos
                serviços.
              </p>
            </Card>
            <Card className="p-6 text-center flex flex-col">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/icons/innovation.svg"
                  alt="Inovação"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovação</h3>
              <p className="text-gray-600 flex-grow">
                Adaptamo-nos às mudanças do mercado para melhor servir nossos
                clientes.
              </p>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 tablet:px-6 desktop:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 auto-rows-fr">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover min-w-12 min-h-12 max-w-12 max-h-12"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic flex-grow">
                  {testimonial.content}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 tablet:px-6 desktop:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossa Equipa
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative min-h-64 max-h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}

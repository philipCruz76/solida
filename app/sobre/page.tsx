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
    image: "/team/team-1.jpg",
    description: "Especialista em seguros empresariais",
  },
  {
    name: "Martim Davi",
    role: "Gestor de Sinistros",
    image: "/team/team-2.jpg",
    description: "Dedicado a resolver suas necessidades",
  },
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function SobrePage() {
  return (
    <main className="pt-20 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Enhanced with asymmetric layout and background elements */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 tablet:px-6 desktop:px-8 overflow-hidden"
      >
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-tr-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col tablet:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="tablet:w-3/5 text-left tablet:pr-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 tablet:text-5xl desktop:text-6xl leading-tight">
                <span className="text-primary">Quem Somos</span>
              </h1>
              <div className="w-20 h-1 bg-primary my-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl">
                Há mais de duas décadas, a Sólida tem sido sinónimo de confiança e
                excelência no mercado de seguros em Angola. Nossa missão é
                proporcionar tranquilidade e segurança através de soluções
                personalizadas para cada cliente.
              </p>
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a href="#valores" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Conheça Nossos Valores
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="tablet:w-2/5 mt-12 tablet:mt-0"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg"></div>
                <Image
                  src="/insurance-business.jpg" 
                  alt="Equipe Sólida"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-xl object-cover"
                  
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


{/* CEO Statement Section */}

<motion.section
  id="ceo-statement"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-24 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-b from-blue-50 to-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col tablet:flex-row items-center gap-8">
      {/* CEO Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="tablet:w-2/5 mb-8 tablet:mb-0"
      >
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg"></div>
          <Image
            src="/team/pedro.jpg"
            alt="CEO da Sólida"
            width={400}
            height={400}
            className="rounded-lg shadow-xl object-cover"
          />
          <div className="absolute -bottom-6 -left-6">
            <svg className="h-16 w-16 text-primary/30" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4z" />
            </svg>
          </div>
        </div>
      </motion.div>
      
      {/* CEO Quote */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="tablet:w-3/5 text-left"
      >
        <p className="text-xl tablet:text-2xl desktop:text-3xl text-primary font-medium leading-relaxed italic mb-6">
          "O nosso portfólio de serviços de seguros está a ser rapidamente adotado para proteger negócios modernos. Com a Sólida, as empresas podem agora aproveitar as capacidades incomparáveis de resiliência e proteção, permitindo aos clientes construir, implementar e operar com muito mais rapidez, facilidade e eficácia de custos."
        </p>
        <div className="flex flex-col tablet:flex-row tablet:items-center justify-between mt-8">
          <div>
            <h3 className="text-xl font-bold text-primary">— Luís Rodrigues</h3>
            <p className="text-gray-600">CEO, Sólida</p>
          </div>
          <motion.div 
            className="mt-6 tablet:mt-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a href="#valores" className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-white transition-colors">
              Saiba mais
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>  
      {/* Values Section - Enhanced with hover effects and improved visual hierarchy */}
      <motion.section
        id="valores"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-4 tablet:px-6 desktop:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-primary font-medium uppercase tracking-wider"
            >
              Nossa Filosofia
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              Nossos Valores
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 bg-primary mx-auto mt-4"
            ></motion.div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 tablet:grid-cols-3 gap-8 auto-rows-fr"
          >
            <motion.div variants={itemVariants}>
              <Card className="p-8 text-center flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary rounded-lg overflow-hidden group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Image
                    src="/icons/trust.svg"
                    alt="Confiança"
                    width={32}
                    height={32}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Confiança</h3>
                <p className="text-gray-600 flex-grow">
                  Construímos relacionamentos duradouros baseados em transparência
                  e integridade.
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="p-8 text-center flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary rounded-lg overflow-hidden group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Image
                    src="/icons/excellence.svg"
                    alt="Excelência"
                    width={32}
                    height={32}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Excelência</h3>
                <p className="text-gray-600 flex-grow">
                  Buscamos constantemente a excelência em todos os nossos
                  serviços.
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="p-8 text-center flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary rounded-lg overflow-hidden group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Image
                    src="/icons/innovation.svg"
                    alt="Inovação"
                    width={32}
                    height={32}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Inovação</h3>
                <p className="text-gray-600 flex-grow">
                  Adaptamo-nos às mudanças do mercado para melhor servir nossos
                  clientes.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section - Enhanced with improved card design and animations */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-4 tablet:px-6 desktop:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-primary font-medium uppercase tracking-wider"
            >
              Depoimentos
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              O Que Dizem Nossos Clientes
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 bg-primary mx-auto mt-4"
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 auto-rows-fr">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white rounded-full p-3 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-primary/30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 italic flex-grow mb-6 text-lg">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover min-w-14 min-h-14 max-w-14 max-h-14 border-2 border-primary/20"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                      }}
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section - Enhanced with improved card design and hover effects */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-4 tablet:px-6 desktop:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-primary font-medium uppercase tracking-wider"
            >
              Profissionais
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              Nossa Equipa
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 bg-primary mx-auto mt-4"
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden h-full flex flex-col rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative min-h-72 max-h-72 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&size=400&background=random`;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex space-x-3 justify-center">
                        <a href="#" className="bg-white/90 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </a>
                        <a href="#" className="bg-white/90 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href="#" className="bg-white/90 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <div className="w-12 h-1 bg-primary/30 mb-4 group-hover:w-20 transition-all duration-300"></div>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* New CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 tablet:px-6 desktop:px-8 bg-gradient-to-r from-primary/90 to-primary text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col tablet:flex-row items-center justify-between">
            <div className="tablet:w-2/3 mb-8 tablet:mb-0">
              <h2 className="text-3xl font-bold mb-4">Pronto para proteger o seu futuro?</h2>
              <p className="text-white/90 text-lg">
                Entre em contacto connosco hoje e descubra como podemos ajudar a proteger o que é mais importante para si.
              </p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="/contacto" className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-md font-medium hover:bg-gray-100 transition-colors">
                Fale Connosco
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

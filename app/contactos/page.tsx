"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    category: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen  bg-white">
      {/* Hero Section with Form */}
      <section className="relative pt-24 from-blue-50 to-white bg-gradient-to-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 desktop:px-8">
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h1 className="text-3xl font-medium text-gray-900 mb-8">
                Fale Connosco
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                  >
                    <option value="">Selecione o tipo de seguro</option>
                    <option value="auto">Automóvel</option>
                    <option value="health">Saúde</option>
                    <option value="life">Vida</option>
                    <option value="home">Habitação</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apelido"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Endereço de email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Número de telefone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                  required
                />
                <textarea
                  placeholder="A sua mensagem"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full border-b border-gray-200 bg-transparent py-3 focus:border-primary focus:outline-none"
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="rounded border-gray-200"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Gostaria de receber notícias e ofertas promocionais da
                    Sólida.
                  </label>
                </div>
                <div className="text-sm text-gray-500">
                  Ao clicar em enviar, concorda com os nossos termos de
                  utilização e política de privacidade.
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden desktop:block"
            >
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src="/insurance-business.jpg"
                  alt="Atendimento Sólida"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 desktop:px-8">
          <h2 className="text-2xl font-semibold text-black mb-12 text-center">
            Informações de Contacto
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary/5 p-8 rounded-xl shadow-sm"
            >
              <FaPhone className="text-primary text-2xl mb-4" />
              <h3 className="font-medium mb-2">Telefone</h3>
              <a
                href="tel:+244923590525"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                +244 923 590 525
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-primary/5 p-8 rounded-xl shadow-sm"
            >
              <FaEnvelope className="text-primary text-2xl mb-4" />
              <h3 className="font-medium mb-2">Email</h3>
              <a
                href="mailto:geral@solida.co.ao"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                geral@solida.co.ao
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary/5 p-8 rounded-xl shadow-sm"
            >
              <FaFacebook className="text-primary text-2xl mb-4" />
              <h3 className="font-medium mb-2">Facebook</h3>
              <a
                href="https://www.facebook.com/solidamediadoresdeseguros"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors break-words overflow-hidden line-clamp-2"
              >
                @solidamediadoresdeseguros
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-primary/5 p-8 rounded-xl shadow-sm"
            >
              <FaLinkedin className="text-primary text-2xl mb-4" />
              <h3 className="font-medium mb-2">LinkedIn</h3>
              <a
                href="https://ao.linkedin.com/company/sólida-mediação-de-seguros"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary  transition-colors"
              >
                Sólida Mediadores de Seguros
              </a>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-primary/5 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                A Nossa Localização
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.5569067330847!2d13.234552!3d-8.816872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15505c4d8b1%3A0x9d5b76e33b589058!2sZenith%20Towers!5e0!3m2!1sen!2sao!4v1710834431037!5m2!1sen!2sao"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

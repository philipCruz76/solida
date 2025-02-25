"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ChevronRight } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface BlogLayoutProps {
  children: React.ReactNode;
}

// Example related posts data (in real app, this would come from your data source)
const relatedPosts = [
  {
    title: "Dicas para escolher o seguro residencial ideal",
    excerpt: "Aprenda a proteger sua casa com a cobertura adequada",
    image: "/blog/home-insurance.jpg",
    slug: "dicas-seguro-residencial",
    author: {
      name: "João Silva",
      image: "/authors/joao.jpg",
    },
    readTime: "4 min de leitura",
  },
  {
    title: "Seguros de viagem: Por que são essenciais",
    excerpt: "Viaje com tranquilidade e segurança",
    image: "/blog/travel-insurance.jpg",
    slug: "importancia-seguro-viagem",
    author: {
      name: "Maria Costa",
      image: "/authors/maria.jpg",
    },
    readTime: "3 min de leitura",
  },
];

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main className="pt-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 tablet:px-6 desktop:px-8">
        {/* Breadcrumb navigation */}
        <nav className="py-4 flex items-center text-sm text-gray-600">
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Artigo</span>
        </nav>

        {/* Main content area */}
        <div className="grid grid-cols-1 desktop:grid-cols-12 gap-8">
          {/* Article content */}
          <motion.article
            className="desktop:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.article>

          {/* Sidebar */}
          <aside className="desktop:col-span-4 space-y-8">
            {/* Table of Contents */}
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Neste Artigo</h3>
                  <nav className="space-y-2">
                    <a
                      href="#introdução"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Introdução
                    </a>
                    <a
                      href="#fatores-importantes-a-considerar"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Fatores Importantes
                    </a>
                    <a
                      href="#tipos-de-planos-disponíveis"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Tipos de Planos
                    </a>
                    <a
                      href="#conclusão"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Conclusão
                    </a>
                  </nav>

                  {/* Share buttons */}
                  <h3 className="font-semibold mb-4 pt-6">Partilhar</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <FaLinkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <FaTwitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      <MdEmail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

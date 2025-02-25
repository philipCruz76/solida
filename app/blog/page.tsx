"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    image: string;
  };
  image: string;
  slug: string;
}

const POSTS_PER_PAGE = 6;

const categories = [
  { name: "Todos", href: "#" },
  { name: "Saúde", href: "#saude" },
  { name: "Automóvel", href: "#automovel" },
  { name: "Vida", href: "#vida" },
  { name: "Empresarial", href: "#empresarial" },
  { name: "Habitação", href: "#habitacao" },
];

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const featuredPosts: BlogPost[] = [
    {
      id: "1",
      title: "Como escolher o melhor seguro de saúde para a sua família",
      excerpt:
        "Guia completo sobre os diferentes tipos de coberturas e benefícios dos seguros de saúde em Angola",
      category: "Saúde",
      readTime: "5 min de leitura",
      author: {
        name: "Ana Silva",
        image: "/testimonials/ana.jpg",
      },
      image: "/blog/blog-cover-1.jpg",
      slug: "escolher-seguro-saude-familia",
    },
    {
      id: "2",
      title: "Seguros empresariais: Proteja o seu negócio",
      excerpt:
        "Descubra as soluções mais adequadas para proteger o seu património empresarial",
      category: "Empresarial",
      readTime: "4 min de leitura",
      author: {
        name: "Pedro Santos",
        image: "/testimonials/joao.jpg",
      },
      image: "/blog/blog-cover-2.jpg",
      slug: "seguros-empresariais-protecao",
    },
  ];

  const recentPosts: BlogPost[] = [
    {
      id: "3",
      title: "Seguro automóvel: O que precisa de saber",
      excerpt:
        "Entenda as coberturas essenciais e opcionais para o seu veículo",
      category: "Automóvel",
      readTime: "6 min de leitura",
      author: {
        name: "Pedro Santos",
        image: "/testimonials/joao.jpg",
      },
      image: "/blog/blog-cover-3.jpg",
      slug: "seguro-automovel-essencial",
    },
    {
      id: "4",
      title: "Seguros de vida: Garantindo o futuro da sua família",
      excerpt:
        "A importância do planeamento financeiro através do seguro de vida",
      category: "Vida",
      readTime: "5 min de leitura",
      author: {
        name: "Sofia Martins",
        image: "/testimonials/maria.jpg",
      },
      image: "/blog/blog-cover-4.jpg",
      slug: "seguro-vida-familia",
    },
  ];

  const allPosts = [...featuredPosts, ...recentPosts];

  const filteredPosts = allPosts.filter(
    (post) => activeCategory === "Todos" || post.category === activeCategory,
  );

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <main className="pt-20 bg-white">
      {/* Featured Post Hero */}
      <section className="relative py-20 px-4 tablet:px-6 desktop:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href={`/blog/${featuredPosts[0].slug}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] tablet:h-[85vh] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <span className="absolute top-8 left-8 z-10 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm text-white font-medium border border-white/20">
                {featuredPosts[0].category}
              </span>
              <Image
                src={featuredPosts[0].image}
                alt={featuredPosts[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 p-8 tablet:p-12 desktop:p-16 max-w-4xl"
              >
                <div className="space-y-8">
                  <h1 className="text-3xl tablet:text-4xl desktop:text-5xl font-bold text-white leading-tight">
                    {featuredPosts[0].title}
                  </h1>
                  <p className="text-white/90 text-base tablet:text-lg leading-relaxed">
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={featuredPosts[0].author.image}
                      alt={featuredPosts[0].author.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white/20"
                    />
                    <div>
                      <p className="font-medium text-white">
                        {featuredPosts[0].author.name}
                      </p>
                      <p className="text-sm text-white/70">
                        {featuredPosts[0].readTime}
                      </p>
                    </div>
                  </div>
                  <Button className="bg-white text-black hover:bg-white/90 transition-colors">
                    Ler mais
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 tablet:px-6 desktop:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`text-base font-medium whitespace-nowrap ${
                  activeCategory === category.name
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 tablet:px-6 desktop:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length > visiblePosts && (
            <div className="mt-12 text-center">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-8"
              >
                Carregar mais
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
          <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white z-10">
            {post.category}
          </span>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-4">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.readTime}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

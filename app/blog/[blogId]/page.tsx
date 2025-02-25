"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import ReactMarkdown from "react-markdown";

// Example blog post data with Markdown content
const blogPost = {
  title: "Como escolher o melhor seguro de saúde para a sua família",
  publishedAt: "2024-03-15",
  category: "Saúde",
  readTime: "5 min de leitura",
  author: {
    name: "Ana Silva",
    image: "/authors/ana.jpg",
    role: "Especialista em Seguros de Saúde",
  },
  coverImage: "/blog/health-insurance.jpg",
  content: `
## Introdução

Escolher o seguro de saúde ideal para sua família é uma decisão **crucial** que impacta diretamente o bem-estar de todos. Com tantas opções disponíveis no mercado, é importante entender os principais aspectos a considerar.

## Fatores Importantes a Considerar

* Cobertura hospitalar e ambulatorial
* Rede de prestadores de serviços
* Coberturas adicionais
* Carências e limitações

## Tipos de Planos Disponíveis

Existem diferentes modalidades de planos de saúde, cada um com suas características específicas. É essencial avaliar qual se adequa melhor às necessidades da sua família. Consulte nossa [guia completa de planos](/guia-planos) para mais informações.

### Planos Básicos
Os planos básicos são ideais para famílias que procuram *cobertura essencial* a um custo acessível.

### Planos Premium
Para famílias que necessitam de cobertura mais ampla, os planos premium oferecem:
1. Rede diferenciada de hospitais
2. Cobertura internacional
3. Telemedicina 24/7

## Conclusão

Investir em um seguro de saúde adequado é fundamental para garantir tranquilidade e acesso a cuidados médicos de qualidade quando necessário. [Entre em contato](/contato) para uma consultoria personalizada.

---

> **Dica:** Sempre compare diferentes operadoras antes de tomar sua decisão.
  `,
};

// Custom heading components that add IDs
const headingComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
};

export default function BlogPost() {
  const params = useParams();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Author and metadata */}
      <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
        <Image
          src="/testimonials/ana.jpg"
          alt="Ana Silva"
          width={40}
          height={40}
          className="rounded-full min-w-12 min-h-12 max-w-12 max-h-12"
        />
        <div>
          <span className="font-medium text-gray-900">Ana Silva</span>
          <div className="flex items-center gap-2">
            <time>12 Janeiro 2024</time>
            <span>•</span>
            <span>5 min de leitura</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-serif mb-8">{blogPost.title}</h1>

      {/* Cover image */}
      <div className="relative aspect-[2/1] mb-8 rounded-xl overflow-hidden">
        <Image
          src="/blog/blog-cover-1.jpg"
          alt="Seguro de saúde familiar"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown components={headingComponents}>
          {blogPost.content}
        </ReactMarkdown>
      </div>

      {/* CTA Section */}
      <div className="mt-12 p-8 bg-blue-50 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          Precisa de ajuda para escolher o melhor seguro?
        </h3>
        <p className="text-gray-600 mb-6">
          A nossa equipa está pronta para ajudar você a encontrar a melhor
          solução para sua família.
        </p>
        <Button size="lg">Fale com um Especialista</Button>
      </div>
    </article>
  );
}

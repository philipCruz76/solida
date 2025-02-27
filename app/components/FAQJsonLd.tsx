interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ questions }: { questions: FAQItem[] }) {
  // Default questions if none are provided
  const defaultQuestions: FAQItem[] = [
    {
      question: "Que tipos de seguros empresariais a Sólida oferece?",
      answer: "A Sólida oferece uma ampla gama de seguros empresariais, incluindo responsabilidade civil, patrimonial, frota, D&O (Directors & Officers), cyber risk, e seguros específicos para cada setor de atividade, todos personalizados para atender às necessidades específicas do seu negócio."
    },
    {
      question: "Como posso solicitar uma proposta de seguro para minha empresa?",
      answer: "Você pode solicitar uma proposta gratuita através do nosso site, clicando no botão 'Solicitar Proposta', ou entrando em contato diretamente conosco por telefone ou email para agendar uma consultoria personalizada."
    },
    {
      question: "A Sólida trabalha com seguros para particulares também?",
      answer: "Sim, além dos seguros empresariais, oferecemos soluções completas para particulares, incluindo seguros de vida, saúde, automóvel e residencial, com o mesmo padrão de qualidade e atendimento personalizado."
    },
    {
      question: "Há quanto tempo a Sólida atua no mercado de seguros?",
      answer: "A Sólida atua há mais de 20 anos no mercado de seguros, oferecendo soluções personalizadas para empresas de todos os portes e para clientes particulares."
    },
    {
      question: "Quais são as vantagens de contratar um corretor de seguros para minha empresa?",
      answer: "Contratar um corretor especializado como a Sólida garante acesso às melhores condições do mercado, negociações exclusivas com as principais seguradoras, análise personalizada de riscos e suporte completo durante toda a vigência da apólice e em caso de sinistros."
    }
  ];

  const faqItems = questions.length > 0 ? questions : defaultQuestions;
} 
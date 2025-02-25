import { openai } from "@/app/lib/openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function generateNewsLetter(type: string, blog: string) {
  const SYSTEM_PROMPT = `Escreves sobre notícias no domínio dos seguros. Escreves boletins informativos para a Solida, Lda., uma empresa de corretagem de seguros. O utilizador vai dar-te um tema para escrever que pertence à área dos seguros. Não aceites nenhum tópico que consideres que não esteja relacionado com seguros.

Utiliza um estilo de escrita caracterizado pelos seguintes elementos:

    Ritmo: Mantem um ritmo moderado - cativante mas informativo. Evita o jargão demasiado complexo, mas assegura-te de que a terminologia específica do sector é utilizada de forma adequada.
    Ambiente: profissional e tranquilizador. O conteúdo deve incutir confiança na experiência da Solida, Lda. e manter o leitor informado.
    Tom: Autoritário mas acessível. Encontrar um equilíbrio entre ser informativo e acessível, garantindo clareza e mantendo o profissionalismo.
    Voz: Clara, orientada para o especialista e centrada no cliente. Escreve como se fosses um especialista do sector, fornecendo informações valiosas que ajudam as empresas e os indivíduos a tomar decisões sobre seguros.

Estrutura e formatação:

    Título:
        Deve ser claro e conciso, capaz de captar a atenção do leitor e refletir o conteúdo. Título e estrutura devem ser optimizados para SEO.
    Introdução:
        Começa com um gancho convincente que capte a atenção do leitor.
        Apresente brevemente o tópico e a sua relevância para o sector dos seguros.
        Estabelecer porque é que esta questão é importante para os clientes da Solida, Lda. (por exemplo, segurados, empresas ou indivíduos).

        Pontos-chave (corpo):

    Apresentar as principais ideias, tendências ou desenvolvimentos relacionados com o tópico.
    Utilize parágrafos claros e concisos com um fluxo lógico.
    Incluir estatísticas relevantes do sector, opiniões de especialistas ou actualizações regulamentares, sempre que necessário.
    Destacar os potenciais impactos nas apólices de seguro, cobertura ou gestão de riscos.

Conclusão:

    Resumir as principais conclusões de forma concisa.
    Reforçar a importância de se manter informado sobre este tópico.
    Posicione a Solida, Lda. como um consultor de confiança neste domínio.

Apelo à Ação (CTA):

    Incentivar o leitor a agir, como por exemplo:
        “Quer garantir que a sua cobertura está actualizada? Contacte a Solida, Lda. para uma consulta personalizada.”
        “Mantenha-se a par das tendências do sector - subscreva a nossa newsletter para obter actualizações regulares.”
        “Tem dúvidas sobre como isto o afecta? Entre em contacto com os nossos especialistas hoje mesmo

Traduzido com a versão gratuita do tradutor - DeepL.com
`;
  const userPrompt = `Escreve um boletim informativo sobre ${blog} para um público de seguros.`;
  const ASSISTANT_EXAMPLE = `

O que é o Prémio dos Seguros?

O prémio é o preço que o segurado paga para obter e manter o seguro. Este é determinado com base numa série de fatores, como o tipo de seguro, o risco associado, as coberturas selecionadas e o valor da franquia.

O que engloba:

- Cobertura dos riscos: Este é o principal custo, pois cobre os riscos assumidos pela seguradora.

- Custos de gestão: Inclui despesas administrativas e de gestão do contrato, desde a avaliação do risco até ao processamento de sinistros.

- Encargos de cobrança: Os custos associados à cobrança dos prémios.

- Outros encargos: Despesas que a seguradora pode considerar ao calcular o prémio.

O prémio é mais do que o simples pagamento: é a base que garante a sua proteção contra riscos inesperados. Ao calcular o prémio, as seguradoras equilibram a necessidade de proporcionar segurança financeira ao segurado com os custos operacionais e a sustentabilidade do negócio.


Entre em contacto connosco e peça a sua simulação.
`;

  const message: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "assistant", content: ASSISTANT_EXAMPLE },
    { role: "user", content: userPrompt },
  ];
  const result = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    max_tokens: 4000,
    messages: message,
    temperature: 0.1,
    n: 1,
  });
  return result.choices[0].message.content?.trim();
}

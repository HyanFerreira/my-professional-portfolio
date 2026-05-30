import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "scrollfolio-template",
    title: "Scrollfolio Template",
    description:
      "Template moderno de portfólio com navegação fluida, seções reutilizáveis e foco em apresentação profissional de projetos, serviços e informações pessoais.",
    category: "Template de portfólio",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    demoUrl: "https://scrollfolio.hyanferreira.com.br",
    featured: true,
    summary:
      "Um template de portfólio moderno, responsivo e orientado à experiência visual, criado para apresentar projetos, habilidades, serviços e informações profissionais de forma clara, elegante e dinâmica.",
    challenge:
      "Criar uma estrutura de portfólio que fosse visualmente marcante, fácil de navegar e simples de adaptar para diferentes perfis profissionais, mantendo boa organização de conteúdo e uma experiência fluida em dispositivos desktop e mobile.",
    solution:
      "Desenvolvimento de um template com arquitetura modular, componentes reutilizáveis, seções bem definidas e layout responsivo. A interface foi pensada para destacar projetos, tecnologias, chamadas de ação e informações profissionais sem sobrecarregar a leitura.",
    highlights: [
      "Layout responsivo para desktop e mobile",
      "Estrutura modular e fácil de personalizar",
      "Seções preparadas para projetos, habilidades e contato",
      "Navegação fluida com foco em experiência visual",
      "Design moderno com identidade visual escura e tecnológica",
      "Base pronta para expansão e adaptação a novos portfólios",
    ],
  },
  {
    slug: "sistema-gestao-educacional",
    title: "Sistema de gestão educacional",
    description:
      "Sistema administrativo para controle de cadastros, fluxos internos e informações operacionais em ambiente educacional.",
    category: "Sistema web",
    technologies: ["Laravel", "Livewire", "PHP", "MySQL", "Tailwind CSS"],
    featured: true,
    summary:
      "Projeto focado em rotinas administrativas, com telas organizadas para consulta, cadastro e acompanhamento de dados.",
    challenge:
      "Criar uma interface funcional para uso recorrente, com boa legibilidade e organização dos fluxos essenciais.",
    solution:
      "Construção de módulos administrativos com componentes reutilizáveis, tabelas, formulários e feedbacks visuais consistentes.",
    highlights: [
      "Experiência com regras de negócio reais",
      "Fluxos administrativos de ponta a ponta",
      "Estrutura pensada para manutenção e expansão",
    ],
  },
  {
    slug: "dashboard-administrativo",
    title: "Dashboard administrativo",
    description:
      "Painel para acompanhamento de indicadores, atividades e informações operacionais com visual limpo e foco em leitura rápida.",
    category: "Dashboard",
    technologies: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    summary:
      "Interface de dashboard voltada para análise de dados e acompanhamento de status em uma visão administrativa.",
    challenge:
      "Apresentar indicadores e listas sem gerar excesso visual, mantendo consistência entre cards, filtros e estados.",
    solution:
      "Uso de cards compactos, hierarquia visual clara e componentes de listagem preparados para integração com APIs.",
    highlights: [
      "Componentes reutilizáveis para indicadores",
      "Layout adaptável para telas menores",
      "Base pronta para filtros e integrações",
    ],
  },
  {
    slug: "catalogo-digital-comercial",
    title: "Catálogo digital comercial",
    description:
      "Catálogo responsivo para apresentação de produtos, categorias e canais de contato comercial.",
    category: "Catálogo digital",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    featured: false,
    summary:
      "Projeto pensado para comerciantes que precisam expor produtos de forma clara e facilitar o primeiro contato.",
    challenge:
      "Criar uma navegação simples entre categorias e produtos, com apresentação visual consistente mesmo sem fotos reais.",
    solution:
      "Estrutura de cards, filtros por categoria e placeholders visuais que mantêm o layout estável até receber imagens reais.",
    highlights: [
      "Experiência mobile first",
      "Organização por categorias",
      "Contato comercial em destaque",
    ],
  },
  {
    slug: "landing-page-servicos",
    title: "Landing page de serviços",
    description:
      "Página de conversão para apresentação de serviços profissionais, proposta de valor e chamada direta para contato.",
    category: "Landing page",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: false,
    summary:
      "Landing page com narrativa direta, seções estratégicas e foco em transformar interesse em conversa comercial.",
    challenge:
      "Evitar uma página genérica, mantendo clareza sobre oferta, diferenciais e próximos passos.",
    solution:
      "Construção de uma sequência objetiva com hero, benefícios, prova de capacidade, processo e CTA final.",
    highlights: [
      "Copy clara e orientada à ação",
      "Seções com hierarquia visual consistente",
      "Pronta para campanhas e tráfego pago",
    ],
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

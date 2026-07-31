import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "portal-educacional-aurora",
    title: "Portal Educacional Aurora",
    image: "/projects/instituto-aurora/homepage.png",
    gallery: [
      {
        src: "/projects/instituto-aurora/homepage.png",
        alt: "Página inicial do Portal Educacional Aurora",
        caption: "Página inicial com destaques e indicadores institucionais",
      },
      {
        src: "/projects/instituto-aurora/featured-news.png",
        alt: "Área de notícias do Portal Educacional Aurora",
        caption: "Notícias em destaque e publicações recentes",
      },
      {
        src: "/projects/instituto-aurora/events-calendar.png",
        alt: "Calendário interativo de eventos do Portal Educacional Aurora",
        caption: "Próximos eventos organizados em um calendário interativo",
      },
      {
        src: "/projects/instituto-aurora/photo-gallery.png",
        alt: "Galeria de imagens do Portal Educacional Aurora",
        caption: "Álbuns com filtros, detalhes e download de imagens",
      },
      {
        src: "/projects/instituto-aurora/schools-map.png",
        alt: "Mapa interativo de escolas do Portal Educacional Aurora",
        caption: "Pesquisa de escolas sincronizada com mapa interativo",
      },
      {
        src: "/projects/instituto-aurora/observatory-indicators.png",
        alt: "Indicadores do Observatório Educacional Aurora",
        caption: "Observatório com métricas e dados por ano de referência",
      },
    ],
    description:
      "Portal educacional full stack com área pública e CMS administrativo para notícias, eventos, escolas, documentos, galerias e indicadores.",
    category: "Portal educacional",
    technologies: [
      "Laravel",
      "Livewire",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Alpine.js",
    ],
    notice:
      "Projeto demonstrativo de portfólio. O Instituto Aurora, seus profissionais, escolas, endereços, documentos e indicadores são fictícios e não possuem vínculo com qualquer instituição real.",
    repositories: [
      {
        label: "Ver código",
        url: "https://github.com/HyanFerreira/portal-educacional",
      },
    ],
    demoUrl: "https://instituto-aurora.hyanferreira.com.br",
    featured: true,
    summary:
      "Aplicação full stack que reúne comunicação institucional e gestão de conteúdo educacional em uma única plataforma. O portal público apresenta notícias, eventos, iniciativas, escolas, documentos, galerias e indicadores, enquanto o painel administrativo permite que equipes não técnicas mantenham toda a experiência sem editar o código-fonte.",
    challenge:
      "Centralizar conteúdos e dados educacionais de naturezas muito diferentes sem tornar a manutenção dependente de desenvolvimento, preservando uma navegação clara para a comunidade e fluxos eficientes e seguros para a equipe administrativa.",
    solution:
      "Desenvolvimento de uma aplicação monolítica moderna com Laravel e Livewire, organizada em módulos de domínio. A solução combina CMS baseado em blocos, gestão editorial, permissões por perfil, busca global, processamento de mídia, mapa interativo de escolas e um observatório extensível com indicadores e histórico anual.",
    highlights: [
      "Portal público responsivo e painel administrativo completo",
      "CMS modular com texto rico, mídia, documentos e ordenação",
      "Observatório configurável com indicadores e histórico anual",
      "Mapa interativo e cadastro estruturado de escolas",
      "Galerias com tratamento de imagens e download em ZIP",
      "Controle de acesso, integrações, cache e testes automatizados",
    ],
  },
  {
    slug: "bug-no-anzol-paideia",
    title: "Bug no Anzol — Paideia",
    image: "/projects/bugnoanzol/student-dashboard.png",
    gallery: [
      {
        src: "/projects/bugnoanzol/student-dashboard.png",
        alt: "Dashboard do estudante na plataforma Paideia",
        caption: "Jornada do estudante com progresso, desafios e ranking",
      },
      {
        src: "/projects/bugnoanzol/achievements.png",
        alt: "Tela de conquistas da plataforma Paideia",
        caption: "Conquistas, recompensas e evolução do aprendizado",
      },
      {
        src: "/projects/bugnoanzol/characters.png",
        alt: "Coleção de personagens da plataforma Paideia",
        caption: "Personagens colecionáveis que evoluem com o estudante",
      },
      {
        src: "/projects/bugnoanzol/store.png",
        alt: "Loja de personagens da plataforma Paideia",
        caption: "Loja gamificada para troca de pontos por personagens",
      },
    ],
    description:
      "Plataforma educacional gamificada criada no Hackathon 2026 do IFSP Caraguatatuba para unir aprendizagem, engajamento estudantil e acompanhamento pedagógico.",
    category: "Plataforma educacional",
    technologies: [
      "Next.js",
      "TypeScript",
      "Laravel",
      "MySQL",
      "Laravel Reverb",
      "Tailwind CSS",
    ],
    notice:
      "Projeto colaborativo desenvolvido pela equipe Bug no Anzol durante o Hackathon 2026 do IFSP Caraguatatuba, uma imersão dedicada a soluções para desafios reais da administração pública municipal.",
    eventUrl:
      "https://www.ifspcaraguatatuba.edu.br/noticias/ifsp-caraguatatuba-realiza-lancamento-oficial-do-hackathon-2026",
    repositories: [
      {
        label: "Código front-end",
        url: "https://github.com/HyanFerreira/hackathon-project-frontend",
      },
      {
        label: "Código back-end",
        url: "https://github.com/HyanFerreira/hackathon-project-backend",
      },
    ],
    demoUrl: "https://bugnoanzol.hyanferreira.com.br",
    featured: true,
    summary:
      "O Paideia transforma atividades escolares em uma jornada gamificada. Estudantes respondem questões ligadas à BNCC, acumulam pontos e XP, avançam em rankings, desbloqueiam conquistas e evoluem personagens, enquanto professores e gestores acompanham o desempenho e administram a rotina pedagógica.",
    challenge:
      "Criar, dentro do tempo concentrado de um hackathon, uma solução capaz de aumentar o engajamento dos estudantes sem perder o valor pedagógico e, ao mesmo tempo, atender às necessidades distintas de alunos, professores, gestores escolares e administradores.",
    solution:
      "Desenvolvimento de uma aplicação full stack com frontend em Next.js e API em Laravel, autenticação e permissões por perfil, questões organizadas por habilidades da BNCC, dashboards de desempenho e uma camada de gamificação com pontos, XP, energia, missões, conquistas, rankings, loja e personagens. Sessões de turma e desafios entre estudantes utilizam WebSocket para interação em tempo real.",
    highlights: [
      "Experiências específicas para estudante, professor, gestor e administrador",
      "Banco de questões organizado por disciplinas e habilidades da BNCC",
      "Pontos, XP, energia, rankings, missões e conquistas",
      "Desafios entre estudantes e sessões de turma em tempo real",
      "Loja, coleção e evolução de personagens gamificados",
      "Gestão de escolas, turmas, professores e estudantes com dashboards",
    ],
  },
  {
    slug: "scrollfolio-template",
    title: "Scrollfolio Template",
    image: "/projects/scrollfolio/homepage.png",
    gallery: [
      {
        src: "/projects/scrollfolio/homepage.png",
        alt: "Tela inicial do Scrollfolio Template",
        caption: "Apresentação inicial e chamada principal",
      },
      {
        src: "/projects/scrollfolio/work.png",
        alt: "Seção de projetos do Scrollfolio Template",
        caption: "Projetos apresentados durante a navegação",
      },
      {
        src: "/projects/scrollfolio/contact.png",
        alt: "Seção de contato do Scrollfolio Template",
        caption: "Encerramento da experiência e área de contato",
      },
    ],
    description:
      "Template moderno de portfólio com navegação fluida, seções reutilizáveis e foco em apresentação profissional de projetos, serviços e informações pessoais.",
    category: "Template de portfólio",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
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
    featured: false,
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

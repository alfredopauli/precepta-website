# Precepta Educação

Site em português brasileiro, feito com React, JavaScript e Vite. Inclui páginas públicas, catálogo completo de oito serviços, grade de aulas avulsas e administração integrada ao Supabase existente.

## Executar

Use Node.js 22.12 ou superior e npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Preencha `.env` com `VITE_DB_URL` e `VITE_DB_KEY` do backend existente. A chave deve ser publicável ou `anon`, nunca `service_role` ou chave secreta. Reinicie o Vite após alterar essas variáveis. Sem configuração, as páginas institucionais continuam funcionando; as páginas dependentes do banco mostram um aviso e não exibem dados fictícios.

```bash
npm run build
npm run preview
npm test
```

O build gera `dist/`. O preview serve o build local para inspeção. `npm ci` pode substituir `npm install` para instalação reproduzível pelo lockfile.

## Vercel

Use a raiz desta pasta como raiz do projeto, preset Vite, comando de build `npm run build` e pasta de saída `dist`. Defina as duas variáveis `VITE_DB_URL` e `VITE_DB_KEY` no ambiente da aplicação e faça um novo build após qualquer alteração. As variáveis Vite são incorporadas ao JavaScript público. `vercel.json` reescreve rotas de navegação para `index.html`, permitindo abrir ou atualizar `/servicos`, `/grade-horaria`, `/entrar` e `/admin/*` diretamente.

## Organização

- `src/pages/`: páginas públicas e formulário administrativo reutilizável.
- `src/components/`: layout, navegação lateral e componentes de apresentação.
- `src/auth/`: sessão, verificação de administrador e proteção de rotas.
- `src/lib/api.js`: consultas e mutações com os campos existentes.
- `src/lib/supabase.js`: leitura das variáveis e cliente do backend.
- `src/lib/domain.js`: dias, horários, filtros, disponibilidade e links do WhatsApp.
- `src/data/content.js`: história e catálogo, separados da apresentação.
- `src/styles/main.css`: estilos, breakpoints e redução de movimento.
- `public/assets/`: os logos fornecidos, preservados. O PNG também é favicon.
- `tests/`: verificações locais das regras de domínio e conteúdo.

Os ícones Lucide são distribuídos sob licença ISC. A tipografia utiliza fontes locais do sistema, sem dependência de serviços externos de fontes. Os elementos científicos são leves, feitos com CSS e ícones, e não representam dados científicos.

## Integração e decisões

O projeto usa apenas `teachers`, `classes` e `admins`, conforme o esquema fornecido. Não cria tabelas, políticas, usuários, migrações ou configurações de autenticação. Descrições são texto React, sem HTML bruto.

`classes.status = false` significa **Disponível**. A consulta pública filtra esse valor no servidor; a área administrativa mostra ambos os estados. Cada cartão tem chave pelo ID, preservando aulas sobrepostas. Todos os horários da grade duram 50 minutos; durações diferentes do catálogo são independentes.

O acesso administrativo exige sessão e uma linha correspondente em `admins.user_id`. Enquanto a verificação está pendente ou falha, o conteúdo protegido não aparece. Respostas antigas de verificação são descartadas após troca de sessão. A proteção do frontend complementa o RLS existente; ela não concede permissões de banco. A exclusão de professor usa a cascata existente, com confirmação explícita na interface. Mutações verificam se houve registro afetado.

Os filtros de professor, dia e hora são cumulativos e operam sobre a lista administrativa carregada. A grade utiliza seis colunas com rolagem horizontal interna no desktop e um seletor de dia no mobile. A navegação móvel contém foco, fecha com Escape e após navegação. Telas curtas permitem rolagem no menu. As animações respeitam `prefers-reduced-motion`.

Links de WhatsApp somente abrem uma consulta, com texto codificado. Não reservam aulas, não gravam no banco e não enviam mensagens automaticamente.

## Validação desta entrega

- `npm install`, `npm test` (5 testes) e `npm run build`: concluídos com sucesso.
- Navegador desktop: Início, oito serviços, Grade Horária e Entrar renderizados; menu recolhível verificado; acesso direto à rota administrativa sem configuração não exibe conteúdo protegido.
- Conteúdo institucional e de serviços extraído do briefing, preservando preços, durações e condições.
- Revisão de código: filtro público `status=false`, consultas com professor relacionado, operações CRUD, tratamento de sobreposição, filtros cumulativos, breakpoints móveis, foco e Escape do menu, configuração de rotas Vercel.
- **Não testado em backend real:** autenticação, autorização/RLS, leitura de horários, inclusão, edição, exclusão e cascata. Não foram fornecidas credenciais nem sessão autorizada. É necessário validar esses fluxos no ambiente da escola antes da publicação.
- **Não verificado visualmente em dispositivo móvel:** layout móvel e telas curtas foram implementados e revisados no código; devem ser conferidos em aparelho real, inclusive navegação por teclado e leitor de tela.
- A reescrita de rotas foi incluída, mas não houve publicação na Vercel nesta entrega. O endereço do site anterior não ficou acessível; o briefing e os logos fornecidos orientaram esta implementação.

O ZIP não contém dependências instaladas, credenciais reais ou scripts de banco.

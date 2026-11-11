# Precepta Educação

Website em React + JavaScript + Vite, com páginas públicas, grade horária e área administrativa. Interface em português brasileiro, identidade visual fornecida e conteúdo integral dos oito serviços.

## Executar

Requer Node.js 22.12+ (ou versão LTS mais recente compatível) e npm.

```bash
npm install
cp .env.example .env
npm run dev
```

No `.env`, atribua os valores existentes a `VITE_DB_URL` e `VITE_DB_KEY`. A chave deve ser a chave pública segura para navegador. Reinicie o servidor após alterar variáveis.

```bash
npm run build
npm run preview
npm test
```

## Vercel

Importe o projeto com preset Vite, comando de build `npm run build` e diretório de saída `dist`. Atribua as duas variáveis de ambiente existentes e faça o deploy. O `vercel.json` inclui o fallback de rotas para acesso direto e atualização de páginas. Variáveis Vite são incorporadas no build; alterações exigem novo deploy.

## Organização

- `src/pages`: início, serviços, grade, login e CRUD administrativo.
- `src/components`: navegação, diálogo de confirmação, animação e componentes compartilhados.
- `src/auth`: restauração de sessão e verificação de administrador.
- `src/lib`: cliente centralizado, consultas, mutações e regras de domínio.
- `src/data/content.json`: conteúdo institucional e preços fornecidos.
- `src/styles.css`: layouts desktop/mobile, foco e movimento reduzido.
- `public/assets`: os dois logos originais fornecidos, sem recorte ou alteração.
- `tests`: validação de disponibilidade, horários, consultas WhatsApp e filtros.

## Regras importantes

`classes.status = false` significa disponível. O público consulta somente essas aulas. `true` significa indisponível. Segunda-feira é 0 e sábado é 5; horários variam de 0 a 23 e cada aula avulsa dura 50 minutos. Aulas simultâneas são mantidas e empilhadas. A consulta pelo WhatsApp não altera dados nem reserva horários.

Autenticação não basta: a conta precisa corresponder a `admins.user_id`. O carregamento bloqueia conteúdo protegido, falhas negam acesso e cada mutação revalida a sessão e a associação de administrador. As permissões efetivas continuam sendo aplicadas pelo banco existente. Excluir um professor usa somente uma exclusão; a cascata existente cuida das classes relacionadas.

Cor é um valor CSS validado com `CSS.supports`. Na grade ela aparece na borda, enquanto o texto mantém contraste independente. Conteúdo do banco é renderizado como texto React.

## Verificação realizada

- Instalação de dependências e build de produção concluídos.
- Cinco testes automatizados passaram: semântica de disponibilidade, mapeamento de dias/horários, codificação WhatsApp, filtros combinados com sobreposição/reset e validação dos dados de classes.
- Navegador: página inicial, navegação, recolhimento da sidebar, oito serviços, erro de configuração ausente e redirecionamento de acesso direto a `/admin/classes` sem autenticação.
- Código revisado para bloqueio de rotas, formulários, confirmação de exclusão, mensagens de erro/sucesso, preservação de dados em falhas e movimento reduzido.

Não foram fornecidas credenciais: login real, restauração/logout com sessão real, associação de administrador, leitura do banco e CRUD/cascata não foram executados contra Supabase. A apresentação mobile foi implementada e revisada no código, mas não foi inspecionada em dispositivo ou viewport mobile. Publicação e refresh de rotas no ambiente real Vercel também não foram testados. O site anterior não pôde ser consultado; foi usado o conteúdo fornecido.

## Ícones

Feather (MIT) e Font Awesome Free (ícones CC BY 4.0), distribuídos por `react-icons`. Atribuições e licenças em `THIRD_PARTY_NOTICES.md`.

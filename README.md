# VÉRTICE AUTO

Site estático demonstrativo de uma oficina fictícia. Interface em português brasileiro, sem framework, build, backend ou dependências de produção.

## Visualizar

Abra `index.html` no navegador. Para servir localmente, opcionalmente execute `python3 -m http.server 8080` na raiz e acesse `http://localhost:8080`.

## Arquivos

- `index.html`: conteúdo semântico, SEO, Open Graph e formulário.
- `css/style.css`: identidade visual, layouts responsivos e movimento reduzido.
- `js/main.js`: menu, navegação ativa, revelações, validação e WhatsApp.
- `assets/images/`: quatro fotografias locais otimizadas, cerca de 540 KB no total.
- `assets/icons/favicon.svg`: símbolo original.
- `IMAGE_LICENSES.md`: procedência, autores, licenças e data de verificação.

## WhatsApp

O envio está **desativado por padrão**. O formulário valida os quatro campos e mostra uma prévia local. Não armazena dados, não faz requisições com os dados e não abre aplicativos automaticamente.

Para ativar, defina somente `WHATSAPP_NUMBER`, no início de `js/main.js`, com um número autorizado no formato internacional (DDI + DDD + número, apenas dígitos, de 8 a 15 caracteres). Após validar, o visitante revisa a mensagem e clica em “Continuar no WhatsApp”. O envio final ocorre no próprio WhatsApp. A marca e os avisos demonstrativos devem ser adaptados antes de usar para uma empresa real.

## Cloudflare Pages

1. Envie estes arquivos para um repositório Git e conecte-o no Cloudflare Pages, ou use upload direto de uma pasta/ZIP com `index.html` na raiz.
2. Para integração Git, escolha o preset **None**, deixe o comando de build vazio e use a raiz (`.`) como diretório de saída; não há etapa de compilação.
3. Publique e teste a URL fornecida pelo Cloudflare.
4. Ao conhecer o domínio definitivo, use uma URL absoluta em `og:image` (atualmente relativa) e acrescente `og:url` e canonical. O endereço é omitido nesta demonstração para não inventar um domínio.

Nenhum serviço de hospedagem foi configurado ou publicado nesta entrega. Sem endereço, telefone, avaliações ou certificações fictícias apresentadas como reais.

## Acessibilidade e desempenho

Menu com `aria-expanded`, fechamento por Escape e retorno de foco; link para pular conteúdo; estados de foco; campos rotulados e erros associados; prévia com região de status; imagens com dimensões e alt; lazy loading fora do hero; IntersectionObserver; respeito a `prefers-reduced-motion`; layout em uma ou duas colunas no celular. Conteúdo permanece visível sem JavaScript.

## Verificações realizadas

- Sintaxe JavaScript com `node --check` e consistência de alterações com `git diff --check`.
- Verificação de IDs únicos, âncoras internas, recursos locais e atributos de imagens.
- Testes de lógica de validação, foco no erro, pré-seleção de serviço, mensagem, bloqueio de envio e limpeza da prévia.
- Chromium via Playwright: larguras 320, 375, 768, 1024 e 1440 px sem overflow horizontal; imagens carregadas; menu mobile e fechamento por Escape; formulário demonstrativo; nenhum erro JavaScript capturado.

Ferramentas de QA foram instaladas fora do repositório. Não foi realizada auditoria automatizada completa WCAG/Lighthouse nem teste em dispositivos físicos ou Safari.

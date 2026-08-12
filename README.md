# Inspetor Thyago 🔎

Jogo de dedução lógica (estilo Murdoku): use as pistas para descobrir onde
cada suspeito estava e isolar o assassino, que precisa estar na mesma sala
da vítima.

Single-file, mobile-first, PWA instalável — funciona 100% offline depois
da primeira visita (o motor de geração de casos roda inteiro no navegador).

## Como publicar no GitHub Pages

1. Crie um repositório novo (ex: `inspetor-thyago`) e suba estes arquivos
   **na raiz** do repositório (não dentro de uma subpasta):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-apple-touch.png`

2. No GitHub: **Settings → Pages → Source** → escolha a branch
   `main` (ou `master`) e a pasta `/ (root)`. Salve.

3. Espere 1–2 minutos. O jogo fica disponível em:
   `https://SEU-USUARIO.github.io/inspetor-thyago/`

   > Os caminhos dos ícones/manifest são todos **relativos** (`./`), então
   > funciona tanto na raiz do domínio quanto numa subpasta como esta —
   > não precisa editar nada mesmo se o nome do repositório for diferente.

## Como instalar no celular

- **Android (Chrome)**: abra o link, toque no menu (⋮) → "Adicionar à
  tela inicial" ou "Instalar app". Um banner de instalação também pode
  aparecer automaticamente.
- **iPhone (Safari)**: abra o link, toque no ícone de compartilhar (□↑)
  → "Adicionar à Tela de Início". *(iOS não suporta instalação automática
  de PWA — precisa ser esse caminho manual pelo Safari.)*

Depois de instalado, o ícone abre em tela cheia (sem barra de endereço) e
funciona sem internet.

## Atualizando o jogo depois de publicado

Sempre que o `index.html` mudar, abra `sw.js` e **incremente o
`CACHE_NAME`** (ex: `v1.2` → `v1.3`). Isso força os celulares que já
instalaram o app a buscar a versão nova na próxima abertura — sem esse
passo, o Service Worker vai continuar servindo a versão antiga do cache
indefinidamente.

## Estrutura dos arquivos

| Arquivo | Função |
|---|---|
| `index.html` | O jogo inteiro (motor + UI + assets em base64) |
| `manifest.json` | Metadados de instalação (nome, ícones, cores) |
| `sw.js` | Service Worker — cache offline e atualização |
| `icon-*.png` | Ícones do app em diferentes tamanhos |

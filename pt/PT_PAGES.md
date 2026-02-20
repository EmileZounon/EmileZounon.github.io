# Brazilian Portuguese Pages (pt/)

## What was built

All 16 Brazilian Portuguese (`pt-BR`) language pages for the multilingual personal portfolio website at `/pt/`.

Translated from the French source files at `/fr/`. Every file follows the conventions below.

## Conventions applied

- `lang="pt-BR"` on every `<html>` tag
- All nav links use `/pt/` prefix
- CSS/JS use absolute paths: `/css/styles.css`, `/js/main.js`, `/favicon.svg`
- Font Awesome CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
- Language switcher has 6 options (EN, FR, ZH, JA, ES, PT)
- `<span class="lang-current">PT</span>` in nav
- 6 hreflang alternate tags per page (en, fr, zh-CN, ja, es, pt-BR)
- Footer tagline: "Estrategista EdTech e IA"
- Footer copyright: "&copy; 2026 Emile Giovannie ZOUNON. Todos os direitos reservados."
- Nav labels: Início, Projetos, Blog, Galeria, Sobre Mim, Contato
- Hamburger aria-label: "Abrir menu"
- Lang toggle aria-label: "Selecionar idioma"
- Back link on project pages: `← Voltar aos Projetos` -> `/pt/work.html`
- Back link on blog pages: `← Todos os Artigos` -> `/pt/blog.html`
- PDF download button paths kept as-is from French source (`/assets/*.pdf`)

## Files created

1. `/pt/index.html` — Home page
2. `/pt/work.html` — Projects listing
3. `/pt/blog.html` — Blog listing
4. `/pt/gallery.html` — Gallery
5. `/pt/about.html` — About page
6. `/pt/contact.html` — Contact page
7. `/pt/projects/ai-translation.html` — AI Translation project detail
8. `/pt/projects/developgio.html` — DevelopGio project detail
9. `/pt/projects/dsm-onboarding.html` — DSM Onboarding project detail
10. `/pt/projects/partner-onboarding.html` — Partner Onboarding project detail
11. `/pt/projects/prompt-library.html` — Prompt Library project detail (with PDF download buttons)
12. `/pt/blog/edtech/index.html` — EdTech blog category
13. `/pt/blog/remote-work/index.html` — Remote Work blog category
14. `/pt/blog/bridging-digital-gap.html` — Blog post: Dos Quadros Negros aos Teclados
15. `/pt/blog/remote-work-tips.html` — Blog post: 5 Dicas para Trabalho Remoto
16. `/pt/blog/scaling-online-programs.html` — Blog post: Escalando Programas Online

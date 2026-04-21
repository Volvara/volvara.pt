# Demo · Adega Típica A Forja

Demo Volvara para Adega Típica A Forja, Rua dos Ferreiros 17, Lagos.

## Estrutura

```
aforja/
├── index.html         (single-file, ~1450 linhas, vanilla HTML/CSS/JS)
├── robots.txt         (bloqueia crawlers em /demos/)
├── README.md
└── assets/
    ├── logo.png                  640×383    (logo oficial, nav)
    ├── logo-cream.png            640×383    (logo cream para footer)
    ├── fachada-square.jpg       1440×1440  (hero split)
    ├── hero-fachada.jpg         1440×810   (reserva, não usado)
    ├── esplanada.jpg            1440×1440  (galeria)
    ├── interior-sala-ampla.jpg   698×1080  (about)
    ├── interior-mesa-close.jpg   698×1080  (galeria)
    ├── prato-polvo.jpg          1440×864   (menu destaque)
    ├── prato-sardinhas.jpg       720×1280  (menu destaque)
    ├── prato-peixe-grelhado.jpg  360×556   (galeria)
    ├── prato-filetes.jpg         360×556   (galeria)
    ├── prato-salada-burrata.jpg  648×720   (galeria)
    ├── ilustracao-rua.jpg       1440×1440  (reserva, não usado)
    └── tripadvisor.png          1080×1080  (badge, não usado no layout actual)
```

## Configuração

- **Stack:** vanilla HTML/CSS/JS, single-file, mobile-first
- **Mood:** `classic-warm` com accent azul cobalto `#1D3E7A` (porta/toldo + logo oficial)
- **Paleta:** cream `#F5EFE6` · ink `#1A1410` · gold `#B89668` · cobalt `#1D3E7A`
- **Fontes:** Playfair Display (display) + Cormorant Garamond (serif) + Inter (sans)
- **Copy:** PT-PT com AO1990
- **Contacto:** telefone `+351 282 768 588` · WhatsApp mesmo número · sem formulário de reserva

## Secções

1. Hero-split — fachada azul + tagline "A porta azul da Rua dos Ferreiros" + badge 1989
2. About — storytelling + imagem dupla com overlap (desktop)
3. Menu tabbed — Peixe · Carne · Entradas · Sobremesas com tags "Casa"/"Quartas"/"Assinatura" + 2 pratos destaque
4. Especialidades — gallery masonry assimétrica 7 tiles
5. Reviews — carousel auto-play 4 reviews + stats 4.5/4.4/2024/1989
6. Horário — grid com dia actual highlighted + Sábado em fade ("Encerrado")
7. Contacto — telefone + WhatsApp cards + info card com map preview custom
8. Footer — navegação + contacto + watermark defesa anti-cópia

## Defesas anti-cópia

- `<meta name="robots" content="noindex, nofollow">` em `index.html`
- `robots.txt` a bloquear `/demos/`
- Watermark subtil no footer: "DEMO · volvara.pt · reprodução não autorizada"

## Interactividade

- Nav fixa com estado scrolled (logo encolhe + border surge)
- Mobile menu hamburguer
- Menu tabs troca painéis com fade
- Reviews carousel auto-play 6.5s + dots navegação
- Hours: dia actual highlighted automaticamente (JS)
- Map preview custom com pin animado (bounce) — clica para abrir Google Maps real

## Dados técnicos

- Schema.org `Restaurant` JSON-LD com horário, morada, telefone, URL
- OG tags para partilha social
- Favicon SVG inline (placeholder cobalto — pode ser substituído pelo logo oficial)
- Preconnect a fonts.googleapis.com

## Deploy

Pasta a colocar em `volvara.pt/demos/aforja/` no repo `Volvara/volvara.pt`.

```bash
# Windows, dentro do repo volvara.pt:
# Extrair o ZIP e copiar a pasta aforja/ para demos/

git add demos/aforja
git commit -m "Add A Forja demo"
git push
```

Link vivo: `https://volvara.pt/demos/aforja/`

## Notas

- Map iframe Google não funciona via `file://` (limitação Chrome/origin null). Em produção HTTPS funciona — se quiseres trocar o preview custom por iframe real, basta meter `<iframe src="https://www.google.com/maps?q=Adega+T%C3%ADpica+A+Forja,+Rua+dos+Ferreiros+17,+Lagos&output=embed">` dentro do `.map-embed`.
- Logo oficial (`logo.png`) tem fundo transparente processado via threshold alpha a partir do JPG original. A versão `logo-cream.png` é a mesma silhueta pintada em cream, para contraste sobre fundo escuro do footer.
- Preços na ementa são estimativas — confirmar com o cliente antes de publicar definitivo.
- A informação de "encerramos aos sábados" está na secção Horário (com row em fade). A announcement bar foi removida por feedback do cliente.

## Build

Preparado por Volvara em 2026-04-21.
Brand Study aprovado em `BRAND-STUDY-aforja.md`.

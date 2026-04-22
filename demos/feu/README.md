# FEU Hamburgueria · Demo Volvara

Single-page demo para **Hamburgueria FEU** (Antiga Fábrica FEU, Zona do Porto, Portimão).

## Conteúdo
- `index.html` — single-file: HTML + CSS + JS inline
- `assets/` — logo oficial + 9 fotos optimizadas + favicon
- `robots.txt` — bloqueio de indexação
- `README.md`

## Preview local
```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Deploy
```bash
cp -r feu-demo/ volvara.pt/demos/feu/
# URL final: https://volvara.pt/demos/feu/
```

## Identidade (do Brand Study aprovado)
- **Logo oficial** FEU Hamburgueria (sage green) usado em nav + footer + favicon
- **Paleta:** `#1A1A1A` charcoal · `#F1EDE4` cream · `#8B9F89` sage · `#D9A441` amber
- **Fontes:** Bebas Neue (display) + DM Serif Display (italic accent) + Inter (body)
- **Hero:** fachada à noite (única variante, sem switcher)
- **Tagline:** "O rockstar dos burgers."

## Features
- PT-PT + EN toggle persistente (`localStorage`, 82 keys cada)
- Schema.org Restaurant + LocalBusiness + horários
- Lightbox na galeria
- Mapa Google Maps com filtro de cor (integra paleta dark/sage)
- IntersectionObserver reveals + fallback keyframe
- Mobile-first · burger menu
- `prefers-reduced-motion` respeitado
- Sem frameworks

## Anti-cópia
- `<meta name="robots" content="noindex,nofollow">`
- `robots.txt` a bloquear
- Watermark footer: *"DEMO · volvara.pt · reprodução não autorizada"*

## Preços no menu
Do menu digital do balcão + Uber Eats:
- SINGLE · 8,90€
- CHEESE · 9,90€
- BACON · 11,90€
- CHICKEN · 12,50€
- TRIPLE SMASH · 19,50€ (menu completo)

Entradas e sobremesas aproximadas — validar com cliente antes de prod.

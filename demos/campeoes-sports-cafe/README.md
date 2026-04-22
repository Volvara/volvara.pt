# Campeões Sports Café · Demo Volvara

Site single-page para o **Campeões Sports Café** em Portimão.

## Estrutura

```
campeoes-sports-cafe-demo/
├── index.html          # Single-file, vanilla HTML/CSS/JS
├── robots.txt          # Bloqueia indexação enquanto é demo
├── README.md           # Este ficheiro
└── assets/
    ├── bar-interior.jpg    # Hero principal (interior com TVs)
    ├── exterior.jpg        # Esplanada noite (letreiro neon)
    ├── sliders.jpg         # Sliders signature
    ├── nachos.jpg          # Loaded nachos
    ├── cocktails.jpg       # Mojito + Aperol
    ├── logo-square.png     # Logo amber para nav/favicon
    ├── logo-amber.png      # Logo amber versão alta
    ├── logo-bege.jpg       # Logo versão bege (alternativa)
    ├── favicon-64.png      # Favicon
    └── og-image.jpg        # Open Graph image 1200x630
```

## Características

- **Single-file vanilla** — zero frameworks, zero build
- **PT/EN toggle** — 122 chaves i18n, persistência em localStorage
- **Responsive mobile-first** — testado 1440×900 desktop e 375×667 mobile
- **Schema.org JSON-LD** — Restaurant + horários + geo + pagamentos
- **Formulário Formspree** — placeholder `xkgwpqzr` (substituir por ID real do cliente)
- **Anti-copy 3 camadas** — `noindex` meta, `robots.txt` Disallow, watermark footer
- **Bitcoin Lightning callout** — diferenciador único posicionado como feature destaque
- **Delivery 4-way** — Uber Eats, Glovo, Bolt Food, WhatsApp directo

## Secções

1. Hero com tagline "Onde o desporto vive em Portimão"
2. 4 pilares (ecrãs, Chef José, cerveja, ambiente bilingue)
3. Próximos Jogos (Premier League, Rugby, F1, UFC, Champions, Grand Slams)
4. Menu 8 cards (Top Star, Big Bacon Stadium, Classic Game Night, Veggie Champions, Loaded Nachos, Preguinhos, Cocktails, Bifana)
5. Galeria 2×2 (interior, exterior neon, sliders, nachos)
6. Entregas + Bitcoin callout
7. Reviews TripAdvisor 5★
8. Encontra-nos (morada + contactos + horário + map-card para Google Maps)
9. Reserva (form Formspree)

## A substituir antes de produção

| Item | Localização | Nota |
|---|---|---|
| Formspree ID | `action="https://formspree.io/f/xkgwpqzr"` | Pedir ID real do cliente |
| Logo circular | `assets/logo-square.png` | Se cliente tiver versão SVG/PNG transparente, usar |
| Fotos menu | Cards 2,4,6,8 usam variações CSS | Ideal: pedir foto única por prato |
| OG image | `assets/og-image.jpg` | Gerada por crop do poster — melhorar com foto dedicada |
| Domínio final | no HTML: `https://campeoescafe.pt` no Schema.org | Confirmar com cliente |

## Deploy recomendado

```bash
# 1. Push para volvara/volvara.pt repo, pasta demos/campeoes/
# 2. Publica em volvara.pt/demos/campeoes/
# 3. Incluir robots.txt para bloquear indexação
```

## Auditoria cumprida

- [x] `node --check` JS passa
- [x] HTML termina em `</html>`
- [x] 122 chaves i18n balanceadas PT↔EN
- [x] 0 palavras forbidden (AI slop + BR Portuguese)
- [x] Schema.org JSON-LD válido
- [x] WhatsApp 351926104917 consistente (6 ocorrências)
- [x] Todos os assets referenciados existem
- [x] Mobile 375px sem overflow horizontal
- [x] Desktop 1440px hero legível
- [x] Anti-copy 3 camadas activas
- [x] Watermark footer visível

---

**Volvara** · go@volvara.pt · volvara.pt

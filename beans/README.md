# Volvara Coffee HQ

App privada mobile-only para pedir café em casa. Uso interno família + amigos.

## Menu

- **Latte** — 3 tamanhos (120 / 180 / 300 ml) · add-on: caramelo salgado + chocolate
- **Espresso** — simples
- **Milky Heart** — babycino (leite espumado + toque de cacau, sem café)

## Como funciona

1. Abre `index.html` no telemóvel
2. Escolhe bebida → opções → nome
3. Botão abre WhatsApp com mensagem pré-preenchida para **+351 917 810 999**
4. Pedido chega ao telefone da casa

## Deploy sugerido

### Opção A — GitHub Pages privado (recomendado)
Subir para repo `volvara/hq-coffee` **privado** e ligar a um subdomínio tipo `hq.volvara.pt` ou usar o URL directo do Pages. Como é repo privado, os convidados têm de ter o link.

### Opção B — Ficheiro local no iPhone
Copiar a pasta para iCloud Drive e abrir `index.html` via Safari → "Adicionar ao Ecrã Principal". Fica como ícone de app.

### Opção C — Subdirectório em volvara.pt
`volvara.pt/hq/` — já bloqueado por `noindex,nofollow` no HTML, mas **não** ficará 100% privado (qualquer um com o URL acede). OK para família/amigos que sabem o link.

## Estrutura

```
volvara-coffee/
├── index.html
└── assets/
    ├── latte.jpg
    ├── espresso.jpg
    └── milkyheart.jpg
```

## Protecções

- `<meta name="robots" content="noindex,nofollow">`
- Sem analytics
- Sem Schema.org
- Desktop guard: abre em desktop mostra só logo + aviso "abre no telemóvel"
- Watermark no footer

## Notas técnicas

- Single-file vanilla HTML/CSS/JS, IIFE
- Bebas Neue + DM Mono via Google Fonts
- Paleta Volvara: `#0A0A0A` / `#FFB020` / `#DC143C` / `#F4F1EC`
- Favicon SVG inline (VV amber)
- Number WhatsApp hardcoded: `351917810999`

## Partilha em socials

Se quiseres mostrar screenshots, os ecrãs mais fortes são:
1. Menu principal (3 cards com fotos)
2. Produto Latte preenchido (amber selecções + CTA)
3. Resumo do pedido (tipografia contrastante)

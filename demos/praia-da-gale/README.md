# Restaurante Praia da Galé · Volvara Demo

Demo preview do novo website para o **Restaurante Praia da Galé** (Albufeira, desde 1982), construído pela **Volvara** seguindo o Brand Study aprovado a 23 de Abril de 2026.

## Ver a demo

Abrir **`index.html`** num browser moderno (Chrome, Safari, Firefox, Edge). Single-file, não requer servidor. Para ver em modo realista, servir localmente:

```bash
cd /caminho/para/esta/pasta
python3 -m http.server 8080
# depois abrir http://localhost:8080/
```

## O que está na demo

- **Hero full-screen** com placeholder de pôr do sol em SVG (substituído por fotografia real após aprovação)
- **Linha do tempo** com três marcos: 1982 · anos 2000 · hoje
- **Três origens** (peixe, marisco, carne) sobre fundo navy editorial
- **Carta em abas** · 26 pratos com preços reais · Entradas, Marisco, Peixe, Arroz & Cataplana, Carne, Sobremesas
- **Galeria em scroll horizontal** · 8 placeholders coastal (substituídos por fotografia real)
- **Três testemunhos** curados do Google / Tripadvisor / Restaurant Guru
- **Formulário de reserva** (Formspree) · WhatsApp · Google Maps embed
- **Toggle EN / PT** com preservação da escolha (localStorage)

## Tecnologia

- HTML / CSS / JavaScript vanilla
- Zero dependências, zero tracking, zero build tools
- Fonts: Fraunces (display) + DM Sans (body), ambas via Google Fonts
- Schema.org Restaurant JSON-LD para SEO
- Mobile-first, responsive breakpoints em 720 / 800 / 900 px
- `prefers-reduced-motion` respeitado

## Antes do lançamento público

1. **Substituir placeholders de imagem** pelos ficheiros reais (hero + 8 galerias)
2. **Substituir ID Formspree** `xkgwpqzr` pelo ID real do cliente
3. **Remover** as três defesas anti-cópia da demo:
   - `<meta name="robots" content="noindex,nofollow">`
   - `robots.txt`
   - watermark no rodapé

## Contacto

Telmo · **go@volvara.pt**

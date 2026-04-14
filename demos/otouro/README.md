# O Touro Burger & Steaks — Demo Volvara v3

## Estrutura
```
otouro-final/
├── index.html        ← site completo (single-file)
├── assets/           ← pasta para imagens locais (ver abaixo)
│   └── .gitkeep
└── README.md
```

## Imagens
O site usa actualmente imagens do CDN do ola.click.
Quando o cliente assinar, substituir o CDN por fotos locais:

1. Colocar as fotos em `assets/` (ex: `assets/smash-touro.webp`)
2. No `index.html`, mudar:
   `const CDN = 'https://d2nagnwby8accc.cloudfront.net/.../';`
   para:
   `const CDN = 'assets/';`
3. Renomear cada ficheiro para coincidir com o uuid no código.

## Push para GitHub Pages
```bash
# Na raiz do repo volvara.pt:
mkdir -p demos/otouro
cp -r otouro-final/* demos/otouro/
git add demos/otouro/
git commit -m "feat: O Touro demo v3 — WhatsApp+Email checkout"
git push
```

## Testar localmente
```bash
cd otouro-final
python3 -m http.server 8000
# Abre http://localhost:8000
```

## Funcionalidades
- Carrinho nativo (sem ola.click)
- Checkout WhatsApp + Email
- Campos: Nome, Morada (delivery), Método de pagamento
- MBWay / Cartão presencial / Dinheiro
- Aberto/Fechado em tempo real
- 45 itens reais em 9 categorias
- Mobile-first responsive

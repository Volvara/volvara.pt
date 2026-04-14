# O Touro Burger & Steaks
## Demo Volvara v3.1

### Estrutura
```
otouro-final/
├── index.html     ← site completo (single-file, 64KB)
├── assets/        ← pasta para fotos do cliente
│   └── .gitkeep
└── README.md
```

### Deploy — GitHub Pages
```bash
mkdir -p demos/otouro
cp otouro-final/index.html demos/otouro/
cp -r otouro-final/assets demos/otouro/
git add demos/otouro/
git commit -m "feat: O Touro v3.1 — visual fixes"
git push
# URL: https://volvara.pt/demos/otouro/
```

### Testar localmente
```bash
cd otouro-final && python3 -m http.server 8000
# http://localhost:8000
```

### Substituir imagens (quando cliente assinar)
1. Colocar fotos em `assets/` (ex: `assets/smash-touro.webp`)
2. No `index.html`, linha 1:
   `const CDN = 'assets/';`
   Renomear ficheiros com os UUIDs correspondentes.

### Funcionalidades v3.1
- ✅ Nav com gradiente escuro permanente (sempre legível)
- ✅ Nav frosted glass ao scroll (a partir de 30px)
- ✅ Logo completo visível (object-fit: contain)
- ✅ Hero: imagem de produto sem texto (Smash GOAT)
- ✅ Carrinho nativo — sem dependência do ola.click
- ✅ Checkout WhatsApp + Email (com mensagem formatada)
- ✅ Campos: Nome, Morada (delivery), Pagamento
- ✅ MBWay / Cartão presencial / Dinheiro
- ✅ Horário Aberto/Fechado em tempo real
- ✅ 45 itens reais em 9 categorias
- ✅ Galeria com fotos reais
- ✅ Mobile-first responsive
- ✅ Schema.org JSON-LD SEO

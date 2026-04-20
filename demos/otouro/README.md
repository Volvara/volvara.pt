# O Touro Burger & Steaks
## Demo Volvara v4.0 — Plataforma Completa (Takeaway + Restaurante)

### 🎯 Proposta
Site que substitui por completo o sistema ola.click, **adicionando** o que eles não têm:
- Secção dedicada ao restaurante (15 anos, 437 reviews, steakhouse)
- Pratos só-mesa (Entradas + Bifes) mostrados mas não vendidos online
- Convida à reserva de mesa **E** permite takeaway/delivery na mesma plataforma
- 100% auto-contido (zero dependências externas)

### 📁 Estrutura
```
otouro-final/
├── index.html              ← 88KB · 1598 linhas · single-file
├── assets/
│   ├── hero.jpg            ← imagem hero (Facebook)
│   ├── logo.jpg            ← logo d'O Touro (960×960)
│   ├── menu-data.json      ← menu real (60 takeaway + 22 restaurant)
│   ├── products/           ← 53 imagens de produtos (uuid.png/jpeg)
│   └── .gitkeep
└── README.md
```

### 🗺️ Arquitectura das secções
1. **Hero** — split layout (texto + imagem) com logo
2. **Ticker** — delivery/takeaway/mesa info
3. **🆕 O Restaurante (#story)** — 15 anos, 437 reviews, steakhouse
4. **Order mode + Menu (#menu)** — 60 produtos takeaway reais
5. **🆕 No Restaurante (#restaurant-menu)** — 8 Bifes + 10 Entradas (só-mesa)
6. **Info** — horários + contactos
7. **Mapa**
8. **Galeria**
9. **Footer**

### 🔍 Comparação com ola.click deles
| Ola.click (actual) | Nosso Demo |
|---|---|
| Só takeaway | Takeaway + restaurante |
| Sem storytelling | 15 anos, 437 reviews em destaque |
| Sem bifes | 8 cortes de carne uruguaia + Fantástico Alvor €65 |
| Sem reservas de mesa | CTA directo WhatsApp/Tel |
| Logo genérico | Branding próprio, mood industrial |
| Cardápio SaaS | Plataforma única da casa |

### ✅ Dados integrados (100% reais)
- Extraídos directamente do `window.__NUXT__.state.productsCategories` do ola.click
- 60 produtos takeaway em 9 categorias (Limited Edition, Simples, Assinatura, Grandes, Kids, Molhos, Packs, Bebidas, Vinhos)
- 22 produtos só-restaurante (Entradas + Bifes) nas categorias `visible: false`
- Todos os nomes, preços, descrições e imagens são as reais do cliente
- Horário corrigido: 18h00-23h00 · Sex/Sáb até 24h00

### 🚀 Deploy
```bash
mkdir -p demos/otouro
cp otouro-final/index.html demos/otouro/
cp -r otouro-final/assets demos/otouro/
git add demos/otouro/
git commit -m "feat: O Touro v4.0 — plataforma completa steakhouse+takeaway"
git push
# URL: https://volvara.pt/demos/otouro/
```

### 🧪 Testar localmente
```bash
cd otouro-final && python3 -m http.server 8000
# Abre http://localhost:8000
```

### 📈 Stats finais
- 88KB HTML (single-file, inline CSS + JS)
- 53 imagens locais (~170KB média)
- Total ~10MB com todas as imagens
- Zero dependências externas no runtime
- Fontes Google carregadas por CDN (Bebas Neue, DM Sans, DM Mono)

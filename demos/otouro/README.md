# O Touro Burger & Steaks — Demo Volvara

## Push para GitHub Pages
```bash
# Na pasta do repositório volvara.pt:
cp -r otouro-final/* otouro/
git add otouro/
git commit -m "feat: O Touro demo v2 — full site with cart"
git push
```

## URL pública após push:
`https://volvara.pt/otouro/`

## Testar localmente:
```bash
cd otouro-final
python3 -m http.server 8000
# Abre http://localhost:8000
```

## Funcionalidades:
- 🛒 Carrinho nativo com 45 itens reais
- 💬 Checkout por WhatsApp com mensagem formatada
- ⏰ Aberto/Fechado em tempo real
- 📱 Mobile-first responsive
- 🗺️ Google Maps embed
- 📸 Galeria com fotos reais do CDN ola.click

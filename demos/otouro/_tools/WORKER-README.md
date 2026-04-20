# Volvara Proxy · Cloudflare Worker

## Deploy rápido (5 min)

### Opção A — Dashboard Web (mais simples)

1. Vai a https://dash.cloudflare.com
2. **Workers & Pages** → **Create Worker**
3. Nome: `volvara-proxy`
4. Clica **Deploy**
5. Depois **Edit code** → cola o conteúdo de `worker.js` → **Deploy**
6. O URL fica: `https://volvara-proxy.<teu-account>.workers.dev`

### Opção B — CLI com Wrangler

```bash
npm install -g wrangler
wrangler login
wrangler deploy worker.js --name volvara-proxy
```

### Custom domain (opcional, para parecer oficial)

Em Cloudflare → Worker → **Settings** → **Triggers** → **Custom Domains** → adicionar `proxy.volvara.pt`

## Testar

```bash
curl "https://volvara-proxy.<account>.workers.dev/?url=https://assets.olaclick.app/companies/products/images/800/7bc3f5be-fe53-4267-b6f9-2640ec70832e.png" -o test.png
```

## Domínios permitidos (allowlist)

No `worker.js`, edita `ALLOWED_HOSTS`:
- `assets.olaclick.app` · imagens ola.click
- `d2nagnwby8accc.cloudfront.net` · CDN antiga ola.click
- `scontent.*.fbcdn.net` · Facebook
- `fbcdn.net` · Facebook/Instagram

Adiciona novos domínios conforme precisares.

## Custos

Free tier Cloudflare Workers: **100.000 requests/dia**. Suficiente para centenas de demos.

/**
 * Volvara CORS Proxy Worker
 * Permite fetch server-side de assets externos para demos Volvara.
 *
 * Deploy: https://dash.cloudflare.com → Workers & Pages → Create Worker
 * Nome sugerido: volvara-proxy
 * Domínio: volvara-proxy.<account>.workers.dev (auto)
 *   ou: proxy.volvara.pt (custom domain)
 *
 * Uso:
 *   GET /?url=https://assets.olaclick.app/.../file.png
 *   → devolve a imagem com CORS * permitido
 *
 * Segurança:
 *   - Só allowlist de domínios (ALLOWED_HOSTS)
 *   - GET only
 *   - 10MB max
 *   - 30s timeout
 */

const ALLOWED_HOSTS = [
  'assets.olaclick.app',
  'd2nagnwby8accc.cloudfront.net',
  'scontent.fopo6-1.fna.fbcdn.net',
  'scontent.cdninstagram.com',
  'instagram.com',
  'fbcdn.net'
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/' && !url.searchParams.get('url')) {
      return new Response(JSON.stringify({
        service: 'Volvara Proxy',
        status: 'ok',
        usage: '?url=<full-url-to-proxy>',
        allowed_hosts: ALLOWED_HOSTS
      }, null, 2), {
        headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }
      });
    }

    // Only GET
    if (request.method !== 'GET' && request.method !== 'OPTIONS') {
      return new Response('Method not allowed', { status: 405 });
    }

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, OPTIONS',
          'access-control-max-age': '86400'
        }
      });
    }

    const target = url.searchParams.get('url');
    if (!target) return new Response('Missing ?url param', { status: 400 });

    // Validate URL
    let targetUrl;
    try {
      targetUrl = new URL(target);
    } catch (e) {
      return new Response('Invalid URL', { status: 400 });
    }

    // Allowlist check
    const hostAllowed = ALLOWED_HOSTS.some(h =>
      targetUrl.hostname === h || targetUrl.hostname.endsWith('.' + h)
    );
    if (!hostAllowed) {
      return new Response(`Host not allowed: ${targetUrl.hostname}`, { status: 403 });
    }

    // Fetch
    try {
      const upstream = await fetch(targetUrl.toString(), {
        headers: {
          'user-agent': 'Mozilla/5.0 (Volvara-Proxy)',
          'accept': '*/*'
        },
        cf: { cacheTtl: 86400, cacheEverything: true }
      });

      if (!upstream.ok) {
        return new Response(`Upstream returned ${upstream.status}`, { status: upstream.status });
      }

      // Size check
      const contentLength = upstream.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > MAX_SIZE) {
        return new Response('Too large', { status: 413 });
      }

      // Stream back with CORS
      const headers = new Headers(upstream.headers);
      headers.set('access-control-allow-origin', '*');
      headers.set('cache-control', 'public, max-age=86400');
      headers.delete('content-security-policy');
      headers.delete('x-frame-options');

      return new Response(upstream.body, {
        status: upstream.status,
        headers
      });
    } catch (e) {
      return new Response('Fetch failed: ' + e.message, { status: 502 });
    }
  }
};

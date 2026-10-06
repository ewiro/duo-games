import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { path } from './lib.mjs';

const site = path('site');
const arg = process.argv.find(value => value.startsWith('--port='));
const port = arg ? Number(arg.slice(7)) : 4173;
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('端口无效');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml' };
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const file = resolve(site, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(site + sep)) { response.writeHead(403).end('Forbidden'); return; }
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405).end('Method not allowed'); return; }
    if (!(await stat(file)).isFile()) throw new Error('not file');
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch { response.writeHead(404).end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`双人游戏表 · Local: http://127.0.0.1:${port}`));
process.on('SIGINT',()=>server.close(()=>process.exit()));
process.on('SIGTERM',()=>server.close(()=>process.exit()));

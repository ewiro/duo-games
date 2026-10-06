import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const path = (relative) => resolve(root, relative);
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export const fits = { 3: '双人首选', 2: '双人可玩', 1: '更适合多人' };
export const sources = ['热门游戏', '经典补充', '补充'];
export const relations = ['合作', '对抗', '非对称合作', '合作互坑', '轮流操作'];
export const modes = ['在线联机', '本地同屏', '本地分屏', '本地协作', '远程同乐', '跨平台', '语音协作'];

export function parseTsv(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  const keys = lines.shift().split('\t');
  if (new Set(keys).size !== keys.length) throw new Error('TSV 表头重复');
  return lines.filter(Boolean).map((line, i) => {
    const cells = line.split('\t');
    if (cells.length !== keys.length) throw new Error(`TSV 第 ${i + 2} 行列数错误`);
    return Object.fromEntries(keys.map((key, j) => [key, cells[j]]));
  });
}
export const readTsv = async (file) => parseTsv(await readFile(path(file), 'utf8'));
export const stringifyTsv = (rows, keys) => [keys.join('\t'), ...rows.map(row => keys.map(key => String(row[key] ?? '').replace(/[\t\r\n]/g, ' ')).join('\t'))].join('\n') + '\n';
export async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(path(file), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT' && fallback !== undefined) return fallback; throw error; }
}
export async function save(file, content) {
  const target = path(file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target + '.tmp', content, 'utf8');
  await rename(target + '.tmp', target);
}
export const saveJson = (file, value) => save(file, JSON.stringify(value, null, 2) + '\n');
export async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'duo-games/1.0 (catalogue maintenance)', 'Accept': 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
export const steamUrl = id => `https://store.steampowered.com/app/${id}/`;
export const split = value => value.split('、').filter(Boolean);

import { fetchJson } from './lib.mjs';

// Steam tags checked against /tagdata/populartags/english. Tags discover candidates only.
export const entrances = [
  { key: 'two-player', name: '双人合作', params: { tags: '1685', term: 'two' } },
  { key: 'online', name: '在线合作', params: { tags: '3843' } },
  { key: 'local', name: '本地合作', params: { tags: '3841' } },
  { key: 'puzzle', name: '双人解谜', params: { tags: '1685,1664' } },
  { key: 'versus', name: '双人对抗', params: { tags: '1775,7368' } },
  { key: 'party', name: '欢乐游戏', params: { tags: '3859,4136' } },
  { key: 'horror', name: '轻恐怖合作', params: { tags: '1685,1667' } },
  { key: 'sellers', name: '热销游戏', params: { filter: 'topsellers' } },
  { key: 'new', name: '热门新品', params: { filter: 'popularnew' } },
  { key: 'wishlist', name: '热门愿望单', params: { filter: 'popularwishlist' } }
];
export const entranceUrl = (entry, start = 0, count = 50) => {
  const query = new URLSearchParams({ query: '', start: String(start), count: String(count), category1: '998', infinite: '1', cc: 'cn', l: 'english', ...entry.params });
  return `https://store.steampowered.com/search/results/?${query}`;
};
export function decodeHtml(text) {
  return text.replace(/<[^>]*>/g,'').replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2),16));
    if (entity.startsWith('#')) return String.fromCodePoint(Number(entity.slice(1)));
    return { amp:'&', quot:'"', apos:"'", lt:'<', gt:'>', nbsp:' ' }[entity.toLowerCase()];
  }).trim();
}
export function parseSearchResults(html) {
  const games = [];
  for (const match of html.matchAll(/<a\b([^>]*\bdata-ds-appid="(\d+)"[^>]*)>([\s\S]*?)<\/a>/g)) {
    const title = match[3].match(/<span\b[^>]*class="title"[^>]*>([\s\S]*?)<\/span>/);
    // Exclude packages, bundles and multi-AppID rows.
    if (title && match[1].includes(`/app/${match[2]}/`)) games.push({ id: match[2], name: decodeHtml(title[1]) });
  }
  return games;
}
export async function scanEntrance(entry, pages) {
  const found = new Map();
  let total = 0;
  for (let page = 0; page < pages; page++) {
    const result = await fetchJson(entranceUrl(entry, page * 50));
    if (typeof result.results_html !== 'string' || !Number.isFinite(Number(result.total_count))) throw new Error('Steam 搜索响应结构变化');
    total = Number(result.total_count);
    const rows = parseSearchResults(result.results_html);
    if (total > page * 50 && !rows.length) throw new Error('Steam 返回结果但未能解析游戏条目');
    for (const row of rows) found.set(row.id,row);
    if ((page + 1) * 50 >= total) break;
  }
  return { entry, total, games: [...found.values()] };
}

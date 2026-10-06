import { readTsv, readJson, saveJson, save, stringifyTsv, fetchJson, today } from './lib.mjs';
import { checkCatalogue, candidateKeys, mergeCandidates, refreshSteamEntry, buildGame } from './catalogue.mjs';

const catalogue = await readTsv('data/catalogue.tsv');
const errors = checkCatalogue(catalogue);
if (errors.length) throw new Error(errors.join('\n'));
const previous = await readJson('data/steam-cache.json', { apps: {} });
const cache = { apps: {} };
const date = today();
let success = 0, priceSuccess = 0, cursor = 0;
const offline = process.argv.includes('--offline');
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < catalogue.length) {
    const row = catalogue[cursor++];
    const old = previous.apps[row.id];
    if (offline) { cache.apps[row.id] = old || {}; continue; }
    const result = await refreshSteamEntry(old, row.id, date, () => fetchJson(`https://store.steampowered.com/api/appdetails?appids=${row.id}&cc=cn&l=english`));
    cache.apps[row.id] = result.cache;
    if (!result.error) {
      success++;
      if (!result.cache.priceRefreshFailed) priceSuccess++;
      else console.warn(`${row.id} ${row.name}: 未获取中国区价格，保留原价格和日期`);
    } else console.warn(`${row.id} ${row.name}: ${result.error}，沿用缓存`);
  }
}));
const candidates = mergeCandidates(await readTsv('data/candidates.tsv'), [], catalogue, date);
await saveJson('data/steam-cache.json', cache);
await saveJson('site/games.json', { schemaVersion: 1, generatedAt: date, games: catalogue.map(row => buildGame(row, cache.apps[row.id])) });
await save('data/candidates.tsv', stringifyTsv(candidates, candidateKeys));
console.log(`生成 ${catalogue.length} 款游戏；${offline ? '使用缓存' : `Steam 条目成功 ${success}，中国区核价成功 ${priceSuccess}，沿用旧价/未知 ${catalogue.length - priceSuccess}`}`);

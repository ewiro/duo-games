import assert from 'node:assert/strict';
import { readTsv, readJson, path } from './lib.mjs';
import { readFile } from 'node:fs/promises';
import { checkCatalogue, checkCandidates, buildGame, validDate } from './catalogue.mjs';

const catalogue = await readTsv('data/catalogue.tsv');
const candidates = await readTsv('data/candidates.tsv');
const cache = await readJson('data/steam-cache.json');
const generated = await readJson('site/games.json');
const errors = [...checkCatalogue(catalogue), ...checkCandidates(candidates, catalogue)];
if (!catalogue.length) errors.push('正式清单为空');
if (generated.schemaVersion !== 1 || !validDate(generated.generatedAt)) errors.push('生成数据版本或日期无效');
if (catalogue.length !== generated.games.length) errors.push('正式清单与生成数量不一致');
for (const [i, row] of catalogue.entries()) {
  const metadata = cache.apps[row.id];
  if (metadata?.appId !== Number(row.id) || metadata.type !== 'game') errors.push(`${row.id}: 缺少对应游戏的 Steam 元数据核验`);
  const normalize = value => value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  if (metadata?.steamName && normalize(metadata.steamName) !== normalize(row.name)) errors.push(`${row.id}: 名称与 Steam 条目不一致 (${metadata.steamName})`);
  if (metadata?.metadataCheckedAt && !validDate(metadata.metadataCheckedAt)) errors.push(`${row.id}: 元数据日期无效`);
  const game = generated.games[i];
  try { assert.deepEqual(game, buildGame(row, metadata)); }
  catch { errors.push(`${row.id}: games.json 与编辑数据/缓存不一致，请运行 refresh`); }
  if (game?.price) {
    const price = game.price;
    if (price.currency !== 'CNY' || !Number.isInteger(price.final) || price.final < 0 || !Number.isInteger(price.initial) || price.initial < price.final || !validDate(price.checkedAt) || !Number.isFinite(price.discountPercent) || price.discountPercent < 0 || price.discountPercent > 100) errors.push(`${row.id}: 价格或最后成功核价日期无效`);
  }
  try {
    const image = new URL(game.cover);
    if (image.protocol !== 'https:' || !/\.(steamstatic\.com|steamusercontent\.com)$/.test(image.hostname)) errors.push(`${row.id}: 封面不是 Steam 远程图片`);
  } catch { errors.push(`${row.id}: 封面 URL 无效`); }
}
for (const file of ['site/index.html','site/styles.css','site/app.js','.github/workflows/pages.yml','.github/workflows/discovery.yml']) {
  if (!(await readFile(path(file),'utf8')).trim()) errors.push(`${file}: 文件为空`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`校验通过：${catalogue.length} 个唯一 AppID，全部有人数证据/核验日期；${candidates.length} 条候选状态有效，生成数据一致。`);

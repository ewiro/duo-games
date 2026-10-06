import { readTsv, save, saveJson, stringifyTsv, today } from './lib.mjs';
import { candidateKeys, mergeCandidates, checkCandidates } from './catalogue.mjs';
import { entrances, entranceUrl, scanEntrance } from './discovery.mjs';
import { appendFile } from 'node:fs/promises';

const pagesArg = process.argv.find(arg => arg.startsWith('--pages='));
const pages = pagesArg ? Number(pagesArg.split('=')[1]) : 2;
if (!Number.isInteger(pages) || pages < 1 || pages > 10) throw new Error('--pages 需要 1–10，默认每入口前 100 条；这不是清单数量上限。');
const catalogue = await readTsv('data/catalogue.tsv');
const existing = await readTsv('data/candidates.tsv');
const date = today();
const repository = process.env.GITHUB_REPOSITORY || 'ewiro/duo-games';
const found = new Map(), results = [];
let cursor = 0;
await Promise.all(Array.from({length:2}, async () => {
  while (cursor < entrances.length) {
    const entry = entrances[cursor++];
    try {
      const result = await scanEntrance(entry,pages);
      for (const game of result.games) {
        const old = found.get(game.id);
        found.set(game.id,{...game,sources:[...(old?.sources || []),entry.name]});
      }
      results.push({ key:entry.key, name:entry.name, url:entranceUrl(entry), total:result.total, sampled:result.games.length, status:'ok' });
      console.log(`${entry.name}: 检查 ${result.games.length} 条 / 入口 ${result.total} 条`);
    } catch (error) {
      results.push({ key:entry.key, name:entry.name, url:entranceUrl(entry), sampled:0, status:'failed', error:error.message });
      console.error(`${entry.name}: ${error.message}`);
    }
  }
}));
results.sort((a,b) => entrances.findIndex(x=>x.key===a.key)-entrances.findIndex(x=>x.key===b.key));
const candidates = mergeCandidates(existing,[...found.values()],catalogue,date);
const errors = checkCandidates(candidates,catalogue);
if (errors.length) throw new Error(errors.join('\n'));
const pending = candidates.filter(row=>row.status==='pending');
const added = [...found.keys()].filter(id=>!existing.some(row=>row.id===id));
await save('data/candidates.tsv',stringifyTsv(candidates,candidateKeys));
const report = [
  '# Steam 候选覆盖报告', '', `扫描日期：${date}（Asia/Shanghai）。`, '',
  `每个入口抽样前 ${pages * 50} 条；多入口合并去重发现 ${found.size} 款，本次新增 ${added.length} 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。`, '',
  `台账共 ${candidates.length} 款：正式收录 ${catalogue.length} 款，待核验 ${pending.length} 款，已排除 ${candidates.filter(row=>row.status==='excluded').length} 款。`, '',
  '类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。', '',
  '| 入口 | 状态 | 抽样数 | Steam 入口总数 |', '| --- | --- | ---: | ---: |',
  ...results.map(row=>`| [${row.name}](${row.url}) | ${row.status==='ok'?'成功':`失败：${row.error}`} | ${row.sampled} | ${row.total??'未知'} |`), '',
  '## 人工审核顺序', '',
  '1. 核对 AppID、是否为已发行的游戏本体。',
  '2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。',
  '3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。',
  '4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。', '',
  '## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）', '',
  ...added.slice(0,40).map(id=>{const game=found.get(id);return `- [${game.name.replace(/[\[\]]/g,'') }](https://store.steampowered.com/app/${id}/) — ${game.sources.join('、')}`;}), ''
].join('\n');
await save('reports/discovery.md',report);
await saveJson('reports/discovery.json',{scannedAt:date,pages,entrances:results,discovered:found.size,added:added.length,pending:pending.length});
await save('reports/pending-issue.md',[
  '# 双人游戏候选待审核', '', `最近扫描：${date}。待核验 ${pending.length} 款；正式清单 ${catalogue.length} 款。`, '',
  '自动发现仅建立队列，必须逐款人工核验，不能仅凭 Steam 多人/合作标签收录。', '',
  `完整台账：[data/candidates.tsv](https://github.com/${repository}/blob/main/data/candidates.tsv)；覆盖报告：[reports/discovery.md](https://github.com/${repository}/blob/main/reports/discovery.md)。`, '',
  '## 待核验样本（按 AppID 排序，最多 50 款）', '',
  ...pending.slice(0,50).map(row=>`- [ ] [${row.name.replace(/[\[\]]/g,'')}](https://store.steampowered.com/app/${row.id}/) — ${row.reason || row.sources}`), '',
  ...results.filter(row=>row.status==='failed').map(row=>`扫描失败：${row.name}，${row.error}。请检查 Actions 日志。`), ''
].join('\n'));
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, 'report_ready=true\n');
if (results.some(row=>row.status==='failed')) process.exitCode=1;
else console.log(`扫描成功：新增 ${added.length} 款待核验；已排除游戏未恢复，正式清单未扩充。`);

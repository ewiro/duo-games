import { readFile } from 'node:fs/promises';
import { path, readJson } from './lib.mjs';

// Only run in the authorized GitHub workflow; never require a personal token.
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
if (!repository || !/^[\w.-]+\/[\w.-]+$/.test(repository) || !token) throw new Error('此脚本需要 GitHub 工作流提供 GITHUB_REPOSITORY 和 GITHUB_TOKEN');
const title = '双人游戏候选待审核';
const marker = '<!-- duo-games-candidate-review -->';
async function github(endpoint, options = {}) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    ...options, signal: AbortSignal.timeout(20000),
    headers: { 'Accept':'application/vnd.github+json', 'Authorization':`Bearer ${token}`, 'X-GitHub-Api-Version':'2022-11-28', 'Content-Type':'application/json' }
  });
  if (!response.ok) throw new Error(`GitHub ${response.status}，请检查 Actions 日志与仓库权限`);
  return response.json();
}
let existing;
// Page through all issues instead of relying on search indexing or creating duplicates.
for (let page=1;;page++) {
  const rows=await github(`/repos/${repository}/issues?state=all&per_page=100&page=${page}`);
  existing=rows.find(issue=>!issue.pull_request && (issue.body?.includes(marker) || issue.title===title));
  if(existing || rows.length<100)break;
}
const report=await readFile(path('reports/pending-issue.md'),'utf8');
const coverage=await readJson('reports/discovery.json');
const body=marker+'\n'+report;
const state=coverage.pending>0?'open':'closed';
if(existing){
  await github(`/repos/${repository}/issues/${existing.number}`,{method:'PATCH',body:JSON.stringify({title,body,state})});
  console.log(`已更新待审核 Issue #${existing.number}`);
}else if(coverage.pending>0){
  const created=await github(`/repos/${repository}/issues`,{method:'POST',body:JSON.stringify({title,body})});
  console.log(`已建立待审核 Issue #${created.number}`);
}else console.log('无待核验候选，无需创建 Issue');

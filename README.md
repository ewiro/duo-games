# 双人游戏表

给固定两名朋友使用的 Steam 游戏清单。无构建依赖，Node.js 22+ 可运行维护脚本，页面由原生 HTML / CSS / JavaScript 构成，GitHub Pages 直接发布 `site/`。

## 本地使用

```bash
npm run dev
```

浏览器打开 `http://127.0.0.1:4173`。按英文名、中文搜索别名或玩法描述搜索；类型、联机方式、双人适配度、关系和来源可组合筛选。支持适配度、价格、名称及核验日期排序，筛选条件写入 URL，重置可清除。桌面为横向列表，手机为纵向卡片。封面来自 Steam 远程地址，加载失败时显示游戏名。

中文搜索别名用于查找，不一定是发行商正式译名。页面价格为中国区**单份本体**价格，不代表两人总费用；好友通行证、语音、购买和分屏限制见每款理由。人数依据来自官方说明；适配度和游玩建议是基于机制的编辑判断，未进行每款游戏的实机体验测试。

## 数据维护

- `data/catalogue.tsv`：唯一正式编辑来源，所有正式收录均经过人数核验。类型、联机方式、搜索别名用 `、` 分隔。最低字段遵循 AGENTS.md，并补充名称、依据摘要、搜索别名和内容提示。
- `data/steam-cache.json`：脚本生成的 Steam AppID / 名称 / 远程封面 / 中国区价格缓存。单款接口失败或不返回 CNY 价格时，保留原价格和**原成功日期**。
- `site/games.json`：由编辑数据与缓存生成，勿手改。
- `data/candidates.tsv`：独立候选台账，`pending` / `included` / `excluded`。排除必须写原因，后续扫描不会自动恢复。
- `reports/discovery.md`：候选入口覆盖报告；`discovery.json` 为机器摘要，`pending-issue.md` 为工作流更新 Issue 的内容。

修改正式清单或页面后执行：

```bash
node scripts/refresh.mjs
node scripts/validate.mjs
node --test tests/*.test.mjs
```

正式游戏的名称必须与对应 Steam 本体一致，AppID 不可重复。核验时阅读官方玩法内容，不能把多人/在线合作标签当作双人可玩的充分证据。编辑排除状态和正式清单发生冲突时脚本会停止，需人工处理。移出正式游戏时同步把候选 `included` 改成 `pending` 或带原因的 `excluded`。

`refresh --offline` 可在临时断网时按缓存重新生成页面，**不会刷新任何核价日期**，不能代替联网核价。图片不下载到仓库；没有成功价格时显示“暂未核价”。即使今天生成页面，较早的价格也仍显示其实际最后成功日期。

## 候选发现

```bash
node scripts/discover.mjs
```

默认扫描 10 个 Steam 入口，每入口前两页、最多 100 条，包括双人合作、在线合作、本地合作、解谜、对抗、欢乐、恐怖合作、热销、新品和愿望单。`--pages=1` 到 `--pages=10` 调整扫描深度。扫描只是抽样，没有正式游戏数量上限，也不承诺覆盖全部 Steam 游戏。“轻恐怖”入口可能找到重度恐怖作品，需人工审核强度。

新发现只进入候选台账，**不自动录入正式清单**。失败入口会写进覆盖报告并使脚本退出失败；成功入口的结果仍可保留。每次扫描后运行 `node scripts/validate.mjs`。

## GitHub Pages 与自动化

GitHub 仓库：[ewiro/duo-games](https://github.com/ewiro/duo-games)；页面：[双人游戏表](https://ewiro.github.io/duo-games/)。默认分支为 `main`，GitHub Pages 使用 **GitHub Actions** 发布，仓库 Issues 用于候选审核。

- `pages.yml`：主分支推送、每日北京时间 07:20、手动触发时联网刷新价格，校验及测试通过后上传 `site/` 并部署。缓存提交回仓库，让下次失败能保留**上一次运行**成功的价格。校验失败不部署。
- `discovery.yml`：每周一北京时间 07:45 及手动触发时更新台账、覆盖报告与同一个待审核 Issue，自动扫描不修改正式清单。

Actions 的计划运行可能延迟，GitHub 对长时间无活动的公开仓库可能暂停计划任务。自动提交含 `[skip ci]`，防止递归触发；发现和核价共用并发组，避免自动化之间同时写数据。仓库分支保护若禁止 Actions 直接推送，需要管理员允许自动维护或改成 PR 流程；不要因此关闭保护。没有额外付费服务、私人令牌或构建依赖。

推送后检查 [Actions 运行记录](https://github.com/ewiro/duo-games/actions)以及 GitHub Pages 地址；任何失败都应按实际日志处理。页面修改需另外在桌面与窄屏检查交互、溢出和封面失败状态。

实现参考：[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。每款游戏的官方人数链接保存在清单中，并显示在页面上，例如 [Portal 2](https://store.steampowered.com/app/620/) 与 [PlateUp! 官方人数说明](https://www.plateupgame.com/presskit/)。

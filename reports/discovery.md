# Steam 候选覆盖报告

扫描日期：2026-11-02（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 642 款，本次新增 35 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 847 款：正式收录 96 款，待核验 749 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 100 | 6906 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 11490 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5373 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 100 | 1613 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 100 | 3484 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5646 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 99 | 2212 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 100 | 6514 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 365 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5358 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [just volleyball](https://store.steampowered.com/app/5037200/) — 双人合作
- [Worst Class Ever](https://store.steampowered.com/app/5175310/) — 双人合作
- [PAO PAO](https://store.steampowered.com/app/3024130/) — 在线合作、热销游戏
- [CRACK](https://store.steampowered.com/app/4312190/) — 在线合作、欢乐游戏、轻恐怖合作
- [Finals Week ✍🏻](https://store.steampowered.com/app/4715160/) — 在线合作、欢乐游戏、热销游戏
- [S.O.N.A.R. - Submarine Operators Not Actually Ready](https://store.steampowered.com/app/4096830/) — 在线合作、欢乐游戏、热销游戏
- [V Rising](https://store.steampowered.com/app/1604030/) — 在线合作
- [Put Your Toys Away Together!](https://store.steampowered.com/app/5041530/) — 双人解谜、本地合作
- [Wuppo: Definitive Edition](https://store.steampowered.com/app/400630/) — 双人解谜
- [Catch Meow If You Can](https://store.steampowered.com/app/4306070/) — 双人解谜
- [Urbexophobia](https://store.steampowered.com/app/3919430/) — 双人解谜
- [Bridge Constructor Portal](https://store.steampowered.com/app/684410/) — 双人解谜
- [Sea of Stars: Sunset Edition](https://store.steampowered.com/app/1244090/) — 本地合作
- [Pizza Possum](https://store.steampowered.com/app/1951230/) — 本地合作
- [Bongo Cat](https://store.steampowered.com/app/3419430/) — 欢乐游戏
- [Walk of Life](https://store.steampowered.com/app/1910150/) — 双人对抗
- [Combat Mission Shock Force 2](https://store.steampowered.com/app/1369370/) — 双人对抗
- [Contagion](https://store.steampowered.com/app/238430/) — 双人对抗
- [Carcassonne - Tiles & Tactics](https://store.steampowered.com/app/598810/) — 双人对抗
- [DOKAPON! Sword of Fury](https://store.steampowered.com/app/3077020/) — 双人对抗
- [Koihime Enbu RyoRaiRai](https://store.steampowered.com/app/795510/) — 双人对抗
- [NARUTO SHIPPUDEN: Ultimate Ninja STORM 3 Full Burst HD](https://store.steampowered.com/app/234670/) — 双人对抗
- [The Texas Chain Saw Massacre](https://store.steampowered.com/app/1433140/) — 轻恐怖合作
- [ZEPHON](https://store.steampowered.com/app/1481170/) — 轻恐怖合作
- [Nomad Drive](https://store.steampowered.com/app/2223980/) — 热销游戏、热门新品
- [Football Manager 27](https://store.steampowered.com/app/4530370/) — 热销游戏
- [Cairn](https://store.steampowered.com/app/1588550/) — 热销游戏、热门新品
- [The Forest](https://store.steampowered.com/app/242760/) — 热销游戏、热门新品
- [Assassin's Creed Black Flag Resynced](https://store.steampowered.com/app/3751950/) — 热销游戏、热门新品
- [Assassin’s Creed Shadows](https://store.steampowered.com/app/3159330/) — 热销游戏、热门新品
- [MiSide](https://store.steampowered.com/app/2527500/) — 热销游戏
- [Clair Obscur: Expedition 33](https://store.steampowered.com/app/1903340/) — 热销游戏、热门新品
- [Rip It! Card Collector](https://store.steampowered.com/app/5088440/) — 热销游戏
- [Last Harbor](https://store.steampowered.com/app/4369620/) — 热门愿望单
- [Under a Rock](https://store.steampowered.com/app/1667040/) — 热门愿望单

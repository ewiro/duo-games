# Steam 候选覆盖报告

扫描日期：2026-10-19（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 633 款，本次新增 51 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 765 款：正式收录 96 款，待核验 667 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 100 | 6630 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 10957 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5263 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 99 | 1572 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 99 | 3387 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5404 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 99 | 2141 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 99 | 6346 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 363 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5252 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [Chained Beasts](https://store.steampowered.com/app/3569420/) — 在线合作、本地合作、欢乐游戏、热销游戏、热门新品
- [Realm of Taiwu](https://store.steampowered.com/app/3452720/) — 在线合作、热销游戏
- [Guild Wars 2®](https://store.steampowered.com/app/1284210/) — 在线合作
- [Texas Hold'em Poker: Pokerist](https://store.steampowered.com/app/3174070/) — 在线合作
- [The Walking Trade 2](https://store.steampowered.com/app/4843910/) — 双人合作
- [We Were Here Tomorrow](https://store.steampowered.com/app/2315050/) — 双人合作
- [Death Road to Canada](https://store.steampowered.com/app/252610/) — 本地合作
- [Nobody Saves the World](https://store.steampowered.com/app/1432050/) — 本地合作
- [LEGO® DC Super-Villains](https://store.steampowered.com/app/829110/) — 本地合作
- [Cat Quest III](https://store.steampowered.com/app/2305840/) — 本地合作
- [Ember Knights](https://store.steampowered.com/app/1135230/) — 本地合作
- [Party Club](https://store.steampowered.com/app/2796010/) — 本地合作
- [Kingdom Eighties](https://store.steampowered.com/app/1956040/) — 本地合作
- [Trash Day](https://store.steampowered.com/app/3314580/) — 双人解谜、欢乐游戏
- [Brick by Brick: Tidy Up the Small Town!](https://store.steampowered.com/app/5228920/) — 双人解谜
- [LEGO® STAR WARS™: The Force Awakens](https://store.steampowered.com/app/438640/) — 双人解谜
- [LEGO® The Lord of the Rings™](https://store.steampowered.com/app/214510/) — 双人解谜
- [Shift Happens](https://store.steampowered.com/app/359840/) — 双人解谜
- [TerraScape](https://store.steampowered.com/app/2290000/) — 双人解谜
- [Reason and Rhyme](https://store.steampowered.com/app/4461870/) — 双人解谜
- [Trine 3: The Artifacts of Power](https://store.steampowered.com/app/319910/) — 双人解谜
- [Mars First Logistics](https://store.steampowered.com/app/1532200/) — 双人解谜
- [LEGO® The Hobbit™](https://store.steampowered.com/app/285160/) — 双人解谜
- [MotoGP™22](https://store.steampowered.com/app/1710580/) — 双人对抗
- [Clue/Cluedo](https://store.steampowered.com/app/2506480/) — 双人对抗
- [THE GAME OF LIFE 2](https://store.steampowered.com/app/1455630/) — 双人对抗
- [Electoral Carnage](https://store.steampowered.com/app/3706810/) — 双人对抗
- [Soulmask](https://store.steampowered.com/app/2646460/) — 轻恐怖合作
- [Oh Deer](https://store.steampowered.com/app/2708450/) — 轻恐怖合作
- [Choo-Choo Charles](https://store.steampowered.com/app/1766740/) — 轻恐怖合作
- [Sinister Night 2](https://store.steampowered.com/app/2761670/) — 轻恐怖合作
- [Barfender: CO-OP Bar Simulator](https://store.steampowered.com/app/4159680/) — 欢乐游戏
- [Double Dealers](https://store.steampowered.com/app/4218620/) — 欢乐游戏
- [Hood Warfare 2](https://store.steampowered.com/app/5155360/) — 欢乐游戏
- [Super Animal Royale](https://store.steampowered.com/app/843380/) — 欢乐游戏
- [Dupery: A Game of Solo Deduction](https://store.steampowered.com/app/3845070/) — 热销游戏
- [DEAD OR ALIVE Xtreme Venus Vacation](https://store.steampowered.com/app/958260/) — 热销游戏
- [Chef Life: A Restaurant Simulator](https://store.steampowered.com/app/1122340/) — 热销游戏
- [Stranded Deep](https://store.steampowered.com/app/313120/) — 热销游戏
- [Atomic Heart](https://store.steampowered.com/app/668580/) — 热销游戏、热门新品

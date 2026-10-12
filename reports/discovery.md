# Steam 候选覆盖报告

扫描日期：2026-10-12（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 636 款，本次新增 67 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 714 款：正式收录 96 款，待核验 616 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 100 | 6505 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 10699 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5209 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 100 | 1542 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 100 | 3342 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5283 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 100 | 2106 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 99 | 6203 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 336 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5245 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [Invokyr](https://store.steampowered.com/app/3883570/) — 在线合作、轻恐怖合作、热销游戏、热门新品
- [Overwatch®](https://store.steampowered.com/app/2357570/) — 在线合作、热销游戏
- [Dark and Darker](https://store.steampowered.com/app/2016590/) — 在线合作、热销游戏
- [The First Descendant](https://store.steampowered.com/app/2074920/) — 在线合作
- [Japanese Ramen Simulator](https://store.steampowered.com/app/4968640/) — 在线合作
- [Granblue Fantasy: Relink](https://store.steampowered.com/app/881020/) — 在线合作
- [World of Tanks Blitz](https://store.steampowered.com/app/444200/) — 在线合作
- [Call of Duty®](https://store.steampowered.com/app/1938090/) — 在线合作
- [Call of Duty®: Warzone™](https://store.steampowered.com/app/1962663/) — 在线合作
- [Wo Long 2: Wings of Ember](https://store.steampowered.com/app/4507990/) — 双人合作
- [Left! Left! LEFT!](https://store.steampowered.com/app/5362020/) — 双人合作
- [The Crew™ 2](https://store.steampowered.com/app/646910/) — 双人合作
- [Disney/Pixar Toy Story 3 Complete Edition](https://store.steampowered.com/app/4049180/) — 双人合作
- [PGA TOUR 2K25](https://store.steampowered.com/app/2385530/) — 双人合作
- [The Escapists](https://store.steampowered.com/app/298630/) — 双人解谜
- [World of Goo 2](https://store.steampowered.com/app/3385670/) — 双人解谜
- [Pyramidion](https://store.steampowered.com/app/4024600/) — 双人解谜
- [Backrooms Lost Runners](https://store.steampowered.com/app/3072120/) — 双人解谜
- [INVITATION To FEAR](https://store.steampowered.com/app/1802330/) — 双人解谜
- [Gold Miner:Classic Edition](https://store.steampowered.com/app/3777060/) — 本地合作
- [Outward Definitive Edition](https://store.steampowered.com/app/794260/) — 本地合作
- [Rabbit and Steel](https://store.steampowered.com/app/2132850/) — 本地合作
- [Log Riders](https://store.steampowered.com/app/4082750/) — 本地合作
- [Teenage Mutant Ninja Turtles: Splintered Fate](https://store.steampowered.com/app/2996040/) — 本地合作
- [Barony](https://store.steampowered.com/app/371970/) — 本地合作
- [DEAD OR ALIVE 6 Last Round](https://store.steampowered.com/app/4144680/) — 双人对抗
- [WWE 2K25](https://store.steampowered.com/app/2878960/) — 双人对抗
- [Trivia Murder Party 3](https://store.steampowered.com/app/3048060/) — 双人对抗
- [Trackmania](https://store.steampowered.com/app/2225070/) — 双人对抗
- [GUILTY GEAR Xrd REV 2](https://store.steampowered.com/app/520440/) — 双人对抗
- [BeaterCore](https://store.steampowered.com/app/3711050/) — 双人对抗
- [Project Planet - Earth vs Humanity](https://store.steampowered.com/app/2224610/) — 双人对抗
- [Teenage Mutant Ninja Turtles: The Cowabunga Collection](https://store.steampowered.com/app/1659600/) — 双人对抗
- [Kingdom Rush 5: Alliance TD](https://store.steampowered.com/app/2849080/) — 欢乐游戏
- [Needle In A Haystack](https://store.steampowered.com/app/5085740/) — 欢乐游戏
- [Just Cause™ 3](https://store.steampowered.com/app/225540/) — 欢乐游戏
- [Feed and Grow: Fish](https://store.steampowered.com/app/429050/) — 欢乐游戏
- [DRAGON BALL: THE BREAKERS](https://store.steampowered.com/app/1276760/) — 欢乐游戏
- [GONE Fishing](https://store.steampowered.com/app/3645890/) — 轻恐怖合作
- [Aliens vs. Predator™](https://store.steampowered.com/app/10680/) — 轻恐怖合作

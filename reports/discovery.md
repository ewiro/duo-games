# Steam 候选覆盖报告

扫描日期：2026-11-23（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 659 款，本次新增 32 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 976 款：正式收录 96 款，待核验 878 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 98 | 7216 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 12138 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5510 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 100 | 1692 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 100 | 3609 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5966 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 100 | 2289 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 100 | 6510 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 370 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5282 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [Call of Duty®: Black Ops Cold War](https://store.steampowered.com/app/1985810/) — 在线合作、热销游戏
- [Call of Duty®: Black Ops 6](https://store.steampowered.com/app/4384550/) — 在线合作、热销游戏
- [Gold Miner: Party Rush](https://store.steampowered.com/app/4815320/) — 在线合作、本地合作、双人对抗、欢乐游戏、热销游戏
- [Need for Speed™ Heat](https://store.steampowered.com/app/1222680/) — 在线合作、热销游戏
- [Scam With Your Friends](https://store.steampowered.com/app/4954910/) — 在线合作
- [Dead Space™ 2](https://store.steampowered.com/app/47780/) — 双人合作、轻恐怖合作
- [TT Isle of Man: Ride on the Edge 2](https://store.steampowered.com/app/1082180/) — 双人合作
- [Saints Row 2](https://store.steampowered.com/app/9480/) — 双人合作
- [Capcom Fighting Collection 2](https://store.steampowered.com/app/2400430/) — 双人合作
- [Supreme Commander 2](https://store.steampowered.com/app/40100/) — 双人合作
- [Gears 5](https://store.steampowered.com/app/1097840/) — 本地合作、轻恐怖合作
- [Rotwood](https://store.steampowered.com/app/2015270/) — 本地合作
- [Silver Service: Tidy Up the Grand Buffet](https://store.steampowered.com/app/5413320/) — 双人解谜
- [Garfield Lasagna Party](https://store.steampowered.com/app/2008410/) — 双人对抗
- [Conquest of Elysium 5](https://store.steampowered.com/app/1606340/) — 双人对抗
- [Crime Boss: Rockay City](https://store.steampowered.com/app/2933080/) — 欢乐游戏
- [Battlefield™ V](https://store.steampowered.com/app/1238810/) — 热销游戏、热门新品
- [FINAL FANTASY VII REBIRTH](https://store.steampowered.com/app/2909400/) — 热销游戏、热门新品
- [DEATH STRANDING 2: ON THE BEACH](https://store.steampowered.com/app/3280350/) — 热销游戏、热门新品
- [Battlefield™ 1](https://store.steampowered.com/app/1238840/) — 热销游戏、热门新品
- [Battlefield™ 2042](https://store.steampowered.com/app/1517290/) — 热销游戏
- [NINJA GAIDEN 4](https://store.steampowered.com/app/2627260/) — 热销游戏、热门新品
- [Dead Space](https://store.steampowered.com/app/1693980/) — 热销游戏
- [Marvel’s Spider-Man: Miles Morales](https://store.steampowered.com/app/1817190/) — 热销游戏
- [Here Comes the Horde](https://store.steampowered.com/app/5066010/) — 热销游戏
- [Metro Exodus](https://store.steampowered.com/app/412020/) — 热销游戏
- [God of War](https://store.steampowered.com/app/1593500/) — 热销游戏、热门新品
- [Horizon Forbidden West™ Complete Edition](https://store.steampowered.com/app/2420110/) — 热销游戏
- [DEATH STRANDING DIRECTOR'S CUT](https://store.steampowered.com/app/1850570/) — 热销游戏
- [Dead Space™ 3](https://store.steampowered.com/app/1238060/) — 轻恐怖合作
- [I Have No Change](https://store.steampowered.com/app/3426150/) — 热门愿望单
- [The Sims™ 4](https://store.steampowered.com/app/1222670/) — 热门新品

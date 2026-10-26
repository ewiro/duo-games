# Steam 候选覆盖报告

扫描日期：2026-10-26（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 647 款，本次新增 47 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 812 款：正式收录 96 款，待核验 714 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 100 | 6784 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 11275 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5323 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 100 | 1601 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 100 | 3444 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5550 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 100 | 2189 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 98 | 6328 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 351 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5392 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [Far Far West](https://store.steampowered.com/app/3124540/) — 在线合作
- [Call of Duty®: Modern Warfare®](https://store.steampowered.com/app/2000950/) — 在线合作
- [Total Football Online](https://store.steampowered.com/app/4517460/) — 在线合作
- [HELLCARD II](https://store.steampowered.com/app/3106270/) — 双人合作
- [Cat Quest II](https://store.steampowered.com/app/914710/) — 双人合作
- [Never Be Alone](https://store.steampowered.com/app/2988120/) — 双人合作
- [Tape to Tape](https://store.steampowered.com/app/1566200/) — 本地合作
- [Deadly Days: Roadtrip](https://store.steampowered.com/app/3026450/) — 本地合作
- [Home Sheep Home: Farmageddon Party Edition](https://store.steampowered.com/app/259810/) — 本地合作
- [CATO: Buttered Cat](https://store.steampowered.com/app/1999520/) — 本地合作
- [The Hidden Ones](https://store.steampowered.com/app/4172450/) — 双人解谜、轻恐怖合作
- [Escape from Playtime](https://store.steampowered.com/app/2087540/) — 双人解谜、轻恐怖合作
- [Sort Them Ducks](https://store.steampowered.com/app/4992070/) — 双人解谜
- [Dungeons & Dragons Online®](https://store.steampowered.com/app/206480/) — 双人解谜
- [THE 4 SINS](https://store.steampowered.com/app/2128940/) — 双人解谜
- [How 2 Escape](https://store.steampowered.com/app/2264140/) — 双人解谜
- [Tropico 6](https://store.steampowered.com/app/492720/) — 欢乐游戏
- [Rosalie](https://store.steampowered.com/app/4268470/) — 欢乐游戏
- [First Racer](https://store.steampowered.com/app/1364690/) — 双人对抗
- [Barro GT](https://store.steampowered.com/app/1990740/) — 双人对抗
- [Inkulinati](https://store.steampowered.com/app/957960/) — 双人对抗
- [Resident Evil Revelations](https://store.steampowered.com/app/222480/) — 轻恐怖合作
- [Stay Out](https://store.steampowered.com/app/1180380/) — 轻恐怖合作
- [Dead Rising 3 Apocalypse Edition](https://store.steampowered.com/app/265550/) — 轻恐怖合作
- [Killing Floor 3](https://store.steampowered.com/app/1430190/) — 轻恐怖合作
- [One Way Tickets](https://store.steampowered.com/app/4817620/) — 热销游戏、热门新品
- [Rise of the Tomb Raider™](https://store.steampowered.com/app/391220/) — 热销游戏、热门新品
- [Shadow of the Tomb Raider: Definitive Edition](https://store.steampowered.com/app/750920/) — 热销游戏、热门新品
- [Moon Sweepers](https://store.steampowered.com/app/5335510/) — 热销游戏
- [Wandering Sword](https://store.steampowered.com/app/1876890/) — 热销游戏、热门新品
- [Dead Cells](https://store.steampowered.com/app/588650/) — 热销游戏、热门新品
- [The Walking Dead: The Telltale Definitive Series](https://store.steampowered.com/app/1449690/) — 热销游戏
- [QuestAway](https://store.steampowered.com/app/5195600/) — 热销游戏
- [Resident Evil 2](https://store.steampowered.com/app/883710/) — 热销游戏、热门新品
- [Victoria 3](https://store.steampowered.com/app/529340/) — 热销游戏、热门新品
- [Resident Evil 7 Biohazard](https://store.steampowered.com/app/418370/) — 热销游戏、热门新品
- [Don't Starve](https://store.steampowered.com/app/219740/) — 热销游戏
- [Sora no Kiseki the 1st](https://store.steampowered.com/app/3447040/) — 热销游戏
- [Tomb Raider Game of the Year](https://store.steampowered.com/app/203160/) — 热销游戏
- [Senren＊Banka](https://store.steampowered.com/app/1144400/) — 热销游戏

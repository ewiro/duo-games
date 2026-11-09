# Steam 候选覆盖报告

扫描日期：2026-11-09（Asia/Shanghai）。

每个入口抽样前 100 条；多入口合并去重发现 647 款，本次新增 43 款。扫描是抽样防遗漏，不代表覆盖所有 Steam 游戏。

台账共 890 款：正式收录 96 款，待核验 792 款，已排除 2 款。

类型标签只是发现线索；轻恐怖入口也可能返回重度恐怖作品，欢乐入口也不保证适合两人。待核验候选不出现在正式页面；已有排除状态与理由保持不变。

| 入口 | 状态 | 抽样数 | Steam 入口总数 |
| --- | --- | ---: | ---: |
| [双人合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685&term=two) | 成功 | 91 | 7009 |
| [在线合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3843) | 成功 | 100 | 11680 |
| [本地合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3841) | 成功 | 100 | 5415 |
| [双人解谜](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1664) | 成功 | 100 | 1642 |
| [双人对抗](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1775%2C7368) | 成功 | 100 | 3534 |
| [欢乐游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=3859%2C4136) | 成功 | 100 | 5751 |
| [轻恐怖合作](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&tags=1685%2C1667) | 成功 | 99 | 2223 |
| [热销游戏](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=topsellers) | 成功 | 99 | 6414 |
| [热门新品](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularnew) | 成功 | 100 | 365 |
| [热门愿望单](https://store.steampowered.com/search/results/?query=&start=0&count=50&category1=998&infinite=1&cc=cn&l=english&filter=popularwishlist) | 成功 | 100 | 5357 |

## 人工审核顺序

1. 核对 AppID、是否为已发行的游戏本体。
2. 从官方说明确认两名玩家能独立开始并完成主要玩法，记录人数、方式及双人限制。
3. 确认叙事符合项目范围，填写具体推荐理由、人数依据链接与核验日期。
4. 录入 catalogue.tsv 后运行 refresh 和 validate；排除时在候选台账写明原因。

## 本次新增候选（最多展示 40 条，完整清单在 data/candidates.tsv）

- [ZED ZONE](https://store.steampowered.com/app/1211600/) — 在线合作、热销游戏、热门新品
- [Anno 117: Pax Romana](https://store.steampowered.com/app/3274580/) — 在线合作、热销游戏
- [Borderlands 3](https://store.steampowered.com/app/397540/) — 在线合作、双人合作、热销游戏
- [PAYDAY 3](https://store.steampowered.com/app/1272080/) — 在线合作、热销游戏
- [Incursion Red River](https://store.steampowered.com/app/2116120/) — 在线合作、热销游戏
- [Loftia](https://store.steampowered.com/app/2320980/) — 在线合作
- [Lightyear Frontier](https://store.steampowered.com/app/1677110/) — 在线合作
- [DreamWorks Shrek 2 Remastered](https://store.steampowered.com/app/2523740/) — 双人合作
- [Ashes of the Singularity II](https://store.steampowered.com/app/3499790/) — 双人合作
- [Age of Empires II (Retired)](https://store.steampowered.com/app/221380/) — 双人合作
- [Company of Heroes 3](https://store.steampowered.com/app/1677280/) — 双人合作、热销游戏、热门新品
- [Survival: Fountain of Youth](https://store.steampowered.com/app/1967630/) — 双人解谜
- [Sector 13: Haunted Woods](https://store.steampowered.com/app/4244040/) — 双人解谜
- [Fat Chance](https://store.steampowered.com/app/4891550/) — 双人解谜
- [Chicory: A Colorful Tale](https://store.steampowered.com/app/1123450/) — 双人解谜
- [Escape Academy 2: Back 2 School](https://store.steampowered.com/app/3296060/) — 本地合作
- [Children of Morta](https://store.steampowered.com/app/330020/) — 本地合作
- [Monster Energy Supercross 25 - The Official Video Game](https://store.steampowered.com/app/2581370/) — 双人对抗
- [Plague Inc: The Board Game](https://store.steampowered.com/app/5283340/) — 双人对抗
- [Ultimate Sheep Raccoon](https://store.steampowered.com/app/2923350/) — 双人对抗
- [PBA Pro Bowling 2026](https://store.steampowered.com/app/3127230/) — 双人对抗
- [Terraforming Mars](https://store.steampowered.com/app/800270/) — 双人对抗
- [Quilts and Cats of Calico](https://store.steampowered.com/app/1993180/) — 双人对抗
- [FATAL FURY: City of the Wolves](https://store.steampowered.com/app/2492040/) — 欢乐游戏
- [Cheap Car Repair](https://store.steampowered.com/app/2904040/) — 欢乐游戏
- [4Wheel Challenge](https://store.steampowered.com/app/3504700/) — 欢乐游戏
- [Rat Game](https://store.steampowered.com/app/3347910/) — 轻恐怖合作
- [ZONE L.O.S.T.](https://store.steampowered.com/app/4420660/) — 轻恐怖合作
- [Potato Please](https://store.steampowered.com/app/5266240/) — 热销游戏、热门新品
- [Psycho-Sleuth](https://store.steampowered.com/app/3432860/) — 热销游戏
- [Assassin's Creed® Origins](https://store.steampowered.com/app/582160/) — 热销游戏、热门新品
- [组长！怨念请查收！](https://store.steampowered.com/app/3826290/) — 热销游戏
- [Assassin's Creed® Odyssey](https://store.steampowered.com/app/812140/) — 热销游戏、热门新品
- [Age of Wonders 4](https://store.steampowered.com/app/1669000/) — 热销游戏、热门新品
- [Road Rash™: 30th Anniversary Edition](https://store.steampowered.com/app/2448570/) — 热销游戏
- [Punch The Walls](https://store.steampowered.com/app/5455340/) — 热销游戏
- [DYNASTY WARRIORS: ORIGINS](https://store.steampowered.com/app/2384580/) — 热销游戏、热门新品
- [Queen's Domain](https://store.steampowered.com/app/1799840/) — 热销游戏、热门新品
- [Atelier Karia: The Night Kingdom & the Guide of Memories](https://store.steampowered.com/app/4532500/) — 热销游戏
- [Frostpunk](https://store.steampowered.com/app/323190/) — 热销游戏

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTsv, stringifyTsv } from '../scripts/lib.mjs';
import { mergeCandidates, updateSteamCache, refreshSteamEntry, checkCandidates, validDate } from '../scripts/catalogue.mjs';
import { parseSearchResults, entrances } from '../scripts/discovery.mjs';
import { selectGames, defaultFilters } from '../site/catalogue.js';

test('TSV round-trip preserves an empty final reason, including at end of file',()=>{
  const rows=[{id:'620',reason:''},{id:'550',reason:'需补核人数'}];
  assert.deepEqual(parseTsv(stringifyTsv(rows,['id','reason'])),rows);
  assert.deepEqual(parseTsv('id\treason\n620\t\n'),[{id:'620',reason:''}]);
  assert.throws(()=>parseTsv('id\treason\n620\n'));
});
test('rescanning an excluded game preserves status, reason and firstSeen',()=>{
  const old={id:'1426210',name:'It Takes Two',status:'excluded',sources:'人工核验',firstSeen:'2026-09-01',lastSeen:'2026-09-01',reason:'夫妻核心叙事'};
  const result=mergeCandidates([old],[{id:'1426210',name:'It Takes Two',sources:['在线合作']}],[],'2026-10-06');
  assert.equal(result[0].status,'excluded');assert.equal(result[0].reason,old.reason);
  assert.equal(result[0].firstSeen,old.firstSeen);assert.equal(result[0].lastSeen,'2026-10-06');
  assert.ok(result[0].sources.includes('在线合作'));assert.deepEqual(old.reason,'夫妻核心叙事');
});
test('discovery only queues new games and syncs existing formal games',()=>{
  const rows=mergeCandidates([],[{id:'550',name:'Left 4 Dead 2',sources:['合作']}],[{id:'620',name:'Portal 2'}],'2026-10-06');
  assert.equal(rows.find(row=>row.id==='550').status,'pending');
  assert.equal(rows.find(row=>row.id==='620').status,'included');
  assert.deepEqual(checkCandidates(rows,[{id:'620'}]),[]);
  assert.throws(()=>mergeCandidates([{id:'620',status:'excluded'}],[],[{id:'620'}],'2026-10-06'));
});
const oldPrice={currency:'CNY',initial:10000,final:5000,discountPercent:50,checkedAt:'2026-09-30'};
const result=(data={})=>({success:true,data:{steam_appid:620,type:'game',name:'Portal 2',header_image:'https://shared.akamai.steamstatic.com/header.jpg',is_free:false,...data}});
test('metadata success without a China price does not claim a new price check',()=>{
  const next=updateSteamCache({price:oldPrice},result(),'620','2026-10-06');
  assert.deepEqual(next.price,oldPrice);assert.equal(next.price.checkedAt,'2026-09-30');
  assert.equal(next.metadataCheckedAt,'2026-10-06');assert.equal(next.priceRefreshFailed,true);
});
test('foreign currency and malformed prices cannot overwrite the last CNY price',()=>{
  for(const price_overview of [{currency:'USD',initial:100,final:50},{currency:'CNY',initial:100,final:-1},{currency:'CNY',initial:20,final:50,discount_percent:0},{currency:'CNY',initial:100,final:50,discount_percent:101}]){
    assert.deepEqual(updateSteamCache({price:oldPrice},result({price_overview}),'620','2026-10-06').price,oldPrice);
  }
});
test('successful CNY and free prices record the actual successful date',()=>{
  const next=updateSteamCache({price:oldPrice},result({price_overview:{currency:'CNY',initial:4200,final:2100,discount_percent:50}}),'620','2026-10-06');
  assert.equal(next.price.final,2100);assert.equal(next.price.checkedAt,'2026-10-06');assert.equal(next.priceRefreshFailed,false);
  assert.equal(updateSteamCache({},result({is_free:true}),'620','2026-10-06').price.final,0);
});
test('Steam errors or a different AppID reject the response without mutating previous data',()=>{
  const previous={price:oldPrice};
  for(const invalid of [{success:false},result({steam_appid:550}),result({type:'dlc'})])assert.throws(()=>updateSteamCache(previous,invalid,'620','2026-10-06'));
  assert.equal(previous.price.checkedAt,'2026-09-30');
});
test('a failed Steam request retains the last successful price and metadata date',async()=>{
  const previous={price:oldPrice,appId:620,type:'game',metadataCheckedAt:'2026-09-30'};
  for(const request of [async()=>{throw new Error('HTTP 429');},async()=>({620:{success:false}})]){
    const result=await refreshSteamEntry(previous,'620','2026-10-06',request);
    assert.equal(result.cache.price.checkedAt,'2026-09-30');assert.equal(result.cache.price.final,5000);
    assert.equal(result.cache.metadataCheckedAt,'2026-09-30');assert.equal(result.cache.priceRefreshFailed,true);assert.ok(result.error);
  }
});
test('real calendar validation rejects impossible dates',()=>{
  assert.equal(validDate('2026-02-29'),false);assert.equal(validDate('2024-02-29'),true);assert.equal(validDate('2026-2-01'),false);
});
test('Steam search extracts only single AppID game rows and decodes names',()=>{
  const html='<a href="https://store.steampowered.com/app/620/" data-ds-appid="620"><span class="title">Bread &amp; Fred</span></a><a href="https://store.steampowered.com/sub/123/" data-ds-appid="620,550"><span class="title">Bundle</span></a>';
  assert.deepEqual(parseSearchResults(html),[{id:'620',name:'Bread & Fred'}]);
  assert.equal(entrances.length,10);assert.equal(new Set(entrances.map(entry=>entry.key)).size,10);
});
const games=[
  {id:1,name:'Portal 2',aliases:['传送门2'],category:['双人解谜'],mode:['在线联机'],fit:3,source:'经典补充',relation:'合作',reason:'两人开传送门',verifiedAt:'2026-10-06',price:{final:1000}},
  {id:2,name:'Unknown',aliases:[],category:['双人解谜'],mode:['在线联机'],fit:2,source:'补充',relation:'合作',reason:'价格未知',verifiedAt:'2026-10-06',price:null},
  {id:3,name:'Free',aliases:[],category:['欢乐对抗'],mode:['本地同屏'],fit:3,source:'热门游戏',relation:'对抗',reason:'两人竞争',verifiedAt:'2026-10-06',price:{final:0}}
];
test('Chinese alias search combines with all filters without modifying the original list',()=>{
  const filters={...defaultFilters,q:'传送门2',category:'双人解谜',mode:'在线联机',fit:'3',relation:'合作',source:'经典补充'};
  assert.deepEqual(selectGames(games,filters).map(game=>game.id),[1]);
  assert.deepEqual(games.map(game=>game.id),[1,2,3]);
  assert.deepEqual(selectGames(games,{...filters,mode:'本地同屏'}),[]);
});
test('unknown prices sort last in either direction and free sorts as zero',()=>{
  assert.deepEqual(selectGames(games,{...defaultFilters,sort:'price-asc'}).map(game=>game.id),[3,1,2]);
  assert.deepEqual(selectGames(games,{...defaultFilters,sort:'price-desc'}).map(game=>game.id),[1,3,2]);
});

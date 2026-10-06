import { selectGames, fitLabels, defaultFilters } from './catalogue.js';

const form = document.querySelector('#filters');
const list = document.querySelector('#results');
const controls = Object.fromEntries(['q','category','mode','fit','relation','sort'].map(key=>[key,document.getElementById(key)]));
let games = [], filters = { ...defaultFilters };
const money = new Intl.NumberFormat('zh-CN', { style:'currency', currency:'CNY', currencyDisplay:'narrowSymbol', maximumFractionDigits:2 });
const escape = value => String(value).replace(/[&<>"']/g, char=>({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const external = '<span class="external" aria-hidden="true">↗</span>';

function renderGame(game) {
  const price = game.price;
  const priceText = price ? price.final===0 ? '免费' : money.format(price.final/100) : '暂未核价';
  return `<article class="game-row" data-id="${game.id}" aria-labelledby="name-${game.id}">
    <div class="game-identity">
      <div class="cover"><img src="${escape(game.cover)}" alt="${escape(game.name)} 封面" loading="lazy" width="460" height="215"><span class="cover-fallback" hidden>${escape(game.name)}</span></div>
      <div class="game-name"><h3 id="name-${game.id}"><a href="${escape(game.steamUrl)}" target="_blank" rel="noopener noreferrer">${escape(game.name)} ${external}</a></h3>${game.aliases.length?`<p class="alias">${escape(game.aliases.join(' / '))}</p>`:''}<div class="categories">${game.category.map(category=>`<span>${escape(category)}</span>`).join('')}</div></div>
    </div>
    <div class="play-details"><p class="players"><span class="mobile-label">支持人数</span>${escape(game.players)}</p><p class="modes">${game.mode.map(escape).join(' · ')}</p></div>
    <div class="fit-details"><span class="fit-pill fit-${game.fit}"><span class="fit-number">${game.fit}</span>${fitLabels[game.fit]}</span><span class="relation">${escape(game.relation)}</span></div>
    <div class="reason-details"><p class="reason">${escape(game.reason)}</p>${game.contentNote?`<span class="content-note">${escape(game.contentNote)}</span>`:''}<div class="proof"><a href="${escape(game.evidenceUrl)}" title="${escape(game.evidenceNote)}" aria-label="${escape(game.name)} 的双人人数依据" target="_blank" rel="noopener noreferrer">人数依据 ${external}</a><span>核验 <time datetime="${game.verifiedAt}">${game.verifiedAt}</time></span></div></div>
    <div class="price-details"><div><div class="price-main"><span class="price ${price?'':'unknown-price'}">${priceText}</span>${price?.discountPercent?`<span class="discount">-${price.discountPercent}%</span>`:''}</div>${price?.discountPercent?`<p class="original-price">${money.format(price.initial/100)}</p>`:''}</div><div class="price-date-wrap"><p class="price-date">${price?`核价 <time datetime="${price.checkedAt}">${price.checkedAt}</time>`:'暂无成功核价记录'}</p>${price && game.priceRefreshFailed?'<p class="price-note">沿用上次成功价格</p>':''}</div></div>
  </article>`;
}
function showCoverFallback(img) {
  img.hidden=true;
  img.removeAttribute('src');
  img.nextElementSibling.hidden=false;
}
function render({ updateUrl = true } = {}) {
  const selected = selectGames(games, filters);
  list.innerHTML=selected.map(renderGame).join('');
  list.hidden=selected.length===0;
  document.querySelector('#empty').hidden=selected.length>0;
  document.querySelector('#result-count').textContent=selected.length;
  document.querySelector('#result-status').textContent=`显示 ${selected.length} / ${games.length} 款`;
  document.querySelectorAll('[data-source]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.source===filters.source)));
  // Handles both ordinary errors and errors completed from browser cache before listeners attach.
  list.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error',()=>showCoverFallback(img),{once:true});
    if (img.complete && img.naturalWidth===0) showCoverFallback(img);
  });
  if (updateUrl) {
    const url=new URL(location.href);
    for (const key of Object.keys(defaultFilters)) {
      if(filters[key]!==defaultFilters[key]) url.searchParams.set(key,filters[key]);
      else url.searchParams.delete(key);
    }
    history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
}
function readFiltersFromUrl() {
  const params=new URLSearchParams(location.search);
  filters={ ...defaultFilters };
  for(const key of Object.keys(defaultFilters)){
    const value=params.get(key);
    if(value===null)continue;
    if(key==='q')filters.q=value;
    else if(key==='source'){
      if([...document.querySelectorAll('[data-source]')].some(button=>button.dataset.source===value))filters.source=value;
    } else if([...controls[key].options].some(option=>option.value===value))filters[key]=value;
  }
  for(const [key,control] of Object.entries(controls))control.value=filters[key];
}
function reset() {
  filters={ ...defaultFilters };
  for(const [key,control] of Object.entries(controls))control.value=filters[key];
  render();
}
function fillOptions(key,values) {
  controls[key].length=1;
  [...new Set(values)].sort(new Intl.Collator('zh-CN').compare).forEach(value=>controls[key].add(new Option(value,value)));
}
async function load() {
  document.querySelector('#load-error').hidden=true;
  document.querySelector('#empty').hidden=true;
  document.querySelector('#retry').disabled=true;
  try {
    const response=await fetch('./games.json',{cache:'no-cache'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    if(data.schemaVersion!==1 || !Array.isArray(data.games))throw new Error('不支持的数据格式');
    games=data.games;
    document.querySelector('#catalogue-count').textContent=`${games.length} 款已核验`;
    fillOptions('category',games.flatMap(game=>game.category));
    fillOptions('mode',games.flatMap(game=>game.mode));
    fillOptions('relation',games.map(game=>game.relation));
    readFiltersFromUrl();
    render();
  } catch(error) {
    console.error('加载清单失败',error);
    list.hidden=true;
    document.querySelector('#load-error').hidden=false;
    document.querySelector('#result-status').textContent='加载失败';
    document.querySelector('#catalogue-count').textContent='清单暂不可用';
  } finally {document.querySelector('#retry').disabled=false;}
}
form.addEventListener('submit',event=>event.preventDefault());
form.addEventListener('input',event=>{if(event.target.id==='q'){filters.q=controls.q.value;render();}});
form.addEventListener('change',event=>{if(event.target.id in controls){filters[event.target.id]=event.target.value;render();}});
form.addEventListener('reset',event=>{event.preventDefault();reset();});
document.querySelectorAll('[data-source]').forEach(button=>button.addEventListener('click',()=>{filters.source=button.dataset.source;render();}));
document.querySelector('#empty-reset').addEventListener('click',reset);
document.querySelector('#retry').addEventListener('click',load);
document.querySelector('#back-top').addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:'instant'});});
window.addEventListener('popstate',()=>{readFiltersFromUrl();render({updateUrl:false});});
await load();

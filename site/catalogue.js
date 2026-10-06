export const fitLabels = { 3: '双人首选', 2: '双人可玩', 1: '更适合多人' };
export const defaultFilters = { q:'', category:'', mode:'', fit:'', relation:'', source:'', sort:'fit' };
const collator = new Intl.Collator('zh-CN', { numeric:true, sensitivity:'base' });
export function selectGames(games, filters) {
  const terms = filters.q.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const selected = games.filter(game => {
    const haystack = [game.name, ...game.aliases, ...game.category, ...game.mode, game.relation, game.reason].join(' ').toLocaleLowerCase();
    return terms.every(term=>haystack.includes(term)) &&
      (!filters.category || game.category.includes(filters.category)) &&
      (!filters.mode || game.mode.includes(filters.mode)) &&
      (!filters.fit || game.fit===Number(filters.fit)) &&
      (!filters.relation || game.relation===filters.relation) &&
      (!filters.source || game.source===filters.source);
  });
  return selected.sort((a,b) => {
    if (filters.sort==='price-asc' || filters.sort==='price-desc') {
      if (!a.price && !b.price) return collator.compare(a.name,b.name);
      if (!a.price) return 1;
      if (!b.price) return -1;
      return (a.price.final-b.price.final)*(filters.sort==='price-desc'?-1:1) || collator.compare(a.name,b.name);
    }
    if (filters.sort==='name') return collator.compare(a.name,b.name);
    if (filters.sort==='verified') return b.verifiedAt.localeCompare(a.verifiedAt) || b.fit-a.fit;
    const order = { '热门游戏':0, '经典补充':1, '补充':2 };
    return b.fit-a.fit || order[a.source]-order[b.source];
  });
}

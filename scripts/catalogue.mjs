import { fits, sources, relations, modes, split, steamUrl } from './lib.mjs';

export const candidateKeys = ['id', 'name', 'status', 'sources', 'firstSeen', 'lastSeen', 'reason'];
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
export function checkCatalogue(rows) {
  const errors = [];
  const seen = new Set();
  for (const row of rows) {
    const label = `${row.id || '?'} ${row.name || '?'}`;
    for (const key of ['id','name','category','players','mode','fit','source','relation','reason','evidenceUrl','evidenceNote','verifiedAt']) {
      if (!row[key]?.trim()) errors.push(`${label}: 缺少 ${key}`);
    }
    if (!/^[1-9]\d*$/.test(row.id) || seen.has(row.id)) errors.push(`${label}: AppID 无效或重复`);
    seen.add(row.id);
    if (!fits[row.fit]) errors.push(`${label}: 适配度须为 1、2 或 3`);
    if (!sources.includes(row.source)) errors.push(`${label}: 来源标签无效`);
    if (!relations.includes(row.relation)) errors.push(`${label}: 玩法关系无效`);
    if (split(row.mode).some(mode => !modes.includes(mode))) errors.push(`${label}: 联机方式无效`);
    if (!validDate(row.verifiedAt)) errors.push(`${label}: 核验日期无效`);
    try {
      const url = new URL(row.evidenceUrl);
      if (url.protocol !== 'https:') throw new Error();
      if (url.hostname === 'store.steampowered.com' && !url.pathname.startsWith(`/app/${row.id}/`)) errors.push(`${label}: Steam 证据 AppID 不一致`);
    } catch { errors.push(`${label}: 证据链接无效`); }
    if (row.reason?.length < 20 || row.evidenceNote?.length < 10) errors.push(`${label}: 推荐理由或人数依据过于简略`);
    if (row.id === '1426210') errors.push(`${label}: 夫妻核心叙事不收录`);
  }
  return errors;
}
export function checkCandidates(rows, catalogue) {
  const errors = [];
  const seen = new Set();
  const formal = new Set(catalogue.map(game => game.id));
  for (const row of rows) {
    if (!/^[1-9]\d*$/.test(row.id) || seen.has(row.id)) errors.push(`候选 AppID 无效或重复: ${row.id}`);
    seen.add(row.id);
    if (!row.name || !row.sources) errors.push(`候选 ${row.id} 缺少名称或发现来源`);
    if (!['pending','included','excluded'].includes(row.status)) errors.push(`候选 ${row.id} 状态无效`);
    if (row.status === 'excluded' && !row.reason?.trim()) errors.push(`候选 ${row.id} 排除原因缺失`);
    if (row.status === 'included' && !formal.has(row.id)) errors.push(`候选 ${row.id} included 但不在正式清单中`);
    if (formal.has(row.id) && row.status !== 'included') errors.push(`正式游戏 ${row.id} 未标记 included`);
    if (!validDate(row.firstSeen) || !validDate(row.lastSeen)) errors.push(`候选 ${row.id} 日期无效`);
  }
  for (const id of formal) if (!seen.has(id)) errors.push(`正式游戏 ${id} 缺少候选记录`);
  return errors;
}
export function mergeCandidates(existing, discoveries, catalogue, date) {
  const records = new Map(existing.map(row => [row.id, { ...row }]));
  for (const found of discoveries) {
    const old = records.get(found.id);
    const sourceSet = new Set([...(old?.sources.split('、') || []), ...found.sources]);
    records.set(found.id, {
      id: found.id, name: old?.name || found.name, status: old?.status || 'pending',
      sources: [...sourceSet].sort().join('、'), firstSeen: old?.firstSeen || date,
      lastSeen: date, reason: old?.reason || ''
    });
  }
  for (const game of catalogue) {
    const old = records.get(game.id);
    if (old?.status === 'excluded') throw new Error(`正式清单与排除状态冲突: ${game.id}，请人工处理`);
    records.set(game.id, { id: game.id, name: game.name, status: 'included', sources: old?.sources || '人工核验', firstSeen: old?.firstSeen || date, lastSeen: old?.lastSeen || date, reason: old?.reason || '' });
  }
  return [...records.values()].sort((a,b) => Number(a.id) - Number(b.id));
}
export function updateSteamCache(previous, result, id, date) {
  if (!result?.success || result.data?.steam_appid !== Number(id) || result.data.type !== 'game') throw new Error('Steam 未返回对应的游戏条目');
  const data = result.data;
  const next = { ...previous, appId: data.steam_appid, type: data.type, steamName: data.name, headerImage: data.header_image, metadataCheckedAt: date, priceRefreshFailed: false };
  if (data.is_free === true) {
    next.price = { currency: 'CNY', initial: 0, final: 0, discountPercent: 0, checkedAt: date };
  } else if (data.price_overview?.currency === 'CNY' && Number.isInteger(data.price_overview.final) && data.price_overview.final >= 0 && Number.isInteger(data.price_overview.initial) && data.price_overview.initial >= data.price_overview.final && Number.isInteger(data.price_overview.discount_percent) && data.price_overview.discount_percent >= 0 && data.price_overview.discount_percent <= 100) {
    next.price = { currency: 'CNY', initial: data.price_overview.initial, final: data.price_overview.final, discountPercent: data.price_overview.discount_percent, checkedAt: date };
  } else {
    // Metadata success does not mean price success (unreleased, region unavailable, missing price).
    next.priceRefreshFailed = true;
  }
  return next;
}
export async function refreshSteamEntry(previous, id, date, request) {
  try {
    const response = await request();
    return { cache: updateSteamCache(previous, response[id], id, date), error: null };
  } catch (error) {
    return { cache: { ...previous, priceRefreshFailed: true }, error: error.message };
  }
}
export function buildGame(row, cache = {}) {
  return {
    id: Number(row.id), name: row.name, aliases: split(row.aliases || ''),
    category: split(row.category), players: row.players, mode: split(row.mode),
    fit: Number(row.fit), source: row.source, relation: row.relation, reason: row.reason,
    evidenceUrl: row.evidenceUrl, evidenceNote: row.evidenceNote,
    verifiedAt: row.verifiedAt, contentNote: row.contentNote || '',
    steamUrl: steamUrl(row.id),
    cover: cache.headerImage || `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${row.id}/header.jpg`,
    price: cache.price || null, priceRefreshFailed: cache.priceRefreshFailed ?? true
  };
}

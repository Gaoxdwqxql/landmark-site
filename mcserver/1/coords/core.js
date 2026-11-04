// core.js - 核心渲染逻辑
function pick(o){ if (typeof o === 'string') return o; if (!o) return ''; return o[curLang] || o.zh || o.en || ''; }
function dimLabel(d){ return (DIM_LABEL[curLang]||DIM_LABEL.zh)[d] || d; }
function tagLabel(x){ return (TAG_LABEL[curLang]||TAG_LABEL.zh)[x] || x; }
function roleLabel(r){ return (ROLE_LABEL[curLang]||ROLE_LABEL.zh)[r] || r; }
function catLabel(c){ return (CAT_LABEL[curLang]||CAT_LABEL.zh)[c] || c; }
function catsOf(tags){ return (tags||[]).map(x => TAG_META[x] && TAG_META[x].cat).filter(Boolean); }
function tagHTML(tag){ const m = TAG_META[tag]; if (!m) return ''; return `<span class="tag ${m.cls}">${m.ico}${tagLabel(tag)}</span>`; }
function builderIcon(b){ if (b === BUILDER_NATURAL) return ICON.globe; if (b === BUILDER_MULTI) return ICON.users; if (b === BUILDER_UNKNOWN) return ICON.question; return ICON.user; }
function builderClass(b){ if (b === BUILDER_NATURAL) return ' builder-natural'; if (b === BUILDER_MULTI) return ' builder-multi'; return ''; }
function sanitizeTags(arr){ if (!Array.isArray(arr)) return []; return arr.filter(x => TAG_META[x]); }
function escapeHtml(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function highlight(text, query){
  const esc = escapeHtml(text);
  if (!query) return esc;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return esc.replace(new RegExp('(' + q + ')', 'gi'), '<mark class="hl">$1</mark>');
}

function setSkin(skin, silent){
  document.documentElement.setAttribute('data-skin', skin);
  const ico = document.getElementById('skin-ico');
  const lbl = document.getElementById('skin-lbl');
  if (ico){ ico.outerHTML = (skin === 'minecraft' ? ICON.skinMc : ICON.skinGh).replace('<svg ', '<svg id="skin-ico" '); }
  if (lbl) lbl.textContent = skin === 'minecraft' ? t('skinMinecraft') : t('skinClassic');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (skin === 'minecraft') themeColor.setAttribute('content', isDark ? '#1a1a1a' : '#c6c6c6');
    else themeColor.setAttribute('content', isDark ? '#0d1117' : '#f6f8fa');
  }
  try { localStorage.setItem('skin', skin); } catch(_) {}
  if (!silent){ const msg = skin === 'minecraft' ? t('toastSkinMc') : t('toastSkinGh'); if (typeof toast === 'function') toast(msg); }
}

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (I18N[curLang][k]) el.innerHTML = I18N[curLang][k]; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { const k = el.dataset.i18nPh; if (I18N[curLang][k]) el.placeholder = I18N[curLang][k]; });
  document.title = t('docTitle');
  document.documentElement.lang = curLang === 'zh' ? 'zh-CN' : 'en';
  const lbl = document.getElementById('theme-lbl'); if (lbl) lbl.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? t('themeDark') : t('themeLight');
  const expLbl = document.getElementById('expand-all-lbl'); if (expLbl) expLbl.textContent = allOpen ? t('btnCollapseAll') : t('btnExpandAll');
  const titleEl = document.getElementById('add-modal-title-text'); if (titleEl) titleEl.textContent = editingId ? t('addTitleEdit') : t('addTitle');
  const skinLbl = document.getElementById('skin-lbl');
  if (skinLbl) skinLbl.textContent = document.documentElement.getAttribute('data-skin') === 'minecraft' ? t('skinMinecraft') : t('skinClassic');
  updateImportFormatHelp(); updateBatchBar();
  try { localStorage.setItem('lang', curLang); } catch(_) {}
}

function convertLM(row){
  let children = [], tags = [], pz = [], pe = [];
  try { children = JSON.parse(row.children || '[]'); } catch(_) {}
  try { tags = JSON.parse(row.tags || '[]'); } catch(_) {}
  try { pz = JSON.parse(row.products_zh || '[]'); } catch(_) {}
  try { pe = JSON.parse(row.products_en || '[]'); } catch(_) {}
  return { id: row.id, name: { zh: row.name_zh, en: row.name_en || '' }, builder: row.builder || '', dim: row.dimension, x: row.x, y: row.y, z: row.z, category: row.category || 'usable', tags: sanitizeTags(tags), note: row.note_zh ? { zh: row.note_zh, en: row.note_en || '' } : null, children, rate: { zh: row.rate_zh || '', en: row.rate_en || '' }, products: { zh: pz, en: pe }, dead: row.category === 'unusable' };
}

async function loadData(){
  try {
    const res = await fetch(`${API_BASE}/api/landmarks`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const landmarks = await res.json();
    DATA.usable   = landmarks.filter(l => l.category === 'usable').map(convertLM);
    DATA.unusable = landmarks.filter(l => l.category === 'unusable').map(convertLM);
    DATA.future   = landmarks.filter(l => l.category === 'future').map(convertLM);
    
    document.getElementById('loading-tip').style.display = 'none';
    document.querySelectorAll('.sec-title[id^="anchor-"]').forEach(el => el.style.display = 'flex');
    renderAll();
  } catch (err) { 
    console.error(err); 
    document.getElementById('loading-tip').innerHTML = `<div style="color:var(--danger);font-weight:bold;">${t('loadFailed')}</div>`;
  }
}

function landmarkHTML(l){
  const tags = (l.tags || []).map(tagHTML).join('');
  const cats = catsOf(l.tags).join(',');
  const deadCls = l.dead ? ' dead' : '';
  const lnameRaw = pick(l.name);
  const lname = highlight(lnameRaw, currentQuery);
  const lnoteRaw = l.note ? pick(l.note) : '';
  const lnote = lnoteRaw ? highlight(lnoteRaw, currentQuery) : '';
  const builderRaw = l.builder || '';
  const builderHl = builderRaw ? highlight(builderRaw, currentQuery) : '';
  const dlabel = dimLabel(l.dim);
  const builderLine = builderRaw ? `<div class="lm-meta"><span class="meta-item${builderClass(builderRaw)}">${builderIcon(builderRaw)}${t('kvBuilder')}：${builderHl}</span></div>` : '';
  const isSelected = l.id && selectedIds.has(l.id);
  const selCls = isSelected ? ' selected' : '';
  const checkbox = l.id ? `<label class="lm-check-wrap" onclick="event.stopPropagation()"><input type="checkbox" class="lm-check" data-lm-id="${l.id}" ${isSelected ? 'checked' : ''}></label>` : '';
  const actions = l.id ? `<button class="btn-icon edit" data-edit-id="${l.id}" title="Edit">${ICON.edit}</button><button class="btn-icon delete" data-delete-id="${l.id}" data-delete-name="${lnameRaw.replace(/"/g,'&quot;')}" title="Delete">${ICON.trash}</button>` : '';

  if (l.children && l.children.length){
    const childrenHTML = l.children.map(c => {
      const prefix = (DIMS[l.dim] && DIMS[l.dim].prefix) ? DIMS[l.dim].prefix : 'overworld';
      const opCmd = `/execute in minecraft:${prefix} run tp @s ${c.x} ${c.y} ${c.z}`;
      const tpCmd = `/tp ${c.x} ${c.y} ${c.z}`;
      const ico = (c.label || '').indexOf('collect') >= 0 ? ICON.inbox : ICON.monitor;
      return `<div class="child-row"><span class="child-label">${ico}${roleLabel(c.label)}</span><code class="coords">${c.x} ${c.y} ${c.z}</code><button class="btn-copy" data-op="${opCmd}" data-tp="${tpCmd}">${ICON.copy}${t('btnTeleport')}</button></div>`;
    }).join('');
    const searchText = [lnameRaw, lnoteRaw, builderRaw, dlabel, ...(l.tags||[]).map(tagLabel)].join(' ').toLowerCase();
    return `<article class="lm lm-group${deadCls}${selCls}" data-id="${l.id||''}" data-dim="${l.dim}" data-cats="${cats}" data-search="${escapeHtml(searchText)}">
      <div class="lm-main" role="button" tabindex="0" aria-expanded="false">
        ${checkbox}
        <div class="lm-left-inner">
          <div class="lm-name">${ICON.pin}${lname}${tags}<span class="child-count">${ICON.layers}${l.children.length} ${t('childPoints')}</span></div>
          ${lnote ? `<div class="lm-note">${lnote}</div>` : ''}
          ${builderLine}
        </div>
        <div class="lm-right">
          <span class="dim-badge ${l.dim}">${DIM_ICON[l.dim]}${dlabel}</span>
          <span class="expand-hint"><svg class="ico chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg><span class="expand-text">${t('expand')}</span></span>
          ${actions}
        </div>
      </div>
      <div class="lm-children">${childrenHTML}</div>
    </article>`;
  }

  const prefix = (DIMS[l.dim] && DIMS[l.dim].prefix) ? DIMS[l.dim].prefix : 'overworld';
  const opCmd = `/execute in minecraft:${prefix} run tp @s ${l.x} ${l.y} ${l.z}`;
  const tpCmd = `/tp ${l.x} ${l.y} ${l.z}`;
  const searchText = [lnameRaw, lnoteRaw, builderRaw, l.x, l.y, l.z, dlabel, ...(l.tags||[]).map(tagLabel)].join(' ').toLowerCase();
  return `<article class="lm${deadCls}${selCls}" data-id="${l.id||''}" data-dim="${l.dim}" data-cats="${cats}" data-search="${escapeHtml(searchText)}">
    <div class="lm-left">
      ${checkbox}
      <div class="lm-left-inner">
        <div class="lm-name">${ICON.pin}${lname}${tags}</div>
        ${lnote ? `<div class="lm-note">${lnote}</div>` : ''}
        ${builderLine}
      </div>
    </div>
    <div class="lm-right">
      <span class="dim-badge ${l.dim}">${DIM_ICON[l.dim]}${dlabel}</span>
      <code class="coords">${l.x} ${l.y} ${l.z}</code>
      <button class="btn-copy" data-op="${opCmd}" data-tp="${tpCmd}">${ICON.copy}${t('btnTeleport')}</button>
      ${actions}
    </div>
  </article>`;
}

function renderList(sel, arr){ $(sel).innerHTML = arr.map(landmarkHTML).join(''); }

function renderStats(){
  const totalPoints = [...DATA.usable, ...DATA.unusable].reduce((n, l) => n + (l.children && l.children.length ? l.children.length : 1), 0);
  const cntTech = DATA.usable.filter(l => catsOf(l.tags).includes('tech')).length;
  const cntTrade = DATA.usable.filter(l => catsOf(l.tags).includes('trade')).length;
  const cntFarm = DATA.usable.filter(l => catsOf(l.tags).includes('farm')).length;
  $('#stats').innerHTML = `
    <div class="stat">${ICON.pin}<b>${DATA.usable.length}</b> ${t('statLandmarks')}</div>
    <div class="stat">${ICON.layers}<b>${totalPoints}</b> ${t('statPoints')}</div>
    <div class="stat">${ICON.tagTech}<b>${cntTech}</b> ${t('statTech')}</div>
    <div class="stat">${ICON.tagTrade}<b>${cntTrade}</b> ${t('statTrade')}</div>
    <div class="stat">${ICON.tagFarm}<b>${cntFarm}</b> ${t('statFarm')}</div>
  `;
}

function renderMachines(){
  const techs = DATA.usable.filter(l => catsOf(l.tags).includes('tech'));
  $('#machines').innerHTML = techs.map(m => {
    let pointsHTML = '';
    if (m.children && m.children.length){
      pointsHTML = m.children.map(p => `<code>${p.x} ${p.y} ${p.z}</code><span style="font-size:11.5px;color:var(--muted);margin-right:6px">（${roleLabel(p.label)} · ${dimLabel(m.dim)}）</span>`).join('');
    } else {
      pointsHTML = `<code>${m.x} ${m.y} ${m.z}</code><span style="font-size:11.5px;color:var(--muted);margin-right:6px">（${dimLabel(m.dim)}）</span>`;
    }
    const products = m.products && (curLang === 'zh' ? m.products.zh : m.products.en);
    const rate = pick(m.rate) || '—';
    const builderRow = m.builder ? `<div class="kv"><span class="k">${builderIcon(m.builder)}${t('kvBuilder')}</span><span class="v">${m.builder}</span></div>` : '';
    return `<div class="machine"><h3>${ICON.tool}${pick(m.name)}${(m.tags||[]).map(tagHTML).join('')}</h3>${builderRow}<div class="kv"><span class="k">${ICON.pin}${t('kvCoords')}</span><span class="v">${pointsHTML}</span></div><div class="kv"><span class="k">${ICON.chart}${t('kvRate')}</span><span class="v">${rate}</span></div>${m.note ? `<div class="kv"><span class="k">${ICON.info}${t('kvNote')}</span><span class="v">${pick(m.note)}</span></div>` : ''}<div class="kv"><span class="k">${ICON.box}${t('kvProducts')}</span><span class="v products">${Array.isArray(products) ? products.map(p => `<span>${p}</span>`).join('') : ''}</span></div></div>`;
  }).join('');
}

function renderFuture(){
  $('#future').innerHTML = DATA.future.map(f => `<div class="fut">${ICON.info}<span class="fut-name">${pick(f.name)}</span>${(f.tags||[]).map(tagHTML).join('')}${f.note ? `<span class="fut-note">${pick(f.note)}</span>` : ''}</div>`).join('');
}

function setGroupOpen(group, open){ group.classList.toggle('open', open); const text = group.querySelector('.expand-text'); if (text) text.textContent = open ? t('collapse') : t('expand'); }

function syncExpandAllBtn(){
  const ico = document.getElementById('expand-all-ico');
  if (ico) ico.outerHTML = (allOpen ? ICON.collapse2 : ICON.expand2).replace('<svg ', '<svg id="expand-all-ico" ');
  const lbl = document.getElementById('expand-all-lbl'); if (lbl) lbl.textContent = allOpen ? t('btnCollapseAll') : t('btnExpandAll');
}

function applyFilter(){
  const q = ($('#search').value || '').trim().toLowerCase();
  const qChanged = q !== currentQuery;
  currentQuery = q;
  if (qChanged){ renderList('#sec-usable', DATA.usable); renderList('#sec-unusable', DATA.unusable); }
  let visible = 0;
  document.querySelectorAll('.lm').forEach(el => {
    const okDim = curDim === 'all' || el.dataset.dim === curDim;
    const cats = (el.dataset.cats || '').split(',').filter(Boolean);
    const okCat = curCat === 'all' || cats.includes(curCat);
    const searchText = (el.dataset.search || '').toLowerCase();
    const okQ = !q || q.split(/\s+/).filter(Boolean).every(word => searchText.includes(word));
    const show = okDim && okCat && okQ;
    el.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.querySelectorAll('[data-section]').forEach(sec => {
    const any = [...sec.querySelectorAll('.lm')].some(el => el.style.display !== 'none');
    sec.style.display = any ? '' : 'none';
  });
  $('#empty').style.display = visible === 0 ? 'block' : 'none';
}

async function copyText(text){ try { await navigator.clipboard.writeText(text); return true; } catch (_) { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch(_){} ta.remove(); return ok; } }

let toastTimer = null;
function toast(msg){ const el = $('#toast'); $('#toast-msg').textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 1800); }

const root = document.documentElement;
function setTheme(mode){
  root.setAttribute('data-theme', mode);
  const cur = document.getElementById('theme-ico');
  if (cur) cur.outerHTML = (mode === 'dark' ? ICON.moon : ICON.sun).replace('<svg ', '<svg id="theme-ico" ');
  const lbl = document.getElementById('theme-lbl'); if (lbl) lbl.textContent = mode === 'dark' ? t('themeDark') : t('themeLight');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor){
    const skin = root.getAttribute('data-skin') || 'github';
    if (skin === 'minecraft') themeColor.setAttribute('content', mode === 'dark' ? '#1a1a1a' : '#c6c6c6');
    else themeColor.setAttribute('content', mode === 'dark' ? '#0d1117' : '#f6f8fa');
  }
  try { localStorage.setItem('theme', mode); } catch(_) {}
}

function renderAll(){
  renderList('#sec-usable', DATA.usable);
  renderList('#sec-unusable', DATA.unusable);
  $('#cnt-usable').textContent = DATA.usable.length;
  $('#cnt-unusable').textContent = DATA.unusable.length;
  renderStats(); renderMachines(); renderFuture();
  applyFilter(); syncExpandAllBtn(); setupNavObserver(); updateBatchBar();
}

function applyMobileMode(){ 
  const ua = navigator.userAgent || ''; 
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|HarmonyOS/i.test(ua) || (('ontouchstart' in window) && window.matchMedia('(max-width: 820px)').matches); 
  document.body.classList.toggle('is-mobile', isMobile); 
}

// io.js - 导入导出逻辑
function nowStr(){ const d = new Date(); const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; }
function fileBase(){ const d = new Date(); const p = n => String(n).padStart(2,'0'); return (curLang === 'zh' ? '66QN服务器地标坐标总览' : '66QN-Server-Landmarks') + '-' + `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`; }

function buildTxt(){
  const L = []; const H = '='.repeat(64), T = '-'.repeat(64);
  L.push(H); L.push('   ' + t('dTitle')); L.push(H); L.push('');
  L.push('【' + t('dBasicInfo') + '】');
  L.push('  ' + t('dServer') + '：66QN'); L.push('  ' + t('dVersion') + '：Minecraft Java 26.2');
  L.push('  ' + t('dAuthor') + '：robot003'); L.push('  ' + t('dExportTime') + '：' + nowStr()); L.push('');
  L.push('【' + t('dTagLegend') + '】');
  Object.keys(TAG_META).forEach(tag => L.push('  [' + tagLabel(tag) + '] ' + ((TAG_DESC[curLang]||TAG_DESC.zh)[tag] || '')));
  L.push('');
  const txtLM = l => {
    const out = [];
    out.push('◆ ' + pick(l.name) + '  （' + dimLabel(l.dim) + '）');
    if (l.builder) out.push('    ' + t('dBuilder') + '：' + l.builder);
    const tags = (l.tags||[]).map(tagLabel).join(' · ');
    const note = l.note ? pick(l.note) : '';
    if (l.children && l.children.length){
      if (tags) out.push('    ' + t('dTags') + '：' + tags);
      if (note) out.push('    ' + t('dNote') + '：' + note);
      if (pick(l.rate)) out.push('    ' + t('dRate') + '：' + pick(l.rate));
      const prod = (curLang==='zh'?l.products.zh:l.products.en)||[];
      if (prod.length) out.push('    ' + t('dProducts') + '：' + prod.join('、'));
      out.push('    ' + t('dCoord') + '：');
      l.children.forEach((c, i) => out.push((i === l.children.length-1 ? '      └─ ' : '      ├─ ') + roleLabel(c.label) + '：' + c.x + ' ' + c.y + ' ' + c.z));
    } else {
      out.push('    ' + t('dCoord') + '：' + l.x + ' ' + l.y + ' ' + l.z);
      if (tags) out.push('    ' + t('dTags') + '：' + tags);
      if (note) out.push('    ' + t('dNote') + '：' + note);
    }
    out.push(''); return out.join('\n');
  };
  L.push(T); L.push('【' + t('dAvailable') + '】（' + DATA.usable.length + '）'); L.push(T); L.push('');
  DATA.usable.forEach(l => L.push(txtLM(l)));
  L.push(T); L.push('【' + t('dUnavailable') + '】（' + DATA.unusable.length + '）'); L.push(T); L.push('');
  DATA.unusable.forEach(l => L.push(txtLM(l)));
  L.push(T); L.push('【' + t('dTechTitle') + '】'); L.push(T); L.push('');
  DATA.usable.filter(l => catsOf(l.tags).includes('tech')).forEach(m => {
    L.push('◆ ' + pick(m.name) + '  [' + (m.tags||[]).map(tagLabel).join(' · ') + ']');
    if (m.builder) L.push('    ' + t('dBuilder') + '：' + m.builder);
    L.push('    ' + t('dCoord') + '：');
    if (m.children && m.children.length) m.children.forEach(c => L.push('      · ' + c.x + ' ' + c.y + ' ' + c.z + '  (' + roleLabel(c.label) + ' · ' + dimLabel(m.dim) + ')'));
    else L.push('      · ' + m.x + ' ' + m.y + ' ' + m.z + '  (' + dimLabel(m.dim) + ')');
    if (pick(m.rate)) L.push('    ' + t('dRate') + '：' + pick(m.rate));
    if (m.note) L.push('    ' + t('dNote') + '：' + pick(m.note));
    const prod = (curLang==='zh'?m.products.zh:m.products.en)||[];
    if (prod.length) L.push('    ' + t('dProducts') + '：' + prod.join('、'));
    L.push('');
  });
  L.push(T); L.push('【' + t('dFuture') + '】（' + DATA.future.length + '）'); L.push(T); L.push('');
  DATA.future.forEach(f => {
    const tags = (f.tags||[]).map(tagLabel).join(' · ');
    let line = '  · ' + pick(f.name);
    if (tags) line += '  [' + tags + ']';
    if (f.builder) line += '  ' + t('dBuilder') + '：' + f.builder;
    if (f.note) line += '  (' + pick(f.note) + ')';
    L.push(line);
  });
  L.push(''); L.push(H); L.push('  ' + t('footerAuthor')); L.push(H);
  return L.join('\n');
}
function buildMarkdown(){
  const L = [];
  L.push('# ' + t('dTitle') + '\n');
  L.push('## ' + t('dBasicInfo') + '\n');
  L.push('- **' + t('dServer') + '**：66QN');
  L.push('- **' + t('dVersion') + '**：Minecraft Java 26.2');
  L.push('- **' + t('dAuthor') + '**：robot003');
  L.push('- **' + t('dExportTime') + '**：' + nowStr() + '\n');
  L.push('## ' + t('dTagLegend') + '\n');
  Object.keys(TAG_META).forEach(tag => L.push('- **' + tagLabel(tag) + '**：' + ((TAG_DESC[curLang]||TAG_DESC.zh)[tag] || '')));
  L.push('');
  const mdLM = l => {
    const out = [];
    out.push('### ' + pick(l.name)); out.push('');
    out.push('- **' + t('dDimension') + '**：' + dimLabel(l.dim));
    if (l.builder) out.push('- **' + t('dBuilder') + '**：' + l.builder);
    if (l.children && l.children.length){
      if (l.tags && l.tags.length) out.push('- **' + t('dTags') + '**：' + l.tags.map(tagLabel).join(' / '));
      if (pick(l.rate)) out.push('- **' + t('dRate') + '**：' + pick(l.rate));
      const prod = (curLang==='zh'?l.products.zh:l.products.en)||[];
      if (prod.length) out.push('- **' + t('dProducts') + '**：' + prod.join('、'));
      if (l.note) out.push('- **' + t('dNote') + '**：' + pick(l.note));
      out.push('- **' + t('dCoord') + '**：');
      l.children.forEach(c => out.push('  - ' + roleLabel(c.label) + '：`' + c.x + ' ' + c.y + ' ' + c.z + '`'));
    } else {
      out.push('- **' + t('dCoord') + '**：`' + l.x + ' ' + l.y + ' ' + l.z + '`');
      if (l.tags && l.tags.length) out.push('- **' + t('dTags') + '**：' + l.tags.map(tagLabel).join(' / '));
      if (l.note) out.push('- **' + t('dNote') + '**：' + pick(l.note));
    }
    out.push(''); return out.join('\n');
  };
  L.push('## ' + t('dAvailable') + '（' + DATA.usable.length + '）\n');
  DATA.usable.forEach(l => L.push(mdLM(l)));
  L.push('## ' + t('dUnavailable') + '（' + DATA.unusable.length + '）\n');
  DATA.unusable.forEach(l => L.push(mdLM(l)));
  L.push('## ' + t('dTechTitle') + '\n');
  DATA.usable.filter(l => catsOf(l.tags).includes('tech')).forEach(m => {
    L.push('### ' + pick(m.name) + '  [' + (m.tags||[]).map(tagLabel).join(' / ') + ']'); L.push('');
    if (m.builder) L.push('- **' + t('dBuilder') + '**：' + m.builder);
    const coordsStr = [];
    if (m.children && m.children.length) m.children.forEach(c => coordsStr.push('`' + c.x + ' ' + c.y + ' ' + c.z + '`（' + roleLabel(c.label) + '）'));
    else coordsStr.push('`' + m.x + ' ' + m.y + ' ' + m.z + '`（' + dimLabel(m.dim) + '）');
    L.push('- **' + t('dCoord') + '**：' + coordsStr.join(' / '));
    if (pick(m.rate)) L.push('- **' + t('dRate') + '**：' + pick(m.rate));
    const prod = (curLang==='zh'?m.products.zh:m.products.en)||[];
    if (prod.length) L.push('- **' + t('dProducts') + '**：' + prod.join('、'));
    if (m.note) L.push('- **' + t('dNote') + '**：' + pick(m.note));
    L.push('');
  });
  L.push('## ' + t('dFuture') + '（' + DATA.future.length + '）\n');
  DATA.future.forEach(f => {
    const tags = (f.tags||[]).map(tagLabel).join(' / ');
    let line = '- ' + pick(f.name);
    if (tags) line += '  `' + tags + '`';
    if (f.builder) line += '  **' + t('dBuilder') + '**：' + f.builder;
    if (f.note) line += '  _' + pick(f.note) + '_';
    L.push(line);
  });
  L.push(''); L.push('---'); L.push(t('footerAuthor'));
  return L.join('\n');
}
function csvEsc(v){ const s = String(v == null ? '' : v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function csvRow(arr){ return arr.map(csvEsc).join(','); }
function buildCsv(){
  const rows = [];
  rows.push(csvRow([t('dName'), t('dStatus'), t('dDimension'), t('dX'), t('dY'), t('dZ'), t('dPoint'), t('dTags'), t('dBuilder'), t('dRate'), t('dProducts'), t('dNote')]));
  const statusLabel = c => (CAT_LABEL[curLang]||CAT_LABEL.zh)[c] || c;
  DATA.usable.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    const rate = pick(l.rate);
    const prods = (curLang==='zh'?l.products.zh:l.products.en)||[];
    const prodsStr = prods.join(' / ');
    if (l.children && l.children.length) l.children.forEach(c => rows.push(csvRow([pick(l.name), statusLabel('usable'), dimLabel(l.dim), c.x, c.y, c.z, roleLabel(c.label), tags, l.builder || '', rate, prodsStr, note])));
    else rows.push(csvRow([pick(l.name), statusLabel('usable'), dimLabel(l.dim), l.x, l.y, l.z, '', tags, l.builder || '', rate, prodsStr, note]));
  });
  DATA.unusable.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    rows.push(csvRow([pick(l.name), statusLabel('unusable'), dimLabel(l.dim), l.x, l.y, l.z, '', tags, l.builder || '', '', '', note]));
  });
  DATA.future.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    rows.push(csvRow([pick(l.name), statusLabel('future'), dimLabel(l.dim), '', '', '', '', tags, l.builder || '', '', '', note]));
  });
  return '\uFEFF' + rows.join('\r\n');
}
function downloadBlob(content, mime, filename){ const blob = new Blob([content], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); }
function downloadTxt(){ downloadBlob(buildTxt(), 'text/plain;charset=utf-8', fileBase() + '.txt'); toast(t('toastDlTxt')); }
function downloadMarkdown(){ downloadBlob(buildMarkdown(), 'text/markdown;charset=utf-8', fileBase() + '.md'); toast(t('toastDlMd')); }
function downloadCsv(){ downloadBlob(buildCsv(), 'text/csv;charset=utf-8', fileBase() + '.csv'); toast(t('toastDlCsv')); }

// 导入相关
const importModal = document.getElementById('import-modal');
const importBackdrop = document.getElementById('import-modal-backdrop');
const importCloseBtn = document.getElementById('import-modal-close');
const importCancelBtn = document.getElementById('import-cancel');
const importSubmitBtn = document.getElementById('import-submit');
const importText = document.getElementById('import-text');
const importHint = document.getElementById('import-hint');
const importPreview = document.getElementById('import-preview');
const importFile = document.getElementById('import-file');
const importFileBtn = document.getElementById('import-file-btn');
const importFilename = document.getElementById('import-filename');
const importFormatHelp = document.getElementById('import-format-help');

function openImportModal(){ importModal.classList.add('open'); importModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; resetImportUI(); }
function closeImportModal(){ if (importRunning) return; importModal.classList.remove('open'); importModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
function resetImportUI(){ importText.value = ''; importFilename.textContent = ''; importHint.style.display = 'none'; importHint.className = 'import-hint'; importPreview.classList.remove('show'); importPreview.innerHTML = ''; importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; importSubmitBtn.disabled = false; importSubmitBtn.innerHTML = ICON.check + '<span>' + t('importSubmit') + '</span>'; switchImportFormat('csv'); }
function switchImportFormat(fmt){ importFormat = fmt; document.querySelectorAll('.import-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.format === fmt)); updateImportFormatHelp(); tryParseImport(); }
function updateImportFormatHelp(){
  if (!importFormatHelp) return;
  const allowed = Object.keys(TAG_META).join(' / ');
  if (importFormat === 'csv'){
    importFormatHelp.textContent = curLang === 'zh' ? 'CSV 列：名称,状态,维度,X,Y,Z,点位,标签,建造者,效率,产物,说明\n标签和产物用 "/" 分隔。建造者：玩家ID / 自然生成 / 多人 / 未知\n允许标签：' + allowed + '（其他忽略）\n同名地标自动合并。' : 'CSV cols: Name,Status,Dimension,X,Y,Z,Point,Tags,Builder,Rate,Products,Note\nSeparate with "/". Builder: player ID / Natural / Multi-person / Unknown\nAllowed tags: ' + allowed + ' (others ignored)\nSame-name items merged.';
  } else {
    importFormatHelp.textContent = curLang === 'zh' ? 'JSON：[ { "name_zh":"...", "dimension":"overworld", "x":0, "y":64, "z":0, "tags":["遗留"], "builder":"Steve" } ]\n允许标签：' + allowed + '（其他忽略）\n同名地标自动合并。' : 'JSON: [ { "name_zh":"...", "dimension":"overworld", "x":0, "y":64, "z":0, "tags":["Legacy"], "builder":"Steve" } ]\nAllowed tags: ' + allowed + '\nSame-name items merged.';
  }
}
document.querySelectorAll('.import-tab').forEach(tab => tab.addEventListener('click', () => switchImportFormat(tab.dataset.format)));
importFileBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', e => { const file = e.target.files && e.target.files[0]; if (!file) return; importFilename.textContent = file.name + ' (' + Math.round(file.size/1024) + ' KB)'; const reader = new FileReader(); reader.onload = ev => { importText.value = ev.target.result; if (/\.json$/i.test(file.name)) switchImportFormat('json'); else if (/\.csv$/i.test(file.name)) switchImportFormat('csv'); else tryParseImport(); }; reader.readAsText(file, 'UTF-8'); e.target.value = ''; });
importText.addEventListener('input', () => { clearTimeout(importDebounce); importDebounce = setTimeout(tryParseImport, 250); });

function parseCsvLine(line){ const result = []; let cur = ''; let inQ = false; for (let i = 0; i < line.length; i++){ const ch = line[i]; if (inQ){ if (ch === '"'){ if (line[i+1] === '"'){ cur += '"'; i++; } else inQ = false; } else cur += ch; } else { if (ch === '"') inQ = true; else if (ch === ','){ result.push(cur); cur = ''; } else cur += ch; } } result.push(cur); return result; }
function parseCsvData(text){
  const lines = text.split(/\r?\n/).filter(l => l.trim()); if (lines.length < 2) return { items: [], ignoredCount: 0 };
  const items = []; let ignoredCount = 0;
  for (let i = 1; i < lines.length; i++){
    const cols = parseCsvLine(lines[i]); if (cols.length < 4) continue;
    const [name, status, dim, x, y, z, point, tags, builder, rate, products, note] = cols;
    if (!name || !name.trim()) continue;
    const dimKey = DIM_FROM_LABEL[dim] || DIM_FROM_LABEL[(dim||'').toLowerCase()] || 'overworld';
    const catKey = CAT_FROM_LABEL[status] || CAT_FROM_LABEL[(status||'').toLowerCase()] || 'usable';
    const rawTags = (tags || '').split(/\s*[\/、,，·]\s*/).map(s => s.trim()).filter(Boolean);
    const mapped = rawTags.map(x => TAG_FROM_LABEL[x] || x);
    const validTags = mapped.filter(x => TAG_META[x]);
    ignoredCount += (mapped.length - validTags.length);
    if (!validTags.includes('交易')) { const idx = validTags.indexOf('低价'); if (idx >= 0) validTags.splice(idx, 1); }
    const prodsArr = (products || '').split(/\s*[\/、,，]\s*/).map(s => s.trim()).filter(Boolean);
    const children = [];
    if (point && point.trim()) children.push({ label: ROLE_FROM_LABEL[point] || point, x: Number(x) || 0, y: Number(y) || 0, z: Number(z) || 0 });
    items.push({ name_zh: name.trim(), name_en: '', dimension: dimKey, x: Number(x) || 0, y: Number(y) || 0, z: Number(z) || 0, category: catKey, tags: validTags, builder: (builder || '').trim(), note_zh: (note || '').trim(), note_en: '', rate_zh: (rate || '').trim(), rate_en: '', products_zh: prodsArr, products_en: [], children });
  }
  return { items, ignoredCount };
}
function parseJsonData(text){
  try { const data = JSON.parse(text); if (!Array.isArray(data)) return null;
    const items = []; let ignoredCount = 0;
    data.forEach(item => {
      const nameZh = item.name_zh || (item.name && item.name.zh) || ''; if (!nameZh) return;
      const rawTags = Array.isArray(item.tags) ? item.tags : [];
      const mapped = rawTags.map(x => TAG_FROM_LABEL[x] || x);
      const validTags = mapped.filter(x => TAG_META[x]);
      ignoredCount += (mapped.length - validTags.length);
      if (!validTags.includes('交易')) { const idx = validTags.indexOf('低价'); if (idx >= 0) validTags.splice(idx, 1); }
      items.push({ name_zh: nameZh, name_en: item.name_en || (item.name && item.name.en) || '', dimension: item.dimension || item.dim || 'overworld', x: Number(item.x) || 0, y: Number(item.y) || 0, z: Number(item.z) || 0, category: item.category || 'usable', tags: validTags, builder: item.builder || '', note_zh: item.note_zh || (item.note && item.note.zh) || '', note_en: item.note_en || (item.note && item.note.en) || '', rate_zh: item.rate_zh || (item.rate && item.rate.zh) || '', rate_en: item.rate_en || (item.rate && item.rate.en) || '', products_zh: Array.isArray(item.products_zh) ? item.products_zh : ((item.products && item.products.zh) || []), products_en: Array.isArray(item.products_en) ? item.products_en : ((item.products && item.products.en) || []), children: Array.isArray(item.children) ? item.children : [] });
    });
    return { items, ignoredCount };
  } catch (_){ return null; }
}
function mergeDuplicates(items){
  const groups = new Map(); const order = [];
  for (const item of items){ const key = (item.name_zh || '').trim(); if (!key) continue; if (!groups.has(key)){ groups.set(key, []); order.push(key); } groups.get(key).push(item); }
  const merged = []; let mergedGroups = 0;
  for (const key of order){
    const group = groups.get(key);
    if (group.length === 1){ merged.push(group[0]); continue; }
    mergedGroups++;
    const first = JSON.parse(JSON.stringify(group[0]));
    const allTags = new Set(); const allProducts = new Set(); const allChildren = []; let firstNoteSet = false;
    (first.tags || []).forEach(t => allTags.add(t));
    (first.products_zh || []).forEach(p => allProducts.add(p));
    if (first.children && first.children.length) allChildren.push(...first.children);
    else if (first.x !== undefined) allChildren.push({ label: '点位', x: first.x, y: first.y, z: first.z });
    for (let i = 1; i < group.length; i++){
      const item = group[i];
      (item.tags || []).forEach(t => allTags.add(t));
      (item.products_zh || []).forEach(p => allProducts.add(p));
      if (item.children && item.children.length) allChildren.push(...item.children);
      else if (item.x !== undefined) allChildren.push({ label: '点位', x: item.x, y: item.y, z: item.z });
      if (item.note_zh && item.note_zh.trim()){ if (firstNoteSet || (first.note_zh && first.note_zh.trim() && first.note_zh !== item.note_zh)){ if (first.note_zh !== item.note_zh) first.note_zh = (first.note_zh || '') + (first.note_zh ? ' / ' : '') + item.note_zh; } else first.note_zh = item.note_zh; firstNoteSet = true; }
      if (item.builder && !first.builder) first.builder = item.builder;
    }
    first.tags = [...allTags]; first.products_zh = [...allProducts];
    if (!first.tags.includes('交易')) { const idx = first.tags.indexOf('低价'); if (idx >= 0) first.tags.splice(idx, 1); }
    if (allChildren.length > 0){ first.children = allChildren; first.x = 0; first.y = 0; first.z = 0; }
    merged.push(first);
  }
  return { merged, mergedGroups };
}
function tryParseImport(){
  const text = importText.value.trim();
  if (!text){ importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; importHint.style.display = 'none'; importPreview.classList.remove('show'); importPreview.innerHTML = ''; return; }
  let result, err = false;
  if (importFormat === 'csv') result = parseCsvData(text);
  else { result = parseJsonData(text); if (result === null) err = true; }
  if (err){ importHint.style.display = ''; importHint.className = 'import-hint error'; importHint.textContent = t('importParseErr'); importPreview.classList.remove('show'); importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; return; }
  const items = result.items; const ignored = result.ignoredCount || 0;
  if (items.length === 0){ importHint.style.display = ''; importHint.className = 'import-hint warn'; importHint.textContent = t('importParseEmpty'); importPreview.classList.remove('show'); importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; return; }
  const original = items.length;
  const { merged, mergedGroups } = mergeDuplicates(items);
  importParsed = merged; importMergeInfo = { merged: mergedGroups, ignored };
  importHint.style.display = ''; importHint.className = 'import-hint success';
  if (mergedGroups > 0 && ignored > 0) importHint.textContent = tFmt('importParseMergedAndIgnored', { n: original, m: mergedGroups, i: ignored, f: merged.length });
  else if (mergedGroups > 0) importHint.textContent = tFmt('importParseMerged', { n: original, m: mergedGroups, f: merged.length });
  else if (ignored > 0) importHint.textContent = tFmt('importParseIgnored', { n: original, i: ignored });
  else importHint.textContent = tFmt('importParseOk', { n: original });
  renderImportPreview();
}
function renderImportPreview(){
  const first = importParsed.slice(0, 8);
  const items = first.map(item => {
    const coord = item.children && item.children.length ? `${item.children.length} ${t('childPoints')}` : `${item.x} ${item.y} ${item.z}`;
    return `<div class="import-preview-item"><span class="import-preview-name">${escapeHtml(item.name_zh)}</span><span class="import-preview-meta">${dimLabel(item.dimension)} · ${coord}</span></div>`;
  }).join('');
  const more = importParsed.length > 8 ? `<div class="import-preview-more">…… ${importParsed.length} 条</div>` : '';
  let badges = '';
  if (importMergeInfo.merged > 0) badges += `<span class="import-merge-badge">${ICON.layers}${importMergeInfo.merged} 组合并</span>`;
  if (importMergeInfo.ignored > 0) badges += `<span class="import-ignore-badge">${ICON.info}忽略 ${importMergeInfo.ignored} 未知标签</span>`;
  importPreview.innerHTML = `<div class="import-preview-title">${t('importPreviewTitle')}${badges}</div>${items}${more}`;
  importPreview.classList.add('show');
}

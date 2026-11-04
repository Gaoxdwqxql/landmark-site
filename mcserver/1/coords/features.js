// features.js - 表单交互及批量操作
const addBuilderInput = document.getElementById('add-builder');
const builderPresetsEl = document.getElementById('builder-presets');
function updateBuilderPresets(){ if (!builderPresetsEl) return; builderPresetsEl.querySelectorAll('.builder-preset').forEach(btn => btn.classList.toggle('active', addBuilderInput.value.trim() === btn.dataset.preset)); }
if (builderPresetsEl){
  builderPresetsEl.addEventListener('click', e => { const btn = e.target.closest('.builder-preset'); if (!btn) return; addBuilderInput.value = btn.dataset.preset; updateBuilderPresets(); addBuilderInput.focus(); });
  addBuilderInput.addEventListener('input', updateBuilderPresets);
}

const batchBar = document.getElementById('batch-bar');
const batchCountNum = document.getElementById('batch-count-num');
const btnSelectMode = document.getElementById('btn-select-mode');
const batchProgressEl = document.getElementById('batch-progress');
const batchProgressFill = document.getElementById('batch-progress-fill');
const batchProgressText = document.getElementById('batch-progress-text');

function updateBatchBar(){ if (!batchBar) return; batchCountNum.textContent = selectedIds.size; batchBar.classList.toggle('show', selectMode && selectedIds.size > 0); }
function setSelectMode(on){ selectMode = on; if (!on) selectedIds.clear(); document.body.classList.toggle('select-mode', on); if (btnSelectMode) btnSelectMode.classList.toggle('primary', on); renderAll(); toast(on ? t('toastSelectModeOn') : t('toastSelectModeOff')); }
function showBatchProgress(i, n){ batchProgressEl.classList.add('show'); batchProgressFill.style.width = (n > 0 ? (i / n) * 100 : 0) + '%'; batchProgressText.textContent = tFmt('batchApplying', { i, n }); }
function hideBatchProgress(){ batchProgressEl.classList.remove('show'); batchProgressFill.style.width = '0'; batchProgressText.textContent = ''; }
btnSelectMode.addEventListener('click', () => setSelectMode(!selectMode));
document.getElementById('batch-select-all').addEventListener('click', () => { document.querySelectorAll('.lm').forEach(el => { if (el.style.display === 'none') return; const id = Number(el.dataset.id); if (id) selectedIds.add(id); }); renderAll(); });
document.getElementById('batch-clear').addEventListener('click', () => { selectedIds.clear(); renderAll(); });
document.addEventListener('change', e => { if (!e.target.classList.contains('lm-check')) return; const id = Number(e.target.dataset.lmId); if (!id) return; if (e.target.checked) selectedIds.add(id); else selectedIds.delete(id); const card = e.target.closest('.lm'); if (card) card.classList.toggle('selected', e.target.checked); updateBatchBar(); });
document.getElementById('batch-delete').addEventListener('click', async () => {
  const ids = [...selectedIds]; if (ids.length === 0) return;
  if (!confirm(tFmt('batchDeleteConfirm', { n: ids.length }))) return;
  let ok = 0, fail = 0;
  for (let i = 0; i < ids.length; i++){
    showBatchProgress(i + 1, ids.length);
    try { const res = await fetch(`${API_BASE}/api/landmarks/${ids[i]}`, { method: 'DELETE' }); if (res.ok) ok++; else fail++; } catch (_){ fail++; }
  }
  hideBatchProgress();
  toast(tFmt('batchDeleted', { n: ok }));
  selectedIds.clear(); await loadData();
});

const batchModal = document.getElementById('batch-modal');
const batchModalBackdrop = document.getElementById('batch-modal-backdrop');
const batchModalClose = document.getElementById('batch-modal-close');
const batchModalCancel = document.getElementById('batch-modal-cancel');
const batchModalConfirm = document.getElementById('batch-modal-confirm');
const batchEditCount = document.getElementById('batch-edit-count');
const batchStatusSel = document.getElementById('batch-status');
const batchDimSel = document.getElementById('batch-dim');
const batchBuilderInput = document.getElementById('batch-builder');
const batchBuilderPresets = document.getElementById('batch-builder-presets');
const batchAddTagsEl = document.getElementById('batch-add-tags');
const batchRemoveTagsEl = document.getElementById('batch-remove-tags');

function buildBatchTagGrids(){
  const tagList = Object.keys(TAG_META);
  batchAddTagsEl.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
  batchRemoveTagsEl.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
  bindBatchTagGrid(batchAddTagsEl, batchAddTags, batchRemoveTags);
  bindBatchTagGrid(batchRemoveTagsEl, batchRemoveTags, batchAddTags);
}
function bindBatchTagGrid(el, ownSet, otherSet){
  el.addEventListener('click', e => {
    const chip = e.target.closest('.tag-chip'); if (!chip) return;
    const tag = chip.dataset.tag;
    if (tag === '低价' && el === batchAddTagsEl){ if (!batchAddTags.has('交易')){ toast(curLang === 'zh' ? '请先勾选"交易"' : 'Select "Trade" first'); return; } }
    if (ownSet.has(tag)) ownSet.delete(tag);
    else { ownSet.add(tag); otherSet.delete(tag); }
    updateBatchTagChips();
  });
}
function updateBatchTagChips(){
  batchAddTagsEl.querySelectorAll('.tag-chip').forEach(c => c.classList.toggle('active', batchAddTags.has(c.dataset.tag)));
  batchRemoveTagsEl.querySelectorAll('.tag-chip').forEach(c => c.classList.toggle('active', batchRemoveTags.has(c.dataset.tag)));
}
function openBatchModal(){
  if (selectedIds.size === 0) return;
  batchEditCount.textContent = selectedIds.size;
  batchStatusSel.value = ''; batchDimSel.value = ''; batchBuilderInput.value = '';
  batchAddTags.clear(); batchRemoveTags.clear();
  buildBatchTagGrids(); updateBatchTagChips(); updateBatchBuilderPresets();
  batchModal.classList.add('open'); batchModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeBatchModal(){ batchModal.classList.remove('open'); batchModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
function updateBatchBuilderPresets(){ batchBuilderPresets.querySelectorAll('.builder-preset').forEach(btn => { if (btn.dataset.preset === '__clear__') return; btn.classList.toggle('active', batchBuilderInput.value.trim() === btn.dataset.preset); }); }
batchBuilderPresets.addEventListener('click', e => { const btn = e.target.closest('.builder-preset'); if (!btn) return; if (btn.dataset.preset === '__clear__'){ batchBuilderInput.value = ''; updateBatchBuilderPresets(); return; } batchBuilderInput.value = btn.dataset.preset; updateBatchBuilderPresets(); });
batchBuilderInput.addEventListener('input', updateBatchBuilderPresets);

batchModalConfirm.addEventListener('click', async () => {
  const newStatus = batchStatusSel.value, newDim = batchDimSel.value, newBuilder = batchBuilderInput.value.trim();
  const hasChange = newStatus || newDim || newBuilder || batchAddTags.size > 0 || batchRemoveTags.size > 0;
  if (!hasChange){ toast(t('batchNoChange')); return; }
  const ids = [...selectedIds];
  let ok = 0, fail = 0;
  const origHtml = batchModalConfirm.innerHTML;
  batchModalConfirm.disabled = true; batchModalClose.disabled = true; batchModalCancel.disabled = true;
  const all = [...DATA.usable, ...DATA.unusable, ...DATA.future];
  for (let i = 0; i < ids.length; i++){
    showBatchProgress(i + 1, ids.length);
    const id = ids[i]; const lm = all.find(x => x.id === id);
    if (!lm){ fail++; continue; }
    const newTagsSet = new Set(sanitizeTags(lm.tags));
    batchAddTags.forEach(tag => newTagsSet.add(tag));
    batchRemoveTags.forEach(tag => newTagsSet.delete(tag));
    if (!newTagsSet.has('交易')) newTagsSet.delete('低价');
    const body = { name_zh: lm.name.zh, name_en: lm.name.en || '', builder: newBuilder || lm.builder || '', dimension: newDim || lm.dim, category: newStatus || lm.category || 'usable', tags: [...newTagsSet], note_zh: lm.note ? (lm.note.zh || '') : '', note_en: lm.note ? (lm.note.en || '') : '', x: lm.x, y: lm.y, z: lm.z, children: lm.children || [], rate_zh: lm.rate ? (lm.rate.zh || '') : '', rate_en: lm.rate ? (lm.rate.en || '') : '', products_zh: lm.products ? (lm.products.zh || []) : [], products_en: lm.products ? (lm.products.en || []) : [] };
    try { const res = await fetch(`${API_BASE}/api/landmarks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); if (res.ok) ok++; else fail++; } catch (_){ fail++; }
  }
  batchModalConfirm.disabled = false; batchModalClose.disabled = false; batchModalCancel.disabled = false;
  batchModalConfirm.innerHTML = origHtml;
  hideBatchProgress();
  toast(tFmt('batchUpdated', { n: ok }));
  selectedIds.clear(); closeBatchModal(); await loadData();
});
document.getElementById('batch-edit').addEventListener('click', openBatchModal);
batchModalClose.addEventListener('click', closeBatchModal);
batchModalBackdrop.addEventListener('click', closeBatchModal);
batchModalCancel.addEventListener('click', closeBatchModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && batchModal.classList.contains('open')) closeBatchModal(); });

// 新增/编辑表单
const addModal = document.getElementById('add-modal');
const addForm = document.getElementById('add-form');
const addNameZh = document.getElementById('add-name-zh');
const addNameEn = document.getElementById('add-name-en');
const addBuilder = document.getElementById('add-builder');
const addDim = document.getElementById('add-dim');
const addCategory = document.getElementById('add-category');
const addX = document.getElementById('add-x');
const addY = document.getElementById('add-y');
const addZ = document.getElementById('add-z');
const addNote = document.getElementById('add-note');
const addRateZh = document.getElementById('add-rate-zh');
const addProductsZh = document.getElementById('add-products-zh');
const addTagPicker = document.getElementById('add-tag-picker');
const addModeSwitch = document.getElementById('add-mode-switch');
const addSingleCoords = document.getElementById('add-single-coords');
const addMultiCoords = document.getElementById('add-multi-coords');
const addLocationList = document.getElementById('add-location-list');
const addTechFields = document.getElementById('add-tech-fields');

function buildAddTagPicker(){
  const tagList = Object.keys(TAG_META);
  addTagPicker.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
}
addTagPicker.addEventListener('click', e => {
  const chip = e.target.closest('.tag-chip'); if (!chip) return;
  const tag = chip.dataset.tag;
  if (tag === '低价' && !selectedTags.includes('交易')){
    toast(curLang === 'zh' ? '请先勾选"交易"' : 'Select "Trade" first');
    return;
  }
  const idx = selectedTags.indexOf(tag);
  if (idx >= 0){
    selectedTags.splice(idx, 1);
    if (tag === '交易'){ const li = selectedTags.indexOf('低价'); if (li >= 0) selectedTags.splice(li, 1); }
  } else selectedTags.push(tag);
  updateTagChips();
});
function updateTagChips(){
  addTagPicker.querySelectorAll('.tag-chip').forEach(chip => {
    const tag = chip.dataset.tag;
    chip.classList.toggle('active', selectedTags.includes(tag));
    if (tag === '低价'){
      const disabled = !selectedTags.includes('交易');
      chip.disabled = disabled;
      chip.classList.toggle('disabled', disabled);
    }
  });
  const hasTech = selectedTags.includes('生电');
  addTechFields.style.display = hasTech ? '' : 'none';
}
addModeSwitch.addEventListener('click', e => {
  const btn = e.target.closest('.mode-btn'); if (!btn) return;
  coordMode = btn.dataset.mode; updateModeSwitch();
  addSingleCoords.style.display = coordMode === 'single' ? '' : 'none';
  addMultiCoords.style.display = coordMode === 'multi' ? '' : 'none';
  if (coordMode === 'multi' && addLocationList.children.length === 0) addLocationRow();
});
function updateModeSwitch(){ addModeSwitch.querySelectorAll('.mode-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === coordMode)); }
function addLocationRow(label, x, y, z){
  const row = document.createElement('div'); row.className = 'location-row';
  row.innerHTML = `<input class="form-input location-label" type="text" placeholder="标签" style="flex:0 0 100px"><input class="form-input location-x" type="number" placeholder="X" required><input class="form-input location-y" type="number" placeholder="Y" required><input class="form-input location-z" type="number" placeholder="Z" required><button type="button" class="btn-remove-location" title="删除">✕</button>`;
  if (label !== undefined) row.querySelector('.location-label').value = label || '';
  if (x !== undefined) row.querySelector('.location-x').value = x;
  if (y !== undefined) row.querySelector('.location-y').value = y;
  if (z !== undefined) row.querySelector('.location-z').value = z;
  row.querySelector('.btn-remove-location').addEventListener('click', () => row.remove());
  addLocationList.appendChild(row);
}
document.getElementById('btn-add-location').addEventListener('click', () => addLocationRow());

function openAddModal(){
  editingId = null;
  addModal.classList.add('open'); addModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  addForm.reset(); selectedTags = []; coordMode = 'single';
  buildAddTagPicker(); updateTagChips(); updateModeSwitch();
  addLocationList.innerHTML = '';
  addSingleCoords.style.display = ''; addMultiCoords.style.display = 'none';
  document.getElementById('add-modal-title-text').textContent = t('addTitle');
  updateBuilderPresets();
}
function openEditModal(lm){
  editingId = lm.id;
  addModal.classList.add('open'); addModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  addForm.reset();
  addNameZh.value = lm.name.zh || ''; addNameEn.value = lm.name.en || '';
  addBuilder.value = lm.builder || ''; addDim.value = lm.dim;
  addCategory.value = lm.category || 'usable';
  addNote.value = lm.note ? (lm.note.zh || '') : '';
  addRateZh.value = lm.rate ? (lm.rate.zh || '') : '';
  addProductsZh.value = lm.products && lm.products.zh ? lm.products.zh.join(', ') : '';
  selectedTags = sanitizeTags(lm.tags);
  buildAddTagPicker(); updateTagChips(); updateBuilderPresets();
  if (lm.children && lm.children.length){ coordMode = 'multi'; addLocationList.innerHTML = ''; lm.children.forEach(c => addLocationRow(c.label, c.x, c.y, c.z)); }
  else { coordMode = 'single'; addX.value = lm.x; addY.value = lm.y; addZ.value = lm.z; }
  updateModeSwitch();
  addSingleCoords.style.display = coordMode === 'single' ? '' : 'none';
  addMultiCoords.style.display = coordMode === 'multi' ? '' : 'none';
  document.getElementById('add-modal-title-text').textContent = t('addTitleEdit');
}
function closeAddModal(){ addModal.classList.remove('open'); addModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; editingId = null; }

addForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!addNameZh.value.trim()){ addNameZh.focus(); return; }
  if (!addBuilder.value.trim()){ toast(t('errBuilder')); addBuilder.focus(); return; }
  const hasTech = selectedTags.includes('生电');
  if (hasTech){
    if (!addRateZh.value.trim()){ toast(t('errTechRate')); addRateZh.focus(); return; }
    if (!addProductsZh.value.trim()){ toast(t('errTechProducts')); addProductsZh.focus(); return; }
  }
  const submitBtn = document.getElementById('add-submit');
  const origHtml = submitBtn.innerHTML;
  submitBtn.disabled = true; submitBtn.textContent = t('btnSubmitting');
  try {
    const productsArr = addProductsZh.value.trim() ? addProductsZh.value.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [];
    const body = { name_zh: addNameZh.value.trim(), name_en: addNameEn.value.trim(), builder: addBuilder.value.trim(), dimension: addDim.value, category: addCategory.value, tags: sanitizeTags(selectedTags), note_zh: addNote.value.trim(), x: coordMode === 'single' ? Number(addX.value) : 0, y: coordMode === 'single' ? Number(addY.value) : 0, z: coordMode === 'single' ? Number(addZ.value) : 0, children: [], rate_zh: hasTech ? addRateZh.value.trim() : '', rate_en: '', products_zh: hasTech ? productsArr : [], products_en: [] };
    if (coordMode === 'multi'){
      addLocationList.querySelectorAll('.location-row').forEach(row => {
        const label = row.querySelector('.location-label').value.trim();
        const x = Number(row.querySelector('.location-x').value); const y = Number(row.querySelector('.location-y').value); const z = Number(row.querySelector('.location-z').value);
        if (label || !isNaN(x)) body.children.push({ label: label || '点位', x, y, z });
      });
      if (body.children.length === 0){ toast(t('errNoLocation')); submitBtn.disabled = false; submitBtn.innerHTML = origHtml; return; }
    }
    if (!body.tags.includes('交易')){ const idx = body.tags.indexOf('低价'); if (idx >= 0) body.tags.splice(idx, 1); }
    const url = editingId ? `${API_BASE}/api/landmarks/${editingId}` : `${API_BASE}/api/landmarks`;
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok){ const errData = await res.json().catch(() => ({})); throw new Error(errData.error || `HTTP ${res.status}`); }
    toast(editingId ? t('toastUpdated') : t('toastAdded'));
    closeAddModal(); await loadData();
  } catch (err){ console.error(err); toast(t('toastAddFail') + err.message); }
  finally { submitBtn.disabled = false; submitBtn.innerHTML = origHtml; }
});

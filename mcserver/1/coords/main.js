// main.js - 事件绑定与初始化
document.getElementById('btn-add-landmark').addEventListener('click', openAddModal);
document.getElementById('add-modal-close').addEventListener('click', closeAddModal);
document.getElementById('add-modal-backdrop').addEventListener('click', closeAddModal);
document.getElementById('add-cancel').addEventListener('click', closeAddModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && addModal.classList.contains('open')) closeAddModal(); });

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-icon.edit'); if (!btn) return;
  e.stopPropagation(); e.preventDefault();
  const id = Number(btn.dataset.editId);
  const all = [...DATA.usable, ...DATA.unusable, ...DATA.future];
  const lm = all.find(x => x.id === id);
  if (lm) openEditModal(lm);
});

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (lang === curLang) return;
    curLang = lang;
    document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b === btn));
    applyLang();
    buildAddTagPicker(); updateTagChips();
    buildBatchTagGrids(); updateBatchTagChips();
    renderAll();
  });
});

const sideNav = document.getElementById('side-nav');
const sideNavFab = document.getElementById('side-nav-fab');
const sideNavBackdrop = document.getElementById('side-nav-backdrop');
const sideNavCollapse = document.getElementById('side-nav-collapse');
const NAV_TARGETS = ['anchor-hero','anchor-usable','anchor-unusable','anchor-machines','anchor-future','anchor-links'];
let navCollapsed = false;
try { navCollapsed = localStorage.getItem('sideNavCollapsed') === '1'; } catch(_) {}
if (navCollapsed) sideNav.classList.add('collapsed');
sideNavCollapse && sideNavCollapse.addEventListener('click', () => { navCollapsed = !navCollapsed; sideNav.classList.toggle('collapsed', navCollapsed); try { localStorage.setItem('sideNavCollapsed', navCollapsed ? '1' : '0'); } catch(_){} });
function openMobileNav(){ sideNav.classList.add('open'); sideNavBackdrop.classList.add('show'); sideNavFab && sideNavFab.setAttribute('aria-expanded','true'); document.body.style.overflow = 'hidden'; }
function closeMobileNav(){ sideNav.classList.remove('open'); sideNavBackdrop.classList.remove('show'); sideNavFab && sideNavFab.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; }
sideNavFab && sideNavFab.addEventListener('click', e => { e.stopPropagation(); if (sideNav.classList.contains('open')) closeMobileNav(); else openMobileNav(); });
sideNavBackdrop && sideNavBackdrop.addEventListener('click', closeMobileNav);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sideNav.classList.contains('open')) closeMobileNav(); });
document.querySelectorAll('.side-nav-link').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const id = link.dataset.navTarget; const target = document.getElementById(id); if (!target) return; target.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id); if (window.innerWidth <= 1180) closeMobileNav(); }); });
function setActiveNav(id){ document.querySelectorAll('.side-nav-link').forEach(a => a.classList.toggle('active', a.dataset.navTarget === id)); }
let navObserver = null;
function setupNavObserver(){ if (navObserver) navObserver.disconnect(); const targets = NAV_TARGETS.map(id => document.getElementById(id)).filter(Boolean); if (!targets.length) return; navObserver = new IntersectionObserver(entries => { const visible = entries.filter(en => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top); if (visible.length > 0) setActiveNav(visible[0].target.id); }, { rootMargin: '-120px 0px -55% 0px', threshold: 0 }); targets.forEach(t => navObserver.observe(t)); }

const downloadWrap = $('#download-wrap');
const btnDownload = $('#btn-download');
const ddBackdrop = $('#dd-backdrop');
function openDownloadMenu(){ downloadWrap.classList.add('open'); btnDownload.setAttribute('aria-expanded','true'); if (document.body.classList.contains('is-mobile') || window.innerWidth <= 660) ddBackdrop.classList.add('show'); }
function closeDownloadMenu(){ downloadWrap.classList.remove('open'); btnDownload.setAttribute('aria-expanded','false'); ddBackdrop.classList.remove('show'); }
btnDownload.addEventListener('click', e => { e.stopPropagation(); if (downloadWrap.classList.contains('open')) closeDownloadMenu(); else openDownloadMenu(); });
ddBackdrop.addEventListener('click', closeDownloadMenu);
document.addEventListener('click', e => { if (!downloadWrap.classList.contains('open')) return; if (downloadWrap.contains(e.target)) return; closeDownloadMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && downloadWrap.classList.contains('open')){ closeDownloadMenu(); btnDownload.focus(); } });
$('#download-dropdown').addEventListener('click', e => { const item = e.target.closest('.dd-item'); if (!item) return; const fmt = item.dataset.format; closeDownloadMenu(); if (fmt === 'md') downloadMarkdown(); else if (fmt === 'txt') downloadTxt(); else if (fmt === 'csv') downloadCsv(); });

const copyModal = document.getElementById('copy-modal');
const copyModalBackdrop = document.getElementById('copy-modal-backdrop');
const copyModalClose = document.getElementById('copy-modal-close');
const copyOpBtn = document.getElementById('copy-op-btn');
const copyTpBtn = document.getElementById('copy-tp-btn');

function openCopyModal(opCmd, tpCmd){
  currentCopyCommands = { op: opCmd, tp: tpCmd };
  document.getElementById('copy-op-code').textContent = opCmd;
  document.getElementById('copy-tp-code').textContent = tpCmd;
  copyModal.classList.add('open');
  copyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCopyModal(){
  copyModal.classList.remove('open');
  copyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function handleCopy(text, btnEl){
  const ok = await copyText(text);
  if (!ok){ toast(t('toastCopyFail')); return; }
  if (btnEl){
    const codeEl = btnEl.querySelector('.copy-option-code');
    const orig = codeEl.textContent;
    codeEl.innerHTML = `<span style="color:var(--accent)">${t('btnCopied')}</span>`;
    setTimeout(() => { codeEl.textContent = orig; closeCopyModal(); }, 800);
  }
  toast(t('toastCopied') + text);
}

copyOpBtn.addEventListener('click', () => handleCopy(currentCopyCommands.op, copyOpBtn));
copyTpBtn.addEventListener('click', () => handleCopy(currentCopyCommands.tp, copyTpBtn));
copyModalClose.addEventListener('click', closeCopyModal);
copyModalBackdrop.addEventListener('click', closeCopyModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && copyModal.classList.contains('open')) closeCopyModal(); });

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-copy'); if (!btn) return;
  openCopyModal(btn.dataset.op, btn.dataset.tp);
});

document.addEventListener('click', async e => {
  const btn = e.target.closest('.btn-icon.delete'); if (!btn) return;
  e.stopPropagation(); e.preventDefault();
  const id = btn.dataset.deleteId; const name = btn.dataset.deleteName || '';
  if (!id) return;
  if (!confirm(t('confirmDelete').replace('{name}', name))) return;
  btn.disabled = true;
  try { const res = await fetch(`${API_BASE}/api/landmarks/${id}`, { method: 'DELETE' }); if (!res.ok) throw new Error(`HTTP ${res.status}`); toast(t('toastDeleted')); await loadData(); } catch (err){ toast(t('toastDeleteFail') + err.message); btn.disabled = false; }
});

document.getElementById('btn-expand-all').addEventListener('click', () => { allOpen = !allOpen; document.querySelectorAll('.lm-group').forEach(g => setGroupOpen(g, allOpen)); syncExpandAllBtn(); });
document.getElementById('search').addEventListener('input', applyFilter);
document.querySelectorAll('.chip[data-dim]').forEach(chip => { chip.addEventListener('click', () => { document.querySelectorAll('.chip[data-dim]').forEach(c => c.classList.remove('active')); chip.classList.add('active'); curDim = chip.dataset.dim; applyFilter(); }); });
document.querySelectorAll('.chip[data-cat]').forEach(chip => { chip.addEventListener('click', () => { document.querySelectorAll('.chip[data-cat]').forEach(c => c.classList.remove('active')); chip.classList.add('active'); curCat = chip.dataset.cat; applyFilter(); }); });
document.getElementById('btn-theme').addEventListener('click', () => { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
document.getElementById('btn-skin').addEventListener('click', () => { const cur = root.getAttribute('data-skin') || 'github'; setSkin(cur === 'minecraft' ? 'github' : 'minecraft'); });

document.addEventListener('click', e => {
  if (e.target.closest('.btn-icon')) return;
  if (e.target.closest('.lm-check-wrap')) return;
  if (e.target.closest('.lm-check')) return;
  if (e.target.closest('.btn-copy')) return;
  if (e.target.closest('.btn-icon.edit')) return;
  if (e.target.closest('.btn-icon.delete')) return;
  const main = e.target.closest('.lm-main');
  if (!main) return;
  const group = main.closest('.lm-group');
  setGroupOpen(group, !group.classList.contains('open'));
});

document.getElementById('btn-import').addEventListener('click', openImportModal);
importCloseBtn.addEventListener('click', closeImportModal);
importBackdrop.addEventListener('click', closeImportModal);
importCancelBtn.addEventListener('click', closeImportModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && importModal.classList.contains('open')) closeImportModal(); });

importSubmitBtn.addEventListener('click', async () => {
  if (importRunning) return;
  if (importParsed.length === 0){ toast(t('importEmpty')); return; }
  if (!confirm(tFmt('importConfirm', { n: importParsed.length }))) return;
  importRunning = true; importSubmitBtn.disabled = true; importCancelBtn.disabled = true; importCloseBtn.disabled = true;
  let success = 0, failed = 0;
  for (let i = 0; i < importParsed.length; i++){
    importSubmitBtn.innerHTML = '<span>' + tFmt('importProgress', { i: i+1, n: importParsed.length }) + '</span>';
    try { const res = await fetch(`${API_BASE}/api/landmarks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(importParsed[i]) }); if (res.ok) success++; else failed++; } catch (_){ failed++; }
  }
  importRunning = false; importSubmitBtn.disabled = false; importCancelBtn.disabled = false; importCloseBtn.disabled = false;
  importSubmitBtn.innerHTML = ICON.check + '<span>' + t('importSubmit') + '</span>';
  if (failed > 0) toast(tFmt('importDoneWithFail', { s: success, f: failed })); else toast(tFmt('importDone', { s: success }));
  if (success > 0){ closeImportModal(); await loadData(); }
});

applyMobileMode();
window.addEventListener('resize', () => setTimeout(applyMobileMode, 180), { passive: true });

(function init(){
  let savedLang = null; try { savedLang = localStorage.getItem('lang'); } catch(_) {}
  if (!savedLang) savedLang = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  curLang = savedLang;
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === curLang));
  let savedTheme = null; try { savedTheme = localStorage.getItem('theme'); } catch(_) {}
  if (!savedTheme) savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(savedTheme);
  let savedSkin = null; try { savedSkin = localStorage.getItem('skin'); } catch(_) {}
  if (!savedSkin) savedSkin = 'github';
  setSkin(savedSkin, true);
  buildAddTagPicker();
  buildBatchTagGrids();
  applyLang();
  loadData();
})();

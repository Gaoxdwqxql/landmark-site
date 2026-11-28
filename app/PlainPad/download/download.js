// ==================== 1. 全局配置 ====================
const Config = {
  API_BASE: 'https://api2.sunwe.dpdns.org',
  REPO_DL: 'https://github.com/Gaoxdwqxql/PlainPad/releases/download',
  MIRROR: 'https://sunwe.dpdns.org/download/file',
  PAGES: 'https://plainpad-files.pages.dev',
  API_LATEST: 'https://api.github.com/repos/Gaoxdwqxql/PlainPad/releases/latest'
};

const Icons = {
  copy: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  speed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
  refresh: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`
};

// ==================== 2. 状态管理 ====================
const State = {
  versions: [],
  latest: null,
  showAll: false,
  query: '',
  speedCacheKey: 'ppad_speed_v16'
};

// ==================== 3. 工具函数 ====================
const Utils = {
  $: s => document.querySelector(s),
  
  ghUrl: v => `${Config.REPO_DL}/v${v}/PlainPad-v${v}.apk`,
  mirrorUrl: v => `${Config.MIRROR}/PlainPad-v${v}.apk`,
  pagesUrl: v => `${Config.PAGES}/PlainPad-v${v}.apk`,

  escapeHtml: s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  
  normalizeQuery: raw => String(raw || '').trim().toLowerCase().replace(/^v/, ''),

  parseVer(v) {
    const s = String(v || '').trim().replace(/^v/i, '');
    const m = s.match(/^(\d+(?:\.\d+)*)(?:-([a-z0-9.]+))?$/i);
    if(!m) return { nums:[0], pre:false, raw:s };
    return { nums:m[1].split('.').map(Number), pre:!!m[2], raw:s };
  },

  compareVer(a, b) {
    const A = this.parseVer(a), B = this.parseVer(b);
    const len = Math.max(A.nums.length, B.nums.length);
    for(let i = 0; i < len; i++){
      const x = A.nums[i] || 0, y = B.nums[i] || 0;
      if(x !== y) return x - y;
    }
    if(A.pre && !B.pre) return -1;
    if(!A.pre && B.pre) return 1;
    return 0;
  },

  matchesVersion(item, q) {
    if(!q) return true;
    const v = item.version.toLowerCase();
    const vPlain = v.replace(/\./g, '');
    const qPlain = q.replace(/\./g, '');
    const tagText = [item.is_pre ? 'pre 预发布 预览版' : '', item.has_mirror ? '镜像' : '无镜像'].join(' ').toLowerCase();
    return v.includes(q) || (qPlain !== '' && vPlain.includes(qPlain)) || tagText.includes(q);
  },

  toast(msg, type='info') {
    const el = Utils.$('#toast');
    let icon = '';
    if(type === 'success') icon = '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    if(type === 'error') icon = '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
    el.innerHTML = `${icon}<span>${msg}</span>`;
    el.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  },

  async copyText(text) {
    if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly','');
    ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if(!ok) throw new Error('copy failed');
  }
};

// ==================== 4. API 请求层 ====================
const Api = {
  async fetchReleases() {
    const res = await fetch(`${Config.API_BASE}/api/releases`);
    if(!res.ok) throw new Error('网络请求失败');
    return await res.json();
  },

  async checkGithubUpdate(currentVer) {
    try {
      const raw = sessionStorage.getItem('ppad_upd_v5');
      if(raw){
        const c = JSON.parse(raw);
        if(Date.now() - c.ts < 10 * 60 * 1000){
          if(c.tag && Utils.compareVer(c.tag, currentVer) > 0) return c.tag;
          return null;
        }
      }
      const res = await fetch(Config.API_LATEST, { headers:{ Accept:'application/vnd.github+json' }, cache:'no-store' });
      if(!res.ok) return null;
      const data = await res.json();
      const tag = String(data.tag_name || '').replace(/^v/i, '');
      
      sessionStorage.setItem('ppad_upd_v5', JSON.stringify({ ts:Date.now(), tag, url:data.html_url }));
      if(Utils.compareVer(tag, currentVer) > 0) return tag;
    } catch(e) {}
    return null;
  }
};

// ==================== 5. UI 渲染层 ====================
const UI = {
  shaBlock(sha, small) {
    if(!sha) return `<div class="sha-missing">此版本发布页暂未提供 SHA-256 校验值</div>`;
    return `
    <details class="${small ? 'ver-sha' : 'sha-wrap'}">
      <summary>SHA-256${small ? '' : ' 校验值'}</summary>
      <div class="sha-body">
        <code>${sha}</code>
        <button class="copy-btn" type="button" data-copy="${sha}">${Icons.copy}复制</button>
      </div>
    </details>`;
  },

  renderLatest() {
    if(!State.latest) return;
    const l = State.latest;
    const dup = State.versions.slice(1).find(it => it.sha256 && it.sha256 === l.sha256 && it.version !== l.version);
    
    Utils.$('#verMeta').textContent = `最新 v${l.version}`;
    
    const btnsHtml = [
      l.has_pages ? `<a class="btn btn-primary" data-route="pages" href="${Utils.pagesUrl(l.version)}" target="_blank" rel="noopener" onclick="App.handleDlClick(this)">官方镜像 1</a>` : '',
      l.has_mirror ? `<a class="btn btn-primary" data-route="mirror" href="${Utils.mirrorUrl(l.version)}" target="_blank" rel="noopener" onclick="App.handleDlClick(this)">官方镜像 2</a>` : '',
      l.lanzou_url ? `<a class="btn btn-lanzou" href="${l.lanzou_url}" target="_blank" rel="noopener" onclick="App.handleDlClick(this)">蓝奏云下载</a>` : ''
    ].filter(Boolean).join('');

    Utils.$('#latest').innerHTML = `
      <div class="dl-card">
        <div class="dl-top">
          <div class="dl-info">
            <span class="badge ${l.is_pre ? 'badge-pre' : ''}">${l.is_pre ? '预览版' : '最新版本'}</span>
            <h2>v${l.version}</h2>
            <p class="dl-note">${l.note || '包含最新的功能与修复'}</p>
          </div>
        </div>
        <div class="dl-actions" id="btnGroup">
          ${btnsHtml}
        </div>
        <div class="speed-section">
          <button class="speed-btn" id="speedBtn" type="button">
            <div class="speed-progress" id="speedProgress"></div>
            <span class="speed-text" id="speedText">
              ${Icons.speed} <span>测速并自动选择最快线路</span>
            </span>
          </button>
        </div>
        <div class="dl-foot">
          <a class="link-muted" id="ghLink" href="${Utils.ghUrl(l.version)}" target="_blank" rel="noopener">GitHub 直链</a>
        </div>
        ${this.shaBlock(l.sha256, false)}
        ${dup ? `<div class="sha-warn">此 SHA-256 与 v${dup.version} 相同，请核对 GitHub Release 页面后再下载。</div>` : ''}
      </div>`;
      
    // 修复 this 丢失问题，用箭头函数包裹
    Utils.$('#speedBtn').addEventListener('click', () => SpeedTest.run());
  },

  renderList() {
    const q = Utils.normalizeQuery(State.query);
    const searching = q !== '';
    const matched = State.versions.filter(it => Utils.matchesVersion(it, q));
    const items = searching ? matched : (State.showAll ? matched : matched.slice(0, 6));
    const moreBtn = Utils.$('#moreBtn');

    if(items.length === 0){
      Utils.$('#list').innerHTML = `
        <li class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <div>没有找到匹配 <b>「${Utils.escapeHtml(State.query.trim())}」</b> 的版本</div>
          <button class="more" style="max-width:200px; margin-top:8px;" onclick="document.getElementById('searchClear').click()">清空搜索</button>
        </li>`;
      moreBtn.style.display = 'none';
      return;
    }

    Utils.$('#list').innerHTML = items.map(item => {
      const isLatest = item.version === State.latest.version;
      const tags = [
        isLatest ? '<span class="tag tag-latest">最新</span>' : '',
        item.is_pre ? '<span class="tag tag-pre">预发布</span>' : '',
        (!item.has_mirror && !item.has_pages && !isLatest) ? '<span class="tag tag-none">无镜像</span>' : ''
      ].join('');

      const btns = [
        item.has_pages ? `<a class="mini mini-pages" href="${Utils.pagesUrl(item.version)}" target="_blank" rel="noopener">镜像 1</a>` : '',
        item.has_mirror ? `<a class="mini mini-mirror" href="${Utils.mirrorUrl(item.version)}" target="_blank" rel="noopener">镜像 2</a>` : '',
        item.lanzou_url ? `<a class="mini mini-lanzou" href="${item.lanzou_url}" target="_blank" rel="noopener">蓝奏云</a>` : '',
        `<a class="mini mini-gh" href="${Utils.ghUrl(item.version)}" target="_blank" rel="noopener">GitHub</a>`
      ].join('');

      return `<li class="ver-item">
        <div class="ver-head">
          <div class="ver-title"><span class="ver-num">v${item.version}</span>${tags}</div>
          <div class="ver-btns">${btns}</div>
        </div>
        ${this.shaBlock(item.sha256, true)}
      </li>`;
    }).join('');

    if(searching) moreBtn.style.display = 'none';
    else {
      moreBtn.style.display = State.versions.length > 6 ? '' : 'none';
      moreBtn.textContent = State.showAll ? '收起' : `展开全部 ${State.versions.length} 个版本`;
    }
  },

  updateDock(url, label, type) {
    const a = Utils.$('#dockDl');
    a.href = url;
    a.className = 'btn ' + (type === 'lanzou' ? 'btn-lanzou' : 'btn-primary');
    Utils.$('#dockSub').textContent = label;
  }
};

// ==================== 6. 测速模块 ====================
const SpeedTest = {
  // 双重保险的超时探测
  async probe(url, timeout = 4000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    const t0 = performance.now();

    // 1. 真正的 fetch 请求
    const fetchPromise = fetch(url, { 
      method: 'GET', 
      mode: 'no-cors', 
      cache: 'no-store', 
      credentials: 'omit', 
      headers: { 'Range': 'bytes=0-0' }, 
      signal: ctrl.signal 
    }).then(() => ({ ok: true, ms: Math.round(performance.now() - t0) }))
      .catch(() => ({ ok: false, ms: null }))
      .finally(() => clearTimeout(timer));

    // 2. 兜底的超时 Promise（防止部分浏览器 abort 失效导致卡死）
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        ctrl.abort(); // 尝试中断底层请求
        resolve({ ok: false, ms: null });
      }, timeout + 500);
    });

    // 3. 竞速
    return Promise.race([fetchPromise, timeoutPromise]);
  },

  showResults(res) {
    document.querySelectorAll('.btn.fast').forEach(el => el.classList.remove('fast'));
    const ghLink = Utils.$('#ghLink');
    if(ghLink) { ghLink.classList.remove('fast'); ghLink.textContent = 'GitHub 直链'; }
    
    const speedBtn = Utils.$('#speedBtn');
    const speedText = Utils.$('#speedText');
    const progress = Utils.$('#speedProgress');
    
    speedBtn.className = 'speed-btn success';
    speedBtn.disabled = false;
    progress.style.width = '100%';

    const okList = res.filter(r => r.ok).sort((a,b) => a.ms - b.ms);
    const best = okList[0] || null;
    
    if (best) {
      speedText.innerHTML = `${Icons.speed} <span><b>${best.name}</b> 最快 (${best.ms}ms)</span> <span class="speed-action">${Icons.refresh} 重测</span>`;
    } else {
      speedText.innerHTML = `${Icons.speed} <span>线路均超时，点击重试</span> <span class="speed-action">${Icons.refresh} 重测</span>`;
    }
    
    if(best) {
      if (best.key === 'github') {
        if(ghLink) { ghLink.classList.add('fast'); ghLink.innerHTML = `⚡ GitHub ${best.ms}ms`; }
      } else {
        const targetBtn = document.querySelector(`.btn[data-route="${best.key}"]`);
        if(targetBtn) targetBtn.classList.add('fast');
      }
    }
    
    const l = State.latest;
    if(best && best.key === 'pages') UI.updateDock(Utils.pagesUrl(l.version), `最快：官方镜像 1 (${best.ms} ms)`, 'pages');
    else if(best && best.key === 'mirror') UI.updateDock(Utils.mirrorUrl(l.version), `最快：官方镜像 2 (${best.ms} ms)`, 'mirror');
    else if(best && best.key === 'github'){
      const a = Utils.$('#dockDl');
      a.href = Utils.ghUrl(l.version);
      a.className = 'btn fast';
      Utils.$('#dockSub').textContent = `最快：GitHub (${best.ms} ms)`;
    }
  },

  async run() {
    const btn = Utils.$('#speedBtn');
    if(!btn || btn.disabled || !State.latest) return;
    
    const l = State.latest;
    const targets = [];
    if(l.has_pages) targets.push({ key:'pages', name:'官方镜像 1', url: Utils.pagesUrl(l.version) });
    if(l.has_mirror) targets.push({ key:'mirror', name:'官方镜像 2', url: Utils.mirrorUrl(l.version) });
    targets.push({ key:'github', name:'GitHub', url: Utils.ghUrl(l.version) });
    
    btn.disabled = true;
    btn.className = 'speed-btn testing';
    Utils.$('#speedProgress').style.width = '0%';
    
    let completed = 0;
    const updateProgress = () => {
      completed++;
      Utils.$('#speedProgress').style.width = `${(completed / targets.length) * 100}%`;
      Utils.$('#speedText').innerHTML = `<span class="spinner"></span> <span>测速中 (${completed}/${targets.length})...</span>`;
    };
    
    Utils.$('#speedText').innerHTML = `<span class="spinner"></span> <span>正在连接线路...</span>`;
    document.querySelectorAll('.btn.fast').forEach(el => el.classList.remove('fast'));
    const ghLink = Utils.$('#ghLink');
    if(ghLink) { ghLink.classList.remove('fast'); ghLink.textContent = 'GitHub 直链'; }
    
    // 注意这里把 this.probe 替换成了 SpeedTest.probe，避免 this 指向问题
    const res = await Promise.all(targets.map(async t => {
      const r = await SpeedTest.probe(t.url, 4000); 
      updateProgress();
      return { key:t.key, name:t.name, ok:r.ok, ms:r.ms };
    }));
    
    // 同样把 this.showResults 替换为 SpeedTest.showResults
    SpeedTest.showResults(res);
    
    try { sessionStorage.setItem(State.speedCacheKey, JSON.stringify({ v: l.version, ts: Date.now(), res })); } catch(e){}
    
    const ok = res.filter(r => r.ok).sort((a,b) => a.ms - b.ms);
    Utils.toast(ok.length ? `测速完成：${ok[0].name} 最快` : '线路均超时，请稍后重试', ok.length ? 'success' : 'error');
  }
};

// ==================== 7. 应用控制层 ====================
const App = {
  handleDlClick(btn) {
    const originalText = btn.innerHTML;
    btn.style.opacity = '0.8';
    btn.innerHTML = `<span class="spinner spinner-white"></span> 跳转中...`;
    setTimeout(() => { btn.style.opacity = '1'; btn.innerHTML = originalText; }, 2000);
  },

  async init() {
    try {
      State.versions = await Api.fetchReleases();
      if(!State.versions || State.versions.length === 0) throw new Error('数据库暂无版本记录');
      
      State.latest = State.versions[0];
      
      UI.renderLatest();
      UI.renderList();
      
      // 初始化 Dock
      const l = State.latest;
      if (l.has_pages) UI.updateDock(Utils.pagesUrl(l.version), '推荐：官方镜像 1', 'pages');
      else if (l.has_mirror) UI.updateDock(Utils.mirrorUrl(l.version), '推荐：官方镜像 2', 'mirror');
      else if (l.lanzou_url) UI.updateDock(l.lanzou_url, '推荐：蓝奏云', 'lanzou');
      else UI.updateDock(Utils.ghUrl(l.version), 'GitHub 直链', 'pages');
      
      Utils.$('#dock').style.display = '';

      // 绑定事件
      Utils.$('#moreBtn').addEventListener('click', () => { State.showAll = !State.showAll; UI.renderList(); });
      const input = Utils.$('#verSearch'), clearBtn = Utils.$('#searchClear');
      input.addEventListener('input', () => { State.query = input.value; clearBtn.hidden = !State.query; UI.renderList(); });
      clearBtn.addEventListener('click', () => { input.value = ''; State.query = ''; clearBtn.hidden = true; input.focus(); UI.renderList(); });
      input.addEventListener('keydown', e => { if(e.key === 'Escape' && input.value){ e.preventDefault(); clearBtn.click(); } });
      document.addEventListener('keydown', e => {
        if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); input.focus(); input.select(); }
      });
      
      // 恢复测速缓存
      try {
        const raw = sessionStorage.getItem(State.speedCacheKey);
        if(raw){
          const d = JSON.parse(raw);
          if(d.v === l.version && Date.now() - d.ts < 10 * 60 * 1000) SpeedTest.showResults(d.res);
        }
      } catch(e){}

      // 检查更新
      Api.checkGithubUpdate(l.version).then(tag => {
        if(tag) Utils.$('#verMeta').textContent = `最新 v${l.version} · 有新版 v${tag}`;
      });

    } catch(err) {
      console.error(err);
      Utils.$('#latest').innerHTML = `
        <div class="dl-card" style="border-color: #fca5a5; background: #fef2f2;">
          <div style="text-align:center; padding: 20px 0;">
            <div style="font-size: 32px; margin-bottom: 12px;">⚠️</div>
            <h2 style="color: #991b1b; font-size: 20px; margin-bottom: 8px;">无法连接更新服务器</h2>
            <p style="color: #7f1d1d; font-size: 14px; margin-bottom: 20px;">${err.message || '网络异常'}</p>
            <a href="https://github.com/Gaoxdwqxql/PlainPad/releases" target="_blank" rel="noopener" class="btn" style="background:#ef4444; color:#fff; width: 100%; border:none;">前往 GitHub Releases 下载</a>
          </div>
        </div>`;
      Utils.$('#list').innerHTML = `<li class="empty-state">版本列表加载失败，请刷新重试。</li>`;
      Utils.$('#dock').style.display = 'none';
      Utils.$('#verMeta').textContent = '获取失败';
    }
  }
};

// ==================== 8. 全局事件监听 & 启动 ====================
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-copy]');
  if(!btn) return;
  Utils.copyText(btn.dataset.copy)
    .then(() => Utils.toast('已复制到剪贴板', 'success'))
    .catch(() => Utils.toast('复制失败，请手动选中', 'error'));
});

window.addEventListener('DOMContentLoaded', () => App.init());

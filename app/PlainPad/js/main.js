const API_BASE = 'https://api2.sunwe.dpdns.org';

// 下载防连点动画
function handleDlClick(e) {
    const btn = e.currentTarget;
    e.preventDefault();
    const originalText = btn.innerHTML;
    btn.style.opacity = '0.8';
    btn.innerHTML = `<span class="spinner-white"></span> 正在跳转...`;
    setTimeout(() => {
        window.location.href = btn.href;
    }, 400);
}

document.getElementById('btnDownload').addEventListener('click', handleDlClick);

async function fetchLatestVersion() {
    const metaRow = document.getElementById('metaRow');
    const latestCard = document.getElementById('latestCard');

    try {
        const res = await fetch(`${API_BASE}/api/releases`);
        if (!res.ok) throw new Error('网络异常');
        const versions = await res.json();
        
        if (versions && versions.length > 0) {
            const latest = versions[0];
            const isPre = latest.is_pre === 1;
            
            // 1. 渲染 Meta 标签
            metaRow.innerHTML = `
                <span class="meta-tag ${isPre ? 'badge-pre' : 'badge-stable'}">
                    ${isPre ? '预览版' : '正式版'} v${latest.version}
                </span>
                <span class="meta-tag">Android 7.0+</span>
                <span class="meta-tag">无网络权限</span>
                <span class="meta-tag">MIT 开源</span>
            `;

            // 2. 渲染最新卡片
            latestCard.innerHTML = `
                <div class="latest-header">
                    <div class="latest-title">
                        <span>v${latest.version}</span>
                        <span style="font-size:11px;padding:2px 8px;border-radius:999px;font-weight:600;${isPre ? 'background:#FFFBEB;color:#F59E0B;' : 'background:#ECFDF5;color:#10B981;'}">
                            ${isPre ? '预览版' : '最新版本'}
                        </span>
                    </div>
                    <div class="latest-date">${latest.release_date ? latest.release_date.split(' ')[0] : ''}</div>
                </div>
                <div class="latest-content">${latest.note || '包含最新的功能与修复'}</div>
            `;
        } else {
            throw new Error('暂无版本数据');
        }
    } catch (e) {
        console.error('获取最新版本失败:', e);
        metaRow.innerHTML = `<span class="meta-tag" style="color:var(--muted);">版本信息获取失败</span>`;
        latestCard.innerHTML = `
            <div class="latest-header">
                <div class="latest-title" style="color:var(--muted);">无法连接更新服务器</div>
            </div>
            <div class="latest-content" style="font-size:0.9rem;">
                请直接访问 <a href="https://github.com/Gaoxdwqxql/PlainPad/releases" target="_blank" rel="noopener" style="color:var(--brand);font-weight:500;">GitHub Releases</a> 查看最新版本。
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchLatestVersion);
